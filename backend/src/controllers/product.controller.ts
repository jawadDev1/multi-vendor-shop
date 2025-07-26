import asyncHandler from "#middleware/asyncHandler.js";
import { ProductModel } from "#models/product.model.js";
import { ShopModel } from "#models/shop.model.js";
import { IProductBody, IPopulatedProduct } from "#types/controllers.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import {
  generateRandomString,
  generateSlug,
  getNumberParam,
  getStringParam,
  validateBody,
} from "#utils/index.js";
import { Request, Response, NextFunction } from "express";

const handleCreateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body: IProductBody = req.body;
    const isValid = validateBody(body);

    if (!isValid) return next(new ErrorHandler("Invalid fields", 400));

    const shop = await ShopModel.findOne({ owner: req.user?.id });

    if (!shop) return next(new ErrorHandler("Invalid shop", 400));

    let slug = generateSlug(body.title);
    const productExists = await ProductModel.findOne({ slug });

    if (productExists) {
      slug = `${slug}-${generateRandomString()}`;
    }

    const product = await ProductModel.create({
      ...body,
      shop: shop?._id,
      slug: generateSlug(body.title),
      created_by: req.user?.id,
    });

    shop.totalProducts += 1;
    await shop.save();

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

    const products = await ProductModel.find({ created_by: id }).select(
      "_id title images originalPrice description discount stock sold_out rating"
    );

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

    await ShopModel.findByIdAndUpdate(product.shop, {
      $inc: { totalProducts: -1 },
    });

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
        {
          path: "shop",
          select: " _id shop_name logo about createdAt slug description",
        },
      ])
      .select(
        "title originalPrice images category rating reviews slug discount sold_out stock description"
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
        {
          path: "shop",
          select: "_id shop_name logo about createdAt slug description",
        },
      ])
      .select(
        "title originalPrice images category rating reviews slug discount sold_out stock description"
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
            select:
              "_id shop_name logo about totalProducts totalReviews rating createdAt slug description",
          },
          {
            path: "reviews.user",
            select: "name email profile -_id",
          },
        ])
        .select(
          "title originalPrice images category rating created_by reviews slug discount sold_out stock description "
        )
        .lean<IPopulatedProduct>();

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const relatedProducts = await ProductModel.find({
        category: product?.category?._id,
        slug: { $ne: product.slug },
      })
        .populate([
          {
            path: "shop",
            select: "_id shop_name logo about createdAt slug description",
          },
        ])
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
        {
          path: "shop",
          select: " _id shop_name logo about createdAt slug description",
        },
      ])
      .select(
        "title originalPrice images rating reviews category slug discount sold_out stock description"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "best selling products fetched successfully",
      data: products,
    });
  }
);

// For main Products page
const handleGetProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.query;
    const query = category ? { category } : {};

    const products = await ProductModel.find(query)
      .populate([
        {
          path: "shop",
          select: "_id shop_name logo about createdAt slug description",
        },
      ])
      .select(
        "title originalPrice images category rating reviews slug discount sold_out stock description"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      data: products,
    });
  }
);

const handleAddProductReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const body = req.body;
      const isValid = validateBody(body);

      if (!productId || !isValid)
        return next(new ErrorHandler("Invalid fields", 400));

      const product = await ProductModel.findById(productId);

      if (!product) return next(new ErrorHandler("Product not found", 404));

      const alreadyReviewed = product.reviews.find(
        (rev) => rev.user == req.user?.id
      );

      if (alreadyReviewed)
        return next(new ErrorHandler("Already reviewed the product", 400));

      product.reviews.push({
        rating: body?.rating,
        comment: body?.comment,
        user: req.user?.id,
      });

      const average = Math.floor(
        product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
          product.reviews.length
      );

      product.rating = average;

      await product.save();

      const products = await ProductModel.find({ shop: product.shop });
      const shop = await ShopModel.findById(product.shop);

      let totalReviews = 0;
      let rating = 0;
      for (let product of products) {
        totalReviews += product.reviews.length;
        rating += product.reviews.reduce((acc, curr) => acc + curr.rating, 0);
      }

      rating = rating / totalReviews;
      shop!.totalReviews = totalReviews;
      shop!.rating = rating;

      await shop?.save();

      return res.status(201).json({
        success: true,
        message: "Product reviewd successfully",
        data: product,
      });
    } catch (error) {
      console.log("Error in handleAddProductReview :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
  }
);

const handleGetFilterProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, min_price, max_price, search } = req.query;

      if (Array.isArray(category) || Array.isArray(search)) {
        return next(new ErrorHandler("Invalid filters", 400));
      }

      const filter: Record<string, any> = {};

      const parsedCategory = getStringParam(category);
      const parsedSearch = getStringParam(search);
      const parsedMinPrice = getNumberParam(min_price);
      const parsedMaxPrice = getNumberParam(max_price);

      if (parsedCategory) {
        filter.category = parsedCategory;
      }

      if (parsedSearch) {
        filter.$or = [
          { title: { $regex: parsedSearch, $options: "i" } },
        ];
      }

      
      if (parsedMinPrice !== undefined || parsedMaxPrice !== undefined) {
        filter.originalPrice = {};
        if (parsedMinPrice !== undefined) filter.originalPrice.$gte = parsedMinPrice;
        if (parsedMaxPrice !== undefined) filter.originalPrice.$lte = parsedMaxPrice;
      }

      const products = await ProductModel.find(filter).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      console.log("Error in handleGetFilterProducts :: ", error);
      return next(new ErrorHandler("Something went wrong", 500));
    }
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
  handleAddProductReview,
  handleGetFilterProducts,
};
