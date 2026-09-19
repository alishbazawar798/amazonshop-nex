"use client";

import { FormEvent, ReactNode, createContext, useContext, useState } from "react";
import {
  Home,
  Wallet,
  ShoppingBag,
  ClipboardList,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Users,
  Bell,
  CreditCard,
  Activity,
  ShieldCheck,
  ArrowDownToLine,
  ArrowUpFromLine,
  Copy,
  Check,
  ChevronRight,
  Crown,
  Package,
  TrendingUp,
  Clock3,
  CircleCheck,
  Languages,
  Moon,
  Sun,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import {
  Language,
  languages,
  translations,
} from "./translations";

type Role = "user" | "admin";

type Screen =
  | "home"
  | "deposit"
  | "withdraw"
  | "orders"
  | "record"
  | "profile"
  | "users"
  | "withdrawals"
  | "notifications"
  | "completed"
  | "payments"
  | "activity"
  | "admins";

type VipPackage = {
  id: string;
  name: string;
  subtitle: string;
  unlocked: number;
  orders: number;
  commission: number;
  logo: string;
  description: string;
  gradient: string;
};

const vipPackages: VipPackage[] = [
  {
    id: "vip1",
    name: "Amazon",
    subtitle: "VIP 1",
    unlocked: 20,
    orders: 25,
    commission: 4,
    logo: "/logos/amazon.png",
    description: "Start your VIP journey with Amazon orders.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    id: "vip2",
    name: "Alibaba",
    subtitle: "VIP 2",
    unlocked: 500,
    orders: 25,
    commission: 8,
    logo: "/logos/alibaba.png",
    description: "Higher level orders with increased commission.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "vip3",
    name: "Shopify",
    subtitle: "VIP 3",
    unlocked: 899,
    orders: 25,
    commission: 12,
    logo: "/logos/shopify.png",
    description: "Premium VIP package with maximum commission.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const sampleUsers = [
  { username: "Bhaviksssss", invite: "WUpB97", status: "Active" },
  { username: "user1", invite: "AMZ786", status: "Active" },
  { username: "user2", invite: "VIP2026", status: "Active" },
  { username: "blocked_user", invite: "SHOP888", status: "Blocked" },
];

const sampleRecords = [
  {
    name: "Amazon",
    level: "VIP 1",
    amount: "20.00",
    commission: "0.80",
    status: "Completed",
  },
  {
    name: "Alibaba",
    level: "VIP 2",
    amount: "500.00",
    commission: "40.00",
    status: "Completed",
  },
  {
    name: "Shopify",
    level: "VIP 3",
    amount: "899.00",
    commission: "107.88",
    status: "Completed",
  },
];

type Translation = {
  [K in keyof typeof translations.English]: string;
};

const LanguageContext = createContext<Translation>(
  translations.English as Translation
);

function useTranslation() {
  return useContext(LanguageContext);
}

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [role, setRole] = useState<Role>("user");
  const [screen, setScreen] = useState<Screen>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedVip, setSelectedVip] = useState<VipPackage | null>(null);
  const [language, setLanguage] = useState<Language>("English");
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const [balance, setBalance] = useState(2539.85);
  const [commission] = useState(13.63);

  const [users, setUsers] = useState(sampleUsers);

  const t = translations[language] as Translation;

  const openScreen = (nextScreen: Screen) => {
    setScreen(nextScreen);
    setSelectedVip(null);
    setMobileMenu(false);
  };

  const openVipOrder = (vip: VipPackage) => {
    setSelectedVip(vip);
    setScreen("orders");
    setMobileMenu(false);
  };

  const logout = () => {
    setLoggedIn(false);
    setScreen("home");
    setSelectedVip(null);
  };

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText("AMZ786");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const blockUser = (username: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.username === username
          ? { ...user, status: "Blocked" }
          : user
      )
    );
  };

  const unblockUser = (username: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.username === username
          ? { ...user, status: "Active" }
          : user
      )
    );
  };

  const content = !loggedIn ? (
    <AuthScreen
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      setLoggedIn={setLoggedIn}
      setRole={setRole}
    />
  ) : (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#0D1117] text-white"
          : "min-h-screen bg-gray-50 text-gray-900"
      }
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        setMobileMenu={setMobileMenu}
        logout={logout}
      />

      <Sidebar
        role={role}
        screen={screen}
        openScreen={openScreen}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        logout={logout}
        darkMode={darkMode}
      />

      {mobileMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <main className="min-h-screen pb-28 lg:ml-64 lg:pb-28">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

          {screen === "home" && (
            <HomeDashboard
              balance={balance}
              commission={commission}
              openVipOrder={openVipOrder}
              openScreen={openScreen}
            />
          )}

          {screen === "orders" && selectedVip && (
            <VipOrders
              vip={selectedVip}
              balance={balance}
              commission={commission}
              goBack={() => openScreen("home")}
              setBalance={setBalance}
            />
          )}

          {screen === "orders" && !selectedVip && (
            <AllVipPackages openVipOrder={openVipOrder} />
          )}

          {screen === "deposit" && (
            <DepositScreen
              balance={balance}
              setBalance={setBalance}
            />
          )}

          {screen === "withdraw" && (
            <WithdrawScreen balance={balance} />
          )}

          {screen === "record" && <RecordScreen />}

          {screen === "profile" && (
            <ProfileScreen
              balance={balance}
              copyInvite={copyInvite}
              copied={copied}
              openScreen={openScreen}
            />
          )}

          {role === "admin" && screen === "users" && (
            <AdminUsers
              users={users}
              blockUser={blockUser}
              unblockUser={unblockUser}
            />
          )}

          {role === "admin" && screen === "withdrawals" && (
            <AdminSimple
              title={t.allWithdrawals}
              icon={<ArrowUpFromLine size={22} />}
              description={t.reviewWithdrawals}
            />
          )}

          {role === "admin" && screen === "notifications" && (
            <AdminSimple
              title={t.sendNotification}
              icon={<Bell size={22} />}
              description={t.importantNotifications}
            />
          )}

          {role === "admin" && screen === "completed" && (
            <AdminSimple
              title={t.completedTrades}
              icon={<CircleCheck size={22} />}
              description={t.successfulTrades}
            />
          )}

          {role === "admin" && screen === "payments" && (
            <AdminSimple
              title={t.paymentSettings}
              icon={<CreditCard size={22} />}
              description={t.managePayments}
            />
          )}

          {role === "admin" && screen === "activity" && (
            <AdminSimple
              title={t.allActivity}
              icon={<Activity size={22} />}
              description={t.monitorActivity}
            />
          )}

          {role === "admin" && screen === "admins" && (
            <AdminSimple
              title={t.adminUsers}
              icon={<ShieldCheck size={22} />}
              description={t.manageAdmins}
            />
          )}
        </div>
      </main>

      <MobileBottomNav
        screen={screen}
        openScreen={openScreen}
        role={role}
      />
    </div>
  );

  return (
    <LanguageContext.Provider value={t}>
      <div dir={language === "Arabic" ? "rtl" : "ltr"}>
        {content}
      </div>
    </LanguageContext.Provider>
  );
}

