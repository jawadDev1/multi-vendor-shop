import {
  handleGetShop,
  handleGetShopDetails,
  handleGetShopEvents,
  handleRegisterShop,
} from "#controllers/shop.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.get("/get-shop-details/:slug", handleGetShopDetails);
router.get("/events/:slug", handleGetShopEvents);

router.use(isAuthenticated);

router.post("/register", handleRegisterShop);

router.get("/get-shop", handleGetShop);

export default router;
