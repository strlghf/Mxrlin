import type { Request, Response, NextFunction } from "express";
import type { JwtUser } from "../schemas/common.schema.js";
import { AppError } from "../utils/AppError.js";

export function isAuthorized(getOwnerId: (req: Request) => number) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized. Please log in first.", 401));
    }

    if (!canEdit(req.user, getOwnerId(req))) {
      return next(new AppError("Forbidden. You are not allowed.", 403));
    }

    return next();
  }
}

export function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(new AppError("Unauthorized. Please log in first.", 401));
  }

  if (req.user.role !== "admin") {
    return next(new AppError("Forbidden. You are not allowed.", 403));
  }

  return next();
}

export function getAuthUser(req: Request) {
  if (!req.user) throw new AppError("Unauthorized", 401);
  return req.user;
}

export function canEdit(user: JwtUser, id: number) {
  return (user.role === "admin" || user.id === id);
}