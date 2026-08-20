import { prisma } from "../db/prisma";
import type { GetOrderIdDto } from "../schemas/order.schema";
import type { OrderStatus } from "../../generated/prisma/enums";
import { AppError } from "../utils/AppError";

interface OrderItemInput {
  product_id: number;
  quantity: number;
}

export async function createOrderService(userId: GetOrderIdDto, items: OrderItemInput[]) {
  return await prisma.$transaction(async tx => {
    for (const item of items) {
      const product = await tx.products.findUnique({
        where: { id: item.product_id },
        select: { id: true, name: true, price: true, img: true, stock: true, created_at: true }
      });

      if (!product) {
        throw new AppError(`Product with id ${item.product_id} not found.`, 404);
      }

      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${product.name}. Only ${product.stock} left.`, 422);
      }

      const result = await tx.products.updateMany({
        where: { id: item.product_id, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } }
      });

      if (result.count === 0) {
        throw new AppError(`Insufficient stock for product ${item.product_id}.`, 422);
      }
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

export async function updateOrderStatusService(orderId: GetOrderIdDto, newStatus: OrderStatus) {
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