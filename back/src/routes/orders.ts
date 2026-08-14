import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { orderModelSchema, createOrderSchema, updateOrderStatusSchema } from "../schemas/order.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getOrderById, createOrder, updateOrderStatus } from "../controllers/order.controller";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.orders, orderModelSchema, "order");

router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getOrderById);
router.post("/", validateRequest(createOrderSchema), createOrder);
router.patch("/:id/status", validateRequest(idParamSchema.merge(updateOrderStatusSchema)), resolveIdMiddleware, updateOrderStatus);

export default router;