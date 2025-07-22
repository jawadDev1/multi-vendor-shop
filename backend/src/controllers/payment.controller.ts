import { Request, Response, NextFunction } from "express";
import asyncHandler from "#middleware/asyncHandler.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import Stripe from "stripe";
import {
  calculatePriceAfterDiscount,
  sanitizeUser,
  validateBody,
} from "#utils/index.js";
import { ShopModel } from "#models/shop.model.js";
import { OrderModel } from "#models/order.model.js";
import { CartItem } from "#types/controllers.js";
import {
  calculateAmountAfterPlatformFee,
  transferAmount,
} from "#utils/transferAmount.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const handleProcessPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (!amount) {
        return next(new ErrorHandler("Invalid amount value", 400));
      }

      const myPayment = await stripe.paymentIntents.create(
        {
          amount,
          currency: "usd",
          metadata: {
            company: "FaugetCommerce",
          },
        },
        { stripeAccount: "" }
      );

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

const handleCreateStripeAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const isValid = validateBody(body);
      if (!isValid) {
        return next(new ErrorHandler("Invalid fields", 400));
      }

      if (!req.user) {
        return next(new ErrorHandler("Unauthorized", 403));
      }

      const { email } = body;

      const account = await stripe.accounts.create({
        email,
        country: "US",
        default_currency: "USD",
      });

      await ShopModel.findOneAndUpdate(
        { owner: req.user.id },
        { stripe_payment: { status: "REQUESTED", account_id: account.id } }
      );
      console.log("Account id ===========> ", account.id);

      return res.status(200).json({
        success: true,
        message: "account established successfully",
        data: account.id,
      });
    } catch (error) {
      console.log("Error in handleCreateStripeAccount :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleStripeAccountLink = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { account }: { account: string } = req.body;

      if (!account) {
        return next(new ErrorHandler("Account is required", 400));
      }

      const APP_URL = process.env.APP_URL!;

      if (!APP_URL) throw new Error("APP_URL not coming correctly");

      const accountLink = await stripe.accountLinks.create({
        account,
        return_url: `${APP_URL}/seller/return/${account}`,
        refresh_url: `${APP_URL}/seller/refresh/${account}`,
        type: "account_onboarding",
      });

      return res.status(200).json({
        success: true,
        message: "Account link created successfully",
        data: accountLink,
      });
    } catch (error) {
      console.log("Error in  handleStripeAccountLink :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleActivateStripe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(new ErrorHandler("Unauthorized", 403));
      }

      const shop = await ShopModel.findOneAndUpdate(
        { owner: req.user.id },
        { "stripe_payment.status": "ACTIVATED" }
      );

      await req.user.save();

      return res.status(200).json({
        success: true,
        message: "Stripe connected successfully",
        data: { ...shop?.toObject(), _id: "" },
      });
    } catch (error) {
      console.log("Erro in handleStripeConnectSuccess :: ", error);
      return next(new ErrorHandler("Something went wrong", 400));
    }
  }
);

const handleStripeHook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
      } catch (err: any) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle different event types
      switch (event.type) {
        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          console.log("💰 Payment succeeded", paymentIntent.id);

          const orders = await OrderModel.find({
            "payment_info.id": paymentIntent.id,
          });

          // Transfer amount to sellers

          orders.forEach(async (order) => {
            const items: CartItem[] = order.cart;

            const amount = items.reduce((acc: number, curr: CartItem) => {
              const { price, discount, qty } = curr;
              acc += calculatePriceAfterDiscount(price, discount) * qty;
              return acc;
            }, 0);
            try {
              const shop = await ShopModel.findById(order.shop).select(
                "stripe_payment"
              );
              if (!shop) return;

              const transfer = await transferAmount({
                amount: calculateAmountAfterPlatformFee(amount),
                destination: shop.stripe_payment.account_id,
                orderId: order.id,
              });

              const payload: {
                status: "SUCCESS" | "PENDING" | "FAILED";
                transfer_id: string;
              } = transfer.success
                ? { status: "SUCCESS", transfer_id: transfer.transfer_id! }
                : { status: "FAILED", transfer_id: "" };

              order.funds_transfer = payload;

              await order.save();
            } catch (error) {
              console.log("transfer failed for order ==> ", order.id);

              order.funds_transfer = { status: "FAILED", transfer_id: "" };
              await order.save();
            }
          });

          break;
        }

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(200).send({ received: true });
    } catch (error) {
      console.log("Error in handleStripeHook :: ", error);
      return res.status(500).send({ received: true });
    }
  }
);

export {
  handleProcessPayment,
  handleCreateStripeAccount,
  handleStripeAccountLink,
  handleActivateStripe,
handleStripeHook
};
