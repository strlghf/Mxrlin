import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { authToken } from "../middlewares/validateToken.js";
import { getFavoritesQuerySchema, addFavoriteSchema } from "../schemas/favorite.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favorite.controller.js";

const router = Router();

router.use(authToken);

router.get("/", validateRequest(getFavoritesQuerySchema), getFavorites);

router.post("/", validateRequest(addFavoriteSchema), addFavorite);

router.delete("/:id", validateRequest(idParamSchema), deleteFavorite);

export default router;