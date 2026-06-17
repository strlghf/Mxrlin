import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { resolveUserById } from "../middlewares/resolveUserById";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/users";
import { createUserSchema, getUsersSchema, idParamSchema, updateUserSchema } from "../schemas/usersSchema";

const router = Router();

router.get("/", validateRequest(getUsersSchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveUserById, getUserById);
router.post("/", validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveUserById, updateUser);
router.patch("/:id", validateRequest(idParamSchema.merge(updateUserSchema)), resolveUserById, updateUser);
router.delete("/:id", validateRequest(idParamSchema), resolveUserById, deleteUser);

export default router;