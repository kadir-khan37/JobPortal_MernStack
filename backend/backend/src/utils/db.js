import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(mongoUri);

    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("Couldn't connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;