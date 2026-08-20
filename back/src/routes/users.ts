import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
import { isAdmin, isAuthorized } from "../middlewares/role.middleware";
import { userModelSchema, getUsersQuerySchema, createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { idParamSchema } from "../schemas/common.schema";
import { getUsers, getUserById, getUserOrders, createUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

const resolveId = resolveEntity(prisma.users, userModelSchema, "targetUser");
const isAllowed = isAuthorized(req => req.targetUser.id);

router.use(authToken);

router.get("/", isAdmin, validateRequest(getUsersQuerySchema), getUsers);

router.get("/:id", validateRequest(idParamSchema), resolveId, isAllowed, getUserById);

router.get("/:id/orders", validateRequest(idParamSchema), resolveId, isAllowed, getUserOrders);

router.post("/", isAdmin, validateRequest(createUserSchema), createUser);

router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveId, isAllowed, updateUser);

router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveId, isAllowed, updateUser);

router.delete("/:id", validateRequest(idParamSchema), resolveId, isAllowed, deleteUser);

export default router;