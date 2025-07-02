import {
  handleCreateEvent,
  handleDeleteEvent,
  handleGetPopularEvent,
  handleGetSellerEvents,
  handleGetSingleEvent,
  handleUpdateEvent,
} from "#controllers/event.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.get("/popular", handleGetPopularEvent);

router.use(isSeller);

router.post("/create-event", handleCreateEvent);

router.put("/update/:id", handleUpdateEvent);

router.delete("/event/:id", handleDeleteEvent);

router.get("/get-seller-events", handleGetSellerEvents);

router.get("/get-single/:id", handleGetSingleEvent);

export default router;
