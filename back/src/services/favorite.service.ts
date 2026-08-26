import { prisma } from "../db/prisma";
import type { GetFavoriteIdDto } from "../schemas/favorite.schema";
import type { GetProductIdDto } from "../schemas/product.schema";

const favoriteSelect = { id: true, user_id: true, product_id: true } as const;

export async function getFavoritesService(page: number, limit: number, userId: GetFavoriteIdDto) {
  const skip = (page - 1) * limit;

  const [favorites, totalCount] = await prisma.$transaction([
    prisma.favorites.findMany({
      skip,
      where: { user_id: userId },
      take: limit,
      select: favoriteSelect
    }),
    prisma.favorites.count()
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

export async function deleteFavoriteService(userId: GetFavoriteIdDto) {
  return await prisma.favorites.delete({
    where: { id: userId }
  });
}