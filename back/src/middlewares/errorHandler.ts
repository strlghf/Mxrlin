import type { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode || 500;

  const responseBody = {
    success: false,
    message: err.message || "An unexpected error ocurred",
    ...(process.env.NODE_ENV !== "production") && { stack: err.stack }
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: "El correo electrónico ya se encuentra registrado"
      });
    }
  }

  if (err.message === "Invalid string") {
    return res.status(401).json({
      success: false,
      error: "Unauthorized"
    });
  }

  console.error(`[Error Handler]`, err);

  return res.status(statusCode).json(responseBody);
}