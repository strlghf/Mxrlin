import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveUserById } from "../middlewares/resolveUserById";
import { getUsersQuerySchema, idParamSchema, createUserSchema, updateUserSchema } from "../schemas/usersSchema";
import { getUsers, getUserById, createUser, deleteUser, updateUser } from "../controllers/users";

const router = Router();

router.get("/", validateRequest(getUsersQuerySchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveUserById, getUserById);
router.post("/", validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveUserById, updateUser);
router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveUserById, updateUser);
router.delete("/:id", validateRequest(idParamSchema), resolveUserById, deleteUser);

export default router;