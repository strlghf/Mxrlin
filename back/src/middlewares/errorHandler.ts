import type { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { AppError } from "../utils/AppError";

// Global error handling
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
    const target = (err.meta?.target as string[] | undefined)?.join(", ") ?? "field";

    return res.status(409).json({
      success: false,
      error: `A record with this ${target} already exists.`
    });
  }

  if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: `Record not found.`
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
    ...(process.env.NODE_ENV !== "production") && { stack: err.stack }
  });
}