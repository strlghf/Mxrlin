import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { createOrder, getOrderById } from "../controllers/ordersController";
import { orderModelSchema, idParamSchema, createOrderSchema } from "../schemas/ordersSchema";
import { resolveEntity } from "../middlewares/resolveEntity";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.orders, orderModelSchema, "order")

router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getOrderById);
router.post("/", validateRequest(createOrderSchema), createOrder);

export default router;