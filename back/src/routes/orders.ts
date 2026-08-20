import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
import { isAdmin, isAuthorized } from "../middlewares/role.middleware";
import { orderModelSchema, createOrderSchema, updateOrderStatusSchema } from "../schemas/order.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getOrderById, createOrder, updateOrderStatus } from "../controllers/order.controller";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.orders, orderModelSchema, "order");
const isAllowed = isAuthorized(req => req.order.user_id);

router.use(authToken);

router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, isAllowed, getOrderById);

router.post("/", validateRequest(createOrderSchema), createOrder);

// webhook 👀!
router.patch("/:id/status", isAdmin, validateRequest(idParamSchema.merge(updateOrderStatusSchema)), resolveIdMiddleware, updateOrderStatus);

export default router;