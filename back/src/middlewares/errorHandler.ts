import type { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface AppError extends Error {
  statusCode?: number
};

export function errorHandler(
  err: AppError,
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

  if ("statusCode" in err) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  console.error(`[Error Handler]`, err);

  return res.status(statusCode).json(responseBody);
}