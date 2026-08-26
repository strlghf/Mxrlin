import { z } from "zod";
import type { idParamSchema } from "./common.schema";

export const favoriteModelSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  product_id: z.number()
});

// v1. only pagination, not query params
export const getFavoritesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive("Page must be greater than 0.").default(1),
    limit: z.coerce.number().int().positive("Limit must be greater than 0.").max(100, "Maximum fetch loading reached.").default(10)
  })
});

export const addFavoriteSchema = z.object({
  body: z.object({
    user_id: z.coerce.number().int().positive(),
    product_id: z.coerce.number().int().positive()
  })
});

export type Favorite = z.infer<typeof favoriteModelSchema>;
export type GetFavoritesQueryDto = z.infer<typeof getFavoritesQuerySchema>["query"];
export type GetFavoriteIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateFavoriteDto = z.infer<typeof addFavoriteSchema>["body"];