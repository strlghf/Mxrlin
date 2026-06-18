import type { Request, Response, NextFunction } from "express";
import { getProductsService, createProductService, updateProductService, deleteProductService } from "../services/products";

export async function getProducts (req: Request, res: Response, next: NextFunction) {
  const { page, limit, search } = req.query;
  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 10;
  
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

export async function getProductById (req: Request, res: Response) {
  const { product } = req;

  return res.status(200).json({
    success: true,
    data: product
  })
}

export async function createProduct (req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    const newProduct = await createProductService(body);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateProduct (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { body } = req;

  try {
    const parsedId = Number(id);
    
    const updatedProduct = await updateProductService(parsedId, body);
    return res.status(200).json({
      success: true,
      message: "Product updated succesfully",
      data: updatedProduct
    })
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct (req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const parsedId = Number(id);

    await deleteProductService(parsedId);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}