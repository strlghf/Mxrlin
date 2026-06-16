import { z } from "zod";

export const getUsersSchema = z.object({
  query: z.object({
    filter: z.enum(["name", "email"]).optional(),
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
    email: z.string().email("Invalid email format")
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(48).trim().optional(),
    email: z.string().email().trim().optional()
  })
});

// export type getUserDto = z.infer<typeof getUsersSchema>
// export type getUserIdDto = z.infer<typeof idParamSchema>
// export type CreateUserDto = z.infer<typeof createUserSchema>
// export type updateUserDto = z.infer<typeof updateUserSchema>