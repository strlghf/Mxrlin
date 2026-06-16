import type { Request, Response, NextFunction } from "express";
import { type ZodObject, ZodError } from "zod";

export function validateRequest (schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })

      return next();
    } catch (error) {
      if (error instanceof ZodError || (error as Error).name === "ZodError") {
        const zodError = error as ZodError;
        const errorMessages = zodError.issues.map(issues => ({
          field: issues.path[issues.path.length - 1] || "general",
          message: issues.message
        }));

        return res.status(400).json({
          success: false,
          errors: errorMessages
        })
      }

      return next(error);
    }
  }
}