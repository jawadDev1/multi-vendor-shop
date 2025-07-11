import asyncHandler from "#middleware/asyncHandler.js";
import { OrderModel } from "#models/order.model.js";
import { ProductModel } from "#models/product.model.js";
import { CartItem } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { validateBody, validateOrderBody } from "#utils/index.js";
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

const handleGetUserOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const orders = await OrderModel.find({ user: userId })
        .sort({
          createdAt: -1,
        })
        .select(
          "-shop -user -paid_at -shipping_address -payment_info -delieverd_at "
        );

      return res.status(200).json({
        success: true,
        message: "user orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      console.log("Error in handleGetUserOrders :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetSellerOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { shop } = req.params;

      const orders = await OrderModel.find({ shop })
        .sort({
          createdAt: -1,
        })
        .select(
          "-shop -user -paid_at -shipping_address -payment_info -delieverd_at "
        );

      return res.status(200).json({
        success: true,
        message: "seller orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      console.log("Error in handleGetSellerOrders :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetOrderDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;

      const order = await OrderModel.findOne({ _id: orderId });

      if (!order) {
        return next(new ErrorHandler("Order not found", 404));
      }

      return res.status(200).json({
        success: true,
        message: "order detail fetched successfully",
        data: order,
      });
    } catch (error) {
      console.log("Error in handleGetOrderDetails :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const updateProduct = async (id: string, qty: number) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) return null;

    product.stock -= qty;
    product.sold_out += qty;

    product.save({ validateBeforeSave: false });
  } catch (error) {
    return null;
  }
};

const handleUpdateOrderStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const body = req.body;

      const isValid = validateBody(body);

      if (!isValid) {
        return next(new ErrorHandler("Invalid fields", 400));
      }

      const order = await OrderModel.findOne({ _id: orderId });

      if (!order) {
        return next(new ErrorHandler("Order not found", 404));
      }

      if (
        body.status === "Shipped" ||
        (order.status === "Processing" && body.status === "Delivered")
      ) {
        order.cart.forEach(async (item) => {
          await updateProduct(item.product, item.qty);
        });
      }

      if (body.status === "Delivered") {
        order.payment_info.status = "Succeeded";
        order.delieverd_at = new Date(Date.now());
      }

      order.status = body.status;

      await order.save();

      return res.status(200).json({
        success: true,
        message: "order status updated successfully",
        data: order,
      });
    } catch (error) {
      console.log("Error in handleUpdateOrderStatus :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export {
  handleCreateOrder,
  handleGetUserOrders,
  handleGetSellerOrders,
  handleGetOrderDetails,
  handleUpdateOrderStatus,
};
