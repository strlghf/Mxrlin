import type { User } from "../schemas/user.schema";
import type { Product } from "../schemas/product.schema";
import type { Order } from "../schemas/order.schema";
import type { Role } from "../../generated/prisma/enums";

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
  }
}