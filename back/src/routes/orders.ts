import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
import { isAdmin, isAuthorized } from "../middlewares/role.middleware";
import { createOrderSchema, updateOrderStatusSchema, orderWithItemsSchema } from "../schemas/order.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getOrderById, createOrder, updateOrderStatus } from "../controllers/order.controller";

const router = Router();

const findOrder = {
  findUnique: (args) => prisma.orders.findUnique({
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