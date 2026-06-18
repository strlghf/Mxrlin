import { Router } from "express";
import usersRouter from "./users";
import productsRouter from "./products";
import ordersRouter from "./orders";

const router = Router();

router.use("/api/users", usersRouter);
router.use("/api/products", productsRouter);
router.use("/api/orders", ordersRouter);

export default router;