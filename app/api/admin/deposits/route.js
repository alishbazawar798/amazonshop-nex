import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Deposit from "@/models/Deposit";
import User from "@/models/User";
import Activity from "@/models/Activity";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return (
        auth.response ||
        NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      );
    }

    await connectDB();

    const deposits = await Deposit.find()
      .populate("user", "name email inviteCode")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      deposits,
      count: deposits.length,
    });
  } catch (error) {
    console.error("Admin deposits GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load deposits.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return (
        auth.response ||
        NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      );
    }

    const body = await request.json();

    const { depositId, action } = body;

    if (!depositId || !action) {
      return NextResponse.json(
        {
          success: false,
          message: "Deposit ID and action are required.",
        },
        { status: 400 }
      );
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deposit = await Deposit.findById(depositId);

    if (!deposit) {
      return NextResponse.json(
        {
          success: false,
          message: "Deposit request not found.",
        },
        { status: 404 }
      );
    }

    if (deposit.status !== "Pending") {
      return NextResponse.json(
        {
          success: false,
          message: `This deposit is already ${deposit.status}.`,
        },
        { status: 400 }
      );
    }

    const user = await User.findById(deposit.user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    if (action === "approve") {
      user.balance = Number(user.balance || 0) + Number(deposit.amount);

      await user.save();

      deposit.status = "Approved";
      deposit.reviewedBy = auth.session.user.id;
      deposit.reviewedAt = new Date();

      await deposit.save();

      await Activity.create({
        user: user._id,
        admin: auth.session.user.id,
        action: "Deposit Approved",
        description: `${deposit.amount} ${deposit.currency} deposit approved for ${user.email}.`,
        type: "deposit",
      });

      return NextResponse.json({
        success: true,
        message: "Deposit approved successfully.",
        deposit: {
          id: deposit._id.toString(),
          status: deposit.status,
        },
        newBalance: user.balance,
      });
    }

    deposit.status = "Rejected";
    deposit.reviewedBy = auth.session.user.id;
    deposit.reviewedAt = new Date();

    await deposit.save();

    await Activity.create({
      user: user._id,
      admin: auth.session.user.id,
      action: "Deposit Rejected",
      description: `${deposit.amount} ${deposit.currency} deposit rejected for ${user.email}.`,
      type: "deposit",
    });

    return NextResponse.json({
      success: true,
      message: "Deposit rejected successfully.",
      deposit: {
        id: deposit._id.toString(),
        status: deposit.status,
      },
    });
  } catch (error) {
    console.error("Admin deposits PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process deposit.",
      },
      { status: 500 }
    );
  }
}