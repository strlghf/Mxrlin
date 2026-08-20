import type { Request, Response, NextFunction } from "express";
import type { JwtUser } from "../schemas/common.schema";

export function isAuthorized(getOwnerId: (req: Request) => number) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in first."
      });
    }

    if (!canEdit(req.user, getOwnerId(req))) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You are not allowed."
      });
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
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in first."
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden. You are not allowed."
    });
  }

  return next();
}

export function canEdit(user: JwtUser, id: number) {
  return (user.role === "admin" || user.id === id);
}