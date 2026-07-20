import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createUserSchema, userAuthSchema } from "../schemas/usersSchema";
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { authToken } from "../middlewares/validateToken";

const router = Router();

router.post("/register", validateRequest(createUserSchema), registerUser);
router.post("/login", validateRequest(userAuthSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/me", authToken, showUser);

export default router;