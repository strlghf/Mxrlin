import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { isAdmin } from "../middlewares/role.middleware";
import { productModelSchema, getProductsQuerySchema, createProductSchema, updateProductSchema } from "../schemas/product.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";
import { authToken } from "../middlewares/validateToken";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.products, productModelSchema, "product");
router.use(authToken);

router.get("/", validateRequest(getProductsQuerySchema), getProducts);
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getProductById);

router.use(isAdmin);
router.post("/", validateRequest(createProductSchema), createProduct);
router.put("/:id", validateRequest(idParamSchema.merge(updateProductSchema)), resolveIdMiddleware, updateProduct);
router.patch("/:id", validateRequest(idParamSchema.merge(updateProductSchema)), resolveIdMiddleware, updateProduct);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, deleteProduct);

export default router;