/* =========================================================
   AUTH SCREEN
========================================================= */

function AuthScreen({
  darkMode,
  setDarkMode,
  setLoggedIn,
  setRole,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setLoggedIn: (value: boolean) => void;
  setRole: (value: Role) => void;
}) {
  const t = useTranslation();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [portal, setPortal] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [invite, setInvite] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t.emailPasswordRequired);
      return;
    }

    if (portal === "admin") {
      if (!username) {
        setError(t.adminUsernameRequired);
        return;
      }

      setRole("admin");
    } else {
      setRole("user");
    }

    setLoggedIn(true);
  };

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-[#0D1117] text-white"
          : "min-h-screen bg-gray-100 text-gray-900"
      }
    >
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4">
        <div className="w-full max-w-md">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <img
                src="/logos/amazonshop.png"
                alt="Amazonshop"
                className="h-12 w-auto object-contain"
              />

              <p className="mt-1 text-sm opacity-60">
                {t.ecommerceVip}
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl border border-gray-700 p-3 transition hover:border-[#FFB800]"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
          </div>

          <div
            className={
              darkMode
                ? "rounded-3xl border border-[#30363D] bg-[#161B22] p-6 shadow-2xl"
                : "rounded-3xl border border-gray-200 bg-white p-6 shadow-xl"
            }
          >
            <div className="mb-6 grid grid-cols-2 rounded-xl bg-black/20 p-1">

              <button
                onClick={() => setPortal("user")}
                className={`rounded-lg px-4 py-3 text-sm font-bold ${
                  portal === "user"
                    ? "bg-[#FFB800] text-black"
                    : "opacity-60"
                }`}
              >
                {t.userPortal}
              </button>

              <button
                onClick={() => setPortal("admin")}
                className={`rounded-lg px-4 py-3 text-sm font-bold ${
                  portal === "admin"
                    ? "bg-[#FFB800] text-black"
                    : "opacity-60"
                }`}
              >
                {t.adminPortal}
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-extrabold">
                {mode === "login"
                  ? t.welcomeBack
                  : t.createAccount}
              </h1>

              <p className="mt-1 text-sm opacity-60">
                {portal === "admin"
                  ? t.administratorAccess
                  : t.accessVipAccount}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">

              {mode === "signup" && (
                <>
                  <Input
                    label={t.username}
                    value={username}
                    setValue={setUsername}
                    placeholder={t.enterUsername}
                  />

                  <Input
                    label={t.referenceKey}
                    value={invite}
                    setValue={setInvite}
                    placeholder={t.enterReference}
                  />
                </>
              )}

              {portal === "admin" && mode === "login" && (
                <Input
                  label={t.adminUsername}
                  value={username}
                  setValue={setUsername}
                  placeholder="admin1"
                />
              )}

              <Input
                label="Email"
                value={email}
                setValue={setEmail}
                placeholder="you@example.com"
                type="email"
              />

              <Input
                label="Password"
                value={password}
                setValue={setPassword}
                placeholder="••••••••"
                type="password"
              />

              {mode === "signup" && (
                <Input
                  label={t.confirmPassword}
                  value={password}
                  setValue={setPassword}
                  placeholder="••••••••"
                  type="password"
                />
              )}

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-5 py-3.5 font-extrabold text-black transition hover:scale-[1.01] hover:bg-[#ffca35]"
              >
                {mode === "login" ? t.login : t.createAccount}
                <ChevronRight size={18} />
              </button>
            </form>

            <button
              onClick={() =>
                setMode(mode === "login" ? "signup" : "login")
              }
              className="mt-5 w-full text-center text-sm opacity-70 hover:text-[#FFB800]"
            >
              {mode === "login"
                ? t.dontHaveAccount
                : t.alreadyHaveAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  setMobileMenu,
  logout,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  language: Language;
  setLanguage: (value: Language) => void;
  setMobileMenu: (value: boolean) => void;
  logout: () => void;
}) {
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-[#30363D] bg-[#131921]/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenu(true)}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center">
            <img
              src="/logos/amazonshop.png"
              alt="Amazonshop"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">

          <div className="relative">
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-white/10"
            >
              <Languages size={18} />
              <span className="hidden sm:inline">
                {language}
              </span>
            </button>

            {showLanguages && (
              <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22] shadow-2xl">

                {languages.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setLanguage(item);
                      setShowLanguages(false);
                    }}
                    className={`block w-full px-4 py-3 text-left text-sm hover:bg-white/10 ${
                      language === item
                        ? "text-[#FFB800]"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}

              </div>
            )}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-xl p-2.5 hover:bg-white/10"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={logout}
            className="hidden rounded-xl p-2.5 hover:bg-red-500/10 hover:text-red-400 sm:block"
          >
            <LogOut size={18} />
          </button>

        </div>
      </div>
    </header>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  role,
  screen,
  openScreen,
  mobileMenu,
  setMobileMenu,
  logout,
  darkMode,
}: {
  role: Role;
  screen: Screen;
  openScreen: (screen: Screen) => void;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
  logout: () => void;
  darkMode: boolean;
}) {
  const t = useTranslation();

  const userItems: {
    id: Screen;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      id: "home",
      label: t.dashboard,
      icon: <Home size={19} />,
    },
    {
      id: "deposit",
      label: t.deposit,
      icon: <ArrowDownToLine size={19} />,
    },
  ];

  const adminItems: {
    id: Screen;
    label: string;
    icon: ReactNode;
  }[] = [
    {
      id: "home",
      label: t.dashboard,
      icon: <LayoutDashboard size={19} />,
    },
    {
      id: "users",
      label: t.userManagement,
      icon: <Users size={19} />,
    },
    {
      id: "withdrawals",
      label: t.allWithdrawals,
      icon: <ArrowUpFromLine size={19} />,
    },
    {
      id: "notifications",
      label: t.sendNotification,
      icon: <Bell size={19} />,
    },
    {
      id: "completed",
      label: t.completedTrades,
      icon: <CircleCheck size={19} />,
    },
    {
      id: "deposit",
      label: t.deposit,
      icon: <ArrowDownToLine size={19} />,
    },
    {
      id: "payments",
      label: t.paymentSettings,
      icon: <CreditCard size={19} />,
    },
    {
      id: "activity",
      label: t.allActivity,
      icon: <Activity size={19} />,
    },
    {
      id: "admins",
      label: t.adminUsers,
      icon: <ShieldCheck size={19} />,
    },
  ];

  const items = role === "admin" ? adminItems : userItems;

  return (
    <aside
      className={`fixed bottom-0 left-0 top-16 z-50 w-64 border-r border-[#30363D] bg-[#0D1117] transition-transform duration-300 lg:translate-x-0 ${
        mobileMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col p-4">

        <div className="mb-5 flex items-center justify-between lg:hidden">
          <span className="font-bold">
            {t.menu}
          </span>

          <button
            onClick={() => setMobileMenu(false)}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 rounded-2xl border border-[#30363D] bg-[#161B22] p-4">
          <div className="mb-2 flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFB800] font-black text-black">
              {role === "admin" ? "A" : "U"}
            </div>

            <div>
              <p className="text-sm font-bold">
                {role === "admin"
                  ? t.administrator
                  : t.vipUser}
              </p>

              <p className="text-xs text-emerald-400">
                ● {t.online}
              </p>
            </div>

          </div>
        </div>

        <nav className="space-y-1 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => openScreen(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                screen === item.id
                  ? "bg-[#FFB800] text-black"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#30363D] pt-4">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} />
            {t.exitPanel}
          </button>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   HOME DASHBOARD
========================================================= */

function HomeDashboard({
  balance,
  commission,
  openVipOrder,
  openScreen,
}: {
  balance: number;
  commission: number;
  openVipOrder: (vip: VipPackage) => void;
  openScreen: (screen: Screen) => void;
}) {
  const t = useTranslation();

  return (
    <div className="space-y-6 pt-16">

      <section className="relative overflow-hidden rounded-3xl border border-[#30363D] bg-gradient-to-br from-[#171d25] via-[#111820] to-[#0D1117] p-6 sm:p-8 lg:p-10">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF9900]/10 blur-3xl" />

        <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#FFB800]/10 blur-3xl" />

        <div className="relative max-w-3xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/10 px-4 py-2 text-xs font-bold text-[#FFB800]">
            <Sparkles size={15} />
            {t.premiumVipPlatform}
          </div>

          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {t.growYourEarnings}

            <span className="block text-[#FFB800]">
              {t.vipOrders}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            {t.chooseYourLevel}. {t.completeDailyOrders}. {t.earnCommission}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() => openVipOrder(vipPackages[0])}
              className="rounded-xl bg-[#FFB800] px-5 py-3 text-sm font-extrabold text-black hover:bg-[#ffca35]"
            >
              {t.startVipOrders}
            </button>

            <button
              onClick={() => openScreen("deposit")}
              className="rounded-xl border border-[#30363D] bg-white/5 px-5 py-3 text-sm font-bold hover:border-[#FFB800]"
            >
              {t.depositUsdt}
            </button>

          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">

        <StatCard
          icon={<Wallet size={20} />}
          label={t.walletBalance}
          value={`${balance.toFixed(2)} USDT`}
        />

        <StatCard
          icon={<TrendingUp size={20} />}
          label={t.todaysCommission}
          value={`${commission.toFixed(2)} USDT`}
        />

        <StatCard
          icon={<Package size={20} />}
          label={t.ordersCompleted}
          value="25"
        />

        <StatCard
          icon={<Crown size={20} />}
          label={t.vipLevel}
          value="VIP 1"
        />

      </section>

      <section>

        <div className="mb-5 flex items-end justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFB800]">
              {t.membership}
            </p>

            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              {t.vipPackages}
            </h2>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-500">
              {t.chooseYourLevel}
            </p>

            <p className="text-sm font-bold text-gray-300">
              {t.higherVip}
            </p>
          </div>

        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {vipPackages.map((vip) => (
            <VipCard
              key={vip.id}
              vip={vip}
              openVipOrder={openVipOrder}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">

        <InfoCard
          icon={<Clock3 size={22} />}
          title={t.dailyOrders}
          text={t.completeDailyOrders}
        />

        <InfoCard
          icon={<TrendingUp size={22} />}
          title={t.earnCommission}
          text={t.commissionIncreases}
        />

        <InfoCard
          icon={<ShieldCheck size={22} />}
          title={t.vipBenefits}
          text={t.premiumFeatures}
        />

      </section>
    </div>
  );
}

/* =========================================================
   VIP CARD
========================================================= */

function VipCard({
  vip,
  openVipOrder,
}: {
  vip: VipPackage;
  openVipOrder: (vip: VipPackage) => void;
}) {
  const t = useTranslation();

  const description =
    vip.id === "vip1"
      ? t.startAmazon
      : vip.id === "vip2"
      ? t.higherLevel
      : t.premiumPackage;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#30363D] bg-[#161B22] transition duration-300 hover:-translate-y-1 hover:border-[#FFB800]/50 hover:shadow-2xl">

      <div className={`h-2 bg-gradient-to-r ${vip.gradient}`} />

      <div className="p-5 sm:p-6">

        <div className="mb-5 flex items-center justify-between">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${vip.gradient} p-2 shadow-lg`}
          >
            <img
              src={vip.logo}
              alt={`${vip.name} logo`}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="rounded-full border border-[#FFB800]/20 bg-[#FFB800]/10 px-3 py-1 text-xs font-bold text-[#FFB800]">
            {vip.subtitle}
          </div>

        </div>

        <h3 className="text-2xl font-black">
          {vip.name}
        </h3>

        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
          {description}
        </p>

        <div className="my-5 grid grid-cols-2 gap-3">

          <MiniStat
            label={t.unlock}
            value={`${vip.unlocked} USDT`}
          />

          <MiniStat
            label={t.commission}
            value={`${vip.commission}%`}
          />

          <MiniStat
            label={t.dailyOrders}
            value={`${vip.orders}`}
          />

          <MiniStat
            label={t.status}
            value={t.available}
          />

        </div>

        <button
          onClick={() => openVipOrder(vip)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-4 py-3.5 text-sm font-extrabold text-black transition hover:bg-[#ffca35]"
        >
          {t.openOrders} {vip.name}
          <ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
}

/* =========================================================
   ALL VIP
========================================================= */

function AllVipPackages({
  openVipOrder,
}: {
  openVipOrder: (vip: VipPackage) => void;
}) {
  const t = useTranslation();

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={t.vipOrders}
        subtitle={t.selectVip}
        icon={<Crown size={22} />}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {vipPackages.map((vip) => (
          <VipCard
            key={vip.id}
            vip={vip}
            openVipOrder={openVipOrder}
          />
        ))}
      </div>

    </div>
  );
}

/* =========================================================
   VIP ORDERS
========================================================= */

function VipOrders({
  vip,
  balance,
  commission,
  goBack,
  setBalance,
}: {
  vip: VipPackage;
  balance: number;
  commission: number;
  goBack: () => void;
  setBalance: (value: number) => void;
}) {
  const t = useTranslation();

  const [ordering, setOrdering] = useState(false);
  const [message, setMessage] = useState("");

  const startOrdering = () => {
    if (balance < vip.unlocked) {
      setMessage(
        `${t.insufficientBalance}. ${vip.name} VIP ${t.required}: ${vip.unlocked} USDT.`
      );
      return;
    }

    setOrdering(true);
    setMessage("");

    setTimeout(() => {
      setOrdering(false);

      setMessage(
        `${t.orderCompleted}. ${t.commission}: ${vip.commission}%.`
      );

      setBalance(
        balance + vip.unlocked * (vip.commission / 100)
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 pt-16">

      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#FFB800]"
      >
        ← {t.backToPackages}
      </button>

      <section className="overflow-hidden rounded-3xl border border-[#30363D] bg-[#161B22]">

        <div className={`bg-gradient-to-r ${vip.gradient} p-6 sm:p-8`}>

          <div className="flex flex-wrap items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 p-2 backdrop-blur">
                <img
                  src={vip.logo}
                  alt={`${vip.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-sm font-bold text-white/70">
                  {vip.subtitle}
                </p>

                <h1 className="text-3xl font-black">
                  {vip.name} {t.orders}
                </h1>
              </div>

            </div>

            <div className="rounded-2xl bg-black/20 px-5 py-3 text-center backdrop-blur">
              <p className="text-xs text-white/70">
                {t.commission}
              </p>

              <p className="text-2xl font-black">
                {vip.commission}%
              </p>
            </div>

          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">

          <OrderStat
            label={t.walletBalance}
            value={`${balance.toFixed(2)} USDT`}
          />

          <OrderStat
            label={t.todaysCommission}
            value={`${commission.toFixed(2)} USDT`}
          />

          <OrderStat
            label={t.yesterday}
            value="0.00 USDT"
          />

          <OrderStat
            label={t.ordersCompleted}
            value={`${vip.orders}`}
          />

        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22]">
        <div className="flex min-w-max animate-pulse items-center gap-8 px-5 py-4 text-sm">

          <span className="font-bold text-[#FFB800]">
            USDT;85********22
          </span>

          <span className="text-gray-400">
            {t.earnCommission} {vip.name} {t.orders}
          </span>

          <span className="font-bold text-emerald-400">
            +{vip.commission}%
          </span>

          <span className="font-bold text-[#FFB800]">
            USDT;24
          </span>

        </div>
      </div>

      <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6 sm:p-8">

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFB800]/10 text-[#FFB800]">
            <ShoppingBag size={28} />
          </div>

          <h2 className="text-2xl font-black">
            {t.readyToOrder}
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            {t.completeVipOrders} {vip.name} VIP.
          </p>

          <div className="mx-auto my-6 grid max-w-lg grid-cols-2 gap-3">

            <div className="rounded-2xl border border-[#30363D] bg-[#0D1117] p-4">
              <p className="text-xs text-gray-500">
                {t.required}
              </p>

              <p className="mt-1 text-lg font-black">
                {vip.unlocked} USDT
              </p>
            </div>

            <div className="rounded-2xl border border-[#30363D] bg-[#0D1117] p-4">
              <p className="text-xs text-gray-500">
                {t.commission}
              </p>

              <p className="mt-1 text-lg font-black text-emerald-400">
                {vip.commission}%
              </p>
            </div>

          </div>

          {message && (
            <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
              {message}
            </div>
          )}

          <button
            onClick={startOrdering}
            disabled={ordering}
            className="w-full rounded-xl bg-[#FFB800] px-6 py-4 font-black text-black transition hover:bg-[#ffca35] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {ordering
              ? t.processingOrder
              : t.startOrdering}
          </button>

        </div>
      </section>
    </div>
  );
}

/* =========================================================
   DEPOSIT
========================================================= */

function DepositScreen({
  balance,
  setBalance,
}: {
  balance: number;
  setBalance: (value: number) => void;
}) {
  const t = useTranslation();

  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [message, setMessage] = useState("");

  const address = "T9yD14Nj9j7x81923kLmMzPqRsT";

  const submitDeposit = (e: FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setMessage(t.validAmount);
      return;
    }

    setMessage(
      `${t.depositSubmitted} ${t.status}: ${t.pendingDeposit}. ${t.walletBalance}: ${balance.toFixed(
        2
      )} USDT.`
    );

    setAmount("");
    setTxid("");
  };

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={t.depositUsdt}
        subtitle={t.addFunds}
        icon={<ArrowDownToLine size={22} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6">

          <h2 className="mb-5 text-lg font-black">
            {t.usdtDepositAddress}
          </h2>

          <div className="rounded-2xl border border-[#30363D] bg-[#0D1117] p-4">

            <p className="mb-2 text-xs text-gray-500">
              {t.trc20Address}
            </p>

            <p className="break-all font-mono text-sm text-[#FFB800]">
              {address}
            </p>

          </div>

          <button
            onClick={async () => {
              await navigator.clipboard.writeText(address);
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#30363D] px-4 py-3 text-sm font-bold hover:border-[#FFB800]"
          >
            <Copy size={17} />
            {t.copyAddress}
          </button>

          <div className="mt-5 rounded-2xl bg-[#FFB800]/10 p-4 text-sm leading-6 text-gray-300">
            {t.sendOnlyUsdt}
          </div>

        </section>

        <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6">

          <h2 className="mb-5 text-lg font-black">
            {t.submitDeposit}
          </h2>

          <form onSubmit={submitDeposit} className="space-y-4">

            <Input
              label={t.amount}
              value={amount}
              setValue={setAmount}
              placeholder="100"
              type="number"
            />

            <Input
              label={t.transactionHash}
              value={txid}
              setValue={setTxid}
              placeholder={t.enterTransactionHash}
            />

            {message && (
              <div className="rounded-xl border border-[#FFB800]/20 bg-[#FFB800]/10 p-4 text-sm text-[#FFB800]">
                {message}
              </div>
            )}

            <button className="w-full rounded-xl bg-[#FFB800] px-5 py-3.5 font-black text-black hover:bg-[#ffca35]">
              {t.submitDeposit}
            </button>

          </form>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   WITHDRAW
========================================================= */

function WithdrawScreen({
  balance,
}: {
  balance: number;
}) {
  const t = useTranslation();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!amount || !address) {
      setMessage(t.completeAllFields);
      return;
    }

    setMessage(t.withdrawalSubmitted);
    setAmount("");
    setAddress("");
  };

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={t.withdraw}
        subtitle={t.requestWithdrawal}
        icon={<ArrowUpFromLine size={22} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6">

          <div className="mb-6 rounded-2xl bg-[#0D1117] p-5">

            <p className="text-xs text-gray-500">
              {t.availableBalance}
            </p>

            <p className="mt-1 text-3xl font-black text-[#FFB800]">
              {balance.toFixed(2)} USDT
            </p>

          </div>

          <form onSubmit={submit} className="space-y-4">

            <Input
              label={t.usdtAmount}
              value={amount}
              setValue={setAmount}
              placeholder="100"
              type="number"
            />

            <Input
              label={t.walletAddress}
              value={address}
              setValue={setAddress}
              placeholder={t.trc20Wallet}
            />

            {message && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                {message}
              </div>
            )}

            <button className="w-full rounded-xl bg-[#FFB800] px-5 py-3.5 font-black text-black hover:bg-[#ffca35]">
              {t.submitWithdrawal}
            </button>

          </form>
        </section>

        <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6">

          <h2 className="mb-5 text-lg font-black">
            {t.withdrawalSuccessful}
          </h2>

          <div className="space-y-3">

            {[
              ["50.00 USDT", "Completed"],
              ["100.00 USDT", "Completed"],
              ["250.00 USDT", "Completed"],
            ].map(([amount]) => (
              <div
                key={amount}
                className="flex items-center justify-between rounded-2xl border border-[#30363D] bg-[#0D1117] p-4"
              >

                <div>
                  <p className="font-bold">
                    {amount}
                  </p>

                  <p className="text-xs text-gray-500">
                    USDT TRC20
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                  {t.completed}
                </span>

              </div>
            ))}

          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
   RECORD
========================================================= */

function RecordScreen() {
  const t = useTranslation();

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={t.recordOrder}
        subtitle={t.orderHistory}
        icon={<ClipboardList size={22} />}
      />

      <div className="space-y-3">

        {sampleRecords.map((record) => (
          <div
            key={record.name}
            className="rounded-2xl border border-[#30363D] bg-[#161B22] p-4 sm:p-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">

                  <img
                    src={
                      record.name === "Amazon"
                        ? "/logos/amazon.png"
                        : record.name === "Alibaba"
                        ? "/logos/alibaba.png"
                        : "/logos/shopify.png"
                    }
                    alt={`${record.name} logo`}
                    className="h-full w-full object-contain"
                  />

                </div>

                <div>

                  <p className="font-black">
                    {record.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {record.level} • {t.completed}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold">
                  {record.amount} USDT
                </p>

                <p className="text-xs text-emerald-400">
                  +{record.commission} {t.commission}
                </p>

              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                {t.completed}
              </span>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

/* =========================================================
   PROFILE
========================================================= */

function ProfileScreen({
  balance,
  copyInvite,
  copied,
  openScreen,
}: {
  balance: number;
  copyInvite: () => void;
  copied: boolean;
  openScreen: (screen: Screen) => void;
}) {
  const t = useTranslation();

  const [avatar, setAvatar] = useState("");

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={t.profile}
        subtitle={t.manageAccount}
        icon={<User size={22} />}
      />

      <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6">

        <div className="flex flex-col items-center gap-4 sm:flex-row">

          <label className="group relative cursor-pointer">

            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#FFB800] bg-[#0D1117] text-3xl font-black text-[#FFB800]">

              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                "U"
              )}

            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setAvatar(URL.createObjectURL(file));
                }
              }}
            />

          </label>

          <div className="text-center sm:text-left">

            <h2 className="text-2xl font-black">
              {t.vipUser}
            </h2>

            <p className="text-sm text-gray-500">
              {t.activeAccount}
            </p>

          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">

          <ProfileInfo
            label={t.username}
            value="user1"
          />

          <div>

            <p className="mb-2 text-xs text-gray-500">
              {t.invitationCode}
            </p>

            <div className="flex items-center justify-between rounded-xl border border-[#30363D] bg-[#0D1117] px-4 py-3">

              <span className="font-bold">
                AMZ786
              </span>

              <button
                onClick={copyInvite}
                className="text-[#FFB800]"
              >
                {copied ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>

            </div>
          </div>

          <ProfileInfo
            label={t.creditScore}
            value="100"
          />

          <ProfileInfo
            label={t.walletBalance}
            value={`${balance.toFixed(2)} USDT`}
          />

        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          <button
            onClick={() => openScreen("deposit")}
            className="rounded-xl bg-[#FFB800] px-5 py-3 font-black text-black hover:bg-[#ffca35]"
          >
            {t.deposit}
          </button>

          <button
            onClick={() => openScreen("withdraw")}
            className="rounded-xl border border-[#30363D] px-5 py-3 font-bold hover:border-[#FFB800]"
          >
            {t.withdraw}
          </button>

        </div>
      </section>

      <section className="rounded-3xl border border-[#30363D] bg-[#161B22] p-6">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-[#FFB800]/10 p-3 text-[#FFB800]">
            <Settings size={22} />
          </div>

          <div>

            <h3 className="font-black">
              {t.serviceCenter}
            </h3>

            <p className="text-sm text-gray-500">
              {t.contactSupport}
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   ADMIN USERS
========================================================= */

function AdminUsers({
  users,
  blockUser,
  unblockUser,
}: {
  users: typeof sampleUsers;
  blockUser: (username: string) => void;
  unblockUser: (username: string) => void;
}) {
  const t = useTranslation();

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={t.userManagement}
        subtitle={t.manageUsers}
        icon={<Users size={22} />}
      />

      <div className="overflow-hidden rounded-3xl border border-[#30363D] bg-[#161B22]">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px] text-left">

            <thead className="border-b border-[#30363D] bg-[#0D1117]">

              <tr>

                <th className="px-5 py-4 text-xs text-gray-500">
                  {t.username}
                </th>

                <th className="px-5 py-4 text-xs text-gray-500">
                  {t.inviteCode}
                </th>

                <th className="px-5 py-4 text-xs text-gray-500">
                  {t.status}
                </th>

                <th className="px-5 py-4 text-xs text-gray-500">
                  {t.action}
                </th>

              </tr>
            </thead>

            <tbody>

              {users.map((user) => (
                <tr
                  key={user.username}
                  className="border-b border-[#30363D] last:border-0"
                >

                  <td className="px-5 py-4 font-bold">
                    {user.username}
                  </td>

                  <td className="px-5 py-4 text-gray-400">
                    {user.invite}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {user.status === "Active"
                        ? t.activeAccount
                        : "Blocked"}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    {user.status === "Active" ? (
                      <button
                        onClick={() =>
                          blockUser(user.username)
                        }
                        className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"
                      >
                        {t.block}
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          unblockUser(user.username)
                        }
                        className="rounded-lg border border-emerald-500/20 px-3 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/10"
                      >
                        {t.unblock}
                      </button>
                    )}

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN SIMPLE
========================================================= */

function AdminSimple({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  const t = useTranslation();

  return (
    <div className="space-y-6 pt-16">

      <PageTitle
        title={title}
        subtitle={description}
        icon={icon}
      />

      <div className="rounded-3xl border border-[#30363D] bg-[#161B22] p-10 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFB800]/10 text-[#FFB800]">
          {icon}
        </div>

        <h2 className="text-xl font-black">
          {title}
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
          {t.backendPhase}
        </p>

      </div>
    </div>
  );
}

/* =========================================================
   BOTTOM NAVIGATION
========================================================= */

function MobileBottomNav({
  screen,
  openScreen,
  role,
}: {
  screen: Screen;
  openScreen: (screen: Screen) => void;
  role: Role;
}) {
  const t = useTranslation();

  const items: {
    id: Screen;
    label: string;
    icon: ReactNode;
  }[] =
    role === "admin"
      ? [
          {
            id: "home",
            label: t.home,
            icon: <Home size={20} />,
          },
          {
            id: "users",
            label: t.userManagement,
            icon: <Users size={20} />,
          },
          {
            id: "withdrawals",
            label: t.withdraw,
            icon: <ArrowUpFromLine size={20} />,
          },
          {
            id: "activity",
            label: t.allActivity,
            icon: <Activity size={20} />,
          },
          {
            id: "profile",
            label: t.profile,
            icon: <User size={20} />,
          },
        ]
      : [
          {
            id: "home",
            label: t.home,
            icon: <Home size={20} />,
          },
          {
            id: "orders",
            label: t.orders,
            icon: <ShoppingBag size={20} />,
          },
          {
            id: "record",
            label: t.ordersRecord,
            icon: <ClipboardList size={20} />,
          },
          {
            id: "withdraw",
            label: t.withdraw,
            icon: <ArrowUpFromLine size={20} />,
          },
          {
            id: "profile",
            label: t.profile,
            icon: <User size={20} />,
          },
        ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[60]
        border-t
        border-[#30363D]
        bg-[#131921]/95
        px-2
        py-2
        shadow-[0_-5px_25px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
      "
    >

      <div className="mx-auto grid max-w-5xl grid-cols-5 gap-1 sm:gap-2">

        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openScreen(item.id)}
            className={`
              flex
              min-h-[58px]
              flex-col
              items-center
              justify-center
              gap-1
              rounded-xl
              px-1
              py-2
              text-[10px]
              font-bold
              transition-all
              duration-200
              sm:min-h-[62px]
              sm:text-xs
              ${
                screen === item.id
                  ? "bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }
            `}
          >

            {item.icon}

            <span className="whitespace-nowrap">
              {item.label}
            </span>

          </button>
        ))}

      </div>
    </nav>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function Input({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-bold text-gray-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#30363D] bg-[#0D1117] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#FFB800]"
      />

    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-4 sm:p-5">

      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB800]/10 text-[#FFB800]">
        {icon}
      </div>

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 truncate text-lg font-black sm:text-xl">
        {value}
      </p>

    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#30363D] bg-[#0D1117] p-3">

      <p className="text-[11px] text-gray-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-black">
        {value}
      </p>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-5">

      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFB800]/10 text-[#FFB800]">
        {icon}
      </div>

      <h3 className="font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </div>
  );
}

function OrderStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#0D1117] p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-black">
        {value}
      </p>

    </div>
  );
}

function ProfileInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="mb-2 text-xs text-gray-500">
        {label}
      </p>

      <div className="rounded-xl border border-[#30363D] bg-[#0D1117] px-4 py-3 font-bold">
        {value}
      </div>

    </div>
  );
}

function PageTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFB800]/10 text-[#FFB800]">
        {icon}
      </div>

      <div>

        <h1 className="text-2xl font-black sm:text-3xl">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>

      </div>
    </div>
  );
}