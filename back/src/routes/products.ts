import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
import { isAdmin } from "../middlewares/role.middleware";
import { productModelSchema, getProductsQuerySchema, createProductSchema, updateProductSchema } from "../schemas/product.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";

const router = Router();

const resolveId = resolveEntity(prisma.products, productModelSchema, "product");

router.use(authToken);

router.get("/", validateRequest(getProductsQuerySchema), getProducts);

router.get("/:id", validateRequest(idParamSchema), resolveId, getProductById);

router.post("/", isAdmin, validateRequest(createProductSchema), createProduct);

router.put("/:id", isAdmin, validateRequest(idParamSchema.merge(updateProductSchema)), resolveId, updateProduct);

router.patch("/:id", isAdmin, validateRequest(idParamSchema.merge(updateProductSchema)), resolveId, updateProduct);

router.delete("/:id", isAdmin, validateRequest(idParamSchema), resolveId, deleteProduct);

export default router;