import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    if (!session.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found in session.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id)
      .select(
        "_id name email role balance rewardPoints creditScore vipLevel status inviteCode profileImage createdAt"
      )
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    if (user.role !== "user") {
      return NextResponse.json(
        {
          success: false,
          message: "User account required.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("User profile API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load user profile.",
      },
      { status: 500 }
    );
  }
}