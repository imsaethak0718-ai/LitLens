"use client";

import React, { useState, useMemo } from "react";
import { useResearch } from "@/context/ResearchContext";
import { PaperCard } from "@/components/papers/PaperCard";
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  UploadCloud,
  GitCompare,
  ArrowUpDown,
  BookOpen,
  Plus,
} from "lucide-react";

export default function LibraryPage() {
  const {
    papers,
    selectedPaperIds,
    selectAllPapers,
    clearPaperSelection,
    setIsUploadOpen,
  } = useResearch();

  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recently-added" | "year-desc" | "year-asc" | "title" | "citations">("recently-added");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const topics = useMemo(() => {
    return Array.from(new Set(papers.map((p) => p.topic)));
  }, [papers]);

  const years = useMemo(() => {
    return Array.from(new Set(papers.map((p) => p.year))).sort((a, b) => b - a);
  }, [papers]);

  const filteredPapers = useMemo(() => {
    const result = papers.filter((p) => {
      const matchSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.some((a) => a.toLowerCase().includes(search.toLowerCase())) ||
        p.topic.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchTopic = selectedTopic === "all" || p.topic === selectedTopic;
      const matchYear = selectedYear === "all" || p.year.toString() === selectedYear;

      return matchSearch && matchTopic && matchYear;
    });

    return result.sort((a, b) => {
      if (sortBy === "recently-added") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      if (sortBy === "year-desc") {
        return b.year - a.year;
      }
      if (sortBy === "year-asc") {
        return a.year - b.year;
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "citations") {
        return b.citationCount - a.citationCount;
      }
      return 0;
    });
  }, [papers, search, selectedTopic, selectedYear, sortBy]);

  return (
    <div className="space-y-6 px-4 lg:px-12 py-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Research Library
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
              {filteredPapers.length} of {papers.length}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Curate, organize, and inspect extracted evidence from indexed medical manuscripts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedPaperIds.length > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={clearPaperSelection}
                className="px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
              >
                Clear comparison ({selectedPaperIds.length})
              </button>
              <button
                onClick={selectAllPapers}
                className="px-3 py-1.5 text-xs font-mono text-zinc-200 bg-white/10 hover:bg-white/15 rounded-xl transition-colors border border-white/15"
              >
                Select all
              </button>
            </div>
          ) : (
            <button
              onClick={selectAllPapers}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5 text-zinc-400" />
              <span>Select all for comparison</span>
            </button>
          )}

          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Paper</span>
          </button>
        </div>
      </div>

      {/* Embedded Quick Upload Strip */}
      <div
        onClick={() => setIsUploadOpen(true)}
        className="p-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/30 transition-all cursor-pointer flex items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white group-hover:underline">
              Drop PDFs here to index new manuscripts
            </p>
            <p className="text-[11px] text-zinc-400 font-mono">
              Automatic layout parsing, equation detection, and citation extraction
            </p>
          </div>
        </div>

        <button className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold font-mono">
          Upload PDF
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111114] p-4 rounded-2xl border border-white/10 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by title, author, method, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9.5 pr-20 py-2.5 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-white text-zinc-200 placeholder-zinc-500 font-mono"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-2 text-[10px] font-mono text-zinc-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* View mode toggle + Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "recently-added" | "year-desc" | "year-asc" | "title" | "citations")}
                className="bg-transparent border-none text-xs text-zinc-300 font-medium focus:outline-none cursor-pointer"
              >
                <option value="recently-added" className="bg-zinc-900">Recently Added</option>
                <option value="year-desc" className="bg-zinc-900">Year: Newest First</option>
                <option value="year-asc" className="bg-zinc-900">Year: Oldest First</option>
                <option value="citations" className="bg-zinc-900">Citation Count</option>
                <option value="title" className="bg-zinc-900">Title (A-Z)</option>
              </select>
            </div>

            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-500 hover:text-white"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-500 hover:text-white"
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setSelectedTopic("all")}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedTopic === "all"
                ? "bg-white text-black"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            All Topics
          </button>

          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedTopic === t
                  ? "bg-white text-black"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t.split("&")[0].trim()}
            </button>
          ))}

          <div className="h-4 w-px bg-white/10 shrink-0 mx-1" />

          <button
            onClick={() => setSelectedYear("all")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedYear === "all"
                ? "bg-zinc-700 text-white"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
            }`}
          >
            All Years
          </button>

          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y.toString())}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedYear === y.toString()
                  ? "bg-zinc-700 text-white"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid / List */}
      {filteredPapers.length === 0 ? (
        <div className="p-12 text-center bg-[#111114] rounded-2xl border border-white/10 space-y-3">
          <BookOpen className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">
            No papers found matching criteria
          </h3>
          <p className="text-xs text-zinc-500 font-mono max-w-sm mx-auto">
            Try adjusting your search terms, changing the topic filter, or upload a new research manuscript.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedTopic("all");
              setSelectedYear("all");
            }}
            className="px-4 py-2 text-xs font-mono font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
}
