import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
// import { isAdmin } from "../middlewares/role.middleware";
import { userModelSchema, getUsersQuerySchema, createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getUsers, getUserById, getUserOrders, createUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.users, userModelSchema, "targetUser");

router.use(authToken);
// router.use(isAdmin);

router.get("/", validateRequest(getUsersQuerySchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getUserById);
router.get("/:id/orders", validateRequest(idParamSchema), resolveIdMiddleware, getUserOrders);
router.post("/", validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, updateUser);
router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, updateUser);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, deleteUser);

export default router;