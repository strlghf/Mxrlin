import { prisma } from "../db/prisma";
import type { GetOrderIdDto } from "../schemas/ordersSchema";

interface OrderItemInput {
  product_id: number;
  quantity: number;
}

type OrderStatus = "pending" | "paid" | "canceled";

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

    const total = items.reduce((sum, item) => {
      const prod = productRecords.find(p => p.id === item.product_id);
      return sum + (prod ? +prod.price * item.quantity : 0);
    }, 0);

    const order = await tx.orders.create({
      data: { 
        user_id: userId,
        total,
        orders_items: {
          create: items.map(item => {
            const currentPrice = productRecords.find(p => p.id === item.product_id)?.price || 0;

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
  const updatedOrder = await prisma.orders.update({
    where: { id: orderId },
    data: {
      status: newStatus
    },
    include: {
      orders_items: true
    }
  })

  if (updatedOrder.status === "paid") {
    throw new Error("Paid orders cannot be modified");
  }

  return updatedOrder;
}