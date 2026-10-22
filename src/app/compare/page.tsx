"use client";

import React from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  Download,
  Plus,
  X,
  GitCompare,
  Quote,
  ExternalLink,
  Info,
  Layers,
  Database,
  Cpu,
  BarChart2,
  ShieldAlert,
  Target,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Paper } from "@/types";

export default function ComparePage() {
  const {
    papers,
    selectedPaperIds,
    togglePaperSelection,
    selectAllPapers,
    clearPaperSelection,
    setActiveCitation,
    setActivePaperModal,
    exportComparisonCSV,
  } = useResearch();

  const selectedPapers = papers.filter((p) => selectedPaperIds.includes(p.id));
  const unselectedPapers = papers.filter((p) => !selectedPaperIds.includes(p.id));

  const comparisonRows = [
    {
      key: "objective",
      label: "Research Objective",
      icon: Target,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      description: "Primary clinical goal & hypothesis",
      getValue: (p: Paper) => p.objective,
      getCitation: (p: Paper) => p.objectiveCitation,
    },
    {
      key: "dataset",
      label: "Dataset & Cohorts",
      icon: Database,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      description: "Sample sizes, imaging modalities & vendors",
      getValue: (p: Paper) => p.dataset,
      getCitation: (p: Paper) => p.datasetCitation,
    },
    {
      key: "methodology",
      label: "Methodology",
      icon: Layers,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      description: "Pretraining, supervision & loss functions",
      getValue: (p: Paper) => p.methodology,
      getCitation: (p: Paper) => p.methodologyCitation,
    },
    {
      key: "modelArchitecture",
      label: "Model Architecture",
      icon: Cpu,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      description: "Backbone, parameter count & layers",
      getValue: (p: Paper) => p.modelArchitecture,
      getCitation: (p: Paper) => p.modelCitation,
    },
    {
      key: "evaluationMetrics",
      label: "Evaluation Metrics",
      icon: BarChart2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      description: "Quantified performance benchmarks",
      getValue: (p: Paper) => p.evaluationMetrics,
      getCitation: (p: Paper) => p.metricsCitation,
    },
    {
      key: "reportedResults",
      label: "Reported Results",
      icon: BarChart2,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      description: "Key findings vs baselines",
      getValue: (p: Paper) => p.reportedResults,
      getCitation: (p: Paper) => p.resultsCitation,
    },
    {
      key: "limitations",
      label: "Explicit Limitations",
      icon: ShieldAlert,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "Reported caveats & edge cases",
      getValue: (p: Paper) => p.limitations,
      getCitation: (p: Paper) => p.limitationsCitation,
    },
  ];

  return (
    <div className="space-y-6 px-4 lg:px-12 py-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Compare Papers Matrix
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
              {selectedPapers.length} papers aligned
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Side-by-side evidence synthesis. Inspect extracted dimensions with verified page citations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportComparisonCSV(selectedPapers)}
            disabled={selectedPapers.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs disabled:opacity-40 transition-all font-mono"
            title="Export side-by-side comparison matrix to CSV format"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {selectedPapers.length < papers.length && (
            <button
              onClick={selectAllPapers}
              className="px-3 py-1.5 text-xs font-mono font-semibold text-zinc-300 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            >
              Select All ({papers.length})
            </button>
          )}

          {selectedPapers.length > 0 && (
            <button
              onClick={clearPaperSelection}
              className="px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-white rounded-xl border border-white/10 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Selected Papers Selector Strip */}
      <div className="p-4 rounded-2xl bg-[#111114] border border-white/10 shadow-xs space-y-3">
        <div className="flex items-center justify-between font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Selected for Comparison ({selectedPapers.length})
          </span>
          {unselectedPapers.length > 0 && (
            <span className="text-xs text-zinc-500">
              {unselectedPapers.length} more papers available in library
            </span>
          )}
        </div>

        {/* Selected Paper Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedPapers.map((paper) => (
            <div
              key={paper.id}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs font-medium text-zinc-200 shadow-xs group"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span
                onClick={() => setActivePaperModal(paper)}
                className="max-w-xs truncate cursor-pointer hover:text-white"
                title={paper.title}
              >
                {paper.title.slice(0, 36)}... ({paper.year})
              </span>
              <button
                onClick={() => togglePaperSelection(paper.id)}
                className="p-1 text-zinc-500 hover:text-white rounded-md transition-colors"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {unselectedPapers.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {unselectedPapers.slice(0, 3).map((paper) => (
                <button
                  key={paper.id}
                  onClick={() => togglePaperSelection(paper.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/40 border border-dashed border-white/15 text-xs text-zinc-400 hover:bg-white/5 hover:border-white/30 hover:text-white transition-colors font-mono"
                >
                  <Plus className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="max-w-[140px] truncate">
                    + {paper.title.slice(0, 22)}...
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Evidence Comparison Matrix */}
      {selectedPapers.length === 0 ? (
        <div className="p-16 text-center bg-[#111114] rounded-2xl border border-white/10 space-y-4">
          <GitCompare className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">
            No papers selected for comparison
          </h3>
          <p className="text-xs text-zinc-500 font-mono max-w-md mx-auto">
            Select at least 2 papers from your library to align objectives, datasets, model architectures, and explicit limitations side by side.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={selectAllPapers}
              className="px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs"
            >
              Select All Library Papers
            </button>
            <Link
              href="/library"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
            >
              Browse Library
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#111114] rounded-2xl border border-white/10 shadow-sm overflow-hidden">
          {/* Notice Banner */}
          <div className="p-3 bg-white/[0.02] border-b border-white/10 text-xs font-mono text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>
                All cells are linked to verified page citations. Unreported information is explicitly noted rather than assumed.
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              Scroll horizontally →
            </span>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-4 px-5 w-60 sticky left-0 z-10 bg-[#111114] text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-r border-white/10">
                    Dimension
                  </th>

                  {selectedPapers.map((paper) => (
                    <th
                      key={paper.id}
                      className="py-4 px-5 w-80 text-left align-top border-l border-white/10 bg-white/[0.01]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/10 text-white border border-white/10">
                            {paper.year}
                          </span>
                          <h4
                            onClick={() => setActivePaperModal(paper)}
                            className="text-xs font-bold text-zinc-100 hover:text-white transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {paper.title}
                          </h4>
                          <p className="text-[10px] text-zinc-500 line-clamp-1 font-mono">
                            {paper.authors[0]} et al. • {paper.topic.split("&")[0].trim()}
                          </p>
                        </div>

                        <button
                          onClick={() => togglePaperSelection(paper.id)}
                          className="p-1 text-zinc-600 hover:text-white rounded"
                          title="Remove column"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 text-xs">
                {comparisonRows.map((row) => {
                  const RowIcon = row.icon;

                  return (
                    <tr
                      key={row.key}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-5 sticky left-0 z-10 bg-[#111114] border-r border-white/10 font-semibold text-zinc-200 align-top">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`p-1 rounded-md border ${row.color}`}>
                            <RowIcon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white">
                            {row.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono font-normal leading-tight">
                          {row.description}
                        </p>
                      </td>

                      {selectedPapers.map((paper) => {
                        const val = row.getValue(paper);
                        const citation = row.getCitation(paper);
                        const isMissing =
                          !val ||
                          val.toLowerCase().includes("not reported") ||
                          val.toLowerCase().includes("missing");

                        return (
                          <td
                            key={paper.id}
                            className="py-4 px-5 align-top border-l border-white/10"
                          >
                            <div className="space-y-2">
                              {isMissing ? (
                                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                  <span>{val || "Not reported in manuscript"}</span>
                                </div>
                              ) : (
                                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                                  {val}
                                </p>
                              )}

                              {citation && (
                                <div className="pt-1">
                                  <button
                                    onClick={() => setActiveCitation(citation)}
                                    className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/20 transition-colors"
                                    title="View exact citation excerpt"
                                  >
                                    <Quote className="w-2.5 h-2.5" />
                                    <span>{citation.badge}</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="p-4 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">
              Showing comparison matrix for {selectedPapers.length} papers
            </span>

            <button
              onClick={() => exportComparisonCSV(selectedPapers)}
              className="flex items-center gap-1.5 text-zinc-200 hover:text-white font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download matrix as .csv</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
