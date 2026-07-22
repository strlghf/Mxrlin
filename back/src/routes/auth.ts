import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { authToken } from "../middlewares/validateToken";
import { createUserSchema, userAuthSchema } from "../schemas/usersSchema";
import { loginUser, logoutUser, registerUser, showUser } from "../controllers/authController";

const router = Router();

router.post("/register", validateRequest(createUserSchema), registerUser);
router.post("/login", validateRequest(userAuthSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/me", authToken, showUser);

export default router;