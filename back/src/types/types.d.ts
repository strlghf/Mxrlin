import type { UserInstance } from "../schemas/usersSchema";

declare global {
  namespace Express {
    interface Request {
      user: UserInstance
    }
  }
}