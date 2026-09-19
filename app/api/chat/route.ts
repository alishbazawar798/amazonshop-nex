import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import ChatMessage from "@/models/ChatMessage";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const userId = String(session.user.id);
    const role = session.user.role === "admin" ? "admin" : "user";

    let messages;

    if (role === "admin") {
      /*
       * Admin can see all customer-service messages.
       */
      messages = await ChatMessage.find({})
        .sort({ createdAt: 1 })
        .lean();
    } else {
      /*
       * User sees:
       * - their own messages
       * - admin replies
       */
      messages = await ChatMessage.find({
        $or: [
          {
            senderId: userId,
            senderRole: "user",
          },
          {
            senderRole: "admin",
          },
        ],
      })
        .sort({ createdAt: 1 })
        .lean();
    }

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Chat GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load chat messages.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const imageUrl =
      typeof body.imageUrl === "string"
        ? body.imageUrl.trim()
        : "";

    if (!message && !imageUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Message or image is required.",
        },
        { status: 400 }
      );
    }

    const senderId = String(session.user.id);

    const senderRole =
      session.user.role === "admin" ? "admin" : "user";

    const newMessage = await ChatMessage.create({
      senderId,
      senderRole,
      message,
      imageUrl,
    });

    return NextResponse.json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Chat POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send chat message.",
      },
      { status: 500 }
    );
  }
}