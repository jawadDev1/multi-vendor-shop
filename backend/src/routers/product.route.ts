import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetBestDealProducts,
  handleGetFeaturedProducts,
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
router.get("/featured", handleGetFeaturedProducts);

router.use(isSeller);

router.post("/create-product", handleCreateProduct);

router.get("/get-shop-products", handleGetShopProducts);

router.get("/get-single/:id", handleGetSingleProduct);

router.get("/get-form-products", handleGetProductsForForm);

router.put("/update/:slug", handleUpdateProduct);

router.delete("/product/:id", handleDeleteProduct);

export default router;
