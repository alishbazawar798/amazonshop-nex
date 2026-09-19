"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Home,
  Users,
  ArrowDownToLine,
  Send,
  CheckCircle2,
  Wallet,
  Settings,
  History,
  UserCog,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  MessageCircle,
  Bell,
  Search,
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  UserRound,
  ChevronDown,
  Copy,
  Trash2,
  Pencil,
  Save,
  Eye,
  Upload,
  Headphones,
} from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "es", name: "Español" },
  { code: "nl", name: "Nederlands" },
  { code: "tr", name: "Türkçe" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
];

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "users", label: "User Management", icon: Users },
  { id: "withdrawals", label: "All Withdrawals", icon: ArrowDownToLine },
  { id: "notifications", label: "Send Notification", icon: Send },
  { id: "trades", label: "Completed Trades", icon: CheckCircle2 },
  { id: "deposit", label: "Deposit", icon: Wallet },
  { id: "payment", label: "Payment Settings", icon: Settings },
  { id: "activity", label: "All Activity", icon: History },
  { id: "admins", label: "Admin Users", icon: UserCog },
];

const vipPlans = [
  {
    id: "vip1",
    name: "Amazon",
    level: "VIP 1",
    amount: "20 USDT",
    orders: 25,
    commission: "4%",
    image: "/amazon.png",
  },
  {
    id: "vip2",
    name: "Alibaba",
    level: "VIP 2",
    amount: "500 USDT",
    orders: 25,
    commission: "8%",
    image: "/alibaba.png",
  },
  {
    id: "vip3",
    name: "Shopify",
    level: "VIP 3",
    amount: "899 USDT",
    orders: 25,
    commission: "12%",
    image: "/shopify.png",
  },
];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [languageOpen, setLanguageOpen] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [search, setSearch] = useState("");
  const [withdrawalFilter, setWithdrawalFilter] = useState("All");
  const [depositFilter, setDepositFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);

  const [usersLoading, setUsersLoading] = useState(false);
  const [withdrawalsLoading, setWithdrawalsLoading] = useState(false);
  const [depositsLoading, setDepositsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  const [trades] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }

    if (
      status === "authenticated" &&
      session?.user?.role !== "admin"
    ) {
      router.replace("/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.role === "admin"
    ) {
      loadUsers();
      loadWithdrawals();
      loadDeposits();
    }
  }, [status, session]);

  const isDark = darkMode;

  const bg = isDark ? "bg-[#0D1117]" : "bg-gray-100";

  const card = isDark
    ? "bg-[#161B22] border-[#30363D]"
    : "bg-white border-gray-200";

  const text = isDark ? "text-white" : "text-gray-900";

  const muted = isDark ? "text-gray-400" : "text-gray-500";

  function showNotification(text: string) {
    setNotification(text);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function changePage(page: string) {
    setActivePage(page);
    setSidebarOpen(false);
  }

  function logout() {
    signOut({
      callbackUrl: "/admin/login",
    });
  }

  async function loadUsers() {
    try {
      setUsersLoading(true);

      const response = await fetch(
        "/api/admin/users-management",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to load users."
        );
        return;
      }

      const formattedUsers = (data.users || []).map(
        (user: any) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          vip: user.vipLevel || "None",
          balance: Number(user.balance || 0),
          rewardPoints: Number(user.rewardPoints || 0),
          creditScore: Number(user.creditScore || 0),
          status: user.status || "Active",
          inviteCode: user.inviteCode || "",
          profileImage: user.profileImage || "",
        })
      );

      setUsers(formattedUsers);
    } catch (error) {
      console.error(error);
      showNotification("Failed to load users.");
    } finally {
      setUsersLoading(false);
    }
  }

  async function openUserProfile(userId: string) {
    try {
      setProfileLoading(true);
      setProfileOpen(true);

      const response = await fetch(
        `/api/admin/users-management?userId=${userId}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to load user profile."
        );
        setProfileOpen(false);
        return;
      }

      setSelectedUser(data.user);
    } catch (error) {
      console.error(error);
      showNotification("Failed to load profile.");
      setProfileOpen(false);
    } finally {
      setProfileLoading(false);
    }
  }

  async function saveUserProfile() {
    if (!selectedUser?._id) return;

    try {
      setProfileSaving(true);

      const response = await fetch(
        "/api/admin/users-management",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: selectedUser._id,
            updates: {
              name: selectedUser.name,
              email: selectedUser.email,
              balance: Number(selectedUser.balance || 0),
              rewardPoints: Number(
                selectedUser.rewardPoints || 0
              ),
              creditScore: Number(
                selectedUser.creditScore || 0
              ),
              vipLevel: selectedUser.vipLevel,
              status: selectedUser.status,
              inviteCode: selectedUser.inviteCode,
              profileImage:
                selectedUser.profileImage || "",
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to update user."
        );
        return;
      }

      showNotification("User profile updated successfully.");

      setSelectedUser(data.user);

      await loadUsers();
    } catch (error) {
      console.error(error);
      showNotification("Failed to update user.");
    } finally {
      setProfileSaving(false);
    }
  }

  async function toggleUser(userId: string) {
    const user = users.find(
      (item) => item.id === userId
    );

    if (!user) return;

    const newStatus =
      user.status === "Blocked"
        ? "Active"
        : "Blocked";

    try {
      setActionLoading(userId);

      const response = await fetch(
        "/api/admin/users-management",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            updates: {
              status: newStatus,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to update status."
        );
        return;
      }

      showNotification(
        newStatus === "Blocked"
          ? "User blocked successfully."
          : "User unblocked successfully."
      );

      await loadUsers();
    } catch (error) {
      console.error(error);
      showNotification("Something went wrong.");
    } finally {
      setActionLoading("");
    }
  }

  async function deleteUser(userId: string) {
    const user = users.find(
      (item) => item.id === userId
    );

    if (!user) return;

    const confirmed = window.confirm(
      `Delete ${user.name || user.email}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setActionLoading(userId);

      const response = await fetch(
        "/api/admin/users-management",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to delete user."
        );
        return;
      }

      showNotification("User deleted successfully.");

      if (
        selectedUser?._id === userId
      ) {
        setSelectedUser(null);
        setProfileOpen(false);
      }

      await loadUsers();
    } catch (error) {
      console.error(error);
      showNotification("Failed to delete user.");
    } finally {
      setActionLoading("");
    }
  }

  async function loadWithdrawals() {
    try {
      setWithdrawalsLoading(true);

      const response = await fetch(
        "/api/admin/withdrawals",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to load withdrawals."
        );
        return;
      }

      setWithdrawals(data.withdrawals || []);
    } catch (error) {
      console.error(error);
      showNotification("Failed to load withdrawals.");
    } finally {
      setWithdrawalsLoading(false);
    }
  }

  async function loadDeposits() {
    try {
      setDepositsLoading(true);

      const response = await fetch(
        "/api/admin/deposits",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message || "Failed to load deposits."
        );
        return;
      }

      setDeposits(data.deposits || []);
    } catch (error) {
      console.error(error);
      showNotification("Failed to load deposits.");
    } finally {
      setDepositsLoading(false);
    }
  }

  async function processWithdrawal(
    withdrawalId: string,
    action: string
  ) {
    try {
      setActionLoading(withdrawalId);

      const response = await fetch(
        "/api/admin/withdrawals",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            withdrawalId,
            action,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message ||
            "Failed to process withdrawal."
        );
        return;
      }

      showNotification(data.message);

      await loadWithdrawals();
      await loadUsers();
    } catch (error) {
      console.error(error);
      showNotification("Something went wrong.");
    } finally {
      setActionLoading("");
    }
  }

  async function processDeposit(
    depositId: string,
    action: string
  ) {
    try {
      setActionLoading(depositId);

      const response = await fetch(
        "/api/admin/deposits",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            depositId,
            action,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message ||
            "Failed to process deposit."
        );
        return;
      }

      showNotification(data.message);

      await loadDeposits();
      await loadUsers();
    } catch (error) {
      console.error(error);
      showNotification("Something went wrong.");
    } finally {
      setActionLoading("");
    }
  }

  function sendNotification() {
    if (!message.trim()) {
      showNotification(
        "Please enter a notification."
      );
      return;
    }

    setMessage("");

    showNotification(
      "Notification API will be connected next."
    );
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      userFilter === "All" ||
      user.status === userFilter;

    return matchesSearch && matchesFilter;
  });

  const filteredWithdrawals =
    withdrawals.filter((item) => {
      if (withdrawalFilter === "All") {
        return true;
      }

      return item.status === withdrawalFilter;
    });

  if (
    status === "loading" ||
    !session ||
    session.user?.role !== "admin"
  ) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-400">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bg} ${text}`}>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          border-r
          flex flex-col
          transition-transform duration-300
          ${card}
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* PROFESSIONAL LOGO */}

        <div className="h-24 px-5 border-b border-[#30363D] flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 flex items-center justify-center shadow-xl shadow-orange-500/30 border border-orange-300/20">
              <div className="w-10 h-10 rounded-xl border-2 border-white/90 flex items-center justify-center">
                <span className="text-2xl font-black text-white">
                  A
                </span>
              </div>
            </div>

            <div>
              <h1 className="font-black text-xl tracking-tight">
                Amazonshop
              </h1>

              <p className="text-[10px] text-orange-500 font-black tracking-[0.18em]">
                ADMIN PANEL
              </p>
            </div>

          </div>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="lg:hidden text-gray-400"
          >
            <X size={20} />
          </button>

        </div>

        {/* ADMIN ACCOUNT */}

        <div className="p-4 border-b border-[#30363D]">

          <div
            className={`rounded-xl p-3 ${
              isDark
                ? "bg-[#0D1117]"
                : "bg-gray-50"
            }`}
          >

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <ShieldCheck
                  className="text-white"
                  size={20}
                />
              </div>

              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {session.user?.name || "Admin"}
                </p>

                <p
                  className={`text-xs truncate ${muted}`}
                >
                  {session.user?.email}
                </p>
              </div>

            </div>

          </div>

        </div>

        <div className="px-4 pt-5 pb-2">
          <p
            className={`text-[11px] font-bold uppercase tracking-widest ${muted}`}
          >
            Main Menu
          </p>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() =>
                  changePage(item.id)
                }
                className={`
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-xl
                  text-left transition
                  ${
                    active
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : `${muted} hover:bg-orange-500/10 hover:text-orange-500`
                  }
                `}
              >
                <Icon size={19} />

                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}

        </nav>

        <div className="p-4 border-t border-[#30363D]">

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut size={19} />

            <span className="text-sm font-medium">
              Exit Panel
            </span>
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <div className="lg:ml-72 min-h-screen">

        <header
          className={`sticky top-0 z-30 h-20 border-b backdrop-blur-xl ${
            isDark
              ? "bg-[#131921]/90 border-[#30363D]"
              : "bg-white/90 border-gray-200"
          }`}
        >

          <div className="h-full px-4 sm:px-6 flex items-center justify-between">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="lg:hidden"
            >
              <Menu size={23} />
            </button>

            <div className="hidden sm:block">

              <p
                className={`text-xs ${muted}`}
              >
                Amazonshop Administration
              </p>

              <h2 className="font-bold">
                {getPageTitle(activePage)}
              </h2>

            </div>

            <div className="flex items-center gap-2 ml-auto">

              {/* LANGUAGE */}

              <div className="relative">

                <button
                  onClick={() =>
                    setLanguageOpen(
                      !languageOpen
                    )
                  }
                  className={`h-10 px-3 rounded-xl border flex items-center gap-2 ${
                    isDark
                      ? "border-[#30363D] bg-[#161B22]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Globe size={17} />

                  <span className="hidden sm:block text-sm">
                    {
                      languages.find(
                        (item) =>
                          item.code ===
                          language
                      )?.name
                    }
                  </span>

                  <ChevronDown size={15} />
                </button>

                {languageOpen && (
                  <div
                    className={`absolute right-0 top-12 w-44 rounded-xl border shadow-2xl p-2 z-50 ${
                      isDark
                        ? "bg-[#161B22] border-[#30363D]"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(
                            lang.code
                          );
                          setLanguageOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-orange-500/10 hover:text-orange-500 ${
                          language ===
                          lang.code
                            ? "text-orange-500"
                            : ""
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {/* THEME */}

              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDark
                    ? "border-[#30363D] bg-[#161B22]"
                    : "border-gray-200 bg-white"
                }`}
              >
                {isDark ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              {/* NOTIFICATION */}

              <button
                onClick={() =>
                  showNotification(
                    "You have no new notifications."
                  )
                }
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDark
                    ? "border-[#30363D] bg-[#161B22]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Bell size={18} />
              </button>

            </div>

          </div>

        </header>

        <main className="p-4 sm:p-6 lg:p-8 pb-28">

          {activePage === "home" && (
            <HomeOverview
              card={card}
              muted={muted}
            />
          )}

          {activePage === "users" && (
            <UserManagement
              card={card}
              muted={muted}
              users={filteredUsers}
              search={search}
              setSearch={setSearch}
              userFilter={userFilter}
              setUserFilter={setUserFilter}
              toggleUser={toggleUser}
              deleteUser={deleteUser}
              openUserProfile={openUserProfile}
              loading={usersLoading}
              actionLoading={actionLoading}
            />
          )}

          {activePage === "withdrawals" && (
            <Withdrawals
              card={card}
              muted={muted}
              withdrawals={
                filteredWithdrawals
              }
              filter={withdrawalFilter}
              setFilter={
                setWithdrawalFilter
              }
              updateWithdrawal={
                processWithdrawal
              }
              loading={
                withdrawalsLoading
              }
              actionLoading={
                actionLoading
              }
            />
          )}

          {activePage === "notifications" && (
            <Notifications
              card={card}
              muted={muted}
              message={message}
              setMessage={setMessage}
              sendNotification={
                sendNotification
              }
            />
          )}

          {activePage === "trades" && (
            <CompletedTrades
              card={card}
              muted={muted}
              trades={trades}
            />
          )}

          {activePage === "deposit" && (
            <DepositManagement
              card={card}
              muted={muted}
              deposits={deposits}
              filter={depositFilter}
              setFilter={setDepositFilter}
              processDeposit={
                processDeposit
              }
              loading={
                depositsLoading
              }
              actionLoading={
                actionLoading
              }
            />
          )}

          {activePage === "payment" && (
            <PaymentSettings
              card={card}
              muted={muted}
              showNotification={
                showNotification
              }
            />
          )}

          {activePage === "activity" && (
            <ActivityPage
              card={card}
              muted={muted}
            />
          )}

          {activePage === "admins" && (
            <AdminUsers
              card={card}
              muted={muted}
              session={session}
            />
          )}

        </main>

        {/* MOBILE NAV */}

        <div
          className={`fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t ${
            isDark
              ? "bg-[#131921] border-[#30363D]"
              : "bg-white border-gray-200"
          }`}
        >

          <div className="grid grid-cols-5 h-16">

            <BottomNav
              icon={Home}
              label="Home"
              active={
                activePage === "home"
              }
              onClick={() =>
                changePage("home")
              }
            />

            <BottomNav
              icon={Wallet}
              label="Deposit"
              active={
                activePage === "deposit"
              }
              onClick={() =>
                changePage("deposit")
              }
            />

            <BottomNav
              icon={ShoppingBag}
              label="Orders"
              active={
                activePage === "trades"
              }
              onClick={() =>
                changePage("trades")
              }
            />

            <BottomNav
              icon={History}
              label="Activity"
              active={
                activePage === "activity"
              }
              onClick={() =>
                changePage("activity")
              }
            />

            <BottomNav
              icon={UserRound}
              label="Admins"
              active={
                activePage === "admins"
              }
              onClick={() =>
                changePage("admins")
              }
            />

          </div>

        </div>

      </div>

      {/* CUSTOMER SERVICE WIDGET */}

      <div className="fixed bottom-20 lg:bottom-7 right-5 z-[80]">

        {chatOpen && (
          <div
            className={`absolute bottom-16 right-0 w-[315px] sm:w-[370px] rounded-2xl border shadow-2xl overflow-hidden ${
              isDark
                ? "bg-[#161B22] border-[#30363D]"
                : "bg-white border-gray-200"
            }`}
          >

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
                    <Headphones size={22} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Customer Service
                    </p>

                    <p className="text-xs text-orange-100">
                      Admin Support • Online
                    </p>
                  </div>

                </div>

                <button
                  onClick={() =>
                    setChatOpen(false)
                  }
                >
                  <X size={19} />
                </button>

              </div>

            </div>

            <div className="p-4">

              <div
                className={`rounded-xl p-4 ${
                  isDark
                    ? "bg-[#0D1117]"
                    : "bg-gray-50"
                }`}
              >
                <p className="text-sm font-medium">
                  Hello Admin 👋
                </p>

                <p
                  className={`text-xs mt-1 ${muted}`}
                >
                  Customer service widget is ready.
                </p>
              </div>

              <button
                onClick={() =>
                  showNotification(
                    "Customer service opened."
                  )
                }
                className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 text-sm font-semibold"
              >
                Open Customer Service
              </button>

            </div>

          </div>
        )}

        <button
          onClick={() =>
            setChatOpen(!chatOpen)
          }
          className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/30"
        >
          {chatOpen ? (
            <X size={23} />
          ) : (
            <Headphones size={23} />
          )}
        </button>

      </div>

      {/* USER PROFILE MODAL */}

      {profileOpen && (
        <UserProfileModal
          user={selectedUser}
          loading={profileLoading}
          saving={profileSaving}
          setUser={setSelectedUser}
          onClose={() => {
            setProfileOpen(false);
            setSelectedUser(null);
          }}
          onSave={saveUserProfile}
          onDelete={deleteUser}
          card={card}
          muted={muted}
        />
      )}

      {notification && (
        <div className="fixed top-24 right-5 z-[100] bg-orange-500 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium">
          {notification}
        </div>
      )}

    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomeOverview({ card, muted }) {
  return (
    <div>

      <div className="mb-7">
        <h1 className="text-3xl font-black">
          Home Overview
        </h1>

        <p className={`mt-1 ${muted}`}>
          Amazonshop administration overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total System Trades"
          value="0"
          icon={TrendingUp}
          card={card}
          muted={muted}
        />

        <StatCard
          title="Active VIP Members"
          value="0"
          icon={Users}
          card={card}
          muted={muted}
        />

        <StatCard
          title="Total Volume"
          value="0 USDT"
          icon={DollarSign}
          card={card}
          muted={muted}
        />

        <StatCard
          title="Pending Withdrawals"
          value="0"
          icon={ArrowDownToLine}
          card={card}
          muted={muted}
        />

      </div>

      <div
        className={`rounded-2xl border p-6 mt-6 ${card}`}
      >

        <h2 className="font-bold text-xl">
          System Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">

          <Status title="Authentication" />
          <Status title="MongoDB" />
          <Status title="NextAuth JWT" />
          <Status title="Admin Security" />

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   USER MANAGEMENT
========================================================= */

function UserManagement({
  card,
  muted,
  users,
  search,
  setSearch,
  userFilter,
  setUserFilter,
  toggleUser,
  deleteUser,
  openUserProfile,
  loading,
  actionLoading,
}) {
  return (
    <PageContainer
      title="User Management"
      subtitle="View, edit, block, unblock and delete Amazonshop users."
    >

      <div
        className={`rounded-2xl border p-5 ${card}`}
      >

        <div className="flex flex-col lg:flex-row gap-3 justify-between mb-5">

          <div className="relative w-full lg:max-w-sm">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search user..."
              className="w-full h-11 rounded-xl bg-[#0D1117] border border-[#30363D] pl-10 pr-4 text-white outline-none focus:border-orange-500"
            />

          </div>

          <div className="flex gap-2 flex-wrap">

            {[
              "All",
              "Active",
              "Blocked",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setUserFilter(filter)
                }
                className={`px-4 py-2 rounded-xl text-sm ${
                  userFilter === filter
                    ? "bg-orange-500 text-white"
                    : "border border-[#30363D] text-gray-400"
                }`}
              >
                {filter}
              </button>
            ))}

          </div>

        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-[#30363D] text-gray-500">

                  <th className="text-left py-4">
                    User
                  </th>

                  <th className="text-left py-4">
                    VIP
                  </th>

                  <th className="text-left py-4">
                    Balance
                  </th>

                  <th className="text-left py-4">
                    Status
                  </th>

                  <th className="text-right py-4">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b border-[#30363D]/50 hover:bg-orange-500/5"
                  >

                    <td className="py-4">

                      <button
                        onClick={() =>
                          openUserProfile(
                            user.id
                          )
                        }
                        className="text-left"
                      >

                        <p className="font-semibold hover:text-orange-500">
                          {user.name}
                        </p>

                        <p
                          className={`text-xs ${muted}`}
                        >
                          {user.email}
                        </p>

                      </button>

                    </td>

                    <td className="py-4 text-orange-500 font-semibold">
                      {user.vip}
                    </td>

                    <td className="py-4">
                      {Number(
                        user.balance || 0
                      ).toFixed(2)}{" "}
                      USDT
                    </td>

                    <td className="py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.status ===
                          "Active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>

                    </td>

                    <td className="py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            openUserProfile(
                              user.id
                            )
                          }
                          className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() =>
                            toggleUser(user.id)
                          }
                          disabled={
                            actionLoading ===
                            user.id
                          }
                          className="px-3 py-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 text-xs font-semibold"
                        >
                          {user.status ===
                          "Blocked"
                            ? "Unblock"
                            : "Block"}
                        </button>

                        <button
                          onClick={() =>
                            deleteUser(user.id)
                          }
                          disabled={
                            actionLoading ===
                            user.id
                          }
                          className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {users.length === 0 && (
              <div className="py-10 text-center text-gray-500">
                No users found.
              </div>
            )}

          </div>
        )}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   USER PROFILE MODAL
========================================================= */

function UserProfileModal({
  user,
  loading,
  saving,
  setUser,
  onClose,
  onSave,
  onDelete,
  card,
  muted,
}) {
  if (!user && !loading) return null;

  function update(field, value) {
    setUser((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function uploadProfileImage(file) {
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("Please select an image smaller than 1MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      update(
        "profileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div
        className={`w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl ${card}`}
      >

        <div className="sticky top-0 z-10 bg-inherit border-b border-[#30363D] p-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              User Profile
            </h2>

            <p className={`text-xs mt-1 ${muted}`}>
              Admin can edit this user's account.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-red-500/10 text-gray-400"
          >
            <X size={20} />
          </button>

        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading user profile...
          </div>
        ) : (
          <div className="p-5 sm:p-7">

            {/* PROFILE IMAGE */}

            <div className="flex items-center gap-5 mb-7">

              <div className="relative">

                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center">

                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={40}
                      className="text-orange-500"
                    />
                  )}

                </div>

                <label className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center cursor-pointer shadow-lg">
                  <Upload size={16} />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      uploadProfileImage(
                        e.target.files?.[0]
                      )
                    }
                  />
                </label>

              </div>

              <div>
                <h3 className="font-bold text-lg">
                  {user.name}
                </h3>

                <p className={`text-sm ${muted}`}>
                  {user.email}
                </p>

                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-500">
                  {user.role || "user"}
                </span>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <EditField
                label="Full Name"
                value={user.name || ""}
                onChange={(value) =>
                  update("name", value)
                }
              />

              <EditField
                label="Email"
                value={user.email || ""}
                onChange={(value) =>
                  update("email", value)
                }
                type="email"
              />

              <EditField
                label="Balance"
                value={user.balance ?? 0}
                onChange={(value) =>
                  update(
                    "balance",
                    Number(value)
                  )
                }
                type="number"
              />

              <EditField
                label="Reward Points"
                value={
                  user.rewardPoints ?? 0
                }
                onChange={(value) =>
                  update(
                    "rewardPoints",
                    Number(value)
                  )
                }
                type="number"
              />

              <EditField
                label="Credit Score"
                value={
                  user.creditScore ?? 0
                }
                onChange={(value) =>
                  update(
                    "creditScore",
                    Number(value)
                  )
                }
                type="number"
              />

              <EditField
                label="Invite Code"
                value={
                  user.inviteCode || ""
                }
                onChange={(value) =>
                  update(
                    "inviteCode",
                    value
                  )
                }
              />

              <div>
                <label className="text-sm font-semibold">
                  VIP Level
                </label>

                <select
                  value={
                    user.vipLevel || "None"
                  }
                  onChange={(e) =>
                    update(
                      "vipLevel",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] px-4 text-white outline-none focus:border-orange-500"
                >
                  <option value="None">
                    None
                  </option>
                  <option value="VIP 1">
                    VIP 1
                  </option>
                  <option value="VIP 2">
                    VIP 2
                  </option>
                  <option value="VIP 3">
                    VIP 3
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Account Status
                </label>

                <select
                  value={
                    user.status ||
                    "Active"
                  }
                  onChange={(e) =>
                    update(
                      "status",
                      e.target.value
                    )
                  }
                  className="w-full mt-2 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] px-4 text-white outline-none focus:border-orange-500"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Blocked">
                    Blocked
                  </option>
                </select>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                onClick={onSave}
                disabled={saving}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Save size={18} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                onClick={() =>
                  onDelete(user._id)
                }
                className="sm:w-40 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full mt-2 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] px-4 text-white outline-none focus:border-orange-500"
      />
    </div>
  );
}

/* =========================================================
   PAYMENT SETTINGS
========================================================= */

function PaymentSettings({
  card,
  muted,
  showNotification,
}) {
  const [binanceAccount, setBinanceAccount] =
    useState("");

  const [usdt, setUsdt] = useState("");
  const [usdc, setUsdc] = useState("");

  const [usdtQr, setUsdtQr] = useState("");
  const [usdcQr, setUsdcQr] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const response = await fetch(
        "/api/admin/payment-settings",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) return;

      const settings = data.settings || {};

      setBinanceAccount(
        settings.binanceAccount || ""
      );

      setUsdt(settings.usdtAddress || "");
      setUsdc(settings.usdcAddress || "");

      setUsdtQr(settings.usdtQrCode || "");
      setUsdcQr(settings.usdcQrCode || "");
    } catch (error) {
      console.error(error);
    }
  }

  function handleQr(
    file: File | undefined,
    setter: (value: string) => void
  ) {
    if (!file) return;

    if (file.size > 1024 * 1024) {
      showNotification(
        "QR image must be smaller than 1MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setter(String(reader.result));
    };

    reader.readAsDataURL(file);
  }

  async function saveSettings() {
    try {
      setSaving(true);

      const response = await fetch(
        "/api/admin/payment-settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            binanceAccount,
            usdtAddress: usdt,
            usdtNetwork: "TRC20",
            usdtQrCode: usdtQr,
            usdcAddress: usdc,
            usdcNetwork: "TRC20",
            usdcQrCode: usdcQr,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message ||
            "Failed to save payment settings."
        );
        return;
      }

      showNotification(
        "Payment settings saved successfully."
      );
    } catch (error) {
      console.error(error);
      showNotification(
        "Failed to save payment settings."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageContainer
      title="Payment Settings"
      subtitle="Set the Binance payment account and QR codes users will see."
    >

      <div
        className={`max-w-4xl rounded-2xl border p-6 ${card}`}
      >

        <div className="space-y-6">

          <div>
            <label className="text-sm font-semibold">
              Binance Account / Payment ID
            </label>

            <input
              value={binanceAccount}
              onChange={(e) =>
                setBinanceAccount(
                  e.target.value
                )
              }
              placeholder="Enter Binance account or payment ID"
              className="w-full mt-2 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] px-4 text-white outline-none focus:border-orange-500"
            />
          </div>

          <div className="h-px bg-[#30363D]" />

          {/* USDT */}

          <div>
            <h3 className="font-bold text-lg">
              USDT Payment
            </h3>

            <p className={`text-sm mt-1 ${muted}`}>
              USDT TRC20 Binance wallet
            </p>

            <input
              value={usdt}
              onChange={(e) =>
                setUsdt(e.target.value)
              }
              placeholder="Enter USDT TRC20 address"
              className="w-full mt-3 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] px-4 text-white outline-none focus:border-orange-500"
            />

            <div className="mt-4">

              <label className="text-sm font-semibold">
                USDT QR Code
              </label>

              <div className="mt-2 flex flex-col sm:flex-row gap-4 items-start">

                {usdtQr && (
                  <img
                    src={usdtQr}
                    alt="USDT QR"
                    className="w-32 h-32 object-contain rounded-xl bg-white p-2"
                  />
                )}

                <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Upload size={17} />
                  Upload USDT QR
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleQr(
                        e.target.files?.[0],
                        setUsdtQr
                      )
                    }
                  />
                </label>

              </div>

            </div>

          </div>

          <div className="h-px bg-[#30363D]" />

          {/* USDC */}

          <div>
            <h3 className="font-bold text-lg">
              USDC Payment
            </h3>

            <p className={`text-sm mt-1 ${muted}`}>
              USDC TRC20 Binance wallet
            </p>

            <input
              value={usdc}
              onChange={(e) =>
                setUsdc(e.target.value)
              }
              placeholder="Enter USDC TRC20 address"
              className="w-full mt-3 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] px-4 text-white outline-none focus:border-orange-500"
            />

            <div className="mt-4">

              <label className="text-sm font-semibold">
                USDC QR Code
              </label>

              <div className="mt-2 flex flex-col sm:flex-row gap-4 items-start">

                {usdcQr && (
                  <img
                    src={usdcQr}
                    alt="USDC QR"
                    className="w-32 h-32 object-contain rounded-xl bg-white p-2"
                  />
                )}

                <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2">
                  <Upload size={17} />
                  Upload USDC QR
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleQr(
                        e.target.files?.[0],
                        setUsdcQr
                      )
                    }
                  />
                </label>

              </div>

            </div>

          </div>

          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-7 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Payment Settings"}
          </button>

        </div>

      </div>

    </PageContainer>
  );
}

/* =========================================================
   WITHDRAWALS
========================================================= */

function Withdrawals({
  card,
  muted,
  withdrawals,
  filter,
  setFilter,
  updateWithdrawal,
  loading,
  actionLoading,
}) {
  return (
    <PageContainer
      title="All Withdrawals"
      subtitle="Review and manage withdrawal requests."
    >

      <div
        className={`rounded-2xl border p-5 ${card}`}
      >

        <div className="flex gap-2 mb-5 flex-wrap">

          {[
            "All",
            "Pending",
            "Approved",
            "Rejected",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-4 py-2 rounded-xl text-sm ${
                filter === item
                  ? "bg-orange-500 text-white"
                  : "border border-[#30363D] text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading withdrawals...
          </div>
        ) : withdrawals.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No withdrawal requests found.
          </div>
        ) : (
          <div className="space-y-3">

            {withdrawals.map((item) => (
              <div
                key={item._id}
                className="border border-[#30363D] rounded-xl p-4"
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                  <div>
                    <p className="font-bold">
                      #
                      {item._id
                        .slice(-8)
                        .toUpperCase()}
                    </p>

                    <p className={`text-sm ${muted}`}>
                      {item.user?.name ||
                        "Unknown User"}
                    </p>

                    <p className={`text-xs ${muted}`}>
                      {item.user?.email ||
                        "No email"}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      {item.amount}{" "}
                      {item.currency}
                    </p>

                    <p className={`text-xs ${muted}`}>
                      {item.network ||
                        "TRC20"}
                    </p>
                  </div>

                  <div className="max-w-xs">
                    <p className={`text-xs ${muted}`}>
                      Wallet Address
                    </p>

                    <p className="text-xs break-all mt-1">
                      {item.walletAddress}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs w-fit ${
                      item.status ===
                      "Approved"
                        ? "bg-green-500/10 text-green-400"
                        : item.status ===
                          "Rejected"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>

                  {item.status ===
                    "Pending" && (
                    <div className="flex gap-2">

                      <button
                        disabled={
                          actionLoading ===
                          item._id
                        }
                        onClick={() =>
                          updateWithdrawal(
                            item._id,
                            "approve"
                          )
                        }
                        className="px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-semibold disabled:opacity-50"
                      >
                        {actionLoading ===
                        item._id
                          ? "..."
                          : "Approve"}
                      </button>

                      <button
                        disabled={
                          actionLoading ===
                          item._id
                        }
                        onClick={() =>
                          updateWithdrawal(
                            item._id,
                            "reject"
                          )
                        }
                        className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold disabled:opacity-50"
                      >
                        Reject
                      </button>

                    </div>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   DEPOSITS
========================================================= */

function DepositManagement({
  card,
  muted,
  deposits,
  filter,
  setFilter,
  processDeposit,
  loading,
  actionLoading,
}) {
  const filtered = deposits.filter(
    (item) =>
      filter === "All" ||
      item.status === filter
  );

  return (
    <PageContainer
      title="Deposit Management"
      subtitle="Review and manage deposit requests."
    >

      <div
        className={`rounded-2xl border p-5 ${card}`}
      >

        <div className="flex gap-2 mb-5 flex-wrap">

          {[
            "All",
            "Pending",
            "Approved",
            "Rejected",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-4 py-2 rounded-xl text-sm ${
                filter === item
                  ? "bg-orange-500 text-white"
                  : "border border-[#30363D] text-gray-400"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading deposits...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No deposit requests found.
          </div>
        ) : (
          <div className="space-y-3">

            {filtered.map((item) => (
              <div
                key={item._id}
                className="border border-[#30363D] rounded-xl p-4"
              >

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                  <div>
                    <p className="font-bold">
                      #
                      {item._id
                        .slice(-8)
                        .toUpperCase()}
                    </p>

                    <p className={`text-sm ${muted}`}>
                      {item.user?.name ||
                        "Unknown User"}
                    </p>

                    <p className={`text-xs ${muted}`}>
                      {item.user?.email ||
                        "No email"}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      {item.amount}{" "}
                      {item.currency}
                    </p>

                    <p className={`text-xs ${muted}`}>
                      {item.network ||
                        "TRC20"}
                    </p>
                  </div>

                  <div className="max-w-xs">
                    <p className={`text-xs ${muted}`}>
                      Transaction Hash
                    </p>

                    <p className="text-xs break-all mt-1">
                      {item.txHash}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs w-fit ${
                      item.status ===
                      "Approved"
                        ? "bg-green-500/10 text-green-400"
                        : item.status ===
                          "Rejected"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>

                  {item.status ===
                    "Pending" && (
                    <div className="flex gap-2">

                      <button
                        disabled={
                          actionLoading ===
                          item._id
                        }
                        onClick={() =>
                          processDeposit(
                            item._id,
                            "approve"
                          )
                        }
                        className="px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-semibold disabled:opacity-50"
                      >
                        {actionLoading ===
                        item._id
                          ? "..."
                          : "Approve"}
                      </button>

                      <button
                        disabled={
                          actionLoading ===
                          item._id
                        }
                        onClick={() =>
                          processDeposit(
                            item._id,
                            "reject"
                          )
                        }
                        className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold disabled:opacity-50"
                      >
                        Reject
                      </button>

                    </div>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function Notifications({
  card,
  muted,
  message,
  setMessage,
  sendNotification,
}) {
  return (
    <PageContainer
      title="Send Notification"
      subtitle="Send notifications to your users."
    >

      <div
        className={`max-w-2xl rounded-2xl border p-6 ${card}`}
      >

        <label className="block text-sm font-semibold mb-2">
          Notification Message
        </label>

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          rows={6}
          placeholder="Write your notification..."
          className="w-full rounded-xl bg-[#0D1117] border border-[#30363D] p-4 text-white outline-none focus:border-orange-500 resize-none"
        />

        <button
          onClick={sendNotification}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          <Send
            size={17}
            className="inline mr-2"
          />
          Send Notification
        </button>

      </div>

    </PageContainer>
  );
}

/* =========================================================
   COMPLETED TRADES
========================================================= */

function CompletedTrades({
  card,
  muted,
  trades,
}) {
  return (
    <PageContainer
      title="Completed Trades"
      subtitle="View successfully completed VIP trades."
    >

      <div
        className={`rounded-2xl border p-5 ${card}`}
      >

        {trades.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No completed trades found.
          </div>
        ) : (
          <div className="space-y-3">

            {trades.map((trade) => (
              <div
                key={trade.id}
                className="border border-[#30363D] rounded-xl p-4"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="font-bold">
                      {trade.id}
                    </p>

                    <p className={`text-sm ${muted}`}>
                      {trade.user} •{" "}
                      {trade.vip}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      {trade.amount}
                    </p>

                    <p className="text-xs text-orange-500">
                      Commission{" "}
                      {trade.commission}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs h-fit">
                    Completed
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   ACTIVITY
========================================================= */

function ActivityPage({
  card,
  muted,
}) {
  const activities = [
    {
      title: "Admin Login",
      description:
        "Admin accessed the panel.",
      time: "Just now",
    },
    {
      title: "System Started",
      description:
        "Amazonshop admin system initialized.",
      time: "Today",
    },
  ];

  return (
    <PageContainer
      title="All Activity"
      subtitle="View recent system activity."
    >

      <div
        className={`rounded-2xl border p-6 ${card}`}
      >

        <div className="space-y-5">

          {activities.map(
            (activity, index) => (
              <div
                key={index}
                className="flex gap-4"
              >

                <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <History size={18} />
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-3">

                    <h3 className="font-semibold">
                      {activity.title}
                    </h3>

                    <span
                      className={`text-xs ${muted}`}
                    >
                      {activity.time}
                    </span>

                  </div>

                  <p
                    className={`text-sm mt-1 ${muted}`}
                  >
                    {activity.description}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </PageContainer>
  );
}

/* =========================================================
   ADMIN USERS
========================================================= */

function AdminUsers({
  card,
  muted,
  session,
}) {
  const admins = [
    {
      id: 1,
      name:
        session.user?.name ||
        "Admin 1",
      email:
        session.user?.email ||
        "admin@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Admin 2",
      email: "admin2@example.com",
      status: "Available",
    },
    {
      id: 3,
      name: "Admin 3",
      email: "admin3@example.com",
      status: "Available",
    },
  ];

  return (
    <PageContainer
      title="Admin Users"
      subtitle="Maximum 3 administrator accounts are allowed."
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {admins.map((admin) => (
          <div
            key={admin.id}
            className={`rounded-2xl border p-5 ${card}`}
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {admin.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400">
                {admin.status}
              </span>

            </div>

            <h3 className="font-bold mt-5">
              {admin.name}
            </h3>

            <p
              className={`text-sm mt-1 ${muted}`}
            >
              {admin.email}
            </p>

            <p className="text-xs text-orange-500 mt-4 font-semibold">
              Administrator #{admin.id}
            </p>

          </div>
        ))}

      </div>

    </PageContainer>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function PageContainer({
  title,
  subtitle,
  children,
}) {
  return (
    <div>

      <div className="mb-7">

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="text-gray-500 mt-1">
          {subtitle}
        </p>

      </div>

      {children}

    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  card,
  muted,
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${card}`}
    >

      <div className="flex items-center justify-between">

        <div>

          <p
            className={`text-sm ${muted}`}
          >
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">

          <Icon
            className="text-orange-500"
            size={22}
          />

        </div>

      </div>

    </div>
  );
}

function Status({ title }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D1117] border border-[#30363D]">

      <div className="flex items-center gap-3">

        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

        <span className="text-sm">
          {title}
        </span>

      </div>

      <span className="text-xs text-green-400">
        Active
      </span>

    </div>
  );
}

function BottomNav({
  icon: Icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 text-[10px] ${
        active
          ? "text-orange-500"
          : "text-gray-500"
      }`}
    >
      <Icon size={19} />
      <span>{label}</span>
    </button>
  );
}

function getPageTitle(page) {
  const item = menuItems.find(
    (item) => item.id === page
  );

  return item?.label || "Home";
}