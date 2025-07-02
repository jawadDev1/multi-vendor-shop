import asyncHandler from "#middleware/asyncHandler.js";
import { ProductModel } from "#models/product.model.js";
import { ShopModel } from "#models/shop.model.js";
import { IProductBody, IPopulatedProduct } from "#types/controllers.js";
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
      return next(new ErrorHandler("Product not found", 403));
    }

    return res.status(200).json({
      success: true,
      message: "product fetched successfully",
      data: product,
    });
  }
);

const handleGetBestDealProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await ProductModel.find({})
      .populate([
        { path: "category", select: "-_id title slug description image" },
      ])
      .select(
        "title originalPrice images category slug discount sold_out stock description"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    if (products.length === 0) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      data: products,
    });
  }
);

const handleGetFeaturedProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await ProductModel.find({})
      .populate([
        { path: "category", select: "-_id title slug description image" },
      ])
      .select(
        "title originalPrice images category slug discount sold_out stock description"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    if (products.length === 0) {
      return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      data: products,
    });
  }
);

const handleGetProductsForForm = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const pipeline = [
      {
        $match: {
          created_by: userId,
        },
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

    const products = await ProductModel.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "products get successfully",
      data: products,
    });
  }
);

const handleGetProductDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;

      const product = await ProductModel.findOne({ slug })
        .populate([
          { path: "category", select: "_id title slug description image" },
          {
            path: "shop",
            select: "-_id shop_name logo about createdAt slug description",
          },
        ])
        .select(
          "title originalPrice images category slug discount sold_out stock description "
        )
        .lean<IPopulatedProduct>();

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const relatedProducts = await ProductModel.find({
        category: product?.category?._id,
        slug: { $ne: product.slug },
      })
        .sort({ createdAt: -1 })
        .limit(5);

      return res.status(200).json({
        success: true,
        message: "product fetched successfully",
        data: { product, relatedProducts },
      });
    } catch (error) {
      console.log("Error in handleGetProductDetails :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetBestSellingProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await ProductModel.find({})
      .populate([
        { path: "category", select: "-_id title slug description image" },
      ])
      .select(
        "title originalPrice images category slug discount sold_out stock description"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "best selling products fetched successfully",
      data: products,
    });
  }
);

const handleGetProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.query;
    const query = category ? { category } : {};

    const products = await ProductModel.find(query)
      .populate([
        { path: "category", select: "-_id title slug description image" },
      ])
      .select(
        "title originalPrice images category slug discount sold_out stock description"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      data: products,
    });
  }
);

export {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetSingleProduct,
  handleGetProductsForForm,
  handleGetBestDealProducts,
  handleGetFeaturedProducts,
  handleGetBestSellingProducts,
  handleGetProductDetails,
  handleGetProducts,
};
