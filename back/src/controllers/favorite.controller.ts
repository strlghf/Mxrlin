import type { Request, Response, NextFunction } from "express";
import type { GetFavoritesQueryDto, CreateFavoriteDto } from "../schemas/favorite.schema.js";
import { getFavoritesService, addFavoriteService, deleteFavoriteService } from "../services/favorite.service.js";
import { AppError } from "../utils/AppError.js";

export async function getFavorites(req: Request, res: Response, next: NextFunction) {
  const { page, limit } = req.query as Partial<GetFavoritesQueryDto>;
  const { id } = req.user;

  try {
    const getUsersFavorites = await getFavoritesService(page || 1, limit || 10, id);

    return res.status(200).json({
      success: true,
      data: getUsersFavorites.data,
      pagination: getUsersFavorites.pagination
    });
  } catch (error) {
    return next(error)
  }
}

export async function addFavorite(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const { id } = req.user;

  const createdFavorite = {
    product_id: body.product_id
  } as CreateFavoriteDto;

  try {
    const { product_id } = createdFavorite;
    const newFavorite = await addFavoriteService(id, product_id);

    return res.status(201).json({
      success: true,
      data: newFavorite
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteFavorite(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  const { id: product_id } = req.params;
  const parsedId = Number(product_id);

  try {
    if (!parsedId) throw new AppError("Id must be a number.", 400);

    await deleteFavoriteService(id, parsedId);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}