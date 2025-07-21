import { handleActivateStripe, handleCreateStripeAccount, handleProcessPayment, handleStripeAccountLink  } from "#controllers/payment.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.post("/process", handleProcessPayment);

router.use(isSeller);

router.post("/account", handleCreateStripeAccount)

router.post("/account_link", handleStripeAccountLink)

router.post("/activate", handleActivateStripe)

export default router;
