import { Router } from "express";
import { prisma } from "../db/prisma";
import { resolveEntity } from "../middlewares/resolveEntity";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
import { isAdmin, isAuth } from "../middlewares/roleMiddleware";
import { userModelSchema, getUsersQuerySchema, idParamSchema, createUserSchema, updateUserSchema } from "../schemas/usersSchema";
import { getUsers, getUserById, getUserOrders, createUser, updateUser, deleteUser } from "../controllers/usersController";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.users, userModelSchema, "targetUser");

router.get("/", validateRequest(getUsersQuerySchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getUserById);
router.get("/:id/orders", validateRequest(idParamSchema), resolveIdMiddleware, getUserOrders);

router.use(authToken);
router.post("/", isAdmin, validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, isAuth, updateUser);
router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, isAuth, updateUser);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, isAuth, deleteUser);

export default router;