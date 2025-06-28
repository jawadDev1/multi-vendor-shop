import {
  handleCreateEvent,
  handleDeleteEvent,
  handleGetSellerEvents,
  handleGetSingleEvent,
  handleUpdateEvent,
} from "#controllers/event.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/create-event", handleCreateEvent);

router.put("/update/:id", handleUpdateEvent);

router.delete("/event/:id", handleDeleteEvent);

router.get("/get-seller-events", handleGetSellerEvents);

router.get("/get-single/:id", handleGetSingleEvent);

export default router;
