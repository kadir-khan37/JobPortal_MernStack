import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
    }
    console.log("Mongo URI",mongoUri)
    try {
        await mongoose.connect(String(mongoUri));
        console.log("mongodb connected successfully");
        console.log(mongoUri);
    } catch (error) {
        console.log("Could'nt connect", error)
    }
}

export default connectDB;