import { IOrder } from "#types/models.js";
import mongoose, { model, Schema } from "mongoose";

const orderModel = new Schema<IOrder>(
  {
    cart: [
      {
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        discount: {
          type: Number,
          required: true,
        },
        product: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        shop: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
    shipping_address: {
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      zip_code: {
        type: Number,
        required: true,
      },
    },

    payment_info: {
      id: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        default: "PENDING",
      },
      type: {
        type: String,
        enum: ["CREDIT_CARD", "CASH_ON_DELIVERY"],
        default: "CREDIT_CARD",
      },
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      index: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
    paid_at: {
      type: Date,
      default: Date.now(),
    },
    delieverd_at: { type: Date, default: Date.now() },
    funds_transfer: {
      status: {
        type: String,
        enum: ["SUCCESS", "PENDING", "FAILED"],
        default: "PENDING",
      },
      transfer_id: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const OrderModel = model<IOrder>("Order", orderModel);

export { OrderModel };
