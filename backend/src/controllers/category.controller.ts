import asyncHandler from "#middleware/asyncHandler.js";
import { CategoryModel } from "#models/category.model.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { Request, Response, NextFunction } from "express";

const handleGetCategoriesForForm = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const pipeline = [
      {
        $match: {},
      },
      {
        $addFields: {
          label: "$title",
          value: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
          label: 1,
          value: 1,
        },
      },
    ];

    const categories = await CategoryModel.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "categories get successfully",
      data: categories,
    });
  }
);

const handleGetCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await CategoryModel.find({}).select("title slug image").select("-_id");

      return res.status(200).json({
        success: true,
        message: "categories fetched successfully",
        data: categories,
      });

    } catch (error) {
      console.log("Error in handleGetCategories :: ", error)
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export { handleGetCategoriesForForm, handleGetCategories };
