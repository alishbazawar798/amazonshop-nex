import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Withdrawal from "@/models/Withdrawal";
import User from "@/models/User";
import Activity from "@/models/Activity";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    await connectDB();

    const withdrawals = await Withdrawal.find()
      .populate("user", "name email inviteCode")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      withdrawals,
      count: withdrawals.length,
    });
  } catch (error) {
    console.error("Admin withdrawals GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load withdrawals.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const auth = await requireAdmin();

    if (!auth.authorized) {
      return auth.response;
    }

    const body = await request.json();

    const { withdrawalId, action } = body;

    if (!withdrawalId || !action) {
      return NextResponse.json(
        {
          success: false,
          message: "Withdrawal ID and action are required.",
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

    const withdrawal = await Withdrawal.findById(withdrawalId);

    if (!withdrawal) {
      return NextResponse.json(
        {
          success: false,
          message: "Withdrawal request not found.",
        },
        { status: 404 }
      );
    }

    if (withdrawal.status !== "Pending") {
      return NextResponse.json(
        {
          success: false,
          message: `This withdrawal is already ${withdrawal.status}.`,
        },
        { status: 400 }
      );
    }

    const user = await User.findById(withdrawal.user);

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
      if (Number(user.balance || 0) < Number(withdrawal.amount)) {
        return NextResponse.json(
          {
            success: false,
            message: "User has insufficient balance.",
          },
          { status: 400 }
        );
      }

      user.balance =
        Number(user.balance || 0) - Number(withdrawal.amount);

      await user.save();

      withdrawal.status = "Approved";
      withdrawal.reviewedBy = auth.session.user.id;
      withdrawal.reviewedAt = new Date();

      await withdrawal.save();

      await Activity.create({
        user: user._id,
        admin: auth.session.user.id,
        action: "Withdrawal Approved",
        description: `${withdrawal.amount} ${withdrawal.currency} withdrawal approved for ${user.email}.`,
        type: "withdrawal",
      });

      return NextResponse.json({
        success: true,
        message: "Withdrawal approved successfully.",
        withdrawal: {
          id: withdrawal._id.toString(),
          status: withdrawal.status,
        },
        newBalance: user.balance,
      });
    }

    withdrawal.status = "Rejected";
    withdrawal.reviewedBy = auth.session.user.id;
    withdrawal.reviewedAt = new Date();

    await withdrawal.save();

    await Activity.create({
      user: user._id,
      admin: auth.session.user.id,
      action: "Withdrawal Rejected",
      description: `${withdrawal.amount} ${withdrawal.currency} withdrawal rejected for ${user.email}.`,
      type: "withdrawal",
    });

    return NextResponse.json({
      success: true,
      message: "Withdrawal rejected successfully.",
      withdrawal: {
        id: withdrawal._id.toString(),
        status: withdrawal.status,
      },
    });
  } catch (error) {
    console.error("Admin withdrawals PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process withdrawal.",
      },
      { status: 500 }
    );
  }
}