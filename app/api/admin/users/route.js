import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const admins = await User.find({ role: "admin" })
      .select("_id name email role status createdAt")
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      admins,
      count: admins.length,
      maxAdmins: 3,
    });
  } catch (error) {
    console.error("Admin users API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load admin users.",
      },
      { status: 500 }
    );
  }
}