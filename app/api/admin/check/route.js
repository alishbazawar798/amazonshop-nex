import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          authorized: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    if (session.user?.role !== "admin") {
      return NextResponse.json(
        {
          authorized: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      authorized: true,
      message: "Admin access granted",
      user: {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
    });
  } catch (error) {
    console.error("Admin check error:", error);

    return NextResponse.json(
      {
        authorized: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}