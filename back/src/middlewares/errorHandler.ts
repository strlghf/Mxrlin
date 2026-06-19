import type { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

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

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: "El correo electrónico ya se encuentra registrado"
      });
    }
  }

  console.error(`[Error Handler]`, err);

  return res.status(statusCode).json(responseBody);
}