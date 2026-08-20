import { z } from "zod";
import { idParamSchema } from "./common.schema";

export const orderModelSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  total: z.number(),
  status: z.enum(["pending", "paid", "cancelled"]),
  created_at: z.date()
});

export const getOrdersSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  total: z.number().positive()
});

export const orderWithItemsSchema = orderModelSchema.extend({
  orders_items: z.array(z.object({
    id: z.number(),
    product_id: z.number().nullable(),
    quantity: z.number(),
    price_at_purchase: z.coerce.number(),
    products: z.object({
      id: z.number(),
      name: z.string(),
      img: z.string()
    }).nullable()
  }))
});

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product_id: z.number().int().positive("Product ID must be valid."),
        quantity: z.number().int().positive("Quantity must be at least 1.")
      })
    ).min(1, "Order must contain at least 1 item.")
    .max(10, "Too many items in a single order.")
    .refine(items => {
      const productIds = items.map(item => item.product_id);

      const uniqueIds = new Set(productIds);
      return uniqueIds.size === productIds.length;
    }, {
      message: "Duplicate product IDs are not allowed in the same order."
    })
  })
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["pending", "paid", "cancelled"], {
      error: () => ({ message: "Status must be pending, paid or cancelled." })
    })
  })
});

export type Order = z.infer<typeof orderModelSchema>;
export type GetOrderIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateOrderDto = z.infer<typeof createOrderSchema>["body"];
export type UpdateOrderDto = z.infer<typeof updateOrderStatusSchema>["body"];