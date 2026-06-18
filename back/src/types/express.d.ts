import type { UserInstance } from "../schemas/usersSchema";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: UserInstance,
      query: {
        [key: string]: string | string[] | number | number[] | boolean | undefined;
      }
    }
  }
}