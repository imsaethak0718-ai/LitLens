"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Paper, Workspace, ChatMessage, Citation, Toast, ToastType } from "@/types";
import { MOCK_PAPERS, INITIAL_WORKSPACES, INITIAL_CHAT_MESSAGES } from "@/data/mockPapers";

interface ResearchContextType {
  // Papers
  papers: Paper[];
  addPaper: (paper: Omit<Paper, "id" | "dateAdded" | "citationCount">) => void;
  removePaper: (id: string) => void;
  getPaperById: (id: string) => Paper | undefined;

  // Workspaces
  workspaces: Workspace[];
  activeWorkspaceId: string;
  setActiveWorkspaceId: (id: string) => void;
  activeWorkspace: Workspace;
  createNewWorkspace: (name: string, description: string) => void;

  // Comparison selection
  selectedPaperIds: string[];
  togglePaperSelection: (id: string) => void;
  selectAllPapers: () => void;
  clearPaperSelection: () => void;
  isSelectedForComparison: (id: string) => boolean;

  // Assistant Chat
  chatMessages: ChatMessage[];
  isAssistantTyping: boolean;
  synthesisPhase: string | null;
  sendMessage: (content: string, scopedPaperIds?: string[]) => Promise<void>;
  clearChat: () => void;

  // Active Drawers / Modals
  activeCitation: Citation | null;
  setActiveCitation: (citation: Citation | null) => void;
  activePaperModal: Paper | null;
  setActivePaperModal: (paper: Paper | null) => void;
  isUploadOpen: boolean;
  setIsUploadOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast Notifications
  toasts: Toast[];
  addToast: (toast: { title: string; message?: string; type?: ToastType; duration?: number }) => void;
  removeToast: (id: string) => void;

