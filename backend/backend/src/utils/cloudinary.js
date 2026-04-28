import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();
// Debug: Check if env vars are loaded
console.log("🔍 Cloudinary Config - Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "✓ Loaded" : "✗ Missing");
console.log("🔍 Cloudinary Config - API Key:", process.env.CLOUDINARY_API_KEY ? "✓ Loaded" : "✗ Missing");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
