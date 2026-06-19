import { prisma } from "../db/prisma";

interface OrderItemInput {
  productId: number;
  quantity: number;
}

export async function createOrderService (userId: number, items: OrderItemInput[]) {
  return await prisma.$transaction(async tx => {
    for (const item of items) {
      const product = await tx.products.findUnique({
        where: { id: item.productId },
        select: { id: true, stock: true, price: true, name: true }
      })

      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Only ${product.stock} left`);
      }

      await tx.products.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity }
      });
    }

    const productRecords = await tx.products.findMany({
      where: { id: { in: items.map(i => i.productId) } }
    })

    const total = items.reduce((sum, item) => {
      const prod = productRecords.find(p => p.id === item.productId);
      return sum + (prod ? Number(prod.price) * item.quantity : 0);
    }, 0)

    const order = await tx.orders.create({
      data: { 
        id: userId,
        total,
        orders_items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price_at_purchase: total,
            price: productRecords.find(p => p.id === item.productId)?.price || 0
          }))
        }
      },
      include: {
        orders_items: true
      }
    });

    return order;
  });
}