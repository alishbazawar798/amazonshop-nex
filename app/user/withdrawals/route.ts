import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Withdrawal from "@/models/Withdrawal";

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

    if (session.user.role !== "user") {
      return NextResponse.json(
        {
          success: false,
          message: "User account required.",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const withdrawals = await Withdrawal.find({
      user: session.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      withdrawals,
    });
  } catch (error) {
    console.error("User withdrawals GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load withdrawal records.",
      },
      { status: 500 }
    );
  }
}