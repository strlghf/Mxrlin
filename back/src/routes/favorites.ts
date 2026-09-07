import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { authToken } from "../middlewares/validateToken";
import { getFavoritesQuerySchema, addFavoriteSchema } from "../schemas/favorite.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favorite.controller";

const router = Router();

router.use(authToken);

router.get("/", validateRequest(getFavoritesQuerySchema), getFavorites);

router.post("/", validateRequest(addFavoriteSchema), addFavorite);

router.delete("/:id", validateRequest(idParamSchema), deleteFavorite);

export default router;