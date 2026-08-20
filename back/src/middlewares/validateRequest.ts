import type { Request, Response, NextFunction } from "express";
import { type ZodObject, ZodError } from "zod";

export function validateRequest(schema: ZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      if (parsed.body) Object.assign(req.body, parsed.body);
      if (parsed.query) Object.assign(req.query, parsed.query);
      if (parsed.params) Object.assign(req.params, parsed.params);

      return next();
    } catch (error) {
      if (error instanceof ZodError || (error as Error).name === "ZodError") {
        const zodError = error as ZodError;
        const errorMessages = zodError.issues.map(issue => ({
          field: issue.path[issue.path.length - 1] || "general",
          message: issue.message
        }));

        return res.status(400).json({
          success: false,
          errors: errorMessages
        });
      }

      return next(error);
    }
  }
}