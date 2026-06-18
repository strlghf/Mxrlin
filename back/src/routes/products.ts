import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveProductById } from "../middlewares/resolveProductById";
import { getProductsQuerySchema, idParamSchema, createProductSchema, updateProductSchema } from "../schemas/productsSchema";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/products";

const router = Router();

router.get("/", validateRequest(getProductsQuerySchema), getProducts);
router.get("/:id", validateRequest(idParamSchema), resolveProductById, getProductById);
router.post("/", validateRequest(createProductSchema), createProduct);
router.put("/:id", validateRequest(idParamSchema.merge(updateProductSchema)), resolveProductById, updateProduct);
router.patch("/:id", validateRequest(idParamSchema.merge(updateProductSchema)), resolveProductById, updateProduct);
router.delete("/:id", validateRequest(idParamSchema), resolveProductById, deleteProduct);

export default router;