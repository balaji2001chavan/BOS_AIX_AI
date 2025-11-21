import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
