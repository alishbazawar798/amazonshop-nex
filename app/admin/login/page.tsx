"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        loginType: "admin",
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid admin email or password.");
        setLoading(false);
        return;
      }

      const checkResponse = await fetch("/api/admin/check", {
        cache: "no-store",
      });

      const checkData = await checkResponse.json();

      if (!checkData.authorized) {
        setError("You are not authorized to access the admin panel.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Admin login error:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center p-4">

      <div className="max-w-md w-full bg-[#161B22] p-8 rounded-2xl border border-[#30363D] shadow-2xl">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FF9900] flex items-center justify-center shadow-lg">
            <span className="text-3xl font-black text-white">A</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          <h1 className="text-2xl font-bold">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Sign in to your Amazonshop admin panel
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-300 block mb-2">
              Admin Email
            </label>

            <div className="relative">

              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF9900] transition"
              />

            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-300 block mb-2">
              Admin Password
            </label>

            <div className="relative">

              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF9900] transition"
              />

            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 text-sm">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF9900] hover:bg-[#e68a00] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl text-sm transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Sign In to Admin
              </>
            )}
          </button>

        </form>

        {/* User Login */}
        <div className="text-center mt-6 pt-6 border-t border-[#30363D]">

          <p className="text-xs text-gray-500 mb-2">
            Are you a regular user?
          </p>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-[#FF9900] hover:underline font-semibold"
          >
            Go to User Login
          </button>

        </div>

      </div>
    </div>
  );
}