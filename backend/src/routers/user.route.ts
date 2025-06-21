import {
  handleActivate,
  handleGetUser,
  handleLogout,
  handleSignin,
  handleSignup,
} from "#controllers/user.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.post("/signup", handleSignup);

router.post("/login", handleSignin);

router.get("/getuser", isAuthenticated, handleGetUser);

router.post("/activate", handleActivate);

router.get("/logout", isAuthenticated, handleLogout);

export default router;
