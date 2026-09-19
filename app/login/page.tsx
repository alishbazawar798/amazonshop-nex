"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        loginType: "user",
        redirect: false,
      });

      console.log("Login result:", result);

      if (!result || result.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push("/user");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logos/amazonshop.png"
              alt="Amazonshop"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-[#0F1111]">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-7">
            Login to your Amazonshop account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#0F1111] mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#FF9900] hover:bg-[#e68a00] text-white font-bold py-3 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}

              <Link
                href="/signup"
                className="font-semibold text-[#007185] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Admin Login */}
          <div className="text-center mt-4">
            <Link
              href="/admin/login"
              className="text-xs text-gray-400 hover:text-[#FF9900] transition"
            >
              Admin Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}