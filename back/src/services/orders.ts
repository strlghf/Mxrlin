import { prisma } from "../db/prisma";

export async function checkoutService (userId: number, cartItems) {
  return await prisma.$transaction(async tx => {
    let totalOrderAmount = 0;
    const itemsToCreate = [];

    for (const item of cartItems) {
      const product = await tx.products.findUnique({
        where: { id: item.productId } 
      })

      if (!product) {
        throw new Error(`Product with id ${item.productId} doesn't exist`)
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}. Only ${product.stock} left`)
      }

      const price = Number(product.price);
      totalOrderAmount += price * item.quantity;

      itemsToCreate.push({
        product_id: product.id,
        quantity: item.quantity,
        price_at_purchase: product.price
      });

      await tx.products.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity }
      });
    }

    const newOrder = await tx.orders.create({
      data: {
        user_id: userId,
        total: totalOrderAmount,
        orders_items: {
          create: itemsToCreate
        }
      },
      include: {
        orders_items: true
      }
    });

    return newOrder;
  })
}