import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { createUserSchema, userAuthSchema } from "../schemas/usersSchema";

const router = Router();

router.post("/register", validateRequest(createUserSchema), registerUser);
router.post("/login", validateRequest(userAuthSchema), loginUser);
// router.post("/logout");
// router.post("/me");

export default router;