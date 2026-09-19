"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Wallet,
  ArrowUpRight,
  ShoppingBag,
  User,
  Menu,
  X,
  Bell,
  Globe,
  Sun,
  Moon,
  LogOut,
  Copy,
  Gift,
  Settings,
  MessageCircle,
  Receipt,
  Clock3,
  CheckCircle,
  Send,
  Headphones,
  ChevronRight,
  CircleDollarSign,
} from "lucide-react";

export default function UserDashboard() {
  const { data: session, status } = useSession();

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [profileTab, setProfileTab] = useState("balance");
  const [orderFilter, setOrderFilter] = useState("all");
  const [selectedVip, setSelectedVip] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  /* ================= REAL PROFILE DATA ================= */

  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const userName = profile?.name || session?.user?.name || "User";

  const userEmail =
    profile?.email || session?.user?.email || "user@example.com";

  const walletBalance = Number(profile?.balance || 0).toFixed(2);
  const rewardPoints = profile?.rewardPoints ?? 0;
  const creditScore = profile?.creditScore ?? 100;
  const inviteCode = profile?.inviteCode || "—";
  const accountStatus = profile?.status || "Active";
  const vipLevel = profile?.vipLevel || "None";

  /* ================= DEPOSIT STATES ================= */

  const [depositCurrency, setDepositCurrency] = useState("USDT");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositTxHash, setDepositTxHash] = useState("");
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositMessage, setDepositMessage] = useState("");
  const [depositError, setDepositError] = useState("");

  /* ================= WITHDRAWAL STATES ================= */

  const [withdrawCurrency, setWithdrawCurrency] = useState("USDT");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawWallet, setWithdrawWallet] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  /* ================= LOAD PROFILE ================= */

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const loadProfile = async () => {
      try {
        setProfileLoading(true);
        setProfileError("");

        const response = await fetch("/api/user/profile", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          setProfileError(
            data.message || "Failed to load your profile."
          );
          return;
        }

        setProfile(data.user);

        if (data.user?.profileImage) {
          setProfileImage(data.user.profileImage);
        }
      } catch (error) {
        console.error("Profile loading error:", error);
        setProfileError("Failed to load your profile.");
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [status]);

  /* ================= VIP DATA ================= */

  const vipData = [
    {
      id: "vip1",
      name: "Amazon",
      level: "VIP 1",
      unlocked: "20 USDT",
      dailyOrders: 25,
      rate: "4%",
      commission: "166.00",
      image: "/amazon.png",
    },
    {
      id: "vip2",
      name: "Alibaba",
      level: "VIP 2",
      unlocked: "500 USDT",
      dailyOrders: 25,
      rate: "8%",
      commission: "166.00",
      image: "/alibaba.png",
    },
    {
      id: "vip3",
      name: "Shopify",
      level: "VIP 3",
      unlocked: "899 USDT",
      dailyOrders: 25,
      rate: "12%",
      commission: "166.00",
      image: "/shopify.png",
    },
  ];

  const filteredVip =
    orderFilter === "all"
      ? vipData
      : vipData.filter((item) => item.id === orderFilter);

  /* ================= HELPERS ================= */

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openProfileTab = (tab: string) => {
    setActiveTab("profile");
    setProfileTab(tab);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const changeProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const openVipOrder = (vip: any) => {
    setSelectedVip(vip);
  };

  const closeVipOrder = () => {
    setSelectedVip(null);
  };

  const startOrdering = () => {
    alert(`Start ordering: ${selectedVip?.name || "VIP"}`);
  };

  /* ================= DEPOSIT SUBMIT ================= */

  const submitDeposit = async () => {
    setDepositMessage("");
    setDepositError("");

    if (!depositAmount || Number(depositAmount) <= 0) {
      setDepositError("Please enter a valid deposit amount.");
      return;
    }

    if (!depositTxHash.trim()) {
      setDepositError("Please enter your transaction hash.");
      return;
    }

    try {
      setDepositLoading(true);

      const response = await fetch("/api/user/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: depositCurrency,
          network: "TRC20",
          amount: Number(depositAmount),
          txHash: depositTxHash.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setDepositError(
          data.message || "Failed to submit deposit request."
        );
        return;
      }

      setDepositMessage(
        "Deposit request submitted successfully. Status: Pending."
      );

      setDepositAmount("");
      setDepositTxHash("");
    } catch (error) {
      console.error("Deposit submission error:", error);
      setDepositError("Something went wrong. Please try again.");
    } finally {
      setDepositLoading(false);
    }
  };

  /* ================= WITHDRAWAL SUBMIT ================= */

  const submitWithdrawal = async () => {
    setWithdrawMessage("");
    setWithdrawError("");

    if (!withdrawWallet.trim()) {
      setWithdrawError(
        "Please enter your withdrawal wallet address."
      );
      return;
    }

    if (!withdrawAmount || Number(withdrawAmount) <= 0) {
      setWithdrawError("Please enter a valid withdrawal amount.");
      return;
    }

    if (Number(withdrawAmount) > Number(walletBalance || 0)) {
      setWithdrawError("Insufficient wallet balance.");
      return;
    }

    try {
      setWithdrawLoading(true);

      const response = await fetch("/api/user/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: withdrawCurrency,
          network: "TRC20",
          amount: Number(withdrawAmount),
          walletAddress: withdrawWallet.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setWithdrawError(
          data.message || "Failed to submit withdrawal request."
        );
        return;
      }

      setWithdrawMessage(
        "Withdrawal request submitted successfully. Status: Pending."
      );

      setWithdrawWallet("");
      setWithdrawAmount("");
    } catch (error) {
      console.error("Withdrawal submission error:", error);
      setWithdrawError("Something went wrong. Please try again.");
    } finally {
      setWithdrawLoading(false);
    }
  };

  /* ================= CUSTOMER SERVICE ================= */

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    alert("Your message has been sent to Customer Service.");
    setChatMessage("");
  };

  /* ================= THEME ================= */

  const pageBg = darkMode
    ? "bg-[#0D1117] text-white"
    : "bg-gray-100 text-gray-900";

  const card = darkMode
    ? "bg-[#161B22] border-[#30363D]"
    : "bg-white border-gray-200";

  const input = darkMode
    ? "bg-[#0D1117] border-[#30363D] text-white"
    : "bg-white border-gray-200 text-gray-900";

  const muted = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`min-h-screen ${pageBg} pb-24 transition-colors`}
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header
        className={`sticky top-0 z-50 border-b shadow-sm ${
          darkMode
            ? "bg-[#131921] border-[#30363D]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* PROFESSIONAL AMAZONSHOP LOGO */}
            <button
              onClick={() => switchTab("home")}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FFB000] via-[#FF9900] to-[#E87500] flex items-center justify-center shadow-lg shadow-orange-500/25 border border-orange-300/40">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black/10 border border-white/30 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-black tracking-tighter">
                    A
                  </span>
                </div>
              </div>

              <div className="text-left leading-none">
                <div className="text-xl sm:text-2xl font-black tracking-tight">
                  Amazon
                  <span className="text-[#FF9900]">shop</span>
                </div>

                <div
                  className={`text-[9px] sm:text-[10px] font-bold tracking-[0.28em] mt-1 ${muted}`}
                >
                  VIP SHOPPING
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setLanguage((prev) =>
                  prev === "EN" ? "UR" : "EN"
                )
              }
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border text-sm ${
                darkMode
                  ? "border-[#30363D] hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <Globe className="w-4 h-4" />
              {language}
            </button>

            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`p-2 rounded-xl border ${
                darkMode
                  ? "border-[#30363D] hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => alert("No new notifications")}
              className="p-2 rounded-xl text-[#FF9900] hover:bg-orange-50"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              onClick={() =>
                signOut({ callbackUrl: "/login" })
              }
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          SIDEBAR
      ========================================================= */}

      {sidebarOpen && (
        <div className="fixed inset-0 z-[80]">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className={`absolute left-0 top-0 bottom-0 w-[290px] p-5 shadow-2xl ${
              darkMode ? "bg-[#131921]" : "bg-white"
            }`}
          >
            {/* PROFESSIONAL SIDEBAR BRANDING */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFB000] via-[#FF9900] to-[#E87500] flex items-center justify-center shadow-lg">
                  <div className="w-9 h-9 rounded-xl bg-black/10 border border-white/30 flex items-center justify-center">
                    <span className="text-2xl font-black text-black">
                      A
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-black text-xl leading-none">
                    Amazon
                    <span className="text-[#FF9900]">shop</span>
                  </div>

                  <div
                    className={`text-[9px] font-bold tracking-[0.22em] mt-1 ${muted}`}
                  >
                    VIP SHOPPING
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p
              className={`text-xs uppercase font-bold mb-3 ${muted}`}
            >
              Main Menu
            </p>

            <div className="space-y-2">
              <button
                onClick={() => switchTab("home")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-[#FF9900]"
              >
                <Home className="w-5 h-5" />
                Home
              </button>

              <button
                onClick={() => switchTab("orders")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-[#FF9900]"
              >
                <ShoppingBag className="w-5 h-5" />
                Orders
              </button>

              <button
                onClick={() => switchTab("recordOrder")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-[#FF9900]"
              >
                <Clock3 className="w-5 h-5" />
                Orders Record
              </button>

              <button
                onClick={() => switchTab("profile")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-500/10 hover:text-[#FF9900]"
              >
                <User className="w-5 h-5" />
                Profile
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

              <button
                onClick={() => switchTab("deposit")}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#FF9900]/10 text-[#FF9900] font-bold"
              >
                <Wallet className="w-5 h-5" />
                Deposit
              </button>

              <button
                onClick={() => switchTab("withdraw")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-teal-500/10 hover:text-teal-500"
              >
                <ArrowUpRight className="w-5 h-5" />
                Withdrawal
              </button>

              <button
                onClick={() =>
                  signOut({ callbackUrl: "/login" })
                }
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-500/10 font-bold"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {profileError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {profileError}
          </div>
        )}

        {/* =======================================================
            HOME
        ======================================================= */}

        {activeTab === "home" && (
          <section className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#FF9900]">
                AMAZONSHOP VIP
              </p>

              <h1 className="text-3xl sm:text-4xl font-black mt-1">
                Welcome, {userName}
              </h1>

              <p className={`text-sm mt-1 ${muted}`}>
                Your e-commerce VIP dashboard
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF9900] via-orange-500 to-amber-400 p-6 sm:p-9 text-black shadow-xl">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex px-3 py-1 rounded-lg bg-black/10 text-xs font-black uppercase">
                  VIP E-Commerce Platform
                </span>

                <h2 className="text-3xl sm:text-5xl font-black mt-3 leading-tight">
                  Shop. Complete Orders. Earn Rewards.
                </h2>

                <p className="mt-3 text-sm sm:text-base font-medium max-w-xl">
                  Select your VIP level and start completing available
                  orders and tasks.
                </p>

                <button
                  onClick={() => switchTab("orders")}
                  className="mt-5 px-6 py-3 rounded-xl bg-black text-white font-black hover:bg-gray-800"
                >
                  View Orders
                </button>
              </div>

              <div className="absolute -right-16 -bottom-24 w-72 h-72 rounded-full bg-white/20" />
              <div className="absolute right-10 top-6 w-24 h-24 rounded-full bg-white/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-5 rounded-2xl border shadow-sm ${card}`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${muted}`}>
                    Available Balance
                  </p>

                  <Wallet className="w-5 h-5 text-[#FF9900]" />
                </div>

                <p className="text-2xl font-black mt-2">
                  {profileLoading ? "Loading..." : walletBalance}{" "}
                  {!profileLoading && (
                    <span className="text-xs font-normal">
                      USDT
                    </span>
                  )}
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border shadow-sm ${card}`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${muted}`}>
                    Reward Points
                  </p>

                  <Gift className="w-5 h-5 text-pink-500" />
                </div>

                <p className="text-2xl font-black mt-2">
                  {profileLoading ? "..." : rewardPoints}
                </p>
              </div>

              <div
                className={`p-5 rounded-2xl border shadow-sm ${card}`}
              >
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${muted}`}>
                    Account Status
                  </p>

                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>

                <p
                  className={`text-2xl font-black mt-2 ${
                    accountStatus === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {accountStatus}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => switchTab("deposit")}
                className="py-4 rounded-2xl bg-[#FF9900] text-black font-black flex items-center justify-center gap-2 shadow-md"
              >
                <Wallet className="w-5 h-5" />
                Deposit
              </button>

              <button
                onClick={() => switchTab("withdraw")}
                className="py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black flex items-center justify-center gap-2 shadow-md"
              >
                <ArrowUpRight className="w-5 h-5" />
                Withdrawal
              </button>
            </div>

            {/* VIP PREVIEW - PROFESSIONAL LARGE CARDS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black">
                    VIP Orders
                  </h2>

                  <p className={`text-sm ${muted}`}>
                    Choose your VIP level
                  </p>
                </div>

                <button
                  onClick={() => switchTab("orders")}
                  className="text-sm font-bold text-[#FF9900]"
                >
                  View All
                </button>
              </div>

              <div className="space-y-5">
                {vipData.map((vip) => (
                  <VipCard
                    key={vip.id}
                    vip={vip}
                    darkMode={darkMode}
                    card={card}
                    muted={muted}
                    onClick={() => openVipOrder(vip)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            DEPOSIT
        ======================================================= */}

        {activeTab === "deposit" && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase text-[#FF9900]">
                AMAZONSHOP
              </p>

              <h1 className="text-3xl font-black">
                Deposit Funds
              </h1>

              <p className={`text-sm mt-1 ${muted}`}>
                Deposit using USDT or USDC.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setDepositCurrency("USDT");
                  setDepositMessage("");
                  setDepositError("");
                }}
                className={`p-4 rounded-2xl font-black flex items-center justify-center gap-2 ${
                  depositCurrency === "USDT"
                    ? "bg-[#FF9900] text-black"
                    : `border ${card}`
                }`}
              >
                <CircleDollarSign className="w-5 h-5" />
                USDT
              </button>

              <button
                onClick={() => {
                  setDepositCurrency("USDC");
                  setDepositMessage("");
                  setDepositError("");
                }}
                className={`p-4 rounded-2xl font-black flex items-center justify-center gap-2 ${
                  depositCurrency === "USDC"
                    ? "bg-blue-600 text-white"
                    : `border ${card}`
                }`}
              >
                <CircleDollarSign className="w-5 h-5" />
                USDC
              </button>
            </div>

            <div
              className={`p-6 rounded-3xl border shadow-sm ${card}`}
            >
              <div
                className={`rounded-2xl p-5 text-black ${
                  depositCurrency === "USDT"
                    ? "bg-gradient-to-r from-[#FF9900] to-orange-500"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                }`}
              >
                <p className="text-xs uppercase font-black">
                  Deposit Method
                </p>

                <h2 className="text-2xl font-black mt-1">
                  {depositCurrency} — TRC20
                </h2>
              </div>

              <div className="mt-5">
                <label className="text-sm font-bold">
                  TRC20 Deposit Address
                </label>

                <div className="flex gap-2 mt-2">
                  <input
                    readOnly
                    value={
                      depositCurrency === "USDT"
                        ? "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                        : "USDCXXXXXXXXXXXXXXXXXXXXXXXX"
                    }
                    className={`flex-1 min-w-0 px-3 py-3 rounded-xl border text-sm ${input}`}
                  />

                  <button
                    onClick={() => {
                      const address =
                        depositCurrency === "USDT"
                          ? "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                          : "USDCXXXXXXXXXXXXXXXXXXXXXXXX";

                      navigator.clipboard?.writeText(address);
                      setDepositMessage(
                        "Deposit address copied."
                      );
                      setDepositError("");
                    }}
                    className={`px-4 rounded-xl ${
                      depositCurrency === "USDT"
                        ? "bg-[#FF9900] text-black"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <p className={`text-xs mt-2 ${muted}`}>
                  Network: TRC20
                </p>
              </div>

              <div className="mt-4">
                <label className="text-sm font-bold">
                  Amount ({depositCurrency})
                </label>

                <input
                  type="number"
                  min="1"
                  value={depositAmount}
                  onChange={(e) =>
                    setDepositAmount(e.target.value)
                  }
                  placeholder={`Enter ${depositCurrency} amount`}
                  className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none focus:border-[#FF9900] ${input}`}
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-bold">
                  Transaction ID / Hash
                </label>

                <input
                  type="text"
                  value={depositTxHash}
                  onChange={(e) =>
                    setDepositTxHash(e.target.value)
                  }
                  placeholder="Enter transaction hash"
                  className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none focus:border-[#FF9900] ${input}`}
                />
              </div>

              {depositError && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold">
                  {depositError}
                </div>
              )}

              {depositMessage && (
                <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold">
                  {depositMessage}
                </div>
              )}

              <button
                onClick={submitDeposit}
                disabled={depositLoading}
                className={`w-full mt-5 py-3.5 rounded-xl font-black disabled:opacity-60 disabled:cursor-not-allowed ${
                  depositCurrency === "USDT"
                    ? "bg-[#FF9900] text-black"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {depositLoading
                  ? "Submitting..."
                  : `Submit ${depositCurrency} Deposit`}
              </button>

              <p
                className={`text-xs mt-3 text-center ${muted}`}
              >
                Deposit will remain Pending until reviewed by
                admin.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border ${card}`}
            >
              <h2 className="text-lg font-black">
                Deposit Record
              </h2>

              <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 flex items-center justify-between">
                <div>
                  <p className="font-bold">
                    Deposit History
                  </p>

                  <p className={`text-xs ${muted}`}>
                    Your submitted deposits will appear here.
                  </p>
                </div>

                <span className="text-xs font-bold text-yellow-500">
                  Pending
                </span>
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            WITHDRAW
        ======================================================= */}

        {activeTab === "withdraw" && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase text-[#FF9900]">
                AMAZONSHOP
              </p>

              <h1 className="text-3xl font-black">
                Withdrawal
              </h1>

              <p className={`text-sm mt-1 ${muted}`}>
                Withdraw your available balance.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white text-center shadow-xl">
              <p className="text-xs uppercase text-teal-200 font-bold">
                Wallet Balance
              </p>

              <h2 className="text-4xl font-black mt-2">
                {profileLoading ? "Loading..." : walletBalance}{" "}
                {!profileLoading && (
                  <span className="text-sm font-normal text-teal-200">
                    USDT
                  </span>
                )}
              </h2>
            </div>

            <div
              className={`p-6 rounded-3xl border ${card}`}
            >
              <div>
                <label className="text-sm font-bold">
                  USDT / USDC Wallet Address
                </label>

                <input
                  type="text"
                  value={withdrawWallet}
                  onChange={(e) =>
                    setWithdrawWallet(e.target.value)
                  }
                  placeholder="Enter withdrawal wallet address"
                  className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none focus:border-teal-600 ${input}`}
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-bold">
                  Currency
                </label>

                <select
                  value={withdrawCurrency}
                  onChange={(e) => {
                    setWithdrawCurrency(e.target.value);
                    setWithdrawMessage("");
                    setWithdrawError("");
                  }}
                  className={`w-full mt-2 px-4 py-3 rounded-xl border ${input}`}
                >
                  <option value="USDT">USDT</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="text-sm font-bold">
                  Amount ({withdrawCurrency})
                </label>

                <input
                  type="number"
                  min="1"
                  value={withdrawAmount}
                  onChange={(e) =>
                    setWithdrawAmount(e.target.value)
                  }
                  placeholder="Enter amount"
                  className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none focus:border-teal-600 ${input}`}
                />
              </div>

              {withdrawError && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold">
                  {withdrawError}
                </div>
              )}

              {withdrawMessage && (
                <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold">
                  {withdrawMessage}
                </div>
              )}

              <button
                onClick={submitWithdrawal}
                disabled={withdrawLoading}
                className="w-full mt-5 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black"
              >
                {withdrawLoading
                  ? "Submitting..."
                  : "Submit Withdrawal"}
              </button>

              <p
                className={`text-xs mt-3 text-center ${muted}`}
              >
                Withdrawal requests remain Pending until reviewed
                by admin.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border ${card}`}
            >
              <h2 className="text-lg font-black">
                Withdrawal Record
              </h2>

              <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 flex items-center justify-between">
                <div>
                  <p className="font-bold">
                    Withdrawal History
                  </p>

                  <p className={`text-xs mt-1 ${muted}`}>
                    Your withdrawal requests will appear here.
                  </p>
                </div>

                <span className="text-xs font-bold text-yellow-500">
                  Pending
                </span>
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            ORDERS
        ======================================================= */}

        {activeTab === "orders" && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase text-[#FF9900]">
                AMAZONSHOP
              </p>

              <h1 className="text-3xl font-black">
                Orders
              </h1>

              <p className={`text-sm mt-1 ${muted}`}>
                All VIP levels are available below.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                ["all", "All"],
                ["vip1", "VIP 1"],
                ["vip2", "VIP 2"],
                ["vip3", "VIP 3"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setOrderFilter(id)}
                  className={`py-3 rounded-2xl text-xs sm:text-sm font-black border transition ${
                    orderFilter === id
                      ? "bg-amber-400 text-black border-amber-400 shadow-md"
                      : `${card} text-[#FF9900]`
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filteredVip.map((vip) => (
                <VipCard
                  key={vip.id}
                  vip={vip}
                  darkMode={darkMode}
                  card={card}
                  muted={muted}
                  onClick={() => openVipOrder(vip)}
                  showButton
                />
              ))}
            </div>
          </section>
        )}

        {/* =======================================================
            ORDER RECORD
        ======================================================= */}

        {activeTab === "recordOrder" && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase text-[#FF9900]">
                AMAZONSHOP
              </p>

              <h1 className="text-3xl font-black">
                Orders Record
              </h1>

              <p className={`text-sm mt-1 ${muted}`}>
                Your completed and previous orders.
              </p>
            </div>

            <div
              className={`p-6 rounded-3xl border ${card}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-[#FF9900] flex items-center justify-center">
                <Receipt className="w-7 h-7" />
              </div>

              <h2 className="text-xl font-black mt-4">
                Order History
              </h2>

              <p className={`text-sm mt-1 ${muted}`}>
                Completed orders will appear here.
              </p>

              <div className="mt-5 p-4 rounded-xl bg-gray-500/10 flex items-center justify-between">
                <div>
                  <p className="font-bold">
                    No completed orders
                  </p>

                  <p className={`text-xs ${muted}`}>
                    Complete a VIP order to see it here.
                  </p>
                </div>

                <Clock3 className="w-5 h-5 opacity-60" />
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            PROFILE
        ======================================================= */}

        {activeTab === "profile" && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-black uppercase text-[#FF9900]">
                AMAZONSHOP
              </p>

              <h1 className="text-3xl font-black">
                Profile
              </h1>
            </div>

            <div
              className={`p-5 rounded-3xl border ${card}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="relative cursor-pointer">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-[#FF9900] flex items-center justify-center text-3xl font-black text-black">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userName.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={changeProfileImage}
                      className="hidden"
                    />
                  </label>

                  <div>
                    <h2 className="text-xl font-black">
                      {userName}
                    </h2>

                    <p className={`text-sm ${muted}`}>
                      {userEmail}
                    </p>

                    <p className="text-xs mt-1">
                      Credit score:{" "}
                      <strong className="text-green-500">
                        {creditScore}
                      </strong>
                    </p>

                    <p className="text-xs mt-1">
                      VIP Level:{" "}
                      <strong className="text-[#FF9900]">
                        {vipLevel}
                      </strong>
                    </p>

                    <div className="flex items-center gap-1 text-xs mt-1">
                      <span>Invitation:</span>

                      <strong className="text-[#FF9900] font-mono">
                        {inviteCode}
                      </strong>

                      <button
                        onClick={copyInviteCode}
                        className="text-[#FF9900]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setChatOpen(true)}
                  className="p-3 rounded-full bg-orange-500/10 text-[#FF9900]"
                >
                  <Headphones className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-7 rounded-3xl text-white text-center shadow-xl">
              <p className="text-xs uppercase tracking-widest text-teal-200 font-bold">
                Wallet Balance
              </p>

              <h2 className="text-3xl font-black mt-2">
                {profileLoading ? "Loading..." : walletBalance}{" "}
                {!profileLoading && (
                  <span className="text-sm font-normal text-teal-200">
                    USDT
                  </span>
                )}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => openProfileTab("deposit")}
                className="py-4 rounded-2xl bg-[#FF9900] text-black font-black flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Deposit
              </button>

              <button
                onClick={() => openProfileTab("withdrawal")}
                className="py-4 rounded-2xl bg-teal-700 text-white font-black flex items-center justify-center gap-2"
              >
                <ArrowUpRight className="w-5 h-5" />
                Withdrawal
              </button>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {[
                ["balance", "Balance", Wallet],
                ["deposit", "Deposit", Wallet],
                ["withdrawal", "Withdrawal", ArrowUpRight],
                ["invitation", "Invitation", Gift],
                ["setting", "Setting", Settings],
              ].map(([id, label, Icon]: any) => (
                <button
                  key={id}
                  onClick={() => setProfileTab(id)}
                  className={`p-2 sm:p-3 rounded-xl border text-center transition ${
                    profileTab === id
                      ? "bg-[#FF9900] text-black border-[#FF9900]"
                      : `${card} text-[#FF9900]`
                  }`}
                >
                  <Icon className="w-4 h-4 mx-auto" />

                  <span className="block text-[9px] sm:text-xs font-bold mt-1">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {profileTab === "balance" && (
              <div
                className={`p-5 rounded-2xl border ${card}`}
              >
                <h2 className="text-lg font-black">
                  Balance Information
                </h2>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <InfoBox
                    title="Wallet Balance"
                    value={`${walletBalance} USDT`}
                    muted={muted}
                  />

                  <InfoBox
                    title="Reward Points"
                    value={rewardPoints}
                    muted={muted}
                  />

                  <InfoBox
                    title="Credit Score"
                    value={creditScore}
                    muted={muted}
                  />

                  <InfoBox
                    title="VIP Level"
                    value={vipLevel}
                    muted={muted}
                  />

                  <InfoBox
                    title="Status"
                    value={accountStatus}
                    muted={muted}
                  />
                </div>
              </div>
            )}

            {profileTab === "deposit" && (
              <div
                className={`p-5 rounded-2xl border ${card}`}
              >
                <h2 className="text-lg font-black">
                  Deposit
                </h2>

                <p className={`text-sm mt-1 ${muted}`}>
                  Deposit through USDT or USDC.
                </p>

                <button
                  onClick={() => switchTab("deposit")}
                  className="w-full mt-4 py-3 rounded-xl bg-[#FF9900] text-black font-black"
                >
                  Open Deposit
                </button>
              </div>
            )}

            {profileTab === "withdrawal" && (
              <div
                className={`p-5 rounded-2xl border ${card}`}
              >
                <h2 className="text-lg font-black">
                  Withdrawal
                </h2>

                <p className={`text-sm mt-1 ${muted}`}>
                  Withdraw your available wallet balance.
                </p>

                <button
                  onClick={() => switchTab("withdraw")}
                  className="w-full mt-4 py-3 rounded-xl bg-teal-700 text-white font-black"
                >
                  Open Withdrawal
                </button>
              </div>
            )}

            {profileTab === "invitation" && (
              <div
                className={`p-6 rounded-2xl border text-center ${card}`}
              >
                <Gift className="w-10 h-10 mx-auto text-[#FF9900]" />

                <h2 className="text-xl font-black mt-3">
                  Invite Friends
                </h2>

                <p className={`text-sm mt-1 ${muted}`}>
                  Share your invitation code with friends.
                </p>

                <div className="flex gap-2 mt-5">
                  <div
                    className={`flex-1 p-3 rounded-xl border font-mono font-black ${input}`}
                  >
                    {inviteCode}
                  </div>

                  <button
                    onClick={copyInviteCode}
                    className="px-4 rounded-xl bg-[#FF9900] text-black"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {copied && (
                  <p className="text-green-500 text-sm font-bold mt-3">
                    Invitation code copied!
                  </p>
                )}
              </div>
            )}

            {profileTab === "setting" && (
              <div
                className={`p-5 rounded-2xl border ${card}`}
              >
                <h2 className="text-lg font-black">
                  Account Settings
                </h2>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-500/10">
                    <div>
                      <p className="font-bold">
                        Language
                      </p>

                      <p className={`text-xs ${muted}`}>
                        Current language
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setLanguage((prev) =>
                          prev === "EN" ? "UR" : "EN"
                        )
                      }
                      className="px-3 py-2 rounded-lg bg-[#FF9900] text-black font-bold"
                    >
                      {language}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-500/10">
                    <div>
                      <p className="font-bold">
                        Theme
                      </p>

                      <p className={`text-xs ${muted}`}>
                        Light / Dark mode
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setDarkMode((prev) => !prev)
                      }
                      className="px-3 py-2 rounded-lg bg-[#FF9900] text-black"
                    >
                      {darkMode ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() =>
                signOut({ callbackUrl: "/login" })
              }
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </section>
        )}

        {/* =======================================================
            VIP ORDER DETAIL
        ======================================================= */}

        {selectedVip && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={closeVipOrder}
            />

            <div
              className={`relative w-full max-w-md rounded-3xl p-6 shadow-2xl ${
                darkMode ? "bg-[#161B22]" : "bg-white"
              }`}
            >
              <button
                onClick={closeVipOrder}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LARGE PROFESSIONAL VIP IMAGE */}
              <div className="w-full h-44 sm:h-52 rounded-3xl bg-gradient-to-br from-amber-300 via-orange-400 to-orange-600 flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={selectedVip.image}
                  alt={selectedVip.name}
                  className="w-full h-full object-contain p-6 drop-shadow-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <p className="text-xs font-black text-[#FF9900] mt-5">
                {selectedVip.level}
              </p>

              <h2 className="text-3xl font-black">
                {selectedVip.name}
              </h2>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <InfoBox
                  title="Unlocked Amount"
                  value={selectedVip.unlocked}
                  muted={muted}
                />

                <InfoBox
                  title="Commission"
                  value={selectedVip.rate}
                  muted={muted}
                />

                <InfoBox
                  title="Daily Orders"
                  value={selectedVip.dailyOrders}
                  muted={muted}
                />

                <InfoBox
                  title="Commission Demo"
                  value={selectedVip.commission}
                  muted={muted}
                />
              </div>

              <div className="mt-5 p-4 rounded-xl bg-yellow-500/10">
                <p className="text-xs">
                  This is currently a demo order flow. Real order
                  processing will be connected with the database
                  later.
                </p>
              </div>

              <button
                onClick={startOrdering}
                className="w-full mt-5 py-3.5 rounded-xl bg-[#FF9900] text-black font-black flex items-center justify-center gap-2"
              >
                Start Ordering
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          CUSTOMER SERVICE CHAT
      ========================================================= */}

      {chatOpen && (
        <div
          className={`fixed right-4 bottom-24 z-[90] w-[340px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-2xl border overflow-hidden ${
            darkMode
              ? "bg-[#161B22] border-[#30363D]"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="bg-[#FF9900] text-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>

              <div>
                <p className="font-black">
                  Live Customer Service
                </p>

                <p className="text-xs font-medium">
                  Online • Usually replies quickly
                </p>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 h-64 overflow-y-auto">
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center text-black font-black">
                A
              </div>

              <div
                className={`max-w-[80%] p-3 rounded-2xl rounded-tl-none ${
                  darkMode
                    ? "bg-[#0D1117]"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-sm">
                  Hello! Welcome to Amazonshop Customer Service.
                  How can we help you?
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                value={chatMessage}
                onChange={(e) =>
                  setChatMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendChatMessage();
                  }
                }}
                placeholder="Type your message..."
                className={`flex-1 px-3 py-3 rounded-xl border outline-none text-sm ${input}`}
              />

              <button
                onClick={sendChatMessage}
                className="w-11 rounded-xl bg-[#FF9900] text-black flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed right-5 bottom-24 z-[70] w-14 h-14 rounded-full bg-[#FF9900] text-black shadow-xl flex items-center justify-center hover:scale-105 transition"
          title="Live Customer Service"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* =========================================================
          BOTTOM NAVIGATION
      ========================================================= */}

      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 border-t ${
          darkMode
            ? "bg-[#131921] border-[#30363D]"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-3xl mx-auto grid grid-cols-5">
          <BottomNavButton
            active={activeTab === "profile"}
            onClick={() => switchTab("profile")}
            icon={<User />}
            label="Profile"
          />

          <BottomNavButton
            active={activeTab === "recordOrder"}
            onClick={() => switchTab("recordOrder")}
            icon={<Clock3 />}
            label="Orders Record"
          />

          <BottomNavButton
            active={activeTab === "orders"}
            onClick={() => switchTab("orders")}
            icon={<ShoppingBag />}
            label="Orders"
          />

          <BottomNavButton
            active={activeTab === "withdraw"}
            onClick={() => switchTab("withdraw")}
            icon={<ArrowUpRight />}
            label="Withdraw"
          />

          <BottomNavButton
            active={activeTab === "home"}
            onClick={() => switchTab("home")}
            icon={<Home />}
            label="Home"
          />
        </div>
      </nav>
    </div>
  );
}

/* =============================================================
   PROFESSIONAL VIP CARD
============================================================= */

function VipCard({
  vip,
  darkMode,
  card,
  muted,
  onClick,
  showButton = false,
}: any) {
  return (
    <div
      className={`rounded-3xl border shadow-md overflow-hidden ${card}`}
    >
      <button
        onClick={onClick}
        className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 hover:border-[#FF9900] transition"
      >
        <div className="space-y-3 flex-1">
          <span className="inline-flex px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-500 text-[10px] font-black uppercase tracking-wider">
            {vip.level}
          </span>

          <h3 className="text-2xl sm:text-3xl font-black text-[#FF9900]">
            {vip.name}
          </h3>

          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs ${muted}`}
          >
            <div className="p-2.5 rounded-xl bg-gray-500/10">
              <span className="block text-[10px]">
                Unlocked
              </span>

              <strong
                className={
                  darkMode ? "text-white" : "text-gray-900"
                }
              >
                {vip.unlocked}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-500/10">
              <span className="block text-[10px]">
                Daily Orders
              </span>

              <strong
                className={
                  darkMode ? "text-white" : "text-gray-900"
                }
              >
                {vip.dailyOrders}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-500/10">
              <span className="block text-[10px]">
                Commission
              </span>

              <strong
                className={
                  darkMode ? "text-white" : "text-gray-900"
                }
              >
                {vip.rate}
              </strong>
            </div>
          </div>
        </div>

        {/* BIGGER PROFESSIONAL IMAGE */}
        <div className="w-full sm:w-48 md:w-56 h-40 sm:h-36 md:h-40 rounded-3xl bg-gradient-to-br from-amber-200 via-orange-400 to-orange-600 flex items-center justify-center overflow-hidden shrink-0 shadow-inner border border-orange-300/40">
          <img
            src={vip.image}
            alt={`${vip.name} ${vip.level}`}
            className="w-full h-full object-contain p-5 sm:p-4 md:p-5 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </button>

      {showButton && (
        <div className="px-4 sm:px-5 pb-5">
          <button
            onClick={onClick}
            className="w-full py-3.5 rounded-xl bg-[#FF9900] hover:bg-[#e88a00] text-black font-black flex items-center justify-center gap-2 shadow-md transition"
          >
            Grab Order
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* =============================================================
   INFO BOX
============================================================= */

function InfoBox({
  title,
  value,
  muted,
}: {
  title: string;
  value: any;
  muted: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-gray-500/10">
      <p className={`text-xs ${muted}`}>{title}</p>

      <p className="font-black mt-1">{value}</p>
    </div>
  );
}

/* =============================================================
   BOTTOM NAV BUTTON
============================================================= */

function BottomNavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-3 text-[10px] sm:text-xs font-bold transition ${
        active
          ? "text-[#FF9900]"
          : "text-gray-500 hover:text-[#FF9900]"
      }`}
    >
      <span className="[&>svg]:w-5 [&>svg]:h-5">
        {icon}
      </span>

      <span>{label}</span>
    </button>
  );
}