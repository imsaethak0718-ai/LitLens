"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  Send,
  Sparkles,
  BookOpen,
  Quote,
  ExternalLink,
  Trash2,
  ChevronDown,
  Check,
  ArrowRight,
  Bot,
  User,
} from "lucide-react";
import { SUGGESTED_PROMPTS } from "@/data/mockPapers";

export default function AssistantPage() {
  const {
    papers,
    chatMessages,
    isAssistantTyping,
    synthesisPhase,
    sendMessage,
    clearChat,
    setActiveCitation,
  } = useResearch();

  const [input, setInput] = useState("");
  const [selectedScopeIds, setSelectedScopeIds] = useState<string[]>(papers.map((p) => p.id));
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAssistantTyping, synthesisPhase]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAssistantTyping) return;
    const query = input;
    setInput("");
    sendMessage(query, selectedScopeIds);
  };

  const handlePromptClick = (prompt: string) => {
    if (isAssistantTyping) return;
    sendMessage(prompt, selectedScopeIds);
  };

  const togglePaperScope = (paperId: string) => {
    setSelectedScopeIds((prev) =>
      prev.includes(paperId)
        ? prev.filter((id) => id !== paperId)
        : [...prev, paperId]
    );
  };

  const selectAllScope = () => {
    setSelectedScopeIds(papers.map((p) => p.id));
  };

  const clearScope = () => {
    setSelectedScopeIds([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] px-4 lg:px-12 py-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Bar: Title & Paper Scope Selector */}
      <div className="bg-[#111114] p-4 rounded-2xl border border-white/10 shadow-xs mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Research Assistant
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
              Multi-Paper Synthesis
            </span>
          </div>
          <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
            Ask questions across your research library with verifiable page-anchored evidence.
          </p>
        </div>

        {/* Paper Scope Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-black/40 hover:bg-black/60 text-zinc-300 border border-white/10 rounded-xl transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
              <span>
                Scope: {selectedScopeIds.length} of {papers.length} papers
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            {isFilterDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-72 bg-[#16161a] border border-white/15 rounded-xl shadow-2xl z-30 p-2 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono uppercase text-zinc-500 border-b border-white/10 pb-1.5">
                  <span>Scope Inquiries</span>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllScope}
                      className="text-white hover:underline"
                    >
                      All
                    </button>
                    <button
                      onClick={clearScope}
                      className="text-zinc-500 hover:underline"
                    >
                      None
                    </button>
                  </div>
                </div>

                <div className="max-h-52 overflow-y-auto py-1 space-y-1 font-mono">
                  {papers.map((p) => {
                    const isScoped = selectedScopeIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => togglePaperScope(p.id)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isScoped
                            ? "bg-white/10 text-white font-medium"
                            : "text-zinc-400 hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate pr-2">{p.title}</span>
                        {isScoped && (
                          <Check className="w-3.5 h-3.5 text-white shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {chatMessages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto bg-[#111114] rounded-2xl border border-white/10 shadow-xs p-5 space-y-6">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Ask anything across your research library
              </h2>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-mono">
                LitLens retrieves exact paragraphs and tables, synthesizing comparisons with clickable source citations.
              </p>
            </div>

            <div className="w-full text-left pt-2 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Suggested Research Prompts
              </span>
              <div className="space-y-1.5">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt)}
                    className="w-full text-left p-3 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 text-xs text-zinc-300 font-mono transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {chatMessages.map((msg) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4.5 space-y-3 ${
                      isUser
                        ? "bg-white text-black rounded-br-xs shadow-xs"
                        : "bg-black/50 border border-white/10 text-zinc-200 rounded-bl-xs shadow-xs"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 text-[10px] font-mono">
                      <span
                        className={`font-semibold ${
                          isUser ? "text-zinc-600" : "text-white font-bold"
                        }`}
                      >
                        {isUser ? "You" : "LitLens Assistant"}
                      </span>
                      <span className={isUser ? "text-zinc-400" : "text-zinc-500"}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Synthesis Steps */}
                    {!isUser && msg.synthesisSteps && msg.synthesisSteps.length > 0 && (
                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 text-[10px] text-zinc-400 space-y-1 font-mono">
                        <div className="font-semibold text-white flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Synthesis Pipeline Verified</span>
                        </div>
                        {msg.synthesisSteps.map((st, i) => (
                          <div key={i} className="text-zinc-500 pl-4">
                            • {st}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Content */}
                    <div className="text-xs leading-relaxed whitespace-pre-line font-normal">
                      {msg.content}
                    </div>

                    {/* Source Citations */}
                    {!isUser && msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-t border-white/10 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                          <Quote className="w-3 h-3 text-blue-400" />
                          <span>Supporting Source Citations ({msg.citations.length})</span>
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.citations.map((cit) => (
                            <div
                              key={cit.id}
                              onClick={() => setActiveCitation(cit)}
                              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all cursor-pointer group text-left"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.2 rounded border border-blue-500/20">
                                  {cit.badge}
                                </span>
                                <ExternalLink className="w-2.5 h-2.5 text-zinc-500 group-hover:text-white" />
                              </div>

                              <h5 className="text-[11px] font-bold text-zinc-200 group-hover:text-white truncate">
                                {cit.paperTitle}
                              </h5>
                              <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-2 italic font-serif">
                                &ldquo;{cit.excerpt}&rdquo;
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isUser && msg.isDemo && (
                      <div className="text-[9px] font-mono text-zinc-500 text-right pt-1">
                        DEMO DATA • Synthesized from mock literature
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0 border border-white/20 mt-0.5 font-mono text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Synthesizing Indicator */}
            {isAssistantTyping && (
              <div className="flex gap-3.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>

                <div className="bg-black/50 border border-white/10 rounded-2xl rounded-bl-xs p-4 space-y-2 max-w-md">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>Synthesizing cross-paper review...</span>
                  </div>

                  {synthesisPhase && (
                    <p className="text-[10px] text-zinc-400 font-mono">
                      {synthesisPhase}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Prompts Pill Strip */}
      {chatMessages.length > 0 && (
        <div className="py-2 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-zinc-500 font-semibold uppercase tracking-wider shrink-0 text-[10px]">
            Follow-up:
          </span>
          {SUGGESTED_PROMPTS.slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handlePromptClick(prompt)}
              disabled={isAssistantTyping}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="relative mt-1">
        <input
          type="text"
          placeholder="Ask a question across your papers (e.g. Compare datasets, summarize limitations)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isAssistantTyping}
          className="w-full text-xs sm:text-sm pl-4 pr-14 py-3.5 bg-[#111114] border border-white/10 rounded-2xl shadow-xs focus:outline-none focus:ring-1 focus:ring-white text-white placeholder-zinc-500 font-mono disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || isAssistantTyping}
          className="absolute right-2.5 top-2.5 bottom-2.5 px-3.5 bg-white text-black hover:bg-zinc-200 rounded-xl flex items-center justify-center shadow-xs disabled:opacity-40 transition-all active:scale-95"
          title="Send inquiry"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
