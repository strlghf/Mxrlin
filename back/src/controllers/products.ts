import type { Request, Response, NextFunction } from "express";
import { getProductsService } from "../services/products";

export async function getProducts (req: Request, res: Response, next: NextFunction) {
  const { page, limit, search } = req.query;
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  
  try {
    const products = await getProductsService(parsedPage, parsedLimit, search as string | undefined);

    return res.status(200).json({
      data: products.data,
      pagination: products.pagination
    });
  } catch (error) {
    return next(error);
  }
}