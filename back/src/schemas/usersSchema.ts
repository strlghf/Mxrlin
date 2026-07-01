import { z } from "zod";

export const userModelSchema = z.object({
  id: z.number().int().positive(),
  role: z.enum(["admin", "customer"]),
  name: z.string().min(3).max(48),
  password: z.string().min(8).max(48),
  email: z.string().email().max(70),
  created_at: z.date().nullable().optional()
});

export const getUsersQuerySchema = z.object({
  query: z.object({
    filter: z.enum(["name", "email", "role"]).optional(),
    value: z.string().min(1).optional()
  })
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name required").max(48).trim(),
    password: z.string().min(8, "Password must be at least 8 characters").max(48),
    email: z.string().email("Invalid email format").trim()
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name required").max(48).trim().optional(),
    password: z.string().min(8, "Password must be at least 8 characters").max(48).optional(),
    email: z.string().email("Invalid email format").trim().optional()
  })
});

export type UserInstance = z.infer<typeof userModelSchema>;
export type GetUsersQueryDto = z.infer<typeof getUsersQuerySchema>["query"];
export type GetUserIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateUserDto = z.infer<typeof createUserSchema>["body"];
export type UpdateUserDto = z.infer<typeof updateUserSchema>["body"];