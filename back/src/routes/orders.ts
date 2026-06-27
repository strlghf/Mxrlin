import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveEntity } from "../middlewares/resolveEntity";
import { orderModelSchema, idParamSchema, createOrderSchema, updateOrderStatusSchema } from "../schemas/ordersSchema";
import { getOrderById, createOrder, updateOrderStatus } from "../controllers/ordersController";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.orders, orderModelSchema, "order");

router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getOrderById);
router.post("/", validateRequest(createOrderSchema), createOrder);
router.patch("/:id/status", validateRequest(updateOrderStatusSchema), resolveIdMiddleware, updateOrderStatus);

export default router;