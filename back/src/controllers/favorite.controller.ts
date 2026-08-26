import type { Request, Response, NextFunction } from "express";
import type { GetFavoritesQueryDto } from "../schemas/favorite.schema";
import { addFavoriteService, getFavoritesService } from "../services/favorite.service";

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
    const favorite = await addFavoriteService()
  }
}