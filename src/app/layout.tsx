import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fat Rooster (@fatrooster.ng) | Big Bites. Bold Flavour. | Lekki & Elegushi",
  description:
    "Order crispy chicken & chips, spicy peppered wings, and wood-fired pizzas from Fat Rooster Lagos. Located at Richmond Estate, Ikate Lekki & Sol Beach Elegushi Gate 2. Open 12pm–10pm daily. Order on WhatsApp, Mano & Glovo.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#09090b] text-zinc-100">{children}</body>
    </html>
  );
}
