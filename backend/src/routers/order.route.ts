import {
  handleCreateOrder,
  handleGetOrderDetails,
  handleGetSellerOrders,
  handleGetUserOrders,
  handleUpdateOrderStatus,
} from "#controllers/order.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.put("/update-status/:orderId", isSeller, handleUpdateOrderStatus);

router.use(isAuthenticated);

router.post("/create", handleCreateOrder);

router.get("/get-user-orders", handleGetUserOrders);

router.get("/get-seller-orders/:shop", handleGetSellerOrders);

router.get("/order-details/:orderId", handleGetOrderDetails);

export default router;
