import {
  handleGetShop,
  handleGetShopDetails,
  handleGetShopEvents,
  handleGetShopReviews,
  handleGetShops,
  handleGetShopStates,
  handleRegisterShop,
  handleUpdateSellerSettings,
} from "#controllers/shop.controller.js";
import { isAdmin } from "#middleware/isAdmin.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.get("/get-shop-details/:slug", handleGetShopDetails);

router.get("/reviews/:slug", handleGetShopReviews);

router.get("/events/:slug", handleGetShopEvents);

router.get("/states/:slug", handleGetShopStates);

router.put("/update-settings/:shopId", isSeller, handleUpdateSellerSettings);

router.post("/register", isAuthenticated, handleRegisterShop);

router.get("/get-shop", isAuthenticated, handleGetShop);

// Admin Routes
router.get("/get-all-shops", isAdmin, handleGetShops);

export default router;
