import { z } from "zod";

export const productModelSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3).max(48),
  price: z.coerce.number().positive(),
  img: z.string().max(200),
  stock: z.number().int().nonnegative(),
  created_at: z.string().datetime()
});

export const getProductsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive("Page must be greater than 0").default(1),
    limit: z.coerce.number().int().positive("Limit must be greater than 0").max(100, "Maximum fetch loading").default(10),
    search: z.string().optional()
  })
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(48).trim(),
    price: z.coerce.number().positive(),
    img: z.string().max(200),
    stock: z.number().int().nonnegative()
  })
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(48).trim().optional(),
    price: z.coerce.number().positive().optional(),
    img: z.string().max(200).optional(),
    stock: z.number().int().nonnegative().optional()
  })
})

export type ProductInstance = z.infer<typeof productModelSchema>;
export type GetProductsQueryDto = z.infer<typeof getProductsQuerySchema>["query"];
export type GetProductIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateProductDto = z.infer<typeof createProductSchema>["body"];
export type UpdateProductDto = z.infer<typeof updateProductSchema>["body"];