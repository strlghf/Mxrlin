import { Router } from "express";
import { getFavorites } from "../controllers/favorite.controller";
import { authToken } from "../middlewares/validateToken";
import { validateRequest } from "../middlewares/validateRequest";
import { getFavoritesQuerySchema } from "../schemas/favorite.schema";

const router = Router();

router.use(authToken);

router.get("/", validateRequest(getFavoritesQuerySchema), getFavorites);

// router.post("/", validateRequest(addFavoriteSchema), addFavorite);

router.delete("/:productId", removeFavorite);