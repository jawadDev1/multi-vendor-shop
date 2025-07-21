import asyncHandler from "#middleware/asyncHandler.js";
import { ShopModel } from "#models/shop.model.js";

import { IShopBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { generateSlug, sanitizeMongoObject, validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

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
      data: sanitizeMongoObject(shop),
    });
  }
);

const handleGetShop = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const userId = new mongoose.Types.ObjectId(id);
    const pipeline = [
      {
        $match: {
          owner: userId,
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "shop",
          as: "orders",
        },
      },
      {
        $addFields: {
          totalOrders: { $size: "$orders" },
        },
      },
      {
        $project: {
          products: 0,
          orders: 0,
          owner: 0,
        },
      },
    ];

    const shop = await ShopModel.aggregate(pipeline);
    // const shop = await ShopModel.findOne({ owner: id }).select("-owner");

    if (shop.length == 0) return next(new ErrorHandler("shop not found", 404));

    return res.status(200).json({
      success: true,
      message: "shop fetched successfully",
      data: shop[0],
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
                rating: 1,
                totalReviews: 1,
                totalProducts: 1,
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

const handleGetShopStates = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;

      const pipeline = [
        {
          $match: {
            slug,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "shop",
            as: "products",
          },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "shop",
            as: "orders",
          },
        },
        {
          $addFields: {
            totalProducts: { $size: "$products" },
            totalOrders: { $size: "$orders" },
          },
        },
        {
          $project: {
            totalProducts: 1,
            totalOrders: 1,
            _id: 0,
          },
        },
      ];

      const shopStates = await ShopModel.aggregate(pipeline);

      return res.status(200).json({
        success: true,
        message: "state fetched successfully",
        data: shopStates,
      });
    } catch (error) {
      console.log("Error in handleGetShopStates :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleUpdateSellerSettings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const { shopId } = req.params;
      const isValid = validateBody(body);

      if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

      const { about, address, contact, shop_name, zip_code, logo } = body;

      const shop = await ShopModel.findByIdAndUpdate(
        shopId,
        { about, address, contact, shop_name, zip_code, logo },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "settings updated successfully",
        data: shop,
      });
    } catch (error) {
      console.log("Error in handleUpdateSellerSettings :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetShopReviews = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;

      const pipeline = [
        {
          $match: {
            slug,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "shop",
            as: "products",
            pipeline: [
              {
                $unwind: "$reviews",
              },
              {
                $lookup: {
                  from: "users",
                  localField: "reviews.user",
                  foreignField: "_id",
                  as: "user",
                },
              },
              {
                $unwind: {
                  path: "$user",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $group: {
                  _id: "$_id",
                  reviews: {
                    $push: {
                      name: "$user.name",
                      profile: "$user.profile",
                      rating: "$reviews.rating",
                      comment: "$reviews.comment",
                    },
                  },
                },
              },

              {
                $project: {
                  title: 1,
                  reviews: 1,
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$_id",
            totalReviews: { $push: "$products.reviews" },
          },
        },
        {
          $project: {
            totalReviews: 1,
            _id: 0,
          },
        },
      ];

      const reviews = await ShopModel.aggregate(pipeline);

      return res.status(200).json({
        success: true,
        message: "shop reviews fetched successfully",
        data: reviews[0]["totalReviews"][0],
      });
    } catch (error) {
      console.log("Error in handleGetShopReviews :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);


// Get Seller for the admin
const handleGetSellers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
   
      const sellers = await ShopModel.find({}).populate({path: "owner", select: "name email "}).select("shop_name logo slug owner totalProducts rating totalReviews");


      return res.status(200).json({
        success: true,
        message: "shops fetched successfully",
        data: sellers
      })
  } catch (error) {
    console.log("Error ln handleGetSellers ::  ", error);
    return next(new ErrorHandler("Something went wrong", 400));
  }
})

export {
  handleRegisterShop,
  handleGetShop,
  handleGetShopDetails,
  handleGetShopEvents,
  handleGetShopStates,
  handleUpdateSellerSettings,
  handleGetShopReviews,
  handleGetSellers
};
