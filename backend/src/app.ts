import handleError from "#middleware/error.js";
import express from "express";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  categoryRouter,
  productRouter,
  shopRouter,
  userRouter,
} from "#routers/route.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_URL!,
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);


// Error handler
app.use(handleError);

export { app };
