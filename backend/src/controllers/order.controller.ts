import asyncHandler from "#middleware/asyncHandler.js";
import { OrderModel } from "#models/order.model.js";
import { CartItem } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { validateOrderBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const userId = req.user?.id;
      const isValid = validateOrderBody(body);

      if (!isValid) {
        return next(new ErrorHandler("Invalid fields", 400));
      }

      const { cart, shipping_address, payment_info, totalPrice } = body;

      const itemsByShop = cart.reduce(
        (acc: { [shop: string]: CartItem[] }, curr: CartItem) => {
          if (!acc[curr.shop]) {
            acc[curr.shop] = [];
          }
          acc[curr.shop].push(curr);
          return acc;
        },
        {}
      );

      const orders = [];

      for (let key in itemsByShop) {
        const items = itemsByShop[key];
        const order = await OrderModel.create({
          cart: items,
          shop: key,
          shipping_address,
          payment_info,
          user: userId,
          totalPrice,
        });
        orders.push(order);
      }

      return res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: orders,
      });
    } catch (error) {
      console.log("Error in handleCreateOrder :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export { handleCreateOrder };
