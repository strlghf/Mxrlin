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

/**
 * interface RequestShape<TBody, TQuery, TParams> {
 *   body?: TBody;
 *   query?: TQuery;
 *   params?: TParams;
 * }
 * 
  * function syncInPlace(target: Record<string, unknown>, source: Record<string, unknown>) {
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
          const errors = result.error.issues.map((issue) => {
            const [location, ...path] = issue.path;
            return {
              location: typeof location === "string" ? location : "root",
              field: path.length ? path.join(".") : "_",
              message: issue.message,
            };
          });
  
          res.status(400).json({ success: false, errors });
          return;
        }
  
        const { body, query, params } = result.data;
  
        // req.body es una propiedad normal (no getter): podemos reemplazarla
        // por completo. Así solo quedan los campos validados/transformados
        // por Zod (strings->números convertidos, defaults aplicados, y
        // cualquier campo extra eliminado).
        if (body !== undefined) {
          req.body = body;
        }
  
        // req.query / req.params pueden no ser reasignables (Express 5), así
        // que los sincronizamos en lugar de sustituir la referencia.
        if (query !== undefined) {
          syncInPlace(req.query as Record<string, unknown>, query as Record<string, unknown>);
        }
        if (params !== undefined) {
          syncInPlace(req.params as Record<string, unknown>, params as Record<string, unknown>);
        }
  
        next();
      } catch (error) {
        // Errores inesperados (p.ej. una excepción real lanzada dentro de un
        // .refine()/.transform() personalizado) se delegan al manejador de
        // errores de Express, en vez de perderse como un rechazo de promesa
        // sin capturar.
        next(error);
      }
    };
  }
 */