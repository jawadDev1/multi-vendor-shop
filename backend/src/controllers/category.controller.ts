import asyncHandler from "#middleware/asyncHandler.js";
import { CategoryModel } from "#models/category.model.js";
import { ProductModel } from "#models/product.model.js";
import { ICategoryBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import {
  generateRandomString,
  generateSlug,
  validateBody,
} from "#utils/index.js";
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
      const categories = await CategoryModel.find({})
        .select("title slug image")
        .select("-_id");

      return res.status(200).json({
        success: true,
        message: "categories fetched successfully",
        data: categories,
      });
    } catch (error) {
      console.log("Error in handleGetCategories :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetCategoryForAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pipeline = [
        {
          $match: {},
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "products",
          },
        },
        {
          $addFields: {
            totalProducts: { $size: "$products" },
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            image: 1,
            totalProducts: 1,
            createdAt: 1,
          },
        },
      ];

      const categories = await CategoryModel.aggregate(pipeline);

      return res.status(200).json({
        success: true,
        message: "category fetched successfully",
        data: categories,
      });
    } catch (error) {
      console.log("Error in handleGetCategoryForAdmin :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleCreateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: ICategoryBody = req.body;

      const isValid = validateBody(body);

      if (!isValid) return next(new ErrorHandler("Invalid Fields", 400));
      let slug = generateSlug(body.title);
      const categoryExists = await CategoryModel.exists({ slug });

      if (categoryExists) {
        slug = `${slug}-${generateRandomString()}`;
      }
      const category = await CategoryModel.create({ ...body, slug });

      return res.status(200).json({
        success: true,
        message: "category created successfully",
        data: category,
      });
    } catch (error) {
      console.log("Error in handleCreateCategory :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleUpdateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body: ICategoryBody = req.body;

      const isValid = validateBody(body);

      if (!isValid) return next(new ErrorHandler("Invalid Fields", 400));

      const category = await CategoryModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "category updated successfully",
        data: category,
      });
    } catch (error) {
      console.log("Error in handleUpdateCategory :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleDeleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await CategoryModel.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "category deleted successfully",
      });
    } catch (error) {
      console.log("Error in handleDeleteCategory :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetCategoryDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findById(id);

      return res.status(200).json({
        success: true,
        message: "category fetched successfully",
        data: category,
      });
    } catch (error) {
      console.log("Error in handleGetCategoryDetails :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

export {
  handleGetCategoriesForForm,
  handleGetCategories,
  handleCreateCategory,
  handleDeleteCategory,
  handleGetCategoryForAdmin,
  handleUpdateCategory,
  handleGetCategoryDetails,
};
