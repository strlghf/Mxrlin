import type { Request, Response, NextFunction } from "express";
import type { User } from "../schemas/user.schema";

export function isAllowed(
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

  if (!canEdit(req.user, req.targetUser.id)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden. You are not allowed."
    });
  }

  return next();
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

export function canEdit (user: User, id: number) {
  return (user.role === "admin" || user.id === id);
}

// export function authUser (req: Request, res: Response, next: NextFunction) {
//   if (!req.user) {
//     return res.status(401).json({
//       success: false,
//       message: "Please log in."
//     });
//   }

//   next();
// }