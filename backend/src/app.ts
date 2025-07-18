import handleError from "#middleware/error.js";
import express from "express";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  categoryRouter,
  conversationRouter,
  coupounRouter,
  eventRouter,
  messageRouter,
  orderRouter,
  paymentRouter,
  productRouter,
  shopRouter,
  userRouter,
} from "#routers/route.js";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_URL!,
    credentials: true,
  })
);

// // Prevent from mongo injection
// app.use(
//   mongoSanitize({
//     replaceWith: "_",
//   })
// );

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/coupoun", coupounRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/conversation", conversationRouter);
app.use("/api/v1/message", messageRouter);

// Error handler
app.use(handleError);

export { app };
