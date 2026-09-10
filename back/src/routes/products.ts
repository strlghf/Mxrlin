import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { resolveEntity } from "../middlewares/resolveEntity.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { productModelSchema, getProductsQuerySchema, createProductSchema, updateProductSchema } from "../schemas/product.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

const resolveId = resolveEntity(prisma.products, productModelSchema, "product");

router.get("/", validateRequest(getProductsQuerySchema), getProducts);

router.get("/:id", validateRequest(idParamSchema), resolveId, getProductById);

router.post("/", isAdmin, validateRequest(createProductSchema), createProduct);

router.put("/:id", isAdmin, validateRequest(idParamSchema.merge(updateProductSchema)), resolveId, updateProduct);

router.patch("/:id", isAdmin, validateRequest(idParamSchema.merge(updateProductSchema)), resolveId, updateProduct);

router.delete("/:id", isAdmin, validateRequest(idParamSchema), resolveId, deleteProduct);

export default router;