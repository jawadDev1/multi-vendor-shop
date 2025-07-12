import { handleCreateMessage } from "#controllers/message.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/create", handleCreateMessage);

export default router;
