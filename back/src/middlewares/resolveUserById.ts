import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

export async function resolveUserById (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // NO ES NECESARIO DEBIDO AL COERCE DE IDPARAMS ZOD - 🔍
  const { id } = req.params;
  const parsedId = Number(id);

  if (isNaN(parsedId)) return res.status(400).json({ msg: "Id must be a number" });

  try {
    const user = await prisma.users.findUnique({
      where: { id: parsedId }
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Bad Request" });
  }
}