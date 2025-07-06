import {
  handleActivate,
  handleChangePassword,
  handleCreateAddress,
  handleDeleteAddress,
  handleGetUser,
  handleLogout,
  handleSignin,
  handleSignup,
  handleUpdateAddress,
  handleUpdateUserProfile,
} from "#controllers/user.controller.js";
import { isAuthenticated } from "#middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.post("/signup", handleSignup);

router.post("/login", handleSignin);

router.get("/getuser", isAuthenticated, handleGetUser);

router.post("/activate", handleActivate);

router.get("/logout", isAuthenticated, handleLogout);

router.post("/update-profile", isAuthenticated, handleUpdateUserProfile);

router.post("/create-address", isAuthenticated, handleCreateAddress);

router.put("/update-address/:id", isAuthenticated, handleUpdateAddress);

router.delete("/delete-address/:id", isAuthenticated, handleDeleteAddress);

router.put("/change-password", isAuthenticated, handleChangePassword);

export default router;
