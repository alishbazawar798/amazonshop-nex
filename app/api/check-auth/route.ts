import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    nextAuthSecret: Boolean(process.env.NEXTAUTH_SECRET),
    nextAuthUrl: process.env.NEXTAUTH_URL || "MISSING",
    mongoUri: Boolean(process.env.MONGODB_URI),
  });
}