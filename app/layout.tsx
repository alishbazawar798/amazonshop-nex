import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
export const metadata: Metadata = {
  title: "Amazonshop | E-Commerce VIP Platform",
  description: "Amazonshop VIP E-Commerce Platform",

  icons: {
    icon: "/logos/logo.png",
    shortcut: "/logos/logo.png",
    apple: "/logos/logo.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}