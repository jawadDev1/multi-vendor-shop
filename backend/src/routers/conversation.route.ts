import {
  handleCreateConversation,
  handleGetSellerConversations,
} from "#controllers/converstaion.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/create", handleCreateConversation);

router.get("/seller-conversations/:sellerId", handleGetSellerConversations);

export default router;
