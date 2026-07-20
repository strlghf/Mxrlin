import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createUserSchema, userAuthSchema } from "../schemas/usersSchema";
import { loginUser, registerUser } from "../controllers/authController";

const router = Router();

router.post("/register", validateRequest(createUserSchema), registerUser);
router.post("/login", validateRequest(userAuthSchema), loginUser);
// router.post("/logout");
// router.post("/me");

export default router;