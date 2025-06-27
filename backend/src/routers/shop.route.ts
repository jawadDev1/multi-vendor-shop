import {
  handleGetShop,
  handleRegisterShop,
} from "#controllers/shop.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/register", handleRegisterShop);

router.get("/get-shop", handleGetShop);

export default router;
