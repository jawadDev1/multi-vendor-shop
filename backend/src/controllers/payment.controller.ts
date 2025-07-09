import { Request, Response, NextFunction } from "express";
import asyncHandler from "#middleware/asyncHandler.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const handleProcessPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (!amount) {
        return next(new ErrorHandler("Invalid amount value", 400));
      };

      const myPayment = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          company: "FaugetCommerce",
        },
      });

      return res.status(200).json({
        success: true,
        message: "success",
        data: { client_secret: myPayment.client_secret },
      });
    } catch (error) {
      console.log("Error in processPayment :: ", error);
      next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export { handleProcessPayment };
