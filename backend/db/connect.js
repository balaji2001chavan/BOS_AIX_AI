import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log("[DB] MONGODB_URI missing in env");
      return;
    }

    await mongoose.connect(uri);
    console.log("[DB] MongoDB connected");
  } catch (err) {
    console.log("[DB ERROR]", err.toString());
  }
}
