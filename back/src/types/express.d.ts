import * as express from "express";
import type { UserInstance } from "../schemas/user.schema";
import type { ProductInstance } from "../schemas/product.schema";
import type { OrderInstance } from "../schemas/order.schema";

declare global {
  namespace Express {
    interface Request {
      user: UserInstance,
      targetUser: UserInstance,
      product: ProductInstance,
      order: OrderInstance,
      query: {
        [key: string]: string | string[] | number | number[] | boolean | undefined;
      }
    }
  }
}