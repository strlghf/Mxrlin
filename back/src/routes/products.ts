import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { getProducts } from "../controllers/products";
import { getProductsQuerySchema } from "../schemas/productsSchema";

const router = Router();

router.get("/", validateRequest(getProductsQuerySchema), getProducts);

export default router;