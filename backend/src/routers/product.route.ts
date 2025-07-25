import {
  handleAddProductReview,
  handleCreateProduct,
  handleDeleteProduct,
  handleGetBestDealProducts,
  handleGetBestSellingProducts,
  handleGetFeaturedProducts,
  handleGetFilterProducts,
  handleGetProductDetails,
  handleGetProducts,
  handleGetProductsForForm,
  handleGetShopProducts,
  handleGetSingleProduct,
  handleUpdateProduct,
} from "#controllers/product.controller.js";

import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.get("/best-deals", handleGetBestDealProducts);

router.get("/all-products", handleGetProducts);

router.get("/best-selling", handleGetBestSellingProducts);

router.get("/featured", handleGetFeaturedProducts);

router.get("/get-products", handleGetFilterProducts);

router.get("/product-details/:slug", handleGetProductDetails);

router.put("/add-review/:productId", isAuthenticated, handleAddProductReview);

router.use(isSeller);

router.post("/create-product", handleCreateProduct);

router.get("/get-shop-products", handleGetShopProducts);

router.get("/get-single/:id", handleGetSingleProduct);

router.get("/get-form-products", handleGetProductsForForm);

router.put("/update/:slug", handleUpdateProduct);

router.delete("/product/:id", handleDeleteProduct);

export default router;
