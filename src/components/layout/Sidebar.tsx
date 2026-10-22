"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResearch } from "@/context/ResearchContext";
import {
  LayoutDashboard,
  BookOpen,
  GitCompare,
  Sparkles,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
  Check,
  PanelLeftClose,
  PanelLeft,
  X,
  FileText,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ mobileOpen, setMobileOpen, collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const {
    workspaces,
    activeWorkspaceId,
    setActiveWorkspaceId,
    activeWorkspace,
    papers,
    selectedPaperIds,
    setIsUploadOpen,
    createNewWorkspace,
  } = useResearch();

  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsDesc, setNewWsDesc] = useState("");

  const navItems = [
    {
      name: "Overview",
      href: "/",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "My Library",
      href: "/library",
      icon: BookOpen,
      badge: papers.length.toString(),
    },
    {
      name: "Compare Papers",
      href: "/compare",
      icon: GitCompare,
      badge: selectedPaperIds.length > 0 ? `${selectedPaperIds.length}` : null,
      highlightBadge: selectedPaperIds.length > 0,
    },
    {
      name: "Research Assistant",
      href: "/assistant",
      icon: Sparkles,
      badge: "AI",
      purpleBadge: true,
    },
    {
      name: "Evaluation",
      href: "/evaluation",
      icon: BarChart3,
      badge: "96.8%",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      badge: null,
    },
  ];

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    createNewWorkspace(newWsName, newWsDesc);
    setNewWsName("");
    setNewWsDesc("");
    setShowNewWorkspaceModal(false);
    setWorkspaceDropdownOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0d0d10] border-r border-white/10 select-none text-zinc-300">
      {/* Brand & Toggle Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-full border border-white/20 bg-zinc-900 flex items-center justify-center font-mono font-bold text-xs text-white">
            LL
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-xs tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                LitLens
              </span>
              <span className="text-[9px] tracking-widest uppercase font-mono text-zinc-500">
                Workspace Menu
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse / Mobile Close */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="p-3 border-b border-white/10 relative">
        {!collapsed ? (
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-2 mb-1.5">
              Active Workspace
            </div>
            <button
              onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
            >
              <div className="flex items-center gap-2 min-w-0 pr-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-zinc-200 truncate group-hover:text-white">
                    {activeWorkspace.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 truncate">
                    {papers.length} papers • 4 matrices
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-500 shrink-0 transition-transform ${
                  workspaceDropdownOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {workspaceDropdownOpen && (
              <div className="absolute top-full left-3 right-3 mt-1.5 z-40 bg-[#16161a] border border-white/15 rounded-xl shadow-2xl py-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[9px] font-mono uppercase text-zinc-500 tracking-wider">
                  Switch Workspace
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setActiveWorkspaceId(ws.id);
                      setWorkspaceDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-white/5 transition-colors ${
                      ws.id === activeWorkspaceId ? "text-white font-semibold bg-white/10" : "text-zinc-400"
                    }`}
                  >
                    <span className="truncate pr-2">{ws.name}</span>
                    {ws.id === activeWorkspaceId && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                  </button>
                ))}

                <div className="border-t border-white/10 my-1"></div>

                <button
                  onClick={() => setShowNewWorkspaceModal(true)}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create new workspace</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <button
              onClick={() => setCollapsed(false)}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              title={activeWorkspace.name}
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? "bg-white/10 text-white font-semibold"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              title={collapsed ? item.name : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />

              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.2 rounded-full shrink-0 ${
                        item.purpleBadge
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                          : item.highlightBadge
                          ? "bg-blue-500 text-white"
                          : isActive
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-white rounded-r" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Upload Action */}
      {!collapsed && (
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/15 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Papers</span>
          </button>
        </div>
      )}

      {/* User Profile Section */}
      <div className="p-3 border-t border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-7 h-7 rounded-full bg-zinc-800 text-white font-bold text-[11px] flex items-center justify-center border border-white/20">
              SC
            </div>
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black"></span>
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white truncate">
                  Dr. Sarah Chen
                </span>
                <span className="text-[9px] font-mono px-1 bg-white/10 text-zinc-300 rounded border border-white/10">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono truncate">
                Retinal Imaging Lab
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New Workspace Modal */}
      {showNewWorkspaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#121215] rounded-2xl max-w-md w-full border border-white/15 shadow-2xl p-6 text-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Create New Workspace</h3>
              <button
                onClick={() => setShowNewWorkspaceModal(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkspace} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Glaucoma Progression OCT Benchmarks"
                  value={newWsName}
                  onChange={(e) => setNewWsName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Research Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the clinical focus or paper collection goals..."
                  value={newWsDesc}
                  onChange={(e) => setNewWsDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewWorkspaceModal(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-zinc-200 rounded-lg transition-colors"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (toggleable) */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 border-r border-white/10 ${
          collapsed ? "w-14" : "w-64"
        }`}
      >
        <div className={`fixed top-[85px] bottom-0 left-0 z-20 transition-all duration-300 ${
          collapsed ? "w-14" : "w-64"
        }`}>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
