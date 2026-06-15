import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);

  const responseBody = {
    success: false,
    message: err.message || "An unexpected error ocurred",
    ...(process.env.NODE_ENV !== "production") && { stack: err.stack }
  }

  console.error(`[Error Handler]`, err);

  return res.status(statusCode).json(responseBody);
}