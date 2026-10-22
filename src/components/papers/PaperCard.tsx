"use client";

import React from "react";
import { Paper } from "@/types";
import { useResearch } from "@/context/ResearchContext";
import {
  GitCompare,
  ExternalLink,
  Check,
  Quote,
} from "lucide-react";

interface PaperCardProps {
  paper: Paper;
  viewMode?: "grid" | "list";
}

export function PaperCard({ paper, viewMode = "grid" }: PaperCardProps) {
  const {
    setActivePaperModal,
    selectedPaperIds,
    togglePaperSelection,
    setActiveCitation,
  } = useResearch();

  const isSelected = selectedPaperIds.includes(paper.id);

  if (viewMode === "list") {
    return (
      <div className="flex items-center justify-between p-4 bg-[#111114] border border-white/10 rounded-xl hover:border-white/25 hover:bg-[#151518] transition-all group">
        <div className="flex items-start gap-3.5 min-w-0 flex-1 pr-4">
          <button
            onClick={() => togglePaperSelection(paper.id)}
            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              isSelected
                ? "bg-white border-white text-black"
                : "border-zinc-700 hover:border-zinc-500 bg-transparent"
            }`}
            title={isSelected ? "Remove from comparison" : "Add to comparison"}
          >
            {isSelected && <Check className="w-3 h-3 text-black" />}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap font-mono">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/10 text-white border border-white/10">
                {paper.year}
              </span>
              <span className="text-[10px] text-zinc-400">
                {paper.topic}
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                {paper.citationCount} citations
              </span>
            </div>

            <h3
              onClick={() => setActivePaperModal(paper)}
              className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors cursor-pointer truncate"
            >
              {paper.title}
            </h3>

            <p className="text-[11px] text-zinc-500 mt-0.5 truncate font-mono">
              {paper.authors.join(", ")} • {paper.venue}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {paper.objectiveCitation && (
            <button
              onClick={() => setActiveCitation(paper.objectiveCitation!)}
              className="hidden md:flex items-center gap-1 text-[10px] font-mono text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-1 rounded border border-blue-500/20 transition-colors"
              title="Inspect primary objective citation"
            >
              <Quote className="w-2.5 h-2.5" />
              <span>{paper.objectiveCitation.badge}</span>
            </button>
          )}

          <button
            onClick={() => setActivePaperModal(paper)}
            className="px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-white/15"
          >
            Details
          </button>

          <button
            onClick={() => {
              togglePaperSelection(paper.id);
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSelected
                ? "bg-white text-black border-white"
                : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
            title={isSelected ? "Selected for comparison" : "Add to comparison"}
          >
            <GitCompare className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid view card
  return (
    <div className="flex flex-col bg-[#111114] border border-white/10 rounded-2xl p-5 hover:border-white/30 hover:bg-[#141418] transition-all group relative shadow-md">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3 font-mono">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
            {paper.year}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5">
            {paper.topic.split("&")[0].trim()}
          </span>
        </div>

        <button
          onClick={() => togglePaperSelection(paper.id)}
          className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 border transition-all ${
            isSelected
              ? "bg-white text-black border-white"
              : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
          }`}
        >
          <GitCompare className="w-3 h-3" />
          <span>{isSelected ? "Comparing" : "Compare"}</span>
        </button>
      </div>

      {/* Title */}
      <h3
        onClick={() => setActivePaperModal(paper)}
        className="text-xs sm:text-sm font-bold text-zinc-100 group-hover:text-white transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
      >
        {paper.title}
      </h3>

      {/* Authors & Venue */}
      <p className="text-[11px] text-zinc-500 mb-3 line-clamp-1 font-mono">
        {paper.authors.join(", ")}
      </p>

      {/* Abstract preview */}
      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4 flex-1">
        {paper.abstract}
      </p>

      {/* Tags / Citations preview */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Quote className="w-3 h-3 text-blue-400" />
          <span className="font-semibold text-zinc-200">{paper.citationCount}</span>
          <span>citations</span>
        </div>

        <div className="flex items-center gap-2">
          {paper.objectiveCitation && (
            <button
              onClick={() => setActiveCitation(paper.objectiveCitation!)}
              className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/20 transition-colors"
            >
              {paper.objectiveCitation.badge}
            </button>
          )}

          <button
            onClick={() => setActivePaperModal(paper)}
            className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-0.5 transition-colors"
          >
            <span>Review</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
