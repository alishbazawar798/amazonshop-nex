import mongoose from "mongoose";

const DepositSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    currency: {
      type: String,
      enum: ["USDT", "USDC"],
      required: true,
    },

    network: {
      type: String,
      default: "TRC20",
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    txHash: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Deposit ||
  mongoose.model("Deposit", DepositSchema);