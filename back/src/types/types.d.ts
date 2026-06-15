import type { users } from "../../generated/prisma/client";

export interface UserData {
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: users
    }
  }
}