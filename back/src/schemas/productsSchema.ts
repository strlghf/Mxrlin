import { z } from "zod";

export const productModelSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3).max(48),
  price: z.union([z.number().positive(), z.string()]),
  img: z.string().max(200),
  stock: z.number().int().nonnegative(),
  created_at: z.date().nullable().optional()
})

export const getProductsQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive("Page must be greater than 0").default(1),
    limit: z.coerce.number().int().positive("Limit must be greater than 0").max(100, "Maximum fetch loading").default(10),
    search: z.string().optional().default("")
  })
})

export type ProductInstance = z.infer<typeof productModelSchema>
export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>["query"]