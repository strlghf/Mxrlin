import { z } from "zod";
import "dotenv/config";

export const env = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3031),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  CLIENT_URL: z.url()
}).parse(process.env);