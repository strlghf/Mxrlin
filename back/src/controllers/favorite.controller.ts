import type { Request, Response, NextFunction } from "express";
import type { CreateFavoriteDto, GetFavoritesQueryDto } from "../schemas/favorite.schema";
import { addFavoriteService, deleteFavoriteService, getFavoritesService } from "../services/favorite.service";

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

  try {
    const { product_id } = body as CreateFavoriteDto;
    const favorite = await addFavoriteService(id, product_id);

    return res.status(201).json({
      success: true,
      data: favorite
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteFavorite(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;
  const { id: productId } = req.params;

  try {
    const parsedId = Number(productId);
    await deleteFavoriteService(id, parsedId);

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}