import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { resolveEntity } from "../middlewares/resolveEntity.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { authToken } from "../middlewares/validateToken.js";
import { isAdmin, isAuthorized } from "../middlewares/role.middleware.js";
import { createOrderSchema, updateOrderStatusSchema, orderWithItemsSchema } from "../schemas/order.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";
import { getOrderById, createOrder, updateOrderStatus } from "../controllers/order.controller.js";

const router = Router();

const findOrder = {
  findUnique: (args: { where: { id: number } }) => prisma.orders.findUnique({
    ...args,
    include: { orders_items: { include: { products: true } } }
  })
}
const resolveId = resolveEntity(findOrder, orderWithItemsSchema, "order");
const isAllowed = isAuthorized(req => req.order.user_id);

router.use(authToken);

router.get("/:id", validateRequest(idParamSchema), resolveId, isAllowed, getOrderById);

router.post("/", validateRequest(createOrderSchema), createOrder);

// webhook 👀!
router.patch("/:id/status", isAdmin, validateRequest(idParamSchema.merge(updateOrderStatusSchema)), resolveId, updateOrderStatus);

export default router;