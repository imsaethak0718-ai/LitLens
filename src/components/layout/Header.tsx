"use client";

import React, { useState } from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  Menu,
  Search,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onToggleMobile: () => void;
}

export function Header({ onToggleMobile }: HeaderProps) {
  const pathname = usePathname();
  const {
    setIsUploadOpen,
    setIsCommandPaletteOpen,
    selectedPaperIds,
    addToast,
  } = useResearch();

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("research@litlens.ai");
    setCopiedEmail(true);
    addToast({
      title: "Lab Contact Copied",
      message: "research@litlens.ai copied to clipboard",
      type: "info",
      duration: 2500,
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Fragments", href: "/#fragments" },
    { name: "Library", href: "/library" },
    { name: "Compare", href: "/compare", badge: selectedPaperIds.length },
    { name: "Assistant", href: "/assistant" },
    { name: "Evaluation", href: "/evaluation" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#09090b]/90 backdrop-blur-xl text-zinc-300 select-none border-b border-white/10">
      {/* Tier 1: Main Editorial Navigation Bar */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand Monogram + Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMobile}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            aria-label="Open navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Custom Monogram like the reference logo */}
            <div className="w-8 h-8 rounded-full border border-white/20 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center font-mono font-black text-xs text-white tracking-tighter group-hover:border-white/50 transition-colors">
              <span>LL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight text-white group-hover:text-zinc-200">
                LitLens
              </span>
              <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-mono">
                Research Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Editorial Page Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors relative py-1 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Contact & Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* Institutional Contact Pill Button */}
          <button
            onClick={handleCopyEmail}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-zinc-300 font-mono transition-all group"
            title="Click to copy research contact"
          >
            <span className="truncate max-w-[130px]">research@litlens.ai</span>
            {copiedEmail ? (
              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
            )}
          </button>

          {/* Upload Paper Pill */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Paper</span>
          </button>
        </div>
      </div>

      {/* Tier 2: Sub-Nav Bar with Hairline Grid Divisions */}
      <div className="border-t border-white/10 hidden lg:grid grid-cols-12 text-[11px] font-mono tracking-tight text-zinc-400">
        {/* Sub-col 1: Capabilities */}
        <div className="col-span-3 px-6 py-2 border-r border-white/10 flex items-center gap-3 truncate">
          <span className="text-zinc-200 hover:text-white cursor-pointer transition-colors">Literature Review</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Evidence Matrix</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Synthesis</span>
        </div>

        {/* Sub-col 2: Clinical Domains */}
        <div className="col-span-5 px-6 py-2 border-r border-white/10 flex items-center gap-3 truncate text-zinc-400">
          <span className="text-zinc-200">Retinal Deep Learning</span>
          <span className="text-zinc-600">•</span>
          <span>OCT Segmentation</span>
          <span className="text-zinc-600">•</span>
          <span>Foundation Models</span>
          <span className="text-zinc-600">•</span>
          <span>Edge Quantization</span>
        </div>

        {/* Sub-col 3: Benchmark Score */}
        <div className="col-span-2 px-4 py-2 border-r border-white/10 flex items-center justify-between text-zinc-300">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Audit: 96.8%</span>
          </div>
          <span className="text-[10px] text-zinc-500 uppercase">Verified</span>
        </div>

        {/* Sub-col 4: Search & Controls */}
        <div className="col-span-2 px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1 py-0.2 bg-white/10 rounded text-[9px] border border-white/10">⌘K</kbd>
          </button>

          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-zinc-200 font-semibold cursor-pointer">EN</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-zinc-300">DE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
