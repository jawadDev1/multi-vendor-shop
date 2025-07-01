import asyncHandler from "#middleware/asyncHandler.js";
import { CoupounModel } from "#models/coupoun.model.js";

import { ProductModel } from "#models/product.model.js";
import { ICoupounBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateCoupoun = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: ICoupounBody = req.body;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const coupoun = await CoupounModel.create({
      ...body,
      created_by: req.user?.id,
    });

    return res.status(200).json({
      success: true,
      message: "coupoun created successfully",
      data: coupoun,
    });
  }
);

const handleUpdateCoupoun = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: ICoupounBody = req.body;
    const coupounId = req.params.id;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const coupoun = await CoupounModel.findOneAndUpdate(
      { _id: coupounId },
      { ...body, created_by: req.user?.id }
    );

    return res.status(200).json({
      success: true,
      message: "coupoun updated successfully",
      data: coupoun,
    });
  }
);

const handleDeleteCoupoun = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupounId = req.params.id;

    const coupoun = await CoupounModel.findByIdAndDelete(coupounId);

    return res.status(200).json({
      success: true,
      message: "coupoun deleted successfully ",
      data: coupoun,
    });
  }
);

const handleGetSellerCoupouns = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const coupouns = await CoupounModel.find({ created_by: userId });

      return res.status(200).json({
        success: true,
        message: "coupouns fetched successfully",
        data: coupouns,
      });
    } catch (error) {
      console.log("Error handleGetSellerCoupouns :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetSingleCoupoun = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const coupounId = req.params.id;

    const coupoun = await CoupounModel.findById(coupounId);

    if (!coupoun) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    return res.status(200).json({
      success: true,
      message: "coupoun fetched successfully",
      data: coupoun,
    });
  }
);

export {
  handleCreateCoupoun,
  handleDeleteCoupoun,
  handleGetSellerCoupouns,
  handleGetSingleCoupoun,
  handleUpdateCoupoun,
};
