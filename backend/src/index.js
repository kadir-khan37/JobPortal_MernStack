import express from "express";
import dotenv from "dotenv";
dotenv.config();
console.log(
  "✓ .env loaded - PORT:",
  process.env.PORT,
  "| MONGO_URI:",
  process.env.MONGODB_URI ? "✓" : "✗"
);
console.log("==== ENV DEBUG START ====");
console.log("SECRET_KEY:", process.env.SECRET_KEY);
console.log("All ENV KEYS:", Object.keys(process.env));
console.log("==== ENV DEBUG END ====");
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const app = express();
app.set("trust proxy", 1); // ⭐ VERY IMPORTANT
const __dirname = path.resolve();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= CORS =================

app.use(cors({
  origin: "https://job-portal-mern-stack-amber.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 2. Handle preflight (VERY IMPORTANT for file upload)


// ================= ROUTES =================
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("hello backend");
});

// ================= FRONTEND SERVING =================


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port right server  ${PORT}`);
});