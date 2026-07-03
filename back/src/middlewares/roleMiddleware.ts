import type { Request, Response, NextFunction } from "express";
import type { UserInstance } from "../schemas/usersSchema";

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
      message: "Forbidden. Admin privileges required."
    });
  }

  return next();
}

export function authUser (req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please log in."
    });
  }

  next();
}

export function canEdit (user: UserInstance, id: number) {
  return (user.role === "admin" || user.id === id);
}