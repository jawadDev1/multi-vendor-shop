import { handleStripeHook } from "#controllers/payment.controller.js";
import { Router } from "express";
import express from 'express';

const router = Router();

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  handleStripeHook
);

export default router;
