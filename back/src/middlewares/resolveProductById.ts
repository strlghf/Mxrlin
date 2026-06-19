import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";
import { productModelSchema } from "../schemas/productsSchema";

export async function resolveProductById (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const parsedId = Number(id);

  if (isNaN(parsedId)) return res.status(400).json({ success: false, error: "Id must be a number" });

  try {
    const product = await prisma.products.findUnique({
      where: { id: parsedId }
    });

    if (!product) return res.status(404).json({ success: false, error: "Product not found" })

    const validateProduct = productModelSchema.parse(product);

    req.product = validateProduct;
    return next();
  } catch (error) {
    return next(error);
  }
}