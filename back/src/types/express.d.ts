import type { UserInstance } from "../schemas/usersSchema";
import type { ProductInstance } from "../schemas/productsSchema";
import * as express from "express";
import type { OrderInstance } from "../schemas/ordersSchema";

declare global {
  namespace Express {
    interface Request {
      user: UserInstance,
      product: ProductInstance,
      order: OrderInstance,
      query: {
        [key: string]: string | string[] | number | number[] | boolean | undefined;
      }
    }
  }
}