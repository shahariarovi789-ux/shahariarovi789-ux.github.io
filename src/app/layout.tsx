import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import ChatWidget from "@/components/chatbot/ChatWidget";
import NeuralField from "@/components/background/NeuralField";
import CustomCursor from "@/components/layout/CustomCursor";
import { SITE } from "@/data/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — Backend AI Systems & Algorithms Engineer`,
  description: `Portfolio of ${SITE.name} — Backend AI Engineer Intern at FlyRank AI, 2× ICPC Dhaka Regionalist, specializing in FastAPI, Redis, Model Context Protocol (MCP), and distributed rate-limiting architectures.`,
  keywords: [
    "Shahariar Asfaq Ovi",
    "Backend AI Engineer",
    "Model Context Protocol",
    "MCP",
    "FastAPI",
    "Redis",
    "ICPC Regionalist",
    "Competitive Programming",
    "FlyRank AI"
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body bg-black text-foreground antialiased selection:bg-blue-600 selection:text-white relative min-h-screen`}
      >
        <NeuralField />
        <CustomCursor />
        <div className="grain" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <ChatWidget />
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
