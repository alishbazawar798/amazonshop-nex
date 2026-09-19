import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "login",
        "user",
        "deposit",
        "withdrawal",
        "order",
        "notification",
        "settings",
        "system",
      ],
      default: "system",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Activity ||
  mongoose.model("Activity", ActivitySchema);