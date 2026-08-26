import { Router } from "express";
import { authToken } from "../middlewares/validateToken";
import { validateRequest } from "../middlewares/validateRequest";
import { addFavoriteSchema, getFavoritesQuerySchema } from "../schemas/favorite.schema";
import { idParamSchema } from "../schemas/common.schema";
import { addFavorite, deleteFavorite, getFavorites } from "../controllers/favorite.controller";

const router = Router();

router.use(authToken);

router.get("/", validateRequest(getFavoritesQuerySchema), getFavorites);

router.post("/", validateRequest(addFavoriteSchema), addFavorite);

router.delete("/:id", validateRequest(idParamSchema), deleteFavorite);

export default router;