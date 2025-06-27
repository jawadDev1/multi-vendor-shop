import asyncHandler from "#middleware/asyncHandler.js";
import { ProductModel } from "#models/product.model.js";
import { ShopModel } from "#models/shop.model.js";
import { IProductBody } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { generateSlug, validateBody } from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: IProductBody = req.body;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const shop = await ShopModel.findOne({ owner: req.user?.id });

    if (!shop) return next(new ErrorHandler("Invalid shop", 400));

    const product = await ProductModel.create({
      ...body,
      shop: shop?._id,
      slug: generateSlug(body.title),
      created_by: req.user?.id,
    });

    return res.status(200).json({
      success: true,
      message: "product created successfully",
      data: product,
    });
  }
);

const handleGetShopProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const products = await ProductModel.find({ created_by: id });

    return res.status(200).json({
      success: true,
      message: "product fetched successfully",
      data: products,
    });
  }
);

const handleUpdateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productSlug = req.params.slug;
    const body: IProductBody = req.body;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const userId = req.user?.id;

    const {
      category,
      description,
      images,
      originalPrice,
      stock,
      tags,
      title,
      discount,
    } = body;

    const product = await ProductModel.findOneAndUpdate(
      { created_by: userId, slug: productSlug },
      {
        category,
        description,
        images,
        originalPrice,
        stock,
        tags,
        title,
        discount,
      }
    );

    if (!product) {
      return next(new ErrorHandler("Invalid request", 403));
    }

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: product,
    });
  }
);

const handleDeleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const userId = req.user?.id;

    const product = await ProductModel.findOneAndDelete({
      _id: productId,
      created_by: userId,
    });

    if (!product) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: product,
    });
  }
);

const handleGetSingleProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const userId = req.user?.id;

    const product = await ProductModel.findOne({
      _id: productId,
      created_by: userId,
    });

    if (!product) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    return res.status(200).json({
      success: true,
      message: "product fetched successfully",
      data: product,
    });
  }
);

export {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetSingleProduct,
};
