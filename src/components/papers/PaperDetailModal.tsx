"use client";

import React, { useState } from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  X,
  Users,
  GitCompare,
  Sparkles,
  Copy,
  ExternalLink,
  Check,
  Layers,
  BarChart2,
  ShieldAlert,
  Database,
  Cpu,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function PaperDetailModal() {
  const router = useRouter();
  const {
    activePaperModal,
    setActivePaperModal,
    selectedPaperIds,
    togglePaperSelection,
    setActiveCitation,
    addToast,
  } = useResearch();

  const [activeTab, setActiveTab] = useState<"overview" | "evidence" | "bibtex">("overview");

  if (!activePaperModal) return null;

  const paper = activePaperModal;
  const isSelected = selectedPaperIds.includes(paper.id);

  const handleCopyBibtex = () => {
    const bibtex = `@article{${paper.authors[0].toLowerCase().split(" ")[1] || "author"}${paper.year},
  title = {${paper.title}},
  author = {${paper.authors.join(" and ")}},
  journal = {${paper.venue}},
  year = {${paper.year}},
  doi = {${paper.doiOrArxiv}}
}`;
    navigator.clipboard.writeText(bibtex);
    addToast({
      title: "BibTeX Copied",
      message: "BibTeX citation formatted and copied to clipboard.",
      type: "success",
    });
  };

  const handleAskAssistant = () => {
    setActivePaperModal(null);
    router.push("/assistant");
  };

  const evidenceDimensions = [
    {
      title: "Research Objective",
      content: paper.objective,
      citation: paper.objectiveCitation,
      icon: Layers,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Dataset & Cohorts",
      content: paper.dataset,
      citation: paper.datasetCitation,
      icon: Database,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Methodology",
      content: paper.methodology,
      citation: paper.methodologyCitation,
      icon: Cpu,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Model Architecture",
      content: paper.modelArchitecture,
      citation: paper.modelCitation,
      icon: Cpu,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Evaluation Metrics",
      content: paper.evaluationMetrics,
      citation: paper.metricsCitation,
      icon: BarChart2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Reported Results",
      content: paper.reportedResults,
      citation: paper.resultsCitation,
      icon: BarChart2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Limitations & Caveats",
      content: paper.limitations,
      citation: paper.limitationsCitation,
      icon: ShieldAlert,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-3xl bg-[#111114] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-zinc-200 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap font-mono">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  {paper.year}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5">
                  {paper.topic}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-500">
                  Sample Literature
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {paper.title}
              </h2>

              <p className="text-xs text-zinc-400 flex items-center gap-1.5 flex-wrap font-mono">
                <Users className="w-3.5 h-3.5 text-zinc-500" />
                <span>{paper.authors.join(", ")}</span>
              </p>

              <p className="text-[11px] text-zinc-500 font-mono">
                Venue: {paper.venue} • DOI: {paper.doiOrArxiv}
              </p>
            </div>

            <button
              onClick={() => setActivePaperModal(null)}
              className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4 mt-6 border-b border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-2.5 transition-colors border-b-2 -mb-px ${
                activeTab === "overview"
                  ? "border-white text-white font-semibold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Abstract & Highlights
            </button>
            <button
              onClick={() => setActiveTab("evidence")}
              className={`pb-2.5 transition-colors border-b-2 -mb-px flex items-center gap-1.5 ${
                activeTab === "evidence"
                  ? "border-white text-white font-semibold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span>Extracted Evidence Matrix</span>
              <span className="text-[9px] bg-white/10 text-white px-1.5 py-0.2 rounded-full">
                7
              </span>
            </button>
            <button
              onClick={() => setActiveTab("bibtex")}
              className={`pb-2.5 transition-colors border-b-2 -mb-px ${
                activeTab === "bibtex"
                  ? "border-white text-white font-semibold"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              BibTeX Citation
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Abstract */}
              <div>
                <h3 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Paper Abstract
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10">
                  {paper.abstract}
                </p>
              </div>

              {/* Key Findings */}
              <div>
                <h3 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Key Findings & Contributions
                </h3>
                <div className="space-y-2">
                  {paper.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-zinc-300 bg-white/[0.02] p-3 rounded-lg border border-white/10 shadow-xs"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic Tags */}
              <div>
                <h3 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Taxonomy & Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "evidence" && (
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-zinc-300 flex items-center justify-between font-mono">
                <span>
                  All dimensions below include verified page citations from manuscript coordinates.
                </span>
                <span className="text-[11px] text-zinc-400">
                  Click badges to inspect
                </span>
              </div>

              <div className="space-y-3">
                {evidenceDimensions.map((dim, idx) => {
                  const Icon = dim.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-black/40 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg border ${dim.color}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white">
                            {dim.title}
                          </span>
                        </div>

                        {dim.citation ? (
                          <button
                            onClick={() => setActiveCitation(dim.citation!)}
                            className="text-[10px] font-mono font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30 flex items-center gap-1 transition-colors"
                          >
                            <span>{dim.citation.badge}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-zinc-600 font-mono italic">
                            Unreferenced
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-300 leading-relaxed pl-8">
                        {dim.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "bibtex" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">
                  Standard BibTeX Citation Format
                </span>
                <button
                  onClick={handleCopyBibtex}
                  className="text-xs font-mono font-semibold text-white bg-white/10 hover:bg-white/15 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy BibTeX</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-black border border-white/10 text-zinc-300 text-xs font-mono overflow-x-auto leading-relaxed">
{`@article{${paper.authors[0].toLowerCase().split(" ")[1] || "author"}${paper.year},
  title = {${paper.title}},
  author = {${paper.authors.join(" and ")}},
  journal = {${paper.venue}},
  year = {${paper.year}},
  doi = {${paper.doiOrArxiv}},
  keywords = {${paper.tags.join(", ")}}
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#09090b] flex items-center justify-between">
          <button
            onClick={() => togglePaperSelection(paper.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              isSelected
                ? "bg-white text-black shadow-xs"
                : "bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10"
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>{isSelected ? "In Comparison (Remove)" : "Add to Comparison"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAskAssistant}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 text-xs font-semibold transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI About Paper</span>
            </button>

            <button
              onClick={() => setActivePaperModal(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
