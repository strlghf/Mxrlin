import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveEntity } from "../middlewares/resolveEntity";
import { orderModelSchema, idParamSchema, createOrderSchema, updateOrderSchema } from "../schemas/ordersSchema";
import { getOrderById, createOrder } from "../controllers/ordersController";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.orders, orderModelSchema, "order");

router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getOrderById);
router.post("/", validateRequest(createOrderSchema), createOrder);
router.put("/:id", validateRequest(updateOrderSchema), );

export default router;