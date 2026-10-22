"use client";

import React, { useState } from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  MOCK_EVALUATION_METRICS,
  MOCK_EVALUATION_RUNS,
} from "@/data/mockPapers";
import { EvaluationRun } from "@/types";
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCw,
  X,
  Info,
} from "lucide-react";

export default function EvaluationPage() {
  const { addToast } = useResearch();

  const [runs, setRuns] = useState<EvaluationRun[]>(MOCK_EVALUATION_RUNS);
  const [selectedRun, setSelectedRun] = useState<EvaluationRun | null>(null);
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false);

  const handleTriggerRun = async () => {
    setIsRunningBenchmark(true);
    addToast({
      title: "Benchmark Run Started",
      message: "Testing retrieval, citation correctness, and synthesis latency on 6 papers...",
      type: "info",
    });

    await new Promise((r) => setTimeout(r, 1200));

    const newRun: EvaluationRun = {
      id: "run-oct-2024-" + String(runs.length + 1).padStart(2, "0"),
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
      query: "Benchmark multi-label diabetic retinopathy severity and zero-shot transfer",
      papersEvaluated: 6,
      citationCorrectness: 98.2,
      retrievalRelevance: 95.8,
      answerCompleteness: 93.4,
      latencySeconds: 1.12,
      status: "passed",
      notes: "High fidelity citation grounding achieved on Swin-Retina and OphthaFoundation benchmarks.",
    };

    setRuns([newRun, ...runs]);
    setIsRunningBenchmark(false);
    addToast({
      title: "Benchmark Completed",
      message: "Overall score: 98.2% citation correctness (1.12s latency).",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 px-4 lg:px-12 py-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Evaluation & Benchmarks
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
              Demo Benchmark
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Automated quality assurance metrics measuring retrieval fidelity, citation grounding, and synthesis speed.
          </p>
        </div>

        <button
          onClick={handleTriggerRun}
          disabled={isRunningBenchmark}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs disabled:opacity-40 transition-all shrink-0 font-mono"
        >
          {isRunningBenchmark ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-black" />
          )}
          <span>{isRunningBenchmark ? "Running Suite..." : "Run Benchmark Suite"}</span>
        </button>
      </div>

      {/* Prominent Demo Data Banner */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
        <Info className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed font-mono">
          <span className="font-bold text-white">Synthetic Benchmark Demonstration:</span> Metrics shown represent simulated evaluation runs over synthetic test sets to demonstrate quality monitoring workflows.
        </div>
      </div>

      {/* 4 Mock Evaluation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_EVALUATION_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="p-5 rounded-2xl bg-[#111114] border border-white/10 shadow-xs hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {metric.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Target: {metric.target}{metric.unit}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2 font-mono">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {metric.value}
                <span className="text-lg font-bold text-zinc-500 ml-0.5">
                  {metric.unit}
                </span>
              </span>
              <span className="text-[11px] font-semibold text-emerald-400">
                {metric.change}
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-zinc-500 font-mono leading-tight">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* Benchmark Trend SVG Visualization */}
      <div className="bg-[#111114] p-6 rounded-2xl border border-white/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">
              Retrieval & Citation Quality Trend (Last 7 Runs)
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5 font-mono">
              Precision @ k and Ground Truth Citation Verification over time
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-200">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>Citation Correctness (%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-600"></span>
              <span>Retrieval Relevance (%)</span>
            </div>
          </div>
        </div>

        {/* Clean SVG Visualization Curve */}
        <div className="relative pt-4 pb-2">
          <svg className="w-full h-44 overflow-visible" viewBox="0 0 700 160">
            <line x1="0" y1="20" x2="700" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="60" x2="700" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            <path
              d="M 20 50 Q 120 40, 220 45 T 420 30 T 560 22 T 680 18"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <path
              d="M 20 80 Q 120 70, 220 65 T 420 55 T 560 48 T 680 40"
              fill="none"
              stroke="#71717a"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />

            {[
              { x: 20, y: 50 },
              { x: 130, y: 42 },
              { x: 250, y: 44 },
              { x: 380, y: 32 },
              { x: 500, y: 26 },
              { x: 620, y: 20 },
              { x: 680, y: 18 },
            ].map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  className="fill-[#111114] stroke-white stroke-2"
                />
              </g>
            ))}
          </svg>

          <div className="flex justify-between text-[10px] text-zinc-500 font-mono pt-2 border-t border-white/10">
            <span>Run #01 (Oct 10)</span>
            <span>Run #02 (Oct 12)</span>
            <span>Run #03 (Oct 15)</span>
            <span>Run #04 (Oct 18)</span>
            <span>Run #05 (Oct 20)</span>
            <span>Run #06 (Oct 21)</span>
            <span>Latest (Today)</span>
          </div>
        </div>
      </div>

      {/* Recent Evaluation Runs Table */}
      <div className="bg-[#111114] rounded-2xl border border-white/10 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between font-mono">
          <div>
            <h2 className="text-sm font-bold text-white">
              Recent Benchmark Runs
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Click any execution run to inspect query traces, retrieval latency, and notes.
            </p>
          </div>
          <span className="text-xs text-zinc-500">
            {runs.length} test suites recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                <th className="py-3 px-4">Run ID & Timestamp</th>
                <th className="py-3 px-4">Evaluation Query Suite</th>
                <th className="py-3 px-4">Citation Correctness</th>
                <th className="py-3 px-4">Relevance</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              {runs.map((run) => (
                <tr
                  key={run.id}
                  onClick={() => setSelectedRun(run)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-zinc-200 group-hover:text-white block">
                      {run.id}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {run.timestamp}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-sm">
                    <p className="font-sans font-medium text-zinc-300 line-clamp-1 group-hover:text-white">
                      {run.query}
                    </p>
                    <span className="text-[10px] text-zinc-500">
                      {run.papersEvaluated} papers evaluated
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    {run.citationCorrectness}%
                  </td>

                  <td className="py-3.5 px-4 text-zinc-400">
                    {run.retrievalRelevance}%
                  </td>

                  <td className="py-3.5 px-4 text-zinc-400">
                    {run.latencySeconds}s
                  </td>

                  <td className="py-3.5 px-4">
                    {run.status === "passed" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Passed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Warning</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRun(run);
                      }}
                      className="px-2.5 py-1 text-xs text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg border border-white/15 transition-colors"
                    >
                      Trace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Run Trace Modal */}
      {selectedRun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div
            className="w-full max-w-xl bg-[#111114] rounded-2xl border border-white/15 shadow-2xl p-6 space-y-4 animate-in zoom-in-95 text-zinc-200 font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  {selectedRun.id}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  Benchmark Run Details
                </h3>
                <p className="text-xs text-zinc-500">{selectedRun.timestamp}</p>
              </div>

              <button
                onClick={() => setSelectedRun(null)}
                className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2">
              <span className="font-bold text-zinc-400 block uppercase text-[10px]">Query Evaluated:</span>
              <p className="text-white font-sans">{selectedRun.query}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] text-zinc-500 block uppercase">Citations Correct</span>
                <span className="text-base font-bold text-white">{selectedRun.citationCorrectness}%</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] text-zinc-500 block uppercase">Relevance</span>
                <span className="text-base font-bold text-white">{selectedRun.retrievalRelevance}%</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] text-zinc-500 block uppercase">Total Latency</span>
                <span className="text-base font-bold text-white">{selectedRun.latencySeconds}s</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-400 block mb-1">Auditor / System Notes:</span>
              <p className="text-xs text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/10 leading-relaxed font-sans">
                {selectedRun.notes}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRun(null)}
                className="px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-zinc-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
