import express from "express";
import dotenv from "dotenv";
dotenv.config();
console.log(
  "✓ .env loaded - PORT:",
  process.env.PORT,
  "| MONGO_URI:",
  process.env.MONGO_URI ? "✓" : "✗"
);
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
  "http://localhost:5173", // local dev
  "https://job-portal-mern-stack-amber.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

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