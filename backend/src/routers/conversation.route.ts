import {
  handleCreateConversation,
  handleGetSellerConversations,
  handleGetUserConversations,
} from "#controllers/converstaion.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/create", handleCreateConversation);

router.get("/seller-conversations", handleGetSellerConversations);

router.get("/user-conversations", handleGetUserConversations);

export default router;
