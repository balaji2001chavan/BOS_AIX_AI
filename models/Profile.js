import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    bio: {
      type: String,
      default: ""
    },
    avatarUrl: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
