import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Suspense } from "react";
import FunnelTracker from "../components/FunnelTracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Forge | Independent School Sport Research", template: "%s | Forge" },
  description: "Forge is an independent research project examining operational resilience and the systems behind sport in international schools.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}><body><Suspense fallback={null}><FunnelTracker /></Suspense>{children}</body></html>;
}
