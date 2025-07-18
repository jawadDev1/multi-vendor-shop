import {
  handleCreateMessage,
  handleGetMessages,
} from "#controllers/message.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/create", handleCreateMessage);

router.get("/get-messages/:id", handleGetMessages);

export default router;
