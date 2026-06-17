import type { users } from "../../generated/prisma/client";
import type { getUserSchemaDto } from "../schemas/usersSchema";

export interface UserData {
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: getUserSchemaDto
    }
  }
}