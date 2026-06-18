import { Router } from "express";
import { prisma } from "../db/prisma";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveEntity } from "../middlewares/resolveEntity";
import { getUsersQuerySchema, idParamSchema, createUserSchema, updateUserSchema, userModelSchema } from "../schemas/usersSchema";
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/users";

const router = Router();

const resolveIdMiddleware = resolveEntity(prisma.users, userModelSchema, "user");

router.get("/", validateRequest(getUsersQuerySchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveIdMiddleware, getUserById);
router.post("/", validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, updateUser);
router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveIdMiddleware, updateUser);
router.delete("/:id", validateRequest(idParamSchema), resolveIdMiddleware, deleteUser);

export default router;