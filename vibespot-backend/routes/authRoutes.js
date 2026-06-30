import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Logged-in User
router.get("/me", getCurrentUser);

// Logout
router.post("/logout", logoutUser);

export default router;