import asyncHandler from "#middleware/asyncHandler.js";
import { CategoryModel } from "#models/category.model.js";
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

export { handleGetCategoriesForForm };
