"use client";

import React from "react";
import { useResearch } from "@/context/ResearchContext";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useResearch();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isWarning = toast.type === "warning";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
              isSuccess
                ? "bg-[#121215]/95 border-emerald-500/30 text-zinc-200 shadow-emerald-500/5"
                : isWarning
                ? "bg-[#121215]/95 border-amber-500/30 text-zinc-200 shadow-amber-500/5"
                : isError
                ? "bg-[#121215]/95 border-rose-500/30 text-zinc-200 shadow-rose-500/5"
                : "bg-[#121215]/95 border-blue-500/30 text-zinc-200 shadow-blue-500/5"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-4 h-4 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <p className="text-xs font-semibold text-white leading-tight">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
