import { prisma } from "../db/prisma";

const favoriteSelect = { id: true, user_id: true, product_id: true } as const;

export async function getFavoritesService() {
  return await prisma.favorites.findMany({
    select: favoriteSelect
  });
}