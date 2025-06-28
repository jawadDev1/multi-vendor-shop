import { handleGetCategoriesForForm } from "#controllers/category.controller.js";

import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.use(isAuthenticated);

router.get("/get-form-categories", handleGetCategoriesForForm);

export default router;
