import express from "express";
import { login, register, updateProfile, logout, getMe } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // check folder name
import { singleUpload } from "../middlewares/multer.js"; // check folder name

const router = express.Router();

// Register user with optional file upload
router.post("/register", singleUpload, register);

// Login user
router.post("/login", login);

// Logout user
router.get("/logout", logout);

// Get current authenticated user
router.get("/me", isAuthenticated, getMe);

// Update profile (requires authentication + optional file upload)
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
