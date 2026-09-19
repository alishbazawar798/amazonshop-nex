export type Language =
  | "English"
  | "Arabic"
  | "Dutch"
  | "Spanish"
  | "Chinese"
  | "Japanese"
  | "Turkish"
  | "French";

export type Translation = {
  // General
  menu: string;
  online: string;
  administrator: string;
  vipUser: string;
  exitPanel: string;

  // Navigation
  dashboard: string;
  deposit: string;
  home: string;
  orders: string;
  ordersRecord: string;
  withdraw: string;
  profile: string;
  users: string;
  activity: string;

  // Admin navigation
  userManagement: string;
  allWithdrawals: string;
  sendNotification: string;
  completedTrades: string;
  paymentSettings: string;
  allActivity: string;
  adminUsers: string;

  // Auth
  ecommerceVipPlatform: string;
  userPortal: string;
  adminPortal: string;
  welcomeBack: string;
  createAccount: string;
  administratorAccess: string;
  accessVipAccount: string;
  username: string;
  referenceKey: string;
  adminUsername: string;
  email: string;
  password: string;
  confirmPassword: string;
  enterUsername: string;
  enterReferenceKey: string;
  enterAdminUsername: string;
  enterEmail: string;
  enterPassword: string;
  login: string;
  signup: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  pleaseEnterEmailPassword: string;
  pleaseEnterAdminUsername: string;

  // Home
  premiumVipPlatform: string;
  growYourEarnings: string;
  vipOrders: string;
  chooseVipLevel: string;
  completeDailyOrders: string;
  startVipOrders: string;
  depositUsdt: string;
  walletBalance: string;
  todaysCommission: string;
  ordersCompleted: string;
  vipLevel: string;
  membership: string;
  vipPackages: string;
  chooseYourLevel: string;
  higherVipHigherCommission: string;
  dailyOrders: string;
  earnCommission: string;
  vipBenefits: string;
  complete25Orders: string;
  commissionIncreases: string;
  premiumFeatures: string;

  // VIP
  startVipJourney: string;
  higherLevelOrders: string;
  premiumVipPackage: string;
  unlock: string;
  commission: string;
  status: string;
  available: string;
  openOrders: string;
  selectPackage: string;
  backToVipPackages: string;
  yesterday: string;
  readyToStartOrdering: string;
  completeVipOrders: string;
  required: string;
  processingOrder: string;
  startOrdering: string;
  insufficientBalance: string;
  orderCompleted: string;

  // Deposit
  addFunds: string;
  usdtDepositAddress: string;
  trc20Address: string;
  copyAddress: string;
  sendOnlyUsdt: string;
  pendingDeposit: string;
  submitDeposit: string;
  amountUsdt: string;
  transactionIdHash: string;
  enterTransactionHash: string;
  validUsdtAmount: string;
  depositSubmitted: string;

  // Withdraw
  withdrawalRequest: string;
  availableBalance: string;
  usdtAmount: string;
  walletAddress: string;
  trc20WalletAddress: string;
  completeAllFields: string;
  withdrawalSubmitted: string;
  withdrawalSuccessful: string;
  completed: string;

  // Record
  recordOrder: string;
  completedOrderHistory: string;
  commissionEarned: string;

  // Profile
  manageAccount: string;
  activeAccount: string;
  invitationCode: string;
  creditScore: string;
  serviceCenter: string;
  contactSupport: string;

  // Admin
  manageUsers: string;
  registeredUsers: string;
  inviteCode: string;
  action: string;
  block: string;
  unblock: string;
  reviewWithdrawals: string;
  sendImportantNotifications: string;
  viewCompletedTrades: string;
  managePaymentSettings: string;
  monitorActivity: string;
  manageAdmins: string;
  preparedForBackend: string;

  // Language
  languages: string;
};

