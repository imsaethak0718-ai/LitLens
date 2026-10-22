"use client";

import React from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  X,
  Quote,
  FileText,
  Copy,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CitationDrawer() {
  const router = useRouter();
  const { activeCitation, setActiveCitation, addToast, setActivePaperModal, getPaperById } =
    useResearch();

  if (!activeCitation) return null;

  const paper = getPaperById(activeCitation.paperId);

  const handleCopyCitation = () => {
    const text = `"${activeCitation.excerpt}" — ${activeCitation.authors} (${activeCitation.year}), ${activeCitation.location}. From: ${activeCitation.paperTitle}`;
    navigator.clipboard.writeText(text);
    addToast({
      title: "Citation Copied",
      message: "Citation with excerpt copied to clipboard.",
      type: "success",
    });
  };

  const handleAskAssistant = () => {
    setActiveCitation(null);
    router.push("/assistant");
  };

  const handleViewPaper = () => {
    if (paper) {
      setActiveCitation(null);
      setActivePaperModal(paper);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-lg bg-[#0d0d10] h-full shadow-2xl border-l border-white/10 flex flex-col text-zinc-200 animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-start justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                  {activeCitation.badge}
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  {activeCitation.location}
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                Verified Ground-Truth Citation Anchor
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveCitation(null)}
            className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Paper Reference Card */}
          <div className="p-4 rounded-xl border border-white/10 bg-[#121215]">
            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white leading-snug">
                  {activeCitation.paperTitle}
                </h4>
                <p className="text-[11px] font-mono text-zinc-400 mt-1">
                  {activeCitation.authors} • {activeCitation.year}
                </p>
                {paper?.doiOrArxiv && (
                  <p className="text-[10px] text-blue-400 font-mono mt-1 truncate">
                    DOI: {paper.doiOrArxiv}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono">
              <span className="text-[10px] text-zinc-500">
                Status: <span className="text-emerald-400 font-semibold">Indexed & Verified</span>
              </span>
              <button
                onClick={handleViewPaper}
                className="text-[11px] text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Full paper</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Supporting Excerpt */}
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
              Exact Supporting Excerpt
            </label>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/15 text-xs text-zinc-200 leading-relaxed font-normal relative">
              <Quote className="w-8 h-8 text-white/5 absolute right-3 bottom-2 pointer-events-none" />
              <p className="relative z-10 font-serif italic text-sm text-zinc-100">&ldquo;{activeCitation.excerpt}&rdquo;</p>
            </div>
          </div>

          {/* Section Context */}
          {activeCitation.context && (
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                Surrounding Manuscript Anchor
              </label>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-400 leading-relaxed font-mono">
                {activeCitation.context}
              </div>
            </div>
          )}

          {/* Verification Badge */}
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-emerald-300">
                Ground Truth Verified
              </p>
              <p className="text-emerald-400/80 text-[11px] font-mono mt-0.5">
                Cosine similarity 0.942 against extracted full-text coordinates.
              </p>
            </div>
          </div>

          {/* Sample Disclaimer */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-500">
            DEMO DATA: Synthetically generated research metadata for UI demonstration.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#09090b] flex items-center gap-2">
          <button
            onClick={handleCopyCitation}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Citation</span>
          </button>

          <button
            onClick={handleAskAssistant}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask in Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
}
