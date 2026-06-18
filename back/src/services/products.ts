import { prisma } from "../db/prisma";

export async function getProductsService (page: number, limit: number, search?: string) {
  const skip = (page as number - 1) * limit;

  if (search) {
    const [products, totalCount] = await prisma.$transaction([
      prisma.products.findMany({
        skip,
        take: limit,
        where: {
          name: { contains: search, mode: "insensitive" }
        },
        select: { id: true, name: true, price: true, img: true, stock: true, created_at: true },
      }),
      prisma.products.count({
        where: {
          name: { contains: search, mode: "insensitive" }
        }
      })
    ])

    return {
      data: products,
      pagination: { page, limit, total: totalCount }
    }
  }

  const [products, totalCount] = await prisma.$transaction([
    prisma.products.findMany({
      skip,
      take: limit,
      select: { id: true, name: true, price: true, img: true, stock: true, created_at: true }
    }),
    prisma.products.count()
  ])

  return {
    data: products,
    pagination: { page, limit, total: totalCount }
  }
}