import { Router } from "express";

const router = Router();

router.use("/api", usersRouter);

export default router;