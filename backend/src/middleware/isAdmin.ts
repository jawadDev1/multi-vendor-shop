import { UserModel } from "#models/user.model.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { verifyToken } from "#utils/jwt.js";
import asyncHandler from "./asyncHandler.js";
import { Request, Response, NextFunction } from "express";

export const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Unauthorized", 403));

    const data = verifyToken(token);

    if (!data) return next(new ErrorHandler("Unauthorized", 403));

    const user = await UserModel.findOne({ email: data.email });
    if (!(user?.role === "ADMIN"))
      return next(new ErrorHandler("Unauthorized", 403));

    if (user) req.user = user;

    next();
  }
);
