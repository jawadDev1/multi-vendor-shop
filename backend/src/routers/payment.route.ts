import { handleActivateStripe, handleCreateStripeAccount, handleProcessPayment, handleStripeAccountLink, handleStripeHook  } from "#controllers/payment.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();


router.post("/success", handleStripeHook);

router.use(isAuthenticated);

router.post("/process", handleProcessPayment);

router.use(isSeller);

router.post("/account", handleCreateStripeAccount)

router.post("/account_link", handleStripeAccountLink)

router.post("/activate", handleActivateStripe)


export default router;
