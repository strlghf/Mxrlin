import { z } from "zod";

export const orderModelSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  total: z.coerce.number().positive(),
  status: z.enum(["pending", "paid", "cancelled"]),
  created_at: z.date().optional()
});

export const getOrdersSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  total: z.coerce.number().positive()
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Invalid ID parameter")
  })
});

export const createOrderSchema = z.object({
  body: z.object({
    user_id: z.number().int().positive("User ID must be valid"),
    items: z.array(
      z.object({
        product_id: z.number().int().positive("Product ID must be valid"),
        quantity: z.number().int().positive("Quantity must be at least 1")
      })
    ).min(1, "Order must contain at least 1 item")
    .max(10, "Too many items in a single order")
  })
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "paid", "cancelled"], {
      error: () => ({ message: "Status must be pending, paid or cancelled" })
    })
  })
});

export type OrderInstance = z.infer<typeof orderModelSchema>;
export type GetOrderIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateOrderDto = z.infer<typeof createOrderSchema>["body"];
export type UpdateOrderDto = z.infer<typeof updateOrderStatusSchema>["body"];