import { prisma } from "../db/prisma";
import type { GetProductsQueryDto, GetProductIdDto, CreateProductDto, UpdateProductDto } from "../schemas/productsSchema";

const productSelect = { id: true, name: true, price: true, img: true, stock: true, created_at: true } as const;

export async function getProductsService (page: number, limit: number, search?: string) {
  const skip = (page - 1) * limit;

  if (search) {
    const [products, totalCount] = await prisma.$transaction([
      prisma.products.findMany({
        skip,
        take: limit,
        where: {
          name: { contains: search, mode: "insensitive" }
        },
        select: productSelect,
      }),
      prisma.products.count({
        where: {
          name: { contains: search, mode: "insensitive" }
        }
      })
    ]);

    return {
      data: products,
      pagination: { page, limit, total: totalCount }
    }
  }

  const [products, totalCount] = await prisma.$transaction([
    prisma.products.findMany({
      skip,
      take: limit,
      select: productSelect
    }),
    prisma.products.count()
  ]);

  return {
    data: products,
    pagination: { page, limit, total: totalCount }
  }
}

export async function createProductService (productData: CreateProductDto) {
  return await prisma.products.create({
    data: productData,
    select: productSelect
  });
}

export async function updateProductService (id: GetProductIdDto, data: UpdateProductDto) {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );

  return await prisma.products.update({
    where: { id },
    data: cleanData,
    select: productSelect
  });
}

export async function deleteProductService (id: GetProductIdDto) {
  return await prisma.products.delete({
    where: { id }
  });
}