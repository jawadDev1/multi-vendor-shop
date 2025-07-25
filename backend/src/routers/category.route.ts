import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetCategories,
  handleGetCategoriesForForm,
  handleGetCategoryDetails,
  handleGetCategoryForAdmin,
  handleUpdateCategory,
} from "#controllers/category.controller.js";
import { isAdmin } from "#middleware/isAdmin.js";

import { Router } from "express";

const router = Router();

router.get("/categories", handleGetCategories);


router.get("/get-form-categories",  handleGetCategoriesForForm);

router.use(isAdmin);

router.get("/get-categories", handleGetCategoryForAdmin);
router.get("/category-details/:id", handleGetCategoryDetails)

router.post("/create", handleCreateCategory)
router.put("/update/:id", handleUpdateCategory)

router.delete("/delete/:id", handleDeleteCategory)

export default router;
