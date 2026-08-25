import { Router } from "express";
import { getFavorites } from "../controllers/favorite.controller";

const router = Router();

router.get("/", getFavorites);