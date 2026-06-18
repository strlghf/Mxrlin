import type { UserInstance } from "../schemas/usersSchema";
import type { ProductInstance } from "../schemas/productsSchema";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: UserInstance,
      product: ProductInstance,
      query: {
        [key: string]: string | string[] | number | number[] | boolean | undefined;
      }
    }
  }
}