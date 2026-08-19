import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function authToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You didn't send the token."
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized."
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return next(error);
  }
}