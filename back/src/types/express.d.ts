import type { User } from "../schemas/user.schema";
import type { ProductInstance } from "../schemas/product.schema";
import type { OrderInstance } from "../schemas/order.schema";

declare global {
  namespace Express {
    interface Request {
      user: User,
      targetUser: User,
      product: ProductInstance,
      order: OrderInstance,
      query: {
        [key: string]: string | string[] | number | number[] | boolean | undefined;
      }
    }
  }
}