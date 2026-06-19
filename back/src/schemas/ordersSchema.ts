import { z } from "zod";

export const orderModelSchema = z.object({
  id: z.number().int().positive(),
  total: z.coerce.number().positive(),
  created_at: z.string().datetime()
})

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
})

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.number().int().positive("User ID must be valid"),
    items: z.array(
      z.object({
        productId: z.number().int().positive("Product ID must be valid"),
        quantity: z.number().int().positive("Quantity must be at least 1")
      })
    ).min(1, "Order must contain at least 1 item")
  })
})

export type OrderInstance = z.infer<typeof orderModelSchema>;
export type GetOrderIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateOrderDto = z.infer<typeof createOrderSchema>["body"];