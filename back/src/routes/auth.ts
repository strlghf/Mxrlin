import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout");
router.post("/me");

export default router;