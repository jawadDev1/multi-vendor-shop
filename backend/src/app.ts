import handleError from "#middleware/error.js";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { shopRouter, userRouter } from "#routers/route.js";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_URL!,
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRouter);

app.use(handleError);

export { app };
