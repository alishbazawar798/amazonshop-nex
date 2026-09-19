import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    // Maximum 3 admin accounts
    const adminCount = await User.countDocuments({
      role: "admin",
    });

    if (adminCount >= 3) {
      return NextResponse.json(
        { message: "Maximum 3 admin accounts are allowed." },
        { status: 403 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json(
      {
        message: "Admin account created successfully.",
        admin: {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin creation error:", error);

    return NextResponse.json(
      { message: "Something went wrong while creating admin." },
      { status: 500 }
    );
  }
}