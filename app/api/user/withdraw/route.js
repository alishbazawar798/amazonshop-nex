import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Withdrawal from "@/models/Withdrawal";

export async function POST(request) {
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

    if (session.user?.role !== "user") {
      return NextResponse.json(
        {
          success: false,
          message: "User account required.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      currency,
      network,
      amount,
      walletAddress,
    } = body;

    if (!currency || !amount || !walletAddress) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Currency, amount and wallet address are required.",
        },
        { status: 400 }
      );
    }

    if (!["USDT", "USDC"].includes(currency)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid currency.",
        },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Amount must be greater than 0.",
        },
        { status: 400 }
      );
    }

    if (walletAddress.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid wallet address.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    if (user.status !== "Active") {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is currently blocked.",
        },
        { status: 403 }
      );
    }

    if (numericAmount > Number(user.balance || 0)) {
      return NextResponse.json(
        {
          success: false,
          message: "Insufficient wallet balance.",
        },
        { status: 400 }
      );
    }

    const withdrawal = await Withdrawal.create({
      user: user._id,
      currency,
      network: network || "TRC20",
      amount: numericAmount,
      walletAddress: walletAddress.trim(),
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Withdrawal request submitted successfully.",
        withdrawal: {
          id: withdrawal._id.toString(),
          currency: withdrawal.currency,
          network: withdrawal.network,
          amount: withdrawal.amount,
          walletAddress: withdrawal.walletAddress,
          status: withdrawal.status,
          createdAt: withdrawal.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User withdrawal API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit withdrawal request.",
      },
      { status: 500 }
    );
  }
}