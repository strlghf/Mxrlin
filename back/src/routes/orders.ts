import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveEntity } from "../middlewares/resolveEntity";
import { orderModelSchema, idParamSchema, createOrderSchema, updateOrderSchema } from "../schemas/ordersSchema";
import { getOrderById, createOrder, deleteOrder } from "../controllers/ordersController";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.orders, orderModelSchema, "order");

router.get("/", );
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getOrderById);
router.post("/", validateRequest(createOrderSchema), createOrder);
router.put("/:id", validateRequest(idParamSchema.merge(updateOrderSchema)), resolveIdMiddleware);
router.patch("/:id", validateRequest(idParamSchema.merge(updateOrderSchema)), resolveIdMiddleware);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, deleteOrder);

export default router;