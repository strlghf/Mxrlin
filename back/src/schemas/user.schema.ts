import { z } from "zod";
import { idParamSchema } from "./common.schema";

// public user model
export const userModelSchema = z.object({
  id: z.number(),
  role: z.enum(["admin", "customer"]),
  name: z.string(),
  email: z.string()
});

// login model
export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email format.").max(77),
    password: z.string().min(8, "Password must be at least 8 characters.").max(72)
  })
});

// pagination, query params model
export const getUsersQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive("Page must be greater than 0.").default(1),
    limit: z.coerce.number().int().positive("Limit must be greater than 0.").max(100, "Maximum fetch loading reached.").default(10),
    filter: z.enum(["name", "email", "role"]).optional(),
    value: z.string().min(1).optional()
  })
});

// register | admin create user model
export const createUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters.").max(48),
    email: z.string().trim().email("Invalid email format.").max(77),
    password: z.string().min(8, "Password must be at least 8 characters.").max(72),
  })
});

// update user model
export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters.").max(48).optional(),
    email: z.string().trim().email("Invalid email format.").optional(),
    password: z.string().min(8, "Password must be at least 8 characters.").max(72).optional(),
  })
});

export type User = z.infer<typeof userModelSchema>;
export type GetUsersQueryDto = z.infer<typeof getUsersQuerySchema>["query"];
export type GetUserIdDto = z.infer<typeof idParamSchema>["params"]["id"];
export type CreateUserDto = z.infer<typeof createUserSchema>["body"];
export type UpdateUserDto = z.infer<typeof updateUserSchema>["body"];
export type UserLoginDto = z.infer<typeof userLoginSchema>["body"];