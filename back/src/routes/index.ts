import { Router } from "express";
import usersRouter from "./users";

const router = Router();

router.use("/api/users", usersRouter);

export default router;