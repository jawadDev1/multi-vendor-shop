
import { handleCreateOrder } from "#controllers/order.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/create", handleCreateOrder);


export default router;
