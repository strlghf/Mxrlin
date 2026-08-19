import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { loginRateLimit } from "../middlewares/rateLimit";
import { authToken } from "../middlewares/validateToken";
import { createUserSchema, userLoginSchema } from "../schemas/user.schema";
import { loginUser, logoutUser, registerUser, showUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", loginRateLimit, validateRequest(createUserSchema), registerUser);
router.post("/login", loginRateLimit, validateRequest(userLoginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/me", authToken, showUser);

export default router;