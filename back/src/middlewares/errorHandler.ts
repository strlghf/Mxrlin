import type { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface AppError extends Error {
  statusCode?: number;
}

// Global error handling
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
    return res.status(409).json({
      success: false,
      error: "Email not available."
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  console.error(`[Error Handler]`, err);
  return res.status(500).json({
    success: false,
    message: "An unexpected error ocurred.",
    ...(process.env.NODE_ENV !== "production") && { stac: err.stack }
  });
}