  // CSV Export
  exportComparisonCSV: (papersToExport?: Paper[]) => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export function ResearchProvider({ children }: { children: React.ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>(MOCK_PAPERS);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>("ws-retina-dl");
  
  // Default to selecting 4 papers so the comparison table is immediately rich
  const [selectedPaperIds, setSelectedPaperIds] = useState<string[]>([
    "paper-1",
    "paper-2",
    "paper-5",
    "paper-7",
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);
  const [synthesisPhase, setSynthesisPhase] = useState<string | null>(null);

  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [activePaperModal, setActivePaperModal] = useState<Paper | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const addToast = useCallback(
    ({ title, message, type = "info", duration = 4000 }: { title: string; message?: string; type?: ToastType; duration?: number }) => {
      const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4);
      const newToast: Toast = { id, title, message, type, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const activeWorkspace = useMemo(() => {
    return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  }, [workspaces, activeWorkspaceId]);

  const addPaper = useCallback(
    (newPaperData: Omit<Paper, "id" | "dateAdded" | "citationCount">) => {
      const id = "paper-" + (Date.now() % 10000);
      const today = new Date().toISOString().split("T")[0];
      const newPaper: Paper = {
        ...newPaperData,
        id,
        dateAdded: today,
        citationCount: Math.floor(Math.random() * 12) + 4,
        isSampleData: true,
      };

      setPapers((prev) => [newPaper, ...prev]);
      addToast({
        title: "Paper Added to Library",
        message: `"${newPaper.title.slice(0, 48)}..." indexed successfully.`,
        type: "success",
      });
    },
    [addToast]
  );

  const removePaper = useCallback(
    (id: string) => {
      const target = papers.find((p) => p.id === id);
      setPapers((prev) => prev.filter((p) => p.id !== id));
      setSelectedPaperIds((prev) => prev.filter((pId) => pId !== id));
      addToast({
        title: "Paper Removed",
        message: target ? `Removed "${target.title.slice(0, 36)}..."` : "Paper deleted from library",
        type: "info",
      });
    },
    [papers, addToast]
  );

  const getPaperById = useCallback(
    (id: string) => {
      return papers.find((p) => p.id === id);
    },
    [papers]
  );

  const createNewWorkspace = useCallback(
    (name: string, description: string) => {
      const newWs: Workspace = {
        id: "ws-" + Date.now().toString(36),
        name: name.trim() || "Untitled Workspace",
        description: description.trim() || "Literature review workspace",
        paperCount: 0,
        comparisonsCount: 0,
        lastActive: "Just now",
      };
      setWorkspaces((prev) => [...prev, newWs]);
      setActiveWorkspaceId(newWs.id);
      addToast({
        title: "Workspace Created",
        message: `Switched to "${newWs.name}"`,
        type: "success",
      });
    },
    [addToast]
  );

  const togglePaperSelection = useCallback(
    (id: string) => {
      setSelectedPaperIds((prev) => {
        const isSelected = prev.includes(id);
        const next = isSelected ? prev.filter((item) => item !== id) : [...prev, id];
        const paper = papers.find((p) => p.id === id);
        if (paper) {
          addToast({
            title: isSelected ? "Removed from Comparison" : "Added to Comparison",
            message: `${paper.title.slice(0, 40)}...`,
            type: "info",
            duration: 2500,
          });
        }
        return next;
      });
    },
    [papers, addToast]
  );

  const selectAllPapers = useCallback(() => {
    setSelectedPaperIds(papers.map((p) => p.id));
    addToast({
      title: "All Papers Selected",
      message: `${papers.length} papers added to comparison matrix`,
      type: "info",
    });
  }, [papers, addToast]);

  const clearPaperSelection = useCallback(() => {
    setSelectedPaperIds([]);
    addToast({
      title: "Comparison Cleared",
      message: "Deselected all papers",
      type: "info",
    });
  }, [addToast]);

  const isSelectedForComparison = useCallback(
    (id: string) => selectedPaperIds.includes(id),
    [selectedPaperIds]
  );

  // Send message simulation with multi-phase synthesis
  const sendMessage = useCallback(
    async (content: string, scopedPaperIds?: string[]) => {
      if (!content.trim()) return;

      const userMsg: ChatMessage = {
        id: "user-" + Date.now(),
        sender: "user",
        content: content.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        scopedPaperIds: scopedPaperIds || papers.map((p) => p.id),
      };

      setChatMessages((prev) => [...prev, userMsg]);
      setIsAssistantTyping(true);

      const activeScope = scopedPaperIds && scopedPaperIds.length > 0 
        ? papers.filter((p) => scopedPaperIds.includes(p.id))
        : papers;

      // Phase 1: Embedding lookup
      setSynthesisPhase("Retrieving semantic embeddings across " + activeScope.length + " papers...");
      await new Promise((r) => setTimeout(r, 650));

      // Phase 2: Passage synthesis
      setSynthesisPhase("Re-ranking evidence passages & extracting citations...");
      await new Promise((r) => setTimeout(r, 750));

      // Phase 3: Response compilation
      setSynthesisPhase("Formatting synthesized literature review...");
      await new Promise((r) => setTimeout(r, 450));

      // Determine simulated answer based on query keywords
      const lower = content.toLowerCase();
      let replyContent = "";
      let matchedCitations: Citation[] = [];

      if (lower.includes("dataset") || lower.includes("cohort") || lower.includes("data")) {
        replyContent =
          "Comparing datasets across your selected literature:\n\n" +
          "• **Swin-Retina (Rostova et al., 2024)** utilizes the **Synthetic Retinal Benchmark-10K** (9,840 color fundus images) paired with EyePACS subsets to capture subtle peripheral anomalies.\n" +
          "• **OCT-MoCo (Morales et al., 2023)** addresses hardware heterogeneity with a dual-vendor cohort of **3,400 B-scans** split evenly between Heidelberg Spectralis and Zeiss Cirrus scanners.\n" +
          "• **OphthaFoundation (Rao et al., 2025)** scales pretraining across **1.4 million multi-modal scans** balanced over European, East Asian, and South Asian cohorts to reduce demographic bias.\n" +
          "• **Mobile-RetinaNet (Verma et al., 2024)** relies on an 800-image smartphone adapter dataset; however, it lacks demographic breakdowns.";

        matchedCitations = [
          papers[0]?.datasetCitation,
          papers[1]?.datasetCitation,
          papers[4]?.datasetCitation,
          papers[6]?.datasetCitation,
        ].filter(Boolean) as Citation[];
      } else if (lower.includes("auc") || lower.includes("highest") || lower.includes("result") || lower.includes("performance")) {
        replyContent =
          "Performance benchmark summary across evaluated tasks:\n\n" +
          "• **Highest Multi-Disease Screening**: **OphthaFoundation** achieved a macro-averaged **AUC of 0.948** across 14 pathologies, with a peak AUC of **0.957 on glaucoma** and **0.963 on diabetic maculopathy**.\n" +
          "• **Diabetic Retinopathy Grading**: **Swin-Retina** reached a **Micro-AUC of 0.961** and Quadratic Weighted Kappa of **0.884**, specifically outperforming ResNet-50 on Grade 3 severe NPDR by +4.2%.\n" +
          "• **Cross-Scanner Fluid Segmentation**: **OCT-MoCo** sustained **0.832 DSC on IRF** and **0.871 DSC on SRF** across unseen Zeiss scanners (+7.4% over standard U-Net).\n" +
          "• **Edge Mobile AMD Screening**: **Mobile-RetinaNet** achieved **89.4% sensitivity** and **91.2% specificity** running at 28 FPS on budget smartphone processors.";

        matchedCitations = [
          papers[4]?.resultsCitation,
          papers[0]?.resultsCitation,
          papers[1]?.resultsCitation,
          papers[6]?.resultsCitation,
        ].filter(Boolean) as Citation[];
      } else if (lower.includes("swin") || lower.includes("resnet") || lower.includes("architecture")) {
        replyContent =
          "Architectural comparison: Swin-Retina vs. Standard Baselines\n\n" +
          "1. **Receptive Field Mechanism**: While ResNet-50 uses fixed convolutional kernels, **Swin-Retina** utilizes **shifted window self-attention (8x8 tokens)** that dynamically groups peripheral lesion features without gigapixel memory blowups.\n" +
          "2. **Loss Formulation**: Swin-Retina incorporates an **ordinal regression focal loss** that penalizes multi-grade severity prediction errors exponentially, preventing false negatives on borderline proliferative DR.\n" +
          "3. **Trade-offs**: ResNet-50 computes inference in 12ms, whereas Swin-Retina requires **42ms per image** on an RTX 4090, representing a 3.5x computational increase.";

        matchedCitations = [
          papers[0]?.modelCitation,
          papers[0]?.methodologyCitation,
          papers[0]?.limitationsCitation,
        ].filter(Boolean) as Citation[];
      } else {
        replyContent =
          `Based on your query regarding "${content}", here is the cross-paper synthesis:\n\n` +
          `• **Methodological Trends**: Contemporary retinal models are shifting from isolated supervised CNNs to hierarchical vision transformers (Rostova et al.) and self-supervised foundation pretraining across multi-modal imaging (Rao et al., Morales et al.).\n\n` +
          `• **Clinical Feasibility**: While large-scale models report superior AUC metrics (>0.94), point-of-care implementation necessitates either uncertainty-guided human referral (Nwosu et al.) or severe INT8 quantization for handheld field screening (Verma et al.).\n\n` +
          `• **Key Research Gap**: Multi-vendor domain shifts and subtle motion artifacts continue to cause up to 8-15% performance drops on unseen real-world acquisition hardware.`;

        matchedCitations = [
          papers[0]?.objectiveCitation,
          papers[4]?.objectiveCitation,
          papers[5]?.resultsCitation,
          papers[1]?.limitationsCitation,
        ].filter(Boolean) as Citation[];
      }

      const assistantMsg: ChatMessage = {
        id: "asst-" + Date.now(),
        sender: "assistant",
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isDemo: true,
        synthesisSteps: [
          `Retrieved semantic embeddings across ${activeScope.length} library papers`,
          `Analyzed evidence sections against query "${content.slice(0, 32)}..."`,
          `Verified ${matchedCitations.length} supporting citation excerpts`,
        ],
        citations: matchedCitations,
        scopedPaperIds: scopedPaperIds || papers.map((p) => p.id),
      };

      setIsAssistantTyping(false);
      setSynthesisPhase(null);
      setChatMessages((prev) => [...prev, assistantMsg]);
    },
    [papers]
  );

  const clearChat = useCallback(() => {
    setChatMessages([]);
    addToast({
      title: "Chat History Cleared",
      message: "Ready for new research inquiries",
      type: "info",
    });
  }, [addToast]);

  // Export comparison table to functional CSV
  const exportComparisonCSV = useCallback(
    (papersToExport?: Paper[]) => {
      const targetPapers = papersToExport || papers.filter((p) => selectedPaperIds.includes(p.id));

      if (targetPapers.length === 0) {
        addToast({
          title: "Cannot Export CSV",
          message: "Please select at least one paper to export.",
          type: "warning",
        });
        return;
      }

      const headers = [
        "Dimension",
        ...targetPapers.map((p) => `"${p.title.replace(/"/g, '""')} (${p.year})"`),
      ];

      const dimensions: { label: string; key: keyof Paper }[] = [
        { label: "Authors", key: "authors" },
        { label: "Year", key: "year" },
        { label: "Topic", key: "topic" },
        { label: "Research Objective", key: "objective" },
        { label: "Dataset", key: "dataset" },
        { label: "Methodology", key: "methodology" },
        { label: "Model Architecture", key: "modelArchitecture" },
        { label: "Evaluation Metrics", key: "evaluationMetrics" },
        { label: "Reported Results", key: "reportedResults" },
        { label: "Limitations", key: "limitations" },
        { label: "DOI / Citation", key: "doiOrArxiv" },
      ];

      const rows = dimensions.map(({ label, key }) => {
        const rowCells = targetPapers.map((p) => {
          const val = p[key];
          if (Array.isArray(val)) {
            return `"${val.join(", ").replace(/"/g, '""')}"`;
          }
          if (val === undefined || val === null || val === "") {
            return `"Not reported in manuscript"`;
          }
          return `"${String(val).replace(/"/g, '""')}"`;
        });
        return [`"${label}"`, ...rowCells].join(",");
      });

      const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `litlens-comparison-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addToast({
        title: "CSV Export Successful",
        message: `Exported comparison of ${targetPapers.length} papers to CSV.`,
        type: "success",
      });
    },
    [papers, selectedPaperIds, addToast]
  );

  const value = {
    papers,
    addPaper,
    removePaper,
    getPaperById,
    workspaces,
    activeWorkspaceId,
    setActiveWorkspaceId,
    activeWorkspace,
    createNewWorkspace,
    selectedPaperIds,
    togglePaperSelection,
    selectAllPapers,
    clearPaperSelection,
    isSelectedForComparison,
    chatMessages,
    isAssistantTyping,
    synthesisPhase,
    sendMessage,
    clearChat,
    activeCitation,
    setActiveCitation,
    activePaperModal,
    setActivePaperModal,
    isUploadOpen,
    setIsUploadOpen,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    searchQuery,
    setSearchQuery,
    toasts,
    addToast,
    removeToast,
    exportComparisonCSV,
  };

  return <ResearchContext.Provider value={value}>{children}</ResearchContext.Provider>;
}

export function useResearch() {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error("useResearch must be used within a ResearchProvider");
  }
  return context;
}
