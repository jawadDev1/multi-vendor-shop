import asyncHandler from "#middleware/asyncHandler.js";
import { ShopModel } from "#models/shop.model.js";

import { IShopBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { generateSlug, validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleRegisterShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: IShopBody = req.body;

    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("all fields are required", 400));

    if (!req.user)
      return next(new ErrorHandler("Login to access this feature", 400));

    const shop = await ShopModel.create({
      ...body,
      slug: generateSlug(body?.shop_name),
      owner: req.user?._id,
    });

    req.user.role = "SELLER";

    await req.user.save();

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

    const shop = await ShopModel.findOne({ owner: id }).select("-owner");

    if (!shop) return next(new ErrorHandler("shop not found", 404));

    return res.status(200).json({
      success: true,
      message: "shop get successfully",
      data: shop,
    });
  }
);

const handleGetShopDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;

    const pipeline = [
      {
        $match: { slug },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "shop",
          as: "products",
          pipeline: [
            {
              $lookup: {
                from: "shops",
                localField: "shop",
                foreignField: "_id",
                as: "shop",
                pipeline: [
                  {
                    $project: {
                      shop_name: 1,
                      slug: 1,
                    },
                  },
                ],
              },
            },
            {
              $addFields: {
                shop: { $arrayElemAt: ["$shop", 0] },
              },
            },
            {
              $project: {
                _id: 0,
                title: 1,
                slug: 1,
                originalPrice: 1,
                discount: 1,
                images: 1,
                shop: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ];

    // Events Pipeline
    const eventsPipeline = [
      { $match: { slug } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "shop",
          as: "products",
        },
      },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "events",
          localField: "products._id",
          foreignField: "product",
          as: "event",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $addFields: {
                product: { $arrayElemAt: ["$product", 0] },
              },
            },
          ],
        },
      },
      { $unwind: "$event" },
      {
        $replaceRoot: { newRoot: "$event" },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          updatedAt: 0,
        },
      },
    ];

    const data = await ShopModel.aggregate([
      { $facet: { shop: pipeline, events: eventsPipeline } },
    ]);

    if (!data || data.length == 0)
      return next(new ErrorHandler("shop not found", 404));

    return res.status(200).json({
      success: true,
      message: "shop get successfully",
      data: { shop: data[0]["shop"][0], events: data[0]["events"] },
    });
  }
);

const handleGetShopEvents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;

    const pipeline = [
      { $match: { slug } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "shop",
          as: "products",
        },
      },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "events",
          localField: "products._id",
          foreignField: "product",
          as: "event",
          pipeline: [
            {
              $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $addFields: {
                product: { $arrayElemAt: ["$product", 0] },
              },
            },
          ],
        },
      },
      { $unwind: "$event" },
      {
        $replaceRoot: { newRoot: "$event" },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          updatedAt: 0,
        },
      },
    ];

    const shop = await ShopModel.aggregate(pipeline);

    if (!shop) return next(new ErrorHandler("shop not found", 404));

    return res.status(200).json({
      success: true,
      message: "shop events get successfully",
      data: shop,
    });
  }
);

export {
  handleRegisterShop,
  handleGetShop,
  handleGetShopDetails,
  handleGetShopEvents,
};
