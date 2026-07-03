import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveEntity } from "../middlewares/resolveEntity";
import { userModelSchema, getUsersQuerySchema, idParamSchema, createUserSchema, updateUserSchema } from "../schemas/usersSchema";
import { getUsers, getUserById, getUserOrders, createUser, updateUser, deleteUser } from "../controllers/usersController";
import { isAdmin } from "../middlewares/roleMiddleware";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.users, userModelSchema, "user");

router.get("/", validateRequest(getUsersQuerySchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getUserById);
router.get("/:id/orders", validateRequest(idParamSchema), resolveIdMiddleware, getUserOrders);

router.use(isAdmin);
router.post("/", validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, updateUser);
router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, updateUser);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, deleteUser);

export default router;