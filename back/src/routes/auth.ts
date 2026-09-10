import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { loginRateLimit } from "../middlewares/rateLimit.js";
import { authToken } from "../middlewares/validateToken.js";
import { createUserSchema, userLoginSchema } from "../schemas/user.schema.js";
import { loginUser, logoutUser, registerUser, showUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", loginRateLimit, validateRequest(createUserSchema), registerUser);

router.post("/login", loginRateLimit, validateRequest(userLoginSchema), loginUser);

router.post("/logout", logoutUser);

router.get("/me", authToken, showUser);

export default router;