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
const __dirname = path.resolve();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= CORS =================
const allowedOrigins = [
  "https://job-portal-mern-stack-amber.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ================= ROUTES =================
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("hello backend");
});

// ================= FRONTEND SERVING =================
app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});