import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";
import { userModelSchema } from "../schemas/usersSchema";

export async function resolveUserById (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // NO ES NECESARIO DEBIDO AL COERCE DE IDPARAMS ZOD - 🔍
  const { id } = req.params;
  const parsedId = Number(id);

  if (isNaN(parsedId)) return res.status(400).json({ success: false, error: "Id must be a number" });

  try {
    const user = await prisma.users.findUnique({
      where: { id: parsedId }
    });

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const validatedUser = userModelSchema.parse(user);

    req.user = validatedUser;
    return next();
  } catch (error) {
    return next(error);
  }
}