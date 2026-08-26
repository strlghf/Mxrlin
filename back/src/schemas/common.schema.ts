import { z } from "zod";

export const idParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

export const jwtModel = z.object({
  id: z.coerce.number().int().positive(),
  role: z.enum(["admin", "customer"])
});

export type JwtUser = z.infer<typeof jwtModel>;