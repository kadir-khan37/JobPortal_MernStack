import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ---------------------
// REGISTER
// ---------------------
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists", success: false });

    let profilePhotoUrl = "";
    try {
      if (req.file) {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhotoUrl = cloudResponse.secure_url;
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      // Optional: continue without profile photo
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    return res.status(201).json({ message: "Account created successfully", success: true, user });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error during registration", success: false });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials", success: false });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid credentials", success: false });

    if (role !== user.role)
      return res.status(400).json({ message: "Role mismatch", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // false for localhost
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({ message: `Welcome back ${user.fullName}`, user, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------------
// LOGOUT
// ---------------------
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true, // false for localhost
    sameSite: "none",   // must match login cookie
    expires: new Date(0), // best way to delete
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};




// Update Profile Controller
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id; // from isAuthenticated middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Initialize profile object if missing
    if (!user.profile) user.profile = {};

    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // Update text fields if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map(s => s.trim());

    // Handle file upload safely
    if (file) {
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Save uploaded file URL and original name
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      } catch (err) {
        console.error("Cloudinary upload failed:", err.message);
        return res.status(500).json({ message: "File upload failed", success: false });
      }
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });

  } catch (error) {
    console.error("Update profile error:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ---------------------
// GET CURRENT USER
// ---------------------
export const getMe = async (req, res) => {
  try {
    const userId = req.id; // set by isAuthenticated middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Get me error:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
