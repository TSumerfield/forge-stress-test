import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Suspense } from "react";
import FunnelTracker from "../components/FunnelTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Forge | Sports Leadership Intelligence",
    template: "%s | Forge",
  },
  description:
    "Forge brings together evidence, independent analysis and practical systems for leaders responsible for school sports and athletics.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <Suspense fallback={null}>
          <FunnelTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
