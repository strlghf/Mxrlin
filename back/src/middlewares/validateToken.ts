import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Role } from "../generated/prisma/enums.js";
import { AppError } from "../utils/AppError.js";
import { env } from "../env.js";

interface User extends JwtPayload {
  id: number;
  role: Role
}

export function authToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("You didn't send the token", 401));
  }

  try {
    jwt.verify(token, env.JWT_SECRET, (err: Error, user: User) => {
      if (err) {
        return next(new AppError("Unauthorized", 401));
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return next(error);
  }
}