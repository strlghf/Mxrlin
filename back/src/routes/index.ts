import { Router } from "express";
import authRouter from "./auth.js";
import usersRouter from "./users.js";
import productsRouter from "./products.js";
import ordersRouter from "./orders.js";
import favoritesRouter from "./favorites.js";

const router = Router();

router.use("/api/auth", authRouter);

router.use("/api/users", usersRouter);

router.use("/api/products", productsRouter);

router.use("/api/orders", ordersRouter);

router.use("/api/favorites", favoritesRouter);

export default router;