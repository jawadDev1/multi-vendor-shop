import {
  handleGetCategories,
  handleGetCategoriesForForm,
} from "#controllers/category.controller.js";

import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { isSeller } from "#middleware/isSeller.js";
import { Router } from "express";

const router = Router();

router.get("/categories", handleGetCategories);

router.use(isSeller);

router.get("/get-form-categories", handleGetCategoriesForForm);

export default router;
