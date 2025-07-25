import {
  handleApproveShop,
  handleGetShop,
  handleGetShopDetails,
  handleGetShopEvents,
  handleGetShopRequests,
  handleGetShopReviews,
  handleGetShops,
  handleGetShopStates,
  handleRegisterShop,
  handleRejectShop,
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

router.get("/states", isSeller, handleGetShopStates);

// Admin Routes
router.use(isAdmin);

router.get("/get-all-shops", handleGetShops);

router.put("/approve-request", handleApproveShop);
router.put("/reject-request", handleRejectShop);

router.get("/requests", handleGetShopRequests);

export default router;
