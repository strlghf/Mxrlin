import { z } from "zod";

export const getUsersSchema = z.object({
  query: z.object({
    filter: z.enum(["name", "email"]).optional(),
    value: z.string().min(1).optional()
  })
});

const userBodySchema = z.object({
  name: z.string().min(3, "Name required").max(48).trim(),
  email: z.string().email("Invalid email format").trim()
})

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export const createUserSchema = z.object({
  body: userBodySchema
});

export const updateUserSchema = z.object({
  body: userBodySchema.partial()
});

export type getUserDto = z.infer<typeof getUsersSchema>
export type getUserIdDto = z.infer<typeof idParamSchema>
export type getUserSchemaDto = z.infer<typeof userBodySchema>
export type createUserDto = z.infer<typeof createUserSchema>
export type updateUserDto = {
  body: Partial<z.infer<typeof createUserSchema>["body"]>
}