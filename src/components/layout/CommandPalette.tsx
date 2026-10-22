"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResearch } from "@/context/ResearchContext";
import {
  Search,
  BookOpen,
  GitCompare,
  Sparkles,
  BarChart3,
  Settings,
  LayoutDashboard,
  FileText,
  ArrowRight,
  X,
  Upload,
} from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    papers,
    setActivePaperModal,
    setIsUploadOpen,
  } = useResearch();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredPapers = query.trim()
    ? papers.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.topic.toLowerCase().includes(query.toLowerCase()) ||
          p.authors.some((a) => a.toLowerCase().includes(query.toLowerCase())) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : papers.slice(0, 4);

  const navigationActions = [
    { name: "Overview Dashboard", href: "/", icon: LayoutDashboard },
    { name: "My Research Library", href: "/library", icon: BookOpen },
    { name: "Compare Papers Matrix", href: "/compare", icon: GitCompare },
    { name: "Research Assistant (Ask AI)", href: "/assistant", icon: Sparkles },
    { name: "Evaluation & Benchmarks", href: "/evaluation", icon: BarChart3 },
    { name: "Settings & Preferences", href: "/settings", icon: Settings },
  ].filter((item) =>
    query ? item.name.toLowerCase().includes(query.toLowerCase()) : true
  );

  const handleSelectPage = (href: string) => {
    setIsCommandPaletteOpen(false);
    router.push(href);
  };

  const handleSelectPaper = (paper: (typeof papers)[0]) => {
    setIsCommandPaletteOpen(false);
    setActivePaperModal(paper);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-[#111114] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-zinc-200 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a paper title, author, keyword, or page name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent border-none outline-none text-white placeholder-zinc-500 font-mono"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 font-mono">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-1">
              Navigation & Actions
            </div>
            <div className="space-y-1 mt-1">
              {navigationActions.slice(0, 4).map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.name}
                    onClick={() => handleSelectPage(action.href)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                      <span>{action.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setIsUploadOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-blue-400">Upload New Paper Dropzone</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Filtered Papers */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-1">
              Research Papers ({filteredPapers.length})
            </div>
            <div className="space-y-1.5 mt-1">
              {filteredPapers.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-zinc-500">
                  No matching papers found for &quot;{query}&quot;.
                </div>
              ) : (
                filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => handleSelectPaper(paper)}
                    className="p-3 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-zinc-500 group-hover:text-white shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-white line-clamp-1">
                            {paper.title}
                          </h4>
                          <p className="text-[10px] text-zinc-500 mt-0.5">
                            {paper.authors[0]} et al. • {paper.year} • {paper.topic}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-medium shrink-0">
                        {paper.tags[0]}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-black/50 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Press ESC to close</span>
          <span className="text-zinc-400">Demo Literature Index</span>
        </div>
      </div>
    </div>
  );
}
