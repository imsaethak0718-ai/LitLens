"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useResearch } from "@/context/ResearchContext";
import {
  Upload,
  Search,
  BookOpen,
  GitCompare,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  FolderOpen,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const {
    papers,
    workspaces,
    activeWorkspace,
    setActiveWorkspaceId,
    selectedPaperIds,
    togglePaperSelection,
    setIsUploadOpen,
    setActivePaperModal,
    setActiveCitation,
  } = useResearch();

  const [dashboardSearch, setDashboardSearch] = useState("");

  const filteredRecentPapers = papers.filter((p) => {
    if (!dashboardSearch.trim()) return true;
    const q = dashboardSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.topic.toLowerCase().includes(q) ||
      p.authors.some((a) => a.toLowerCase().includes(q))
    );
  });

  const uniqueTopics = Array.from(new Set(papers.map((p) => p.topic)));

  const summaryCards = [
    {
      label: "Papers in Library",
      value: papers.length,
      change: "+3 this week",
      icon: BookOpen,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      description: "Indexed across 3 workspaces",
    },
    {
      label: "Research Topics",
      value: uniqueTopics.length,
      change: "Active taxonomy",
      icon: Layers,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      description: "Medical imaging & deep learning",
    },
    {
      label: "Comparisons Created",
      value: "4 matrices",
      change: `${selectedPaperIds.length} papers queued`,
      icon: GitCompare,
      iconColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      description: "Side-by-side evidence tables",
    },
    {
      label: "Questions Asked",
      value: "42 inquiries",
      change: "98.4% citation backed",
      icon: Sparkles,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      description: "Cross-paper synthesis",
    },
  ];

  // Visual presentation fragments inspired by reference bottom carousel
  const fragments = [
    {
      id: "frag-1",
      paperId: "paper-1",
      title: "Swin-Retina UWF",
      subtitle: "Shifted-window tokens on 2048x2048 fundus",
      category: "Transformer Architecture",
      accent: "from-blue-600/30 via-slate-900 to-black",
      badge: "AUC 0.961",
    },
    {
      id: "frag-2",
      paperId: "paper-2",
      title: "OCT-MoCo Domain",
      subtitle: "Heidelberg to Zeiss cross-scanner transfer",
      category: "Contrastive Learning",
      accent: "from-indigo-600/30 via-slate-900 to-black",
      badge: "DSC 0.871",
    },
    {
      id: "frag-3",
      paperId: "paper-3",
      title: "Dual-Branch GCN",
      subtitle: "Arteriovenous caliber & vascular graph",
      category: "Graph Neural Networks",
      accent: "from-emerald-600/30 via-slate-900 to-black",
      badge: "F1 0.912",
    },
    {
      id: "frag-4",
      paperId: "paper-4",
      title: "Diffusion OCTA",
      subtitle: "Capillary plexus super-resolution",
      category: "Generative Priors",
      accent: "from-violet-600/30 via-slate-900 to-black",
      badge: "PSNR 31.8dB",
    },
    {
      id: "frag-5",
      paperId: "paper-5",
      title: "OphthaFoundation",
      subtitle: "1.4M multi-ethnic chorioretinal probe",
      category: "Foundation Models",
      accent: "from-purple-600/30 via-slate-900 to-black",
      badge: "mAUC 0.948",
    },
    {
      id: "frag-6",
      paperId: "paper-6",
      title: "Bayesian Macula",
      subtitle: "Monte Carlo dropout uncertainty referral",
      category: "Human-in-the-Loop",
      accent: "from-amber-600/30 via-slate-900 to-black",
      badge: "NPV 99.1%",
    },
    {
      id: "frag-7",
      paperId: "paper-7",
      title: "Mobile-RetinaNet",
      subtitle: "Sub-5MB INT8 smartphone adapter",
      category: "Quantized Edge AI",
      accent: "from-zinc-600/30 via-slate-900 to-black",
      badge: "28 FPS",
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 
        ====================================================================
        HERO SECTION: REPRODUCING THE SOKOLOVSKI EDITORIAL STUDIO REFERENCE
        ====================================================================
      */}
      <section className="relative w-full min-h-[680px] lg:min-h-[760px] bg-[#09090b] border-b border-white/10 overflow-hidden flex flex-col justify-between p-6 lg:p-12">
        {/* Background Chiaroscuro Retinal Art */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/retinal-bg.jpg"
            alt="Atmospheric Retinal Vascular Network"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#09090b]/60 to-[#09090b]" />
        </div>

        {/* Center Large Watermark Monogram */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="font-mono font-black text-[18vw] text-white/[0.03] select-none tracking-tighter">
            LL
          </span>
        </div>

        {/* TOP EDITORIAL HERO ROW */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Col 1: Researcher & Big Heading (matches "Eugene Sokolovski | Design & Engineering") */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-zinc-800 text-white flex items-center justify-center font-bold text-xs shadow-md">
                SC
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight leading-none">
                  Dr. Sarah Chen
                </h3>
                <p className="text-[11px] font-mono text-zinc-400 mt-1">
                  Ophthalmic AI & Evidence Lab
                </p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Literature & Engineering
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md">
              Turn medical papers into verifiable evidence. Align neural architectures, discover clinical limitations, and synthesize literature with confidence.
            </p>
          </div>

          {/* Col 2: "What I create" -> "What LitLens synthesizes" */}
          <div className="lg:col-span-3 space-y-2 border-l border-white/10 pl-6 hidden md:block">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              What LitLens synthesizes
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Clinical imaging literature that clarifies model behavior and resolves domain shift in ophthalmology.
            </p>
            <div className="pt-2 space-y-1 text-xs text-zinc-400 font-mono">
              <p>• Retinal vessel morphometry</p>
              <p>• Vision transformer backbones</p>
              <p>• Cross-scanner OCT fluid</p>
              <p>• Uncertainty quantification</p>
              <p>• 2D/3D segmentation</p>
            </div>
          </div>

          {/* Col 3: "Services" -> "Capabilities" */}
          <div className="lg:col-span-2 space-y-2 border-l border-white/10 pl-6 hidden lg:block">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Capabilities
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
              <p>Evidence matrices</p>
              <p>Page citation badges</p>
              <p>Cross-paper chat</p>
              <p>Interactive CSV export</p>
              <p>Benchmark audits</p>
              <p>PDF structure parser</p>
            </div>
          </div>

          {/* Col 4: Award / Metric Widget (matches Behance/Ur 5 widget in reference image) */}
          <div className="lg:col-span-2 flex justify-start lg:justify-end">
            <div className="bg-[#121215]/90 border border-white/15 rounded-2xl p-4 w-full max-w-[200px] backdrop-blur-xl shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-500 text-white font-mono">
                    LL
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black font-mono">
                    Rx
                  </span>
                </div>
                <span className="text-2xl font-black text-white font-mono tracking-tighter">
                  96.8%
                </span>
              </div>

              <div>
                <p className="text-[11px] font-bold text-zinc-200">Citation Grounding</p>
                <p className="text-[10px] text-zinc-500 font-mono">120 benchmark runs</p>
              </div>

              <Link
                href="/evaluation"
                className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-[11px] font-semibold tracking-tight transition-all"
              >
                <span>Details</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* CENTER MONOCHROMATIC MOTTO (Matches "I USE A PRODUCT-BASED APPROACH IN MY WORK") */}
        <div className="relative z-10 text-center py-8">
          <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-400 font-semibold">
            I USE AN EVIDENCE-GROUNDED SYNTHESIS IN RESEARCH
          </p>
        </div>

        {/* 
          ====================================================================
          BOTTOM CAROUSEL: "FRAGMENTS" (Exact match to reference bottom strip)
          ====================================================================
        */}
        <div id="fragments" className="relative z-10 border-t border-white/10 pt-6 space-y-4">
          <div className="flex items-baseline justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Fragments
                </h3>
                <span className="text-xs font-mono px-2 py-0.2 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                  {fragments.length} Studies Active
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Evidence study fragments are slides from extracted manuscripts, architectures, and clinical findings.
              </p>
            </div>

            <div className="text-2xl lg:text-3xl font-mono font-bold text-zinc-600">
              343
            </div>
          </div>

          {/* Horizontal Slide Thumbnails Strip */}
          <div className="flex gap-3 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
            {fragments.map((frag) => {
              const targetPaper = papers.find((p) => p.id === frag.paperId);

              return (
                <div
                  key={frag.id}
                  onClick={() => {
                    if (targetPaper) setActivePaperModal(targetPaper);
                  }}
                  className={`shrink-0 w-44 sm:w-52 h-28 rounded-xl border border-white/15 bg-gradient-to-br ${frag.accent} p-3 flex flex-col justify-between cursor-pointer hover:border-white/50 hover:scale-[1.02] transition-all group shadow-lg relative overflow-hidden`}
                >
                  {/* Subtle scan grid effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                      {frag.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/10 text-white border border-white/10">
                      {frag.badge}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h5 className="text-xs font-bold text-white group-hover:underline truncate">
                      {frag.title}
                    </h5>
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5 font-mono">
                      {frag.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide Progress / Indicator Bar */}
          <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden">
            <div className="bg-white h-full w-1/4 rounded-full" />
          </div>
        </div>
      </section>

      {/* 
        ====================================================================
        LITERATURE REVIEW CONTENT & WORKFLOWS (DARK GRAPHITE SAAS)
        ====================================================================
      */}
      <div className="px-4 lg:px-12 space-y-8 max-w-7xl mx-auto">
        {/* Quick Search Strip */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search your research library by title, topic, or author..."
            value={dashboardSearch}
            onChange={(e) => setDashboardSearch(e.target.value)}
            className="w-full text-xs sm:text-sm pl-11 pr-24 py-3 bg-[#111114] border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-white text-zinc-200 placeholder-zinc-500 transition-all font-mono"
          />
          {dashboardSearch && (
            <button
              onClick={() => setDashboardSearch("")}
              className="absolute right-4 top-3.5 text-xs text-zinc-400 hover:text-white font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* 4 Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#111114] p-5 rounded-2xl border border-white/10 shadow-sm hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {card.label}
                  </span>
                  <div className={`p-2 rounded-xl border ${card.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
                    {card.value}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                    {card.change}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-500 mt-1 font-mono">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Grid */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Quick Research Actions
            </h2>
            <span className="text-xs font-mono text-zinc-600">LitLens Modules</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => setIsUploadOpen(true)}
              className="p-5 rounded-2xl bg-[#111114] border border-white/10 hover:border-white/30 hover:bg-[#16161a] transition-all cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Upload className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Upload New Papers
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Drop PDF manuscripts to extract tables, equations, and page-anchored evidence citations.
              </p>
            </div>

            <Link
              href="/compare"
              className="p-5 rounded-2xl bg-[#111114] border border-white/10 hover:border-white/30 hover:bg-[#16161a] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <GitCompare className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-violet-400 transition-colors">
                Compare Studies & Methodologies
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Align papers across objectives, datasets, architectures, and explicit limitations side by side.
              </p>
            </Link>

            <Link
              href="/assistant"
              className="p-5 rounded-2xl bg-[#111114] border border-white/10 hover:border-white/30 hover:bg-[#16161a] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                Ask Research Assistant
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Query across multiple papers simultaneously with multi-hop synthesis and verifiable page citations.
              </p>
            </Link>
          </div>
        </div>

        {/* Recent Papers Table */}
        <div className="bg-[#111114] rounded-2xl border border-white/10 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Recent Papers</h2>
              <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                Active literature in &ldquo;{activeWorkspace.name}&rdquo;
              </p>
            </div>

            <Link
              href="/library"
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View all {papers.length} papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">Compare</th>
                  <th className="py-3 px-4">Title & Authors</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Research Topic</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredRecentPapers.slice(0, 5).map((paper) => {
                  const isSelected = selectedPaperIds.includes(paper.id);

                  return (
                    <tr
                      key={paper.id}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => togglePaperSelection(paper.id)}
                          className={`w-4 h-4 rounded border mx-auto flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-white border-white text-black"
                              : "border-zinc-700 hover:border-zinc-500 bg-transparent"
                          }`}
                          title={isSelected ? "Remove from comparison" : "Add to comparison"}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-black" />}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 max-w-md">
                        <div
                          onClick={() => setActivePaperModal(paper)}
                          className="font-bold text-zinc-200 group-hover:text-white transition-colors cursor-pointer line-clamp-1"
                        >
                          {paper.title}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1 font-mono">
                          {paper.authors.join(", ")}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-zinc-300 font-mono font-semibold">
                        {paper.year}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10">
                          {paper.topic.split("&")[0].trim()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span className="text-[11px] font-mono text-emerald-400">
                            Indexed & Ready
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {paper.citationCount} citations extracted
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {paper.objectiveCitation && (
                            <button
                              onClick={() => setActiveCitation(paper.objectiveCitation!)}
                              className="text-[10px] font-mono font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-2 py-1 rounded border border-blue-500/20 transition-colors"
                              title="Inspect primary citation"
                            >
                              {paper.objectiveCitation.badge}
                            </button>
                          )}

                          <button
                            onClick={() => setActivePaperModal(paper)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg border border-white/15 transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Continue Researching: Workspaces */}
        <div className="pb-12">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Continue Researching
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Active literature review project workspaces
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workspaces.map((ws) => {
              const isCurrent = ws.id === activeWorkspace.id;

              return (
                <div
                  key={ws.id}
                  onClick={() => setActiveWorkspaceId(ws.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                    isCurrent
                      ? "bg-[#16161a] border-white/40 shadow-md ring-1 ring-white/20"
                      : "bg-[#111114] border-white/10 hover:border-white/20 hover:bg-[#141418]"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute top-3 right-3 text-[9px] font-mono font-bold px-2 py-0.5 bg-white text-black rounded-full">
                      Active
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <FolderOpen
                      className={`w-4 h-4 ${
                        isCurrent ? "text-white" : "text-zinc-500"
                      }`}
                    />
                    <h3 className="text-xs font-bold text-white truncate">
                      {ws.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 mb-3">
                    {ws.description}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>{ws.paperCount} papers</span>
                    <span>Active {ws.lastActive}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
