import type { Request, Response, NextFunction } from "express";
import type { GetProductsQueryDto, CreateProductDto, UpdateProductDto } from "../schemas/product.schema";
import { getProductsService, createProductService, updateProductService, deleteProductService } from "../services/product.service";
import { AppError } from "../utils/AppError";

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  const { page, limit, search } = req.query as Partial<GetProductsQueryDto>;
  
  try {
    const products = await getProductsService(page || 1, limit || 10, search as string);

    return res.status(200).json({
      success: true,
      data: products.data,
      pagination: products.pagination
    });
  } catch (error) {
    return next(error);
  }
}

export async function getProductById(req: Request, res: Response, next: NextFunction) {
  const { product } = req;

  try {
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  const createdProduct = {
    name: body.name,
    price: body.price,
    img: body.img,
    category: body.category,
    stock: body.stock
  } as CreateProductDto;

  try {
    const newProduct = await createProductService(createdProduct);

    return res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const { id } = req.product;

  try {
    if (!id) throw new AppError("Id must be a number.", 400);

    const updatedProduct = await updateProductService(id, body as UpdateProductDto);

    return res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.product;

  try {
    if (!id) throw new AppError("Id must be a number.", 400);

    await deleteProductService(id);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}