export const translations: Record<Language, Translation> = {
  English: {
    menu: "Menu",
    online: "Online",
    administrator: "Administrator",
    vipUser: "VIP User",
    exitPanel: "Exit Panel",

    dashboard: "Dashboard",
    deposit: "Deposit",
    home: "Home",
    orders: "Orders",
    ordersRecord: "Orders Record",
    withdraw: "Withdraw",
    profile: "Profile",
    users: "Users",
    activity: "Activity",

    userManagement: "User Management",
    allWithdrawals: "All Withdrawals",
    sendNotification: "Send Notification",
    completedTrades: "Completed Trades",
    paymentSettings: "Payment Settings",
    allActivity: "All Activity",
    adminUsers: "Admin Users",

    ecommerceVipPlatform: "E-Commerce VIP Platform",
    userPortal: "User Portal",
    adminPortal: "Admin Portal",
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    administratorAccess: "Administrator access",
    accessVipAccount: "Access your VIP account",
    username: "Username",
    referenceKey: "Reference Key",
    adminUsername: "Admin Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    enterUsername: "Enter username",
    enterReferenceKey: "Enter reference key",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "Login",
    signup: "Sign up",
    dontHaveAccount: "Don't have an account? Sign up",
    alreadyHaveAccount: "Already have an account? Login",
    pleaseEnterEmailPassword: "Please enter email and password.",
    pleaseEnterAdminUsername: "Please enter admin username.",

    premiumVipPlatform: "PREMIUM VIP PLATFORM",
    growYourEarnings: "Grow Your Earnings With",
    vipOrders: "VIP Orders",
    chooseVipLevel: "Choose your VIP level",
    completeDailyOrders:
      "Choose your VIP level, complete daily orders and earn commission through our professional e-commerce platform.",
    startVipOrders: "Start VIP Orders",
    depositUsdt: "Deposit USDT",
    walletBalance: "Wallet Balance",
    todaysCommission: "Today's Commission",
    ordersCompleted: "Orders Completed",
    vipLevel: "VIP Level",
    membership: "Membership",
    vipPackages: "VIP Packages",
    chooseYourLevel: "Choose your level",
    higherVipHigherCommission: "Higher VIP = Higher Commission",
    dailyOrders: "Daily Orders",
    earnCommission: "Earn Commission",
    vipBenefits: "VIP Benefits",
    complete25Orders: "Complete up to 25 orders every day.",
    commissionIncreases: "Commission rate increases with VIP level.",
    premiumFeatures: "Enjoy premium platform features and rewards.",

    startVipJourney: "Start your VIP journey with Amazon orders.",
    higherLevelOrders: "Higher level orders with increased commission.",
    premiumVipPackage: "Premium VIP package with maximum commission.",
    unlock: "Unlock",
    commission: "Commission",
    status: "Status",
    available: "Available",
    openOrders: "Open Orders",
    selectPackage: "Select a VIP package to start ordering.",
    backToVipPackages: "Back to VIP Packages",
    yesterday: "Yesterday",
    readyToStartOrdering: "Ready to start ordering?",
    completeVipOrders:
      "Complete your VIP orders and earn commission on every successful order.",
    required: "Required",
    processingOrder: "Processing Order...",
    startOrdering: "Start Ordering",
    insufficientBalance: "Insufficient balance. VIP requires",
    orderCompleted: "Order completed successfully. Commission earned at",

    addFunds: "Add funds to your wallet.",
    usdtDepositAddress: "USDT Deposit Address",
    trc20Address: "TRC20 Address",
    copyAddress: "Copy Address",
    sendOnlyUsdt: "Send only USDT TRC20 to this address.",
    pendingDeposit: "Deposit requests are currently displayed as Pending.",
    submitDeposit: "Submit Deposit",
    amountUsdt: "Amount (USDT)",
    transactionIdHash: "Transaction ID / Hash",
    enterTransactionHash: "Enter transaction hash",
    validUsdtAmount: "Please enter a valid USDT amount.",
    depositSubmitted:
      "Deposit request submitted. Status: Pending. Current balance:",

    withdrawalRequest: "Request a withdrawal from your wallet.",
    availableBalance: "Available Balance",
    usdtAmount: "USDT Amount",
    walletAddress: "Wallet Address",
    trc20WalletAddress: "TRC20 wallet address",
    completeAllFields: "Please complete all fields.",
    withdrawalSubmitted: "Withdrawal request submitted successfully.",
    withdrawalSuccessful: "Withdrawal Successful",
    completed: "Completed",

    recordOrder: "Record Order",
    completedOrderHistory: "Your completed VIP order history.",
    commissionEarned: "commission",

    manageAccount: "Manage your account information.",
    activeAccount: "Active account",
    invitationCode: "Invitation Code",
    creditScore: "Credit Score",
    serviceCenter: "Service Center",
    contactSupport: "Contact support for account assistance.",

    manageUsers: "Manage registered platform users.",
    registeredUsers: "Manage registered platform users.",
    inviteCode: "INVITE CODE",
    action: "ACTION",
    block: "Block",
    unblock: "Unblock",
    reviewWithdrawals: "Review and manage all user withdrawal requests.",
    sendImportantNotifications:
      "Send important notifications to platform users.",
    viewCompletedTrades: "View all successfully completed VIP trades.",
    managePaymentSettings: "Manage platform payment and deposit settings.",
    monitorActivity: "Monitor recent platform activity.",
    manageAdmins: "Manage authorized administrator accounts.",
    preparedForBackend:
      "This section is prepared for the next backend/database phase.",

    languages: "Languages",
  },

  Arabic: {
    menu: "القائمة",
    online: "متصل",
    administrator: "المسؤول",
    vipUser: "مستخدم VIP",
    exitPanel: "خروج",

    dashboard: "لوحة التحكم",
    deposit: "إيداع",
    home: "الرئيسية",
    orders: "الطلبات",
    ordersRecord: "سجل الطلبات",
    withdraw: "سحب",
    profile: "الملف الشخصي",
    users: "المستخدمون",
    activity: "النشاط",

    userManagement: "إدارة المستخدمين",
    allWithdrawals: "جميع عمليات السحب",
    sendNotification: "إرسال إشعار",
    completedTrades: "الصفقات المكتملة",
    paymentSettings: "إعدادات الدفع",
    allActivity: "جميع الأنشطة",
    adminUsers: "المسؤولون",

    ecommerceVipPlatform: "منصة التجارة الإلكترونية VIP",
    userPortal: "بوابة المستخدم",
    adminPortal: "بوابة المسؤول",
    welcomeBack: "مرحباً بعودتك",
    createAccount: "إنشاء حساب",
    administratorAccess: "وصول المسؤول",
    accessVipAccount: "الوصول إلى حساب VIP الخاص بك",
    username: "اسم المستخدم",
    referenceKey: "مفتاح الإحالة",
    adminUsername: "اسم مستخدم المسؤول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    enterUsername: "أدخل اسم المستخدم",
    enterReferenceKey: "أدخل مفتاح الإحالة",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    dontHaveAccount: "ليس لديك حساب؟ إنشاء حساب",
    alreadyHaveAccount: "لديك حساب بالفعل؟ تسجيل الدخول",
    pleaseEnterEmailPassword: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    pleaseEnterAdminUsername: "يرجى إدخال اسم مستخدم المسؤول.",

    premiumVipPlatform: "منصة VIP متميزة",
    growYourEarnings: "زد أرباحك مع",
    vipOrders: "طلبات VIP",
    chooseVipLevel: "اختر مستوى VIP الخاص بك",
    completeDailyOrders:
      "اختر مستوى VIP الخاص بك، وأكمل الطلبات اليومية واربح عمولة من خلال منصتنا الإلكترونية الاحترافية.",
    startVipOrders: "ابدأ طلبات VIP",
    depositUsdt: "إيداع USDT",
    walletBalance: "رصيد المحفظة",
    todaysCommission: "عمولة اليوم",
    ordersCompleted: "الطلبات المكتملة",
    vipLevel: "مستوى VIP",
    membership: "العضوية",
    vipPackages: "باقات VIP",
    chooseYourLevel: "اختر مستواك",
    higherVipHigherCommission: "مستوى VIP أعلى = عمولة أعلى",
    dailyOrders: "الطلبات اليومية",
    earnCommission: "اربح عمولة",
    vipBenefits: "مزايا VIP",
    complete25Orders: "أكمل ما يصل إلى 25 طلباً يومياً.",
    commissionIncreases: "تزداد نسبة العمولة مع مستوى VIP.",
    premiumFeatures: "استمتع بميزات المنصة المتميزة والمكافآت.",

    startVipJourney: "ابدأ رحلتك مع طلبات Amazon VIP.",
    higherLevelOrders: "طلبات بمستوى أعلى مع عمولة متزايدة.",
    premiumVipPackage: "باقة VIP متميزة بأعلى عمولة.",
    unlock: "فتح",
    commission: "العمولة",
    status: "الحالة",
    available: "متاح",
    openOrders: "فتح الطلبات",
    selectPackage: "اختر باقة VIP لبدء الطلب.",
    backToVipPackages: "العودة إلى باقات VIP",
    yesterday: "أمس",
    readyToStartOrdering: "هل أنت مستعد لبدء الطلب؟",
    completeVipOrders:
      "أكمل طلبات VIP الخاصة بك واربح عمولة على كل طلب ناجح.",
    required: "المطلوب",
    processingOrder: "جارٍ معالجة الطلب...",
    startOrdering: "ابدأ الطلب",
    insufficientBalance: "الرصيد غير كافٍ. يتطلب VIP",
    orderCompleted: "تم إكمال الطلب بنجاح. العمولة المكتسبة بنسبة",

    addFunds: "أضف أموالاً إلى محفظتك.",
    usdtDepositAddress: "عنوان إيداع USDT",
    trc20Address: "عنوان TRC20",
    copyAddress: "نسخ العنوان",
    sendOnlyUsdt: "أرسل USDT TRC20 فقط إلى هذا العنوان.",
    pendingDeposit: "يتم عرض طلبات الإيداع حالياً على أنها قيد الانتظار.",
    submitDeposit: "إرسال الإيداع",
    amountUsdt: "المبلغ (USDT)",
    transactionIdHash: "معرّف المعاملة / التجزئة",
    enterTransactionHash: "أدخل تجزئة المعاملة",
    validUsdtAmount: "يرجى إدخال مبلغ USDT صالح.",
    depositSubmitted:
      "تم إرسال طلب الإيداع. الحالة: قيد الانتظار. الرصيد الحالي:",

    withdrawalRequest: "اطلب سحباً من محفظتك.",
    availableBalance: "الرصيد المتاح",
    usdtAmount: "مبلغ USDT",
    walletAddress: "عنوان المحفظة",
    trc20WalletAddress: "عنوان محفظة TRC20",
    completeAllFields: "يرجى إكمال جميع الحقول.",
    withdrawalSubmitted: "تم إرسال طلب السحب بنجاح.",
    withdrawalSuccessful: "تم السحب بنجاح",
    completed: "مكتمل",

    recordOrder: "سجل الطلبات",
    completedOrderHistory: "سجل طلبات VIP المكتملة.",
    commissionEarned: "عمولة",

    manageAccount: "إدارة معلومات حسابك.",
    activeAccount: "حساب نشط",
    invitationCode: "رمز الدعوة",
    creditScore: "درجة الائتمان",
    serviceCenter: "مركز الخدمة",
    contactSupport: "تواصل مع الدعم للمساعدة في الحساب.",

    manageUsers: "إدارة المستخدمين المسجلين.",
    registeredUsers: "إدارة المستخدمين المسجلين.",
    inviteCode: "رمز الدعوة",
    action: "الإجراء",
    block: "حظر",
    unblock: "إلغاء الحظر",
    reviewWithdrawals: "مراجعة وإدارة جميع طلبات سحب المستخدمين.",
    sendImportantNotifications: "إرسال إشعارات مهمة إلى مستخدمي المنصة.",
    viewCompletedTrades: "عرض جميع صفقات VIP المكتملة بنجاح.",
    managePaymentSettings: "إدارة إعدادات الدفع والإيداع.",
    monitorActivity: "مراقبة نشاط المنصة الأخير.",
    manageAdmins: "إدارة حسابات المسؤولين المصرح لهم.",
    preparedForBackend:
      "هذا القسم جاهز للمرحلة القادمة الخاصة بقاعدة البيانات والواجهة الخلفية.",

    languages: "اللغات",
  },

  Dutch: {
    menu: "Menu",
    online: "Online",
    administrator: "Beheerder",
    vipUser: "VIP-gebruiker",
    exitPanel: "Paneel verlaten",

    dashboard: "Dashboard",
    deposit: "Storten",
    home: "Home",
    orders: "Bestellingen",
    ordersRecord: "Bestelgeschiedenis",
    withdraw: "Opnemen",
    profile: "Profiel",
    users: "Gebruikers",
    activity: "Activiteit",

    userManagement: "Gebruikersbeheer",
    allWithdrawals: "Alle opnames",
    sendNotification: "Melding verzenden",
    completedTrades: "Voltooide transacties",
    paymentSettings: "Betalingsinstellingen",
    allActivity: "Alle activiteit",
    adminUsers: "Beheerders",

    ecommerceVipPlatform: "E-commerce VIP-platform",
    userPortal: "Gebruikersportaal",
    adminPortal: "Beheerdersportaal",
    welcomeBack: "Welkom terug",
    createAccount: "Account aanmaken",
    administratorAccess: "Beheerders toegang",
    accessVipAccount: "Toegang tot je VIP-account",
    username: "Gebruikersnaam",
    referenceKey: "Referentiesleutel",
    adminUsername: "Beheerdersnaam",
    email: "E-mail",
    password: "Wachtwoord",
    confirmPassword: "Bevestig wachtwoord",
    enterUsername: "Voer gebruikersnaam in",
    enterReferenceKey: "Voer referentiesleutel in",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "Inloggen",
    signup: "Registreren",
    dontHaveAccount: "Nog geen account? Registreren",
    alreadyHaveAccount: "Al een account? Inloggen",
    pleaseEnterEmailPassword: "Voer e-mail en wachtwoord in.",
    pleaseEnterAdminUsername: "Voer de gebruikersnaam van de beheerder in.",

    premiumVipPlatform: "PREMIUM VIP-PLATFORM",
    growYourEarnings: "Vergroot je inkomsten met",
    vipOrders: "VIP-bestellingen",
    chooseVipLevel: "Kies je VIP-niveau",
    completeDailyOrders:
      "Kies je VIP-niveau, voltooi dagelijkse bestellingen en verdien commissie via ons professionele e-commerceplatform.",
    startVipOrders: "VIP-bestellingen starten",
    depositUsdt: "USDT storten",
    walletBalance: "Walletsaldo",
    todaysCommission: "Commissie van vandaag",
    ordersCompleted: "Voltooide bestellingen",
    vipLevel: "VIP-niveau",
    membership: "Lidmaatschap",
    vipPackages: "VIP-pakketten",
    chooseYourLevel: "Kies je niveau",
    higherVipHigherCommission: "Hoger VIP = hogere commissie",
    dailyOrders: "Dagelijkse bestellingen",
    earnCommission: "Commissie verdienen",
    vipBenefits: "VIP-voordelen",
    complete25Orders: "Voltooi dagelijks maximaal 25 bestellingen.",
    commissionIncreases: "De commissie stijgt met het VIP-niveau.",
    premiumFeatures: "Geniet van premium platformfuncties en beloningen.",

    startVipJourney: "Begin je VIP-reis met Amazon-bestellingen.",
    higherLevelOrders: "Bestellingen op hoger niveau met verhoogde commissie.",
    premiumVipPackage: "Premium VIP-pakket met maximale commissie.",
    unlock: "Ontgrendelen",
    commission: "Commissie",
    status: "Status",
    available: "Beschikbaar",
    openOrders: "Bestellingen openen",
    selectPackage: "Selecteer een VIP-pakket om te beginnen.",
    backToVipPackages: "Terug naar VIP-pakketten",
    yesterday: "Gisteren",
    readyToStartOrdering: "Klaar om te beginnen met bestellen?",
    completeVipOrders:
      "Voltooi je VIP-bestellingen en verdien commissie op elke succesvolle bestelling.",
    required: "Vereist",
    processingOrder: "Bestelling verwerken...",
    startOrdering: "Bestellen starten",
    insufficientBalance: "Onvoldoende saldo. VIP vereist",
    orderCompleted: "Bestelling succesvol voltooid. Commissie verdiend tegen",

    addFunds: "Voeg geld toe aan je wallet.",
    usdtDepositAddress: "USDT-stortingsadres",
    trc20Address: "TRC20-adres",
    copyAddress: "Adres kopiëren",
    sendOnlyUsdt: "Stuur alleen USDT TRC20 naar dit adres.",
    pendingDeposit:
      "Stortingsverzoeken worden momenteel als In behandeling weergegeven.",
    submitDeposit: "Storting indienen",
    amountUsdt: "Bedrag (USDT)",
    transactionIdHash: "Transactie-ID / Hash",
    enterTransactionHash: "Voer transactiehash in",
    validUsdtAmount: "Voer een geldig USDT-bedrag in.",
    depositSubmitted:
      "Stortingsverzoek ingediend. Status: In behandeling. Huidig saldo:",

    withdrawalRequest: "Vraag een opname uit je wallet aan.",
    availableBalance: "Beschikbaar saldo",
    usdtAmount: "USDT-bedrag",
    walletAddress: "Walletadres",
    trc20WalletAddress: "TRC20-walletadres",
    completeAllFields: "Vul alle velden in.",
    withdrawalSubmitted: "Opnameverzoek succesvol ingediend.",
    withdrawalSuccessful: "Opname succesvol",
    completed: "Voltooid",

    recordOrder: "Bestelgeschiedenis",
    completedOrderHistory: "Je voltooide VIP-bestelgeschiedenis.",
    commissionEarned: "commissie",

    manageAccount: "Beheer je accountgegevens.",
    activeAccount: "Actief account",
    invitationCode: "Uitnodigingscode",
    creditScore: "Kredietscore",
    serviceCenter: "Servicecentrum",
    contactSupport: "Neem contact op met support voor hulp met je account.",

    manageUsers: "Beheer geregistreerde platformgebruikers.",
    registeredUsers: "Beheer geregistreerde platformgebruikers.",
    inviteCode: "UITNODIGINGSCODE",
    action: "ACTIE",
    block: "Blokkeren",
    unblock: "Deblokkeren",
    reviewWithdrawals: "Bekijk en beheer alle opnameverzoeken van gebruikers.",
    sendImportantNotifications:
      "Stuur belangrijke meldingen naar platformgebruikers.",
    viewCompletedTrades: "Bekijk alle succesvol voltooide VIP-transacties.",
    managePaymentSettings: "Beheer betalings- en stortingsinstellingen.",
    monitorActivity: "Monitor recente platformactiviteit.",
    manageAdmins: "Beheer geautoriseerde beheerdersaccounts.",
    preparedForBackend:
      "Dit gedeelte is voorbereid voor de volgende backend/databasefase.",

    languages: "Talen",
  },

  Spanish: {
    menu: "Menú",
    online: "En línea",
    administrator: "Administrador",
    vipUser: "Usuario VIP",
    exitPanel: "Salir del panel",

    dashboard: "Panel",
    deposit: "Depósito",
    home: "Inicio",
    orders: "Pedidos",
    ordersRecord: "Historial de pedidos",
    withdraw: "Retirar",
    profile: "Perfil",
    users: "Usuarios",
    activity: "Actividad",

    userManagement: "Gestión de usuarios",
    allWithdrawals: "Todos los retiros",
    sendNotification: "Enviar notificación",
    completedTrades: "Operaciones completadas",
    paymentSettings: "Configuración de pagos",
    allActivity: "Toda la actividad",
    adminUsers: "Administradores",

    ecommerceVipPlatform: "Plataforma VIP de comercio electrónico",
    userPortal: "Portal de usuario",
    adminPortal: "Portal de administrador",
    welcomeBack: "Bienvenido de nuevo",
    createAccount: "Crear cuenta",
    administratorAccess: "Acceso de administrador",
    accessVipAccount: "Accede a tu cuenta VIP",
    username: "Nombre de usuario",
    referenceKey: "Clave de referencia",
    adminUsername: "Usuario administrador",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    enterUsername: "Introduce el nombre de usuario",
    enterReferenceKey: "Introduce la clave de referencia",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "Iniciar sesión",
    signup: "Registrarse",
    dontHaveAccount: "¿No tienes una cuenta? Regístrate",
    alreadyHaveAccount: "¿Ya tienes una cuenta? Inicia sesión",
    pleaseEnterEmailPassword: "Introduce el correo y la contraseña.",
    pleaseEnterAdminUsername: "Introduce el usuario administrador.",

    premiumVipPlatform: "PLATAFORMA VIP PREMIUM",
    growYourEarnings: "Aumenta tus ganancias con",
    vipOrders: "Pedidos VIP",
    chooseVipLevel: "Elige tu nivel VIP",
    completeDailyOrders:
      "Elige tu nivel VIP, completa pedidos diarios y gana comisiones mediante nuestra plataforma profesional de comercio electrónico.",
    startVipOrders: "Iniciar pedidos VIP",
    depositUsdt: "Depositar USDT",
    walletBalance: "Saldo de la cartera",
    todaysCommission: "Comisión de hoy",
    ordersCompleted: "Pedidos completados",
    vipLevel: "Nivel VIP",
    membership: "Membresía",
    vipPackages: "Paquetes VIP",
    chooseYourLevel: "Elige tu nivel",
    higherVipHigherCommission: "VIP superior = mayor comisión",
    dailyOrders: "Pedidos diarios",
    earnCommission: "Ganar comisión",
    vipBenefits: "Beneficios VIP",
    complete25Orders: "Completa hasta 25 pedidos cada día.",
    commissionIncreases: "La comisión aumenta con el nivel VIP.",
    premiumFeatures: "Disfruta de funciones premium y recompensas.",

    startVipJourney: "Comienza tu viaje VIP con pedidos de Amazon.",
    higherLevelOrders: "Pedidos de nivel superior con mayor comisión.",
    premiumVipPackage: "Paquete VIP premium con máxima comisión.",
    unlock: "Desbloquear",
    commission: "Comisión",
    status: "Estado",
    available: "Disponible",
    openOrders: "Abrir pedidos",
    selectPackage: "Selecciona un paquete VIP para comenzar.",
    backToVipPackages: "Volver a paquetes VIP",
    yesterday: "Ayer",
    readyToStartOrdering: "¿Listo para comenzar a pedir?",
    completeVipOrders:
      "Completa tus pedidos VIP y gana comisión por cada pedido exitoso.",
    required: "Requerido",
    processingOrder: "Procesando pedido...",
    startOrdering: "Comenzar pedido",
    insufficientBalance: "Saldo insuficiente. VIP requiere",
    orderCompleted: "Pedido completado correctamente. Comisión ganada al",

    addFunds: "Añade fondos a tu cartera.",
    usdtDepositAddress: "Dirección de depósito USDT",
    trc20Address: "Dirección TRC20",
    copyAddress: "Copiar dirección",
    sendOnlyUsdt: "Envía únicamente USDT TRC20 a esta dirección.",
    pendingDeposit:
      "Las solicitudes de depósito aparecen actualmente como Pendientes.",
    submitDeposit: "Enviar depósito",
    amountUsdt: "Cantidad (USDT)",
    transactionIdHash: "ID / Hash de transacción",
    enterTransactionHash: "Introduce el hash de la transacción",
    validUsdtAmount: "Introduce una cantidad de USDT válida.",
    depositSubmitted:
      "Solicitud de depósito enviada. Estado: Pendiente. Saldo actual:",

    withdrawalRequest: "Solicita un retiro de tu cartera.",
    availableBalance: "Saldo disponible",
    usdtAmount: "Cantidad de USDT",
    walletAddress: "Dirección de cartera",
    trc20WalletAddress: "Dirección de cartera TRC20",
    completeAllFields: "Completa todos los campos.",
    withdrawalSubmitted: "Solicitud de retiro enviada correctamente.",
    withdrawalSuccessful: "Retiro exitoso",
    completed: "Completado",

    recordOrder: "Historial de pedidos",
    completedOrderHistory: "Historial de tus pedidos VIP completados.",
    commissionEarned: "comisión",

    manageAccount: "Administra la información de tu cuenta.",
    activeAccount: "Cuenta activa",
    invitationCode: "Código de invitación",
    creditScore: "Puntuación crediticia",
    serviceCenter: "Centro de servicio",
    contactSupport: "Contacta con soporte para obtener ayuda.",

    manageUsers: "Gestiona los usuarios registrados.",
    registeredUsers: "Gestiona los usuarios registrados.",
    inviteCode: "CÓDIGO DE INVITACIÓN",
    action: "ACCIÓN",
    block: "Bloquear",
    unblock: "Desbloquear",
    reviewWithdrawals: "Revisa y gestiona todas las solicitudes de retiro.",
    sendImportantNotifications:
      "Envía notificaciones importantes a los usuarios.",
    viewCompletedTrades: "Consulta todas las operaciones VIP completadas.",
    managePaymentSettings: "Gestiona la configuración de pagos y depósitos.",
    monitorActivity: "Supervisa la actividad reciente.",
    manageAdmins: "Gestiona las cuentas de administradores autorizados.",
    preparedForBackend:
      "Esta sección está preparada para la siguiente fase de backend y base de datos.",

    languages: "Idiomas",
  },

  Chinese: {
    menu: "菜单",
    online: "在线",
    administrator: "管理员",
    vipUser: "VIP 用户",
    exitPanel: "退出面板",

    dashboard: "仪表板",
    deposit: "充值",
    home: "首页",
    orders: "订单",
    ordersRecord: "订单记录",
    withdraw: "提现",
    profile: "个人资料",
    users: "用户",
    activity: "活动",

    userManagement: "用户管理",
    allWithdrawals: "所有提现",
    sendNotification: "发送通知",
    completedTrades: "已完成交易",
    paymentSettings: "支付设置",
    allActivity: "所有活动",
    adminUsers: "管理员",

    ecommerceVipPlatform: "电子商务 VIP 平台",
    userPortal: "用户门户",
    adminPortal: "管理员门户",
    welcomeBack: "欢迎回来",
    createAccount: "创建账户",
    administratorAccess: "管理员访问",
    accessVipAccount: "访问您的 VIP 账户",
    username: "用户名",
    referenceKey: "推荐码",
    adminUsername: "管理员用户名",
    email: "电子邮箱",
    password: "密码",
    confirmPassword: "确认密码",
    enterUsername: "输入用户名",
    enterReferenceKey: "输入推荐码",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "登录",
    signup: "注册",
    dontHaveAccount: "还没有账户？注册",
    alreadyHaveAccount: "已有账户？登录",
    pleaseEnterEmailPassword: "请输入邮箱和密码。",
    pleaseEnterAdminUsername: "请输入管理员用户名。",

    premiumVipPlatform: "高级 VIP 平台",
    growYourEarnings: "通过 VIP 订单",
    vipOrders: "增加您的收益",
    chooseVipLevel: "选择您的 VIP 等级",
    completeDailyOrders:
      "选择 VIP 等级，完成每日订单，并通过我们的专业电子商务平台赚取佣金。",
    startVipOrders: "开始 VIP 订单",
    depositUsdt: "充值 USDT",
    walletBalance: "钱包余额",
    todaysCommission: "今日佣金",
    ordersCompleted: "已完成订单",
    vipLevel: "VIP 等级",
    membership: "会员资格",
    vipPackages: "VIP 套餐",
    chooseYourLevel: "选择您的等级",
    higherVipHigherCommission: "VIP 等级越高 = 佣金越高",
    dailyOrders: "每日订单",
    earnCommission: "赚取佣金",
    vipBenefits: "VIP 福利",
    complete25Orders: "每天最多完成 25 个订单。",
    commissionIncreases: "VIP 等级越高，佣金比例越高。",
    premiumFeatures: "享受高级平台功能和奖励。",

    startVipJourney: "从 Amazon 订单开始您的 VIP 之旅。",
    higherLevelOrders: "更高级别的订单和更高的佣金。",
    premiumVipPackage: "最高佣金的高级 VIP 套餐。",
    unlock: "解锁",
    commission: "佣金",
    status: "状态",
    available: "可用",
    openOrders: "打开订单",
    selectPackage: "选择 VIP 套餐开始下单。",
    backToVipPackages: "返回 VIP 套餐",
    yesterday: "昨天",
    readyToStartOrdering: "准备开始下单了吗？",
    completeVipOrders: "完成 VIP 订单，每次成功订单都可获得佣金。",
    required: "所需",
    processingOrder: "正在处理订单...",
    startOrdering: "开始下单",
    insufficientBalance: "余额不足。VIP 需要",
    orderCompleted: "订单成功完成。获得佣金",

    addFunds: "向您的钱包添加资金。",
    usdtDepositAddress: "USDT 充值地址",
    trc20Address: "TRC20 地址",
    copyAddress: "复制地址",
    sendOnlyUsdt: "仅向此地址发送 USDT TRC20。",
    pendingDeposit: "充值请求当前显示为待处理。",
    submitDeposit: "提交充值",
    amountUsdt: "金额（USDT）",
    transactionIdHash: "交易 ID / 哈希",
    enterTransactionHash: "输入交易哈希",
    validUsdtAmount: "请输入有效的 USDT 金额。",
    depositSubmitted: "充值请求已提交。状态：待处理。当前余额：",

    withdrawalRequest: "从您的钱包申请提现。",
    availableBalance: "可用余额",
    usdtAmount: "USDT 金额",
    walletAddress: "钱包地址",
    trc20WalletAddress: "TRC20 钱包地址",
    completeAllFields: "请填写所有字段。",
    withdrawalSubmitted: "提现请求已成功提交。",
    withdrawalSuccessful: "提现成功",
    completed: "已完成",

    recordOrder: "订单记录",
    completedOrderHistory: "您已完成的 VIP 订单记录。",
    commissionEarned: "佣金",

    manageAccount: "管理您的账户信息。",
    activeAccount: "活跃账户",
    invitationCode: "邀请码",
    creditScore: "信用评分",
    serviceCenter: "服务中心",
    contactSupport: "联系支持团队获取账户帮助。",

    manageUsers: "管理已注册的平台用户。",
    registeredUsers: "管理已注册的平台用户。",
    inviteCode: "邀请码",
    action: "操作",
    block: "封禁",
    unblock: "解除封禁",
    reviewWithdrawals: "审核和管理所有用户提现请求。",
    sendImportantNotifications: "向平台用户发送重要通知。",
    viewCompletedTrades: "查看所有成功完成的 VIP 交易。",
    managePaymentSettings: "管理支付和充值设置。",
    monitorActivity: "监控最近的平台活动。",
    manageAdmins: "管理授权管理员账户。",
    preparedForBackend: "此部分已为下一阶段的后端和数据库开发准备。",

    languages: "语言",
  },

  Japanese: {
    menu: "メニュー",
    online: "オンライン",
    administrator: "管理者",
    vipUser: "VIPユーザー",
    exitPanel: "パネルを終了",

    dashboard: "ダッシュボード",
    deposit: "入金",
    home: "ホーム",
    orders: "注文",
    ordersRecord: "注文履歴",
    withdraw: "出金",
    profile: "プロフィール",
    users: "ユーザー",
    activity: "アクティビティ",

    userManagement: "ユーザー管理",
    allWithdrawals: "すべての出金",
    sendNotification: "通知を送信",
    completedTrades: "完了した取引",
    paymentSettings: "支払い設定",
    allActivity: "すべてのアクティビティ",
    adminUsers: "管理者ユーザー",

    ecommerceVipPlatform: "Eコマース VIP プラットフォーム",
    userPortal: "ユーザーポータル",
    adminPortal: "管理者ポータル",
    welcomeBack: "おかえりなさい",
    createAccount: "アカウントを作成",
    administratorAccess: "管理者アクセス",
    accessVipAccount: "VIPアカウントにアクセス",
    username: "ユーザー名",
    referenceKey: "紹介キー",
    adminUsername: "管理者ユーザー名",
    email: "メールアドレス",
    password: "パスワード",
    confirmPassword: "パスワードの確認",
    enterUsername: "ユーザー名を入力",
    enterReferenceKey: "紹介キーを入力",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "ログイン",
    signup: "サインアップ",
    dontHaveAccount: "アカウントをお持ちでないですか？サインアップ",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？ログイン",
    pleaseEnterEmailPassword: "メールアドレスとパスワードを入力してください。",
    pleaseEnterAdminUsername: "管理者ユーザー名を入力してください。",

    premiumVipPlatform: "プレミアム VIP プラットフォーム",
    growYourEarnings: "収益を伸ばす",
    vipOrders: "VIP注文",
    chooseVipLevel: "VIPレベルを選択",
    completeDailyOrders:
      "VIPレベルを選択し、毎日の注文を完了して手数料を獲得しましょう。",
    startVipOrders: "VIP注文を開始",
    depositUsdt: "USDTを入金",
    walletBalance: "ウォレット残高",
    todaysCommission: "本日の手数料",
    ordersCompleted: "完了した注文",
    vipLevel: "VIPレベル",
    membership: "メンバーシップ",
    vipPackages: "VIPパッケージ",
    chooseYourLevel: "レベルを選択",
    higherVipHigherCommission: "高いVIPレベル = 高い手数料",
    dailyOrders: "毎日の注文",
    earnCommission: "手数料を獲得",
    vipBenefits: "VIP特典",
    complete25Orders: "毎日最大25件の注文を完了。",
    commissionIncreases: "VIPレベルに応じて手数料率が上がります。",
    premiumFeatures: "プレミアム機能と報酬をお楽しみください。",

    startVipJourney: "Amazon VIP注文でVIP旅を開始しましょう。",
    higherLevelOrders: "高いレベルの注文で高い手数料を適用。",
    premiumVipPackage: "最大手数料率のプレミアムVIPパッケージ。",
    unlock: "ロック解除",
    commission: "手数料",
    status: "ステータス",
    available: "利用可能",
    openOrders: "注文を開く",
    selectPackage: "注文を開始するVIPパッケージを選択してください。",
    backToVipPackages: "VIPパッケージに戻る",
    yesterday: "昨日",
    readyToStartOrdering: "注文を開始する準備はできましたか？",
    completeVipOrders: "VIP注文を完了して手数料を獲得しましょう。",
    required: "必要",
    processingOrder: "注文を処理中...",
    startOrdering: "注文を開始",
    insufficientBalance: "残高不足です。VIPには以下が必要です",
    orderCompleted: "注文が正常に完了しました。獲得手数料率",

    addFunds: "ウォレットに資金を追加します。",
    usdtDepositAddress: "USDT入金アドレス",
    trc20Address: "TRC20アドレス",
    copyAddress: "アドレスをコピー",
    sendOnlyUsdt: "このアドレスにはUSDT TRC20のみを送信してください。",
    pendingDeposit: "入金リクエストは現在『保留中』と表示されます。",
    submitDeposit: "入金を送信",
    amountUsdt: "金額 (USDT)",
    transactionIdHash: "トランザクションID / ハッシュ",
    enterTransactionHash: "トランザクションハッシュを入力",
    validUsdtAmount: "有効なUSDT金額を入力してください。",
    depositSubmitted: "入金リクエストが送信されました。ステータス: 保留中",

    withdrawalRequest: "ウォレットからの出金をリクエストします。",
    availableBalance: "利用可能残高",
    usdtAmount: "USDT金額",
    walletAddress: "ウォレットアドレス",
    trc20WalletAddress: "TRC20ウォレットアドレス",
    completeAllFields: "すべての項目を入力してください。",
    withdrawalSubmitted: "出金リクエストが正常に送信されました。",
    withdrawalSuccessful: "出金成功",
    completed: "完了",

    recordOrder: "注文履歴",
    completedOrderHistory: "完了したVIP注文の履歴。",
    commissionEarned: "獲得手数料",

    manageAccount: "アカウント情報を管理します。",
    activeAccount: "アクティブアカウント",
    invitationCode: "招待コード",
    creditScore: "クレジットスコア",
    serviceCenter: "サービスセンター",
    contactSupport: "サポートにお問い合わせください。",

    manageUsers: "登録ユーザーを管理します。",
    registeredUsers: "登録ユーザーを管理します。",
    inviteCode: "招待コード",
    action: "アクション",
    block: "ブロック",
    unblock: "ブロック解除",
    reviewWithdrawals: "ユーザーの出金リクエストを確認・管理します。",
    sendImportantNotifications: "ユーザーに重要な通知を送信します。",
    viewCompletedTrades: "完了したVIP取引を表示します。",
    managePaymentSettings: "支払いおよび入金設定を管理します。",
    monitorActivity: "アクティビティを監視します。",
    manageAdmins: "管理者アカウントを管理します。",
    preparedForBackend: "バックエンド準備用セクション。",

    languages: "言語",
  },

  Turkish: {
    menu: "Menü",
    online: "Çevrimiçi",
    administrator: "Yönetici",
    vipUser: "VIP Kullanıcı",
    exitPanel: "Panellerden Çıkış",

    dashboard: "Kontrol Paneli",
    deposit: "Yatır",
    home: "Ana Sayfa",
    orders: "Siparişler",
    ordersRecord: "Sipariş Geçmişi",
    withdraw: "Çek",
    profile: "Profil",
    users: "Kullanıcılar",
    activity: "Aktivite",

    userManagement: "Kullanıcı Yönetimi",
    allWithdrawals: "Tüm Çekimler",
    sendNotification: "Bildirim Gönder",
    completedTrades: "Tamamlanan İşlemler",
    paymentSettings: "Ödeme Ayarları",
    allActivity: "Tüm Aktiviteler",
    adminUsers: "Yöneticiler",

    ecommerceVipPlatform: "E-Ticaret VIP Platformu",
    userPortal: "Kullanıcı Portalı",
    adminPortal: "Yönetici Portalı",
    welcomeBack: "Tekrar Hoş Geldiniz",
    createAccount: "Hesap Oluştur",
    administratorAccess: "Yönetici Erişimi",
    accessVipAccount: "VIP Hesabınıza Erişin",
    username: "Kullanıcı Adı",
    referenceKey: "Referans Anahtarı",
    adminUsername: "Yönetici Adı",
    email: "E-posta",
    password: "Şifre",
    confirmPassword: "Şifreyi Doğrula",
    enterUsername: "Kullanıcı adını girin",
    enterReferenceKey: "Referans anahtarını girin",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "Giriş Yap",
    signup: "Kayıt Ol",
    dontHaveAccount: "Hesabınız yok mu? Kayıt ol",
    alreadyHaveAccount: "Zaten hesabınız var mı? Giriş yap",
    pleaseEnterEmailPassword: "Lütfen e-posta ve şifrenizi girin.",
    pleaseEnterAdminUsername: "Lütfen yönetici kullanıcı adını girin.",

    premiumVipPlatform: "PREMIUM VIP PLATFORMU",
    growYourEarnings: "Kazancınızı Artırın",
    vipOrders: "VIP Siparişler",
    chooseVipLevel: "VIP Seviyenizi Seçin",
    completeDailyOrders:
      "VIP seviyenizi seçin, günlük siparişleri tamamlayın ve komisyon kazanın.",
    startVipOrders: "VIP Siparişleri Başlat",
    depositUsdt: "USDT Yatır",
    walletBalance: "Cüzdan Bakiyesi",
    todaysCommission: "Bugünkü Komisyon",
    ordersCompleted: "Tamamlanan Siparişler",
    vipLevel: "VIP Seviyesi",
    membership: "Üyelik",
    vipPackages: "VIP Paketleri",
    chooseYourLevel: "Seviyenizi Seçin",
    higherVipHigherCommission: "Yüksek VIP = Yüksek Komisyon",
    dailyOrders: "Günlük Siparişler",
    earnCommission: "Komisyon Kazan",
    vipBenefits: "VIP Avantajları",
    complete25Orders: "Hergün 25 siparişe kadar tamamlayın.",
    commissionIncreases: "Komisyon oranı VIP seviyesiyle artar.",
    premiumFeatures: "Ayrıcalıklı platform özelliklerinin tadını çıkarın.",

    startVipJourney: "Amazon siparişleriyle VIP yolculuğunuza başlayın.",
    higherLevelOrders: "Artan komisyonlu üst seviye siparişler.",
    premiumVipPackage: "Maksimum komisyonlu premium VIP paketi.",
    unlock: "Kilidi Aç",
    commission: "Komisyon",
    status: "Durum",
    available: "Kullanılabilir",
    openOrders: "Siparişleri Aç",
    selectPackage: "Başlamak için bir VIP paketi seçin.",
    backToVipPackages: "VIP Paketlerine Dön",
    yesterday: "Dün",
    readyToStartOrdering: "Sipariş vermeye hazır mısınız?",
    completeVipOrders: "VIP siparişlerinizi tamamlayın ve komisyon kazanın.",
    required: "Gerekli",
    processingOrder: "Sipariş İşleniyor...",
    startOrdering: "Siparişe Başla",
    insufficientBalance: "Yetersiz bakiye. VIP gereksinimi",
    orderCompleted: "Sipariş başarıyla tamamlandı. Kazanılan komisyon",

    addFunds: "Cüzdanınıza fon ekleyin.",
    usdtDepositAddress: "USDT Yatırma Adresi",
    trc20Address: "TRC20 Adresi",
    copyAddress: "Adresi Kopyala",
    sendOnlyUsdt: "Bu adrese yalnızca USDT TRC20 gönderin.",
    pendingDeposit: "Yatırma talepleri Beklemede olarak gösterilmektedir.",
    submitDeposit: "Yatırmayı Gönder",
    amountUsdt: "Miktar (USDT)",
    transactionIdHash: "İşlem ID / Hash",
    enterTransactionHash: "İşlem hash'ini girin",
    validUsdtAmount: "Lütfen geçerli bir USDT miktarı girin.",
    depositSubmitted: "Yatırma talebi gönderildi. Durum: Beklemede",

    withdrawalRequest: "Cüzdanınızdan çekim talebinde bulunun.",
    availableBalance: "Kullanılabilir Bakiye",
    usdtAmount: "USDT Miktarı",
    walletAddress: "Cüzdan Adresi",
    trc20WalletAddress: "TRC20 cüzdan adresi",
    completeAllFields: "Lütfen tüm alanları doldurun.",
    withdrawalSubmitted: "Çekim talebi başarıyla gönderildi.",
    withdrawalSuccessful: "Çekim Başarılı",
    completed: "Tamamlandı",

    recordOrder: "Sipariş Geçmişi",
    completedOrderHistory: "Tamamlanan VIP sipariş geçmişiniz.",
    commissionEarned: "komisyon",

    manageAccount: "Hesap bilgilerinizi yönetin.",
    activeAccount: "Aktif hesap",
    invitationCode: "Davet Kodu",
    creditScore: "Kredi Puanı",
    serviceCenter: "Hizmet Merkezi",
    contactSupport: "Destek ile iletişime geçin.",

    manageUsers: "Kullanıcıları yönetin.",
    registeredUsers: "Kullanıcıları yönetin.",
    inviteCode: "DAVET KODU",
    action: "EYLEM",
    block: "Engelle",
    unblock: "Engeli Kaldır",
    reviewWithdrawals: "Tüm çekim taleplerini inceleyin ve yönetin.",
    sendImportantNotifications: "Bildirimler gönderin.",
    viewCompletedTrades: "Tamamlanan işlemleri görüntüleyin.",
    managePaymentSettings: "Ödeme ayarlarını yönetin.",
    monitorActivity: "Aktiviteyi izleyin.",
    manageAdmins: "Yöneticileri yönetin.",
    preparedForBackend: "Arka yüz hazırlık bölümü.",

    languages: "Diller",
  },

  French: {
    menu: "Menu",
    online: "En ligne",
    administrator: "Administrateur",
    vipUser: "Utilisateur VIP",
    exitPanel: "Quitter le panneau",

    dashboard: "Tableau de bord",
    deposit: "Dépôt",
    home: "Accueil",
    orders: "Commandes",
    ordersRecord: "Historique des commandes",
    withdraw: "Retirer",
    profile: "Profil",
    users: "Utilisateurs",
    activity: "Activité",

    userManagement: "Gestion des utilisateurs",
    allWithdrawals: "Tous les retraits",
    sendNotification: "Envoyer une notification",
    completedTrades: "Transactions terminées",
    paymentSettings: "Paramètres de paiement",
    allActivity: "Toute l'activité",
    adminUsers: "Administrateurs",

    ecommerceVipPlatform: "Plateforme VIP E-Commerce",
    userPortal: "Portail utilisateur",
    adminPortal: "Portail administrateur",
    welcomeBack: "Bon retour",
    createAccount: "Créer un compte",
    administratorAccess: "Accès administrateur",
    accessVipAccount: "Accédez à votre compte VIP",
    username: "Nom d'utilisateur",
    referenceKey: "Clé de référence",
    adminUsername: "Nom d'utilisateur admin",
    email: "E-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    enterUsername: "Entrez le nom d'utilisateur",
    enterReferenceKey: "Entrez la clé de référence",
    enterAdminUsername: "admin1",
    enterEmail: "you@example.com",
    enterPassword: "••••••••",
    login: "Connexion",
    signup: "S'inscrire",
    dontHaveAccount: "Vous n'avez pas de compte ? S'inscrire",
    alreadyHaveAccount: "Vous avez déjà un compte ? Connexion",
    pleaseEnterEmailPassword: "Veuillez entrer l'e-mail et le mot de passe.",
    pleaseEnterAdminUsername: "Veuillez entrer le nom d'utilisateur admin.",

    premiumVipPlatform: "PLATEFORME VIP PREMIUM",
    growYourEarnings: "Augmentez vos gains avec",
    vipOrders: "Commandes VIP",
    chooseVipLevel: "Choisissez votre niveau VIP",
    completeDailyOrders:
      "Choisissez votre niveau VIP, effectuez des commandes quotidiennes et gagnez des commissions.",
    startVipOrders: "Commencer les commandes VIP",
    depositUsdt: "Déposer des USDT",
    walletBalance: "Solde du portefeuille",
    todaysCommission: "Commission d'aujourd'hui",
    ordersCompleted: "Commandes effectuées",
    vipLevel: "Niveau VIP",
    membership: "Adhésion",
    vipPackages: "Packs VIP",
    chooseYourLevel: "Choisissez votre niveau",
    higherVipHigherCommission: "VIP plus élevé = Commission plus élevée",
    dailyOrders: "Commandes quotidiennes",
    earnCommission: "Gagner une commission",
    vipBenefits: "Avantages VIP",
    complete25Orders: "Effectuez jusqu'à 25 commandes chaque jour.",
    commissionIncreases: "Le taux de commission augmente avec le niveau VIP.",
    premiumFeatures: "Profitez des fonctionnalités premium et des récompenses.",

    startVipJourney: "Commencez votre aventure VIP avec les commandes Amazon.",
    higherLevelOrders: "Commandes de niveau supérieur avec commission accrue.",
    premiumVipPackage: "Pack VIP premium avec commission maximale.",
    unlock: "Débloquer",
    commission: "Commission",
    status: "Statut",
    available: "Disponible",
    openOrders: "Ouvrir les commandes",
    selectPackage: "Sélectionnez un pack VIP pour commencer.",
    backToVipPackages: "Retour aux packs VIP",
    yesterday: "Hier",
    readyToStartOrdering: "Prêt à commencer à commander ?",
    completeVipOrders:
      "Effectuez vos commandes VIP et gagnez une commission.",
    required: "Requis",
    processingOrder: "Traitement de la commande...",
    startOrdering: "Commencer la commande",
    insufficientBalance: "Solde insuffisant. VIP nécessite",
    orderCompleted: "Commande effectuée avec succès. Commission gagnée à",

    addFunds: "Ajoutez des fonds à votre portefeuille.",
    usdtDepositAddress: "Adresse de dépôt USDT",
    trc20Address: "Adresse TRC20",
    copyAddress: "Copier l'adresse",
    sendOnlyUsdt: "Envoyez uniquement des USDT TRC20 à cette adresse.",
    pendingDeposit:
      "Les demandes de dépôt sont actuellement affichées comme En attente.",
    submitDeposit: "Soumettre le dépôt",
    amountUsdt: "Montant (USDT)",
    transactionIdHash: "ID / Hachage de transaction",
    enterTransactionHash: "Entrez le hachage de transaction",
    validUsdtAmount: "Veuillez entrer un montant USDT valide.",
    depositSubmitted: "Demande de dépôt soumise. Statut: En attente.",

    withdrawalRequest: "Demandez un retrait de votre portefeuille.",
    availableBalance: "Solde disponible",
    usdtAmount: "Montant USDT",
    walletAddress: "Adresse du portefeuille",
    trc20WalletAddress: "Adresse de portefeuille TRC20",
    completeAllFields: "Veuillez remplir tous les champs.",
    withdrawalSubmitted: "Demande de retrait soumise avec succès.",
    withdrawalSuccessful: "Retrait réussi",
    completed: "Terminé",

    recordOrder: "Historique des commandes",
    completedOrderHistory: "Votre historique de commandes VIP effectuées.",
    commissionEarned: "commission",

    manageAccount: "Gérez les informations de votre compte.",
    activeAccount: "Compte actif",
    invitationCode: "Code d'invitation",
    creditScore: "Score de crédit",
    serviceCenter: "Centre de service",
    contactSupport: "Contactez le support pour obtenir de l'aide.",

    manageUsers: "Gérez les utilisateurs enregistrés.",
    registeredUsers: "Gérez les utilisateurs enregistrés.",
    inviteCode: "CODE D'INVITATION",
    action: "ACTION",
    block: "Bloquer",
    unblock: "Débloquer",
    reviewWithdrawals: "Examinez et gérez toutes les demandes de retrait.",
    sendImportantNotifications:
      "Envoyez des notifications importantes aux utilisateurs.",
    viewCompletedTrades: "Consultez toutes les transactions VIP terminées.",
    managePaymentSettings: "Gérez les paramètres de paiement et de dépôt.",
    monitorActivity: "Surveillez l'activité récente de la plateforme.",
    manageAdmins: "Gérez les comptes administrateurs autorisés.",
    preparedForBackend:
      "Cette section est préparée pour la prochaine phase backend/base de données.",

    languages: "Langues",
  },
};

// Available languages array for UI drop-downs
export const languages = Object.keys(translations) as Language[];