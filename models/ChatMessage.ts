import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChatMessage extends Document {
  senderId: string;
  senderRole: "user" | "admin";
  message: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    senderId: {
      type: String,
      required: true,
      index: true,
    },

    senderRole: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ChatMessage: Model<IChatMessage> =
  mongoose.models.ChatMessage ||
  mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);

export default ChatMessage;