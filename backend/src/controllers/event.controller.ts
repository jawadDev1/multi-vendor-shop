import asyncHandler from "#middleware/asyncHandler.js";
import { EventModel } from "#models/event.model.js";
import { ProductModel } from "#models/product.model.js";
import { IEventBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: IEventBody = req.body;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const product = await ProductModel.findOne({ _id: body.product });

    if (!product) return next(new ErrorHandler("Invalid product", 400));

    const event = await EventModel.create(body);

    return res.status(200).json({
      success: true,
      message: "event created successfully",
      data: event,
    });
  }
);

const handleUpdateEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: IEventBody = req.body;
    const eventId = req.params.id;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const product = await ProductModel.findOne({ _id: body.product });

    if (!product) return next(new ErrorHandler("Invalid product", 400));

    const event = await EventModel.findOneAndUpdate({ _id: eventId }, body);

    return res.status(200).json({
      success: true,
      message: "event updated successfully",
      data: event,
    });
  }
);

const handleDeleteEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    const event = await EventModel.findByIdAndDelete(eventId);

    return res.status(200).json({
      success: true,
      message: "event deleted successfully ",
      data: event,
    });
  }
);

const handleGetSellerEvents = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const pipeline = [
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.created_by": userId,
          },
        },
        {
          $addFields: {
            productTitle: "$productInfo.title",
            productImages: "$productInfo.images",
            productOriginalPrice: "$productInfo.originalPrice",
            productDiscount: "$productInfo.discount",
            productStock: "$productInfo.stock",
          },
        },
        {
          $project: {
            productInfo: 0,
            product: 0,
          },
        },
      ];

      const events = await EventModel.aggregate(pipeline);

      return res.status(200).json({
        success: true,
        message: "event fetched successfully",
        data: events,
      });
    } catch (error) {
      console.log("Error handleGetSellerEvents :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetSingleEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    const event = await EventModel.findById(eventId);

    if (!event) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    return res.status(200).json({
      success: true,
      message: "event fetched successfully",
      data: event,
    });
  }
);

const handleGetPopularEvent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const event = await EventModel.findOne({})
      .populate("product")
      .sort({ createdAt: -1 })
      .limit(1)
      .select("-_id");
      
    if (!event) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    return res.status(200).json({
      success: true,
      message: "event fetched successfully",
      data: event,
    });
  }
);

export {
  handleCreateEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleGetSellerEvents,
  handleGetSingleEvent,
  handleGetPopularEvent,
};
