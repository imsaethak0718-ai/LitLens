import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ResearchProvider } from "@/context/ResearchContext";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LitLens — AI Literature Review & Evidence Platform",
  description:
    "Turn papers into evidence. Discover connections. Review with confidence. Compare methodologies, inspect citations, and synthesize literature in medical image analysis and deep learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ResearchProvider>
          <AppLayout>{children}</AppLayout>
        </ResearchProvider>
      </body>
    </html>
  );
}
