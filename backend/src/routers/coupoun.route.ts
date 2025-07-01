import {
  handleCreateCoupoun,
  handleDeleteCoupoun,
  handleGetSellerCoupouns,
  handleGetSingleCoupoun,
  handleUpdateCoupoun,
} from "#controllers/coupoun.controller.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.use(isSeller);

router.post("/create-coupoun", handleCreateCoupoun);

router.put("/update/:id", handleUpdateCoupoun);

router.delete("/coupoun/:id", handleDeleteCoupoun);

router.get("/get-seller-coupouns", handleGetSellerCoupouns);

router.get("/get-single/:id", handleGetSingleCoupoun);

export default router;
