import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

interface PrismaModel {
  findUnique: (args: { where: { id: number } }) => Promise<any>;
}

type RequestKey = "targetUser" | "product" | "order";

export function resolveEntity(
  prismaModel: PrismaModel,
  zodSchema: ZodObject,
  requestKey: RequestKey
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ success: false, error: "Id must be a number" });
    }

    try {
      const entity = await prismaModel.findUnique({
        where: { id: parsedId }
      });

      if (!entity) {
        return res.status(404).json({ success: false, error: `${requestKey.charAt(0).toUpperCase() + requestKey.slice(1)} not found` });
      }

      const validatedEntity = zodSchema.parse(entity);

      (req as any)[requestKey] = validatedEntity;

      return next();
    } catch (error) {
      return next(error);
    }
  }
}