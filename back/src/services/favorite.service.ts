import { prisma } from "../db/prisma";
import type { GetFavoriteIdDto } from "../schemas/favorite.schema";
import type { GetProductIdDto } from "../schemas/product.schema";

export async function getFavoritesService(page: number, limit: number, userId: GetFavoriteIdDto) {
  const skip = (page - 1) * limit;

  const [favorites, totalCount] = await prisma.$transaction([
    prisma.favorites.findMany({
      where: { user_id: userId },
      skip,
      take: limit,
      select: {
        id: true,
        created_at: true,
        products: { select: {
          id: true, name: true, price: true, img: true, category: true, stock: true
        } }
      }
    }),
    prisma.favorites.count({
      where: { user_id: userId }
    })
  ]);

  return {
    data: favorites,
    pagination: { page, limit, total: totalCount }
  }
}

export async function addFavoriteService(userId: GetFavoriteIdDto, productId: GetProductIdDto) {
  return await prisma.favorites.create({
    data: { user_id: userId, product_id: productId }
  });
}

export async function deleteFavoriteService(userId: GetFavoriteIdDto, productId: GetProductIdDto) {
  return await prisma.favorites.delete({
    where: { user_id_product_id: { user_id: userId, product_id: productId } }
  });
}