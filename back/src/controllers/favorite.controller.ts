import type { Request, Response, NextFunction } from "express";
import { getFavoritesService } from "../services/favorite.service";

export async function getFavorites(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user;

  try {
    const getUsersFavorites = await getFavoritesService();

    return res.status(200).json({
      success: true,
      data: getUsersFavorites
    });
  } catch (error) {
    return next(error)
  }
}