"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createAdmin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Admin creation failed.");
        setLoading(false);
        return;
      }

      setMessage("Admin account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FF9900] flex items-center justify-center text-3xl font-black text-white">
              A
            </div>

            <h1 className="text-2xl font-bold text-[#0F1111]">
              Create Admin
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Amazonshop Admin Account Setup
            </p>
          </div>

          <form onSubmit={createAdmin} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter admin name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#FF9900]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#FF9900]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your password"
                minLength={6}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#FF9900]"
              />

              <p className="text-xs text-gray-500 mt-2">
                Minimum 6 characters
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl p-3 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF9900] hover:bg-[#e68a00] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition"
            >
              {loading ? "Creating Admin..." : "Create Admin Account"}
            </button>

          </form>

          <button
            onClick={() => router.push("/admin/login")}
            className="w-full mt-4 text-sm text-[#007185] hover:underline"
          >
            Back to Admin Login
          </button>

        </div>
      </div>
    </main>
  );
}