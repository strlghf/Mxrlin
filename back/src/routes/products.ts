import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveEntity } from "../middlewares/resolveEntity";
import { getProductsQuerySchema, idParamSchema, createProductSchema, updateProductSchema, productModelSchema } from "../schemas/productsSchema";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productsController";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.products, productModelSchema, "product")

router.get("/", validateRequest(getProductsQuerySchema), getProducts);
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getProductById);
router.post("/", validateRequest(createProductSchema), createProduct);
router.put("/:id", validateRequest(idParamSchema.merge(updateProductSchema)), resolveIdMiddleware, updateProduct);
router.patch("/:id", validateRequest(idParamSchema.merge(updateProductSchema)), resolveIdMiddleware, updateProduct);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, deleteProduct);

export default router;