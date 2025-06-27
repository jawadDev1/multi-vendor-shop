import asyncHandler from "#middleware/asyncHandler.js";
import { ShopModel } from "#models/shop.model.js";
import { UserModel } from "#models/user.meodel.js";

import { IShopBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleRegisterShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: IShopBody = req.body;

    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("all fields are required", 400));

    if (!req.user)
      return next(new ErrorHandler("Login to access this feature", 400));

    const shop = await ShopModel.create({ ...body, owner: req.user?.id });

    req.user.updateOne({ role: "SELLER" });

    return res.status(201).json({
      success: true,
      message: "Shop registered successfully",
      data: shop,
    });
  }
);

const handleGetShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const shop = await ShopModel.findOne({ owner: id });

    if (!shop) return next(new ErrorHandler("shop not found", 404));

    return res.status(200).json({
      success: true,
      message: "shop get successfully",
      data: shop,
    });
  }
);

export { handleRegisterShop, handleGetShop };
