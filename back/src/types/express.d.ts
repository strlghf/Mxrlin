import type { User } from "../schemas/user.schema.ts";
import type { Product } from "../schemas/product.schema.ts";
import type { Order } from "../schemas/order.schema.ts";
import type { Role } from "../../generated/prisma/enums.ts";

declare global {
  namespace Express {
    interface Request {
      user: { id: number, role: Role },
      targetUser: User,
      product: Product,
      order: Order,
      query: {
        [key: string]: string | string[] | number | number[] | boolean | undefined;
      }
    }
    // now we are free
  }
}