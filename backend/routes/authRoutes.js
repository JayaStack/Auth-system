import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.post("/logout", auth, logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", auth, getProfile);

export default router;
