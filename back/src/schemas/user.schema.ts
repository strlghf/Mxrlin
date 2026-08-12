import { z } from "zod";
import { idParamSchema } from "./common.schema";

export const userModelSchema = z.object({
  id: z.number(),
  role: z.enum(["admin", "customer"]),
  name: z.string(),
  email: z.string(),
  created_at: z.date()
});

export const userAuthSchema = z.object({
  body: z.object({
    email: z.string().email().max(70),
    password: z.string().min(8).max(255)
  })
});

export const getUsersQuerySchema = z.object({
  query: z.object({
    filter: z.enum(["name", "email", "role"]).optional(),
    value: z.string().min(1).optional()
  })
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name required").max(48).trim(),
    password: z.string().min(8, "Password must be at least 8 characters").max(255),
    email: z.string().email("Invalid email format").trim()
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name required").max(48).trim().optional(),
    password: z.string().min(8, "Password must be at least 8 characters").max(255).optional(),
    email: z.string().email("Invalid email format").trim().optional()
  })
});

export type User = z.infer<typeof userModelSchema>;
export type GetUsersQueryDto = z.infer<typeof getUsersQuerySchema>["query"];
export type GetUserIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateUserDto = z.infer<typeof createUserSchema>["body"];
export type UpdateUserDto = z.infer<typeof updateUserSchema>["body"];
export type UserAuthDto = z.infer<typeof userAuthSchema>["body"];