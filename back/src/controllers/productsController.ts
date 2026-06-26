import type { Request, Response, NextFunction } from "express";
import type { GetProductsQueryDto } from "../schemas/productsSchema";
import { getProductsService, createProductService, updateProductService, deleteProductService } from "../services/productsServices";

export async function getProducts (req: Request, res: Response, next: NextFunction) {
  const { page, limit, search } = req.query as Partial<GetProductsQueryDto>;
  
  try {
    const products = await getProductsService(page || 1, limit || 10, search);

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
  });
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
  const { body } = req;
  const { id } = req.product;

  try {
    const updatedProduct = await updateProductService(id, body);

    return res.status(200).json({
      success: true,
      message: "Product updated succesfully",
      data: updatedProduct
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct (req: Request, res: Response, next: NextFunction) {
  const { id } = req.product;

  try {
    await deleteProductService(id);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}