import { Router } from "express";
import { getUserById, getUsers } from "../controllers/users";
import { validateRequest } from "../middlewares/validateRequest";
import { getUsersSchema, idParamSchema } from "../schemas/usersSchema";
import { resolveUserById } from "../middlewares/resolveUserById";

const router = Router();

router.get("/", validateRequest(getUsersSchema), getUsers);
router.get("/:id", validateRequest(idParamSchema), resolveUserById, getUserById);

export default router;