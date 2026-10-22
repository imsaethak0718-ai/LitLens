"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ToastContainer } from "@/components/ui/Toast";
import { UploadModal } from "@/components/papers/UploadModal";
import { PaperDetailModal } from "@/components/papers/PaperDetailModal";
import { CitationDrawer } from "@/components/papers/CitationDrawer";
import { CommandPalette } from "./CommandPalette";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true); // Default collapsed for clean editorial panoramic aesthetic!

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f6] font-sans antialiased selection:bg-white selection:text-black">
      {/* Top Two-Tier Editorial Header */}
      <Header onToggleMobile={() => setMobileOpen(true)} />

      {/* Main Content Viewport with Optional Collapsible Sidebar */}
      <div className="flex-1 flex min-w-0 relative">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 min-w-0 w-full overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global Modals, Drawers & Notifications */}
      <ToastContainer />
      <UploadModal />
      <PaperDetailModal />
      <CitationDrawer />
      <CommandPalette />
    </div>
  );
}
