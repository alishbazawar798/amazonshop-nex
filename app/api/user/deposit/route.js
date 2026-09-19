import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Deposit from "@/models/Deposit";
import User from "@/models/User";

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

    if (!session.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found.",
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

    const body = await request.json();

    const { currency, network, amount, txHash } = body;

    if (!currency || !amount || !txHash) {
      return NextResponse.json(
        {
          success: false,
          message: "Currency, amount and transaction hash are required.",
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

    if (numericAmount < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Minimum deposit amount is 1.",
        },
        { status: 400 }
      );
    }

    if (txHash.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid transaction hash.",
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

    const deposit = await Deposit.create({
      user: user._id,
      currency,
      network: network || "TRC20",
      amount: numericAmount,
      txHash: txHash.trim(),
      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Deposit request submitted successfully.",
        deposit: {
          id: deposit._id.toString(),
          currency: deposit.currency,
          network: deposit.network,
          amount: deposit.amount,
          txHash: deposit.txHash,
          status: deposit.status,
          createdAt: deposit.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User deposit API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit deposit request.",
      },
      { status: 500 }
    );
  }
}