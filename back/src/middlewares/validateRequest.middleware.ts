import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodType } from "zod";

interface RequestShape<TBody, TQuery, TParams> {
  body?: TBody;
  query?: TQuery;
  params?: TParams;
}

type RecordUnknown = Record<string, unknown>;

function syncInPlace(target: RecordUnknown, source: RecordUnknown) {
  for (const key of Object.keys(target)) {
    if (!(key in source)) delete target[key];
  }
  Object.assign(target, source);
}

export function validateRequest<TBody = unknown, TQuery = unknown, TParams = unknown>(
  schema: ZodType<RequestShape<TBody, TQuery, TParams>>
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!result.success) {
        const error = result.error.issues.map(issue => {
          const [location, ...path] = issue.path;
          
          return {
            location: typeof location === "string" ? location : "root",
            field: path.length ? path.join(".") : "_",
            message: issue.message,
          };
        });

        return res.status(400).json({
          success: false,
          error: "Cannot parse request."
        });
      }

      const { body, query, params } = result.data;

      if (body) req.body = body;

      if (query) {
        syncInPlace(req.query as RecordUnknown, query as RecordUnknown);
      }
      
      if (params) {
        syncInPlace(req.params as RecordUnknown, params as RecordUnknown);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}