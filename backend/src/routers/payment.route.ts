import { handleProcessPayment } from "#controllers/payment.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/process", handleProcessPayment);

export default router;
