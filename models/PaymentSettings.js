import mongoose from "mongoose";

const PaymentSettingsSchema = new mongoose.Schema(
  {
    usdtTrc20: {
      type: String,
      default: "",
      trim: true,
    },

    usdcTrc20: {
      type: String,
      default: "",
      trim: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PaymentSettings ||
  mongoose.model("PaymentSettings", PaymentSettingsSchema);