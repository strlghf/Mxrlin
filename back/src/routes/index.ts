import { Router } from "express";
import usersRouter from "./users";
import productsRouter from "./products";

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/products", productsRouter);

export default router;