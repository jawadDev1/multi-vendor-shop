import { Request, Response, NextFunction } from "express";
import asyncHandler from "#middleware/asyncHandler.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import Stripe from "stripe";
import { sanitizeUser, validateBody } from "#utils/index.js";
import { ShopModel } from "#models/shop.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const handleProcessPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount } = req.body;

      if (!amount) {
        return next(new ErrorHandler("Invalid amount value", 400));
      }

      const myPayment = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: {
          company: "FaugetCommerce",
        },
      }, {stripeAccount: ""});


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

      if(!req.user) {
        return next(new ErrorHandler("Unauthorized", 403));
      }
      

      const { email  } = body;

      const account = await stripe.accounts.create({ email, country: "US", default_currency: "USD" });

      await ShopModel.findOneAndUpdate({owner: req.user.id}, {stripe_payment: {status: "REQUESTED", account_id: account.id}})
      console.log("Account id ===========> ", account.id)

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

      if (!APP_URL)  throw new Error("APP_URL not coming correctly");

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

const handleActivateStripe = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {

     if(!req.user) {
        return next(new ErrorHandler("Unauthorized", 403));
      }

    const shop =  await ShopModel.findOneAndUpdate({owner: req.user.id}, {"stripe_payment.status": "ACTIVATED"})




   await req.user.save();

   return res.status(200).json({
    success: true,
    message: "Stripe connected successfully",
    data: {...shop?.toObject(), _id: ""} 
   })
  } catch (error) {
    console.log("Erro in handleStripeConnectSuccess :: ", error);
    return next(new ErrorHandler("Something went wrong", 400))
  }
})

export { handleProcessPayment, handleCreateStripeAccount, handleStripeAccountLink, handleActivateStripe};