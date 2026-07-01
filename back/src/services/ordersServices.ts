import { prisma } from "../db/prisma";
import type { GetOrderIdDto } from "../schemas/ordersSchema";
import type { OrderStatus } from "../../generated/prisma/enums";

interface OrderItemInput {
  product_id: number;
  quantity: number;
}

export async function createOrderService (userId: GetOrderIdDto, items: OrderItemInput[]) {
  return await prisma.$transaction(async tx => {
    for (const item of items) {
      const product = await tx.products.findUnique({
        where: { id: item.product_id },
        select: { id: true, name: true, price: true, img: true, stock: true }
      });

      if (!product) {
        throw new Error(`Product with id ${item.product_id} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Only ${product.stock} left`);
      }

      await tx.products.update({
        where: { id: item.product_id },
        data: { stock: product.stock - item.quantity }
      });
    }

    const productRecords = await tx.products.findMany({
      where: { id: { in: items.map(i => i.product_id) } }
    });

    const productMap = new Map(productRecords.map(p => [p.id, p]));

    const total = items.reduce((sum, item) => {
      const prod = productMap.get(item.product_id);
      return sum + (prod ? Number(prod.price) * item.quantity : 0);
    }, 0);

    const order = await tx.orders.create({
      data: { 
        user_id: userId,
        total,
        orders_items: {
          create: items.map(item => {
            const currentPrice = productMap.get(item.product_id)?.price || 0;

            return {
              product_id: item.product_id,
              quantity: item.quantity,
              price_at_purchase: currentPrice
            }
          })
        }
      },
      include: {
        orders_items: true
      }
    });

    return order;
  });
}

export async function updateOrderStatusService (orderId: GetOrderIdDto, newStatus: OrderStatus) {
  // debería ir dentro de $transaction
  if (newStatus === "cancelled") {
    await prisma.$transaction(async tx => {
      const items = await tx.orders_items.findMany({
        where: { order_id: orderId }
      });

      for (const item of items) {
        if (item.product_id) {
          await tx.products.update({
            where: { id: item.product_id },
            data: { stock: { increment: item.quantity } }
          });
        }
      }
    });
  }
  
  const updatedOrder = await prisma.orders.update({
    where: { id: orderId },
    data: { status: newStatus },
    include: { orders_items: true }
  });

  return updatedOrder;
}