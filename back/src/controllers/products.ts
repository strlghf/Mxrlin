import type { Request, Response, NextFunction } from "express";
import { getProductsService } from "../services/products";

export async function getProducts (req: Request, res: Response, next: NextFunction) {
  const { page, limit, search } = req.query;
  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  
  try {
    const result = await getProductsService(parsedPage, parsedLimit, search as string | undefined);

    return res.status(200).json({
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    return next(error);
  }
}