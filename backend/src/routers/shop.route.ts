import {
  handleGetShop,
  handleGetShopDetails,
  handleGetShopEvents,
  handleGetShopReviews,
  handleGetShopStates,
  handleRegisterShop,
  handleUpdateSellerSettings,
} from "#controllers/shop.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.get("/get-shop-details/:slug", handleGetShopDetails);

router.get("/reviews/:slug", handleGetShopReviews);

router.get("/events/:slug", handleGetShopEvents);

router.get("/states/:slug", handleGetShopStates);

router.put("/update-settings/:shopId", isSeller, handleUpdateSellerSettings);

router.use(isAuthenticated);

router.post("/register", handleRegisterShop);

router.get("/get-shop", handleGetShop);

export default router;
