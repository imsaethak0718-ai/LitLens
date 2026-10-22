"use client";

import React, { useState } from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  User,
  Database,
  Moon,
  Sun,
  Laptop,
  Check,
  Save,
  HardDrive,
} from "lucide-react";

export default function SettingsPage() {
  const { activeWorkspace, addToast } = useResearch();

  const [activeTab, setActiveTab] = useState<"profile" | "appearance" | "workspace">("profile");

  const [name, setName] = useState("Dr. Sarah Chen");
  const [email, setEmail] = useState("sarah.chen@retina-ai.org");
  const [affiliation, setAffiliation] = useState("Ophthalmic Image Computing Lab & Clinical Institute");
  const [interests, setInterests] = useState("Retinal disease classification, OCT segmentation, Foundation models, Vision Transformers");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [theme, setTheme] = useState<"light" | "system" | "dark">("dark");

  const [wsName, setWsName] = useState(activeWorkspace.name);
  const [extractionStrictness, setExtractionStrictness] = useState<"strict" | "balanced" | "exploratory">("strict");
  const [defaultExportFormat, setDefaultExportFormat] = useState<"csv" | "bibtex" | "json">("csv");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: "Settings Saved",
      message: "Preferences updated for current session.",
      type: "success",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          Manage your research profile, workspace configuration, and citation extraction parameters.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 text-xs font-mono">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "profile"
              ? "border-white text-white font-semibold"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Affiliation</span>
        </button>

        <button
          onClick={() => setActiveTab("appearance")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "appearance"
              ? "border-white text-white font-semibold"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Theme & Appearance</span>
        </button>

        <button
          onClick={() => setActiveTab("workspace")}
          className={`pb-3 px-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === "workspace"
              ? "border-white text-white font-semibold"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Workspace & Synthesis</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 font-mono">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-[#111114] p-6 rounded-2xl border border-white/10 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-white font-sans">
              Researcher Information
            </h3>

            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-14 h-14 rounded-full border border-white/20 bg-zinc-800 text-white font-extrabold text-base flex items-center justify-center shadow-sm">
                SC
              </div>
              <div>
                <p className="text-xs font-bold text-white font-sans">Dr. Sarah Chen</p>
                <p className="text-[11px] text-zinc-400">Lead Ophthalmic AI Scientist • Pro Plan</p>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-1 inline-block">
                  Institutional License Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Academic Affiliation / Lab
              </label>
              <input
                type="text"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white font-sans"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Research Taxonomy & Key Interests
              </label>
              <textarea
                rows={3}
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white font-sans resize-none"
              />
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-200 font-sans">
                  Email Synthesis Digests
                </p>
                <p className="text-[11px] text-zinc-500">
                  Receive weekly updates when new benchmark comparisons are published.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer accent-white"
              />
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="bg-[#111114] p-6 rounded-2xl border border-white/10 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white font-sans">
                Interface Theme
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                LitLens uses an ultra-refined dark graphite research studio theme inspired by avant-garde design studios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setTheme("dark")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  theme === "dark"
                    ? "border-white bg-white/10 shadow-xs"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Moon className="w-5 h-5 text-white" />
                  {theme === "dark" && <Check className="w-4 h-4 text-white" />}
                </div>
                <h4 className="text-xs font-bold text-white font-sans">Studio Dark (Active)</h4>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Graphite aesthetic with chiaroscuro retinal art and silver typography.
                </p>
              </div>

              <div
                onClick={() => setTheme("system")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  theme === "system"
                    ? "border-white bg-white/10 shadow-xs"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Laptop className="w-5 h-5 text-zinc-400" />
                  {theme === "system" && <Check className="w-4 h-4 text-white" />}
                </div>
                <h4 className="text-xs font-bold text-white font-sans">System Sync</h4>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Synchronize with your operating system preferences.
                </p>
              </div>

              <div
                onClick={() => setTheme("light")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  theme === "light"
                    ? "border-white bg-white/10 shadow-xs"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Sun className="w-5 h-5 text-zinc-400" />
                  {theme === "light" && <Check className="w-4 h-4 text-white" />}
                </div>
                <h4 className="text-xs font-bold text-white font-sans">Research Light</h4>
                <p className="text-[11px] text-zinc-400 mt-1">
                  High-contrast paper canvas for daylight reading.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Workspace Tab */}
        {activeTab === "workspace" && (
          <div className="bg-[#111114] p-6 rounded-2xl border border-white/10 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white font-sans">
                Workspace Configuration & Extraction Engine
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Set citation strictness levels and default data schemas.
              </p>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Active Workspace Name
              </label>
              <input
                type="text"
                value={wsName}
                onChange={(e) => setWsName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white font-sans"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Citation Grounding Strictness
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setExtractionStrictness("strict")}
                  className={`p-3 rounded-xl border cursor-pointer text-xs ${
                    extractionStrictness === "strict"
                      ? "border-white bg-white/10 text-white font-semibold"
                      : "border-white/10 text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  <p className="font-bold text-white font-sans">Conservative</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Strict: every synthesized claim must have a verified page anchor.
                  </p>
                </div>

                <div
                  onClick={() => setExtractionStrictness("balanced")}
                  className={`p-3 rounded-xl border cursor-pointer text-xs ${
                    extractionStrictness === "balanced"
                      ? "border-white bg-white/10 text-white font-semibold"
                      : "border-white/10 text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  <p className="font-bold text-white font-sans">Balanced</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Standard extraction with conceptual cross-paper bridging.
                  </p>
                </div>

                <div
                  onClick={() => setExtractionStrictness("exploratory")}
                  className={`p-3 rounded-xl border cursor-pointer text-xs ${
                    extractionStrictness === "exploratory"
                      ? "border-white bg-white/10 text-white font-semibold"
                      : "border-white/10 text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  <p className="font-bold text-white font-sans">Exploratory</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Broader generative connections across distant subfields.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Default Export Format
              </label>
              <select
                value={defaultExportFormat}
                onChange={(e) => setDefaultExportFormat(e.target.value as "csv" | "bibtex" | "json")}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white"
              >
                <option value="csv" className="bg-zinc-900">Standard CSV (.csv) — Compatible with Excel & Pandas</option>
                <option value="bibtex" className="bg-zinc-900">BibTeX Archive (.bib) — LaTeX / Overleaf Citation Format</option>
                <option value="json" className="bg-zinc-900">Structured Evidence JSON (.json)</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-zinc-400" />
                  <span>Workspace Vector Index & Storage</span>
                </div>
                <span>38.7 MB of 2.0 GB used (1.9%)</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[2%]" />
              </div>
              <p className="text-[10px] text-zinc-500">
                Local browser storage capacity for ~400 additional parsed research papers.
              </p>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-zinc-500">
            LitLens Editorial Studio UI • Frontend Prototype v2.0
          </span>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
