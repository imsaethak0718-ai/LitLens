"use client";

import React, { useState, useRef } from "react";
import { useResearch } from "@/context/ResearchContext";
import {
  X,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

export function UploadModal() {
  const { isUploadOpen, setIsUploadOpen, addPaper } = useResearch();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [simulatedTitle, setSimulatedTitle] = useState("");
  const [simulatedAuthors, setSimulatedAuthors] = useState("");
  const [simulatedTopic, setSimulatedTopic] = useState("Medical Image Analysis");
  const [simulatedYear, setSimulatedYear] = useState("2024");
  
  // Processing simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadOpen) return null;

  const steps = [
    "Reading PDF file structure & extracting layout blocks...",
    "Extracting tables, mathematical equations, and references...",
    "Generating vector embeddings and cross-referencing citations...",
    "Indexing evidence into active research workspace...",
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    
    setSimulatedTitle(cleanName || "Unsupervised Diffusion Models for Retinal Maculopathy");
    setSimulatedAuthors("Sarah Chen, Kenneth Liu, et al.");
  };

  const handleUsePreset = () => {
    setSimulatedTitle(
      "Diffusion-Guided Latent Inpainting for Severe Diabetic Macular Ischemia"
    );
    setSimulatedAuthors("Hao Zhou, Marianne Richter, David S. Park");
    setSimulatedTopic("Diffusion Models & Retinal Ischemia");
    setSimulatedYear("2024");
    setSelectedFile(new File(["dummy content"], "zhou2024_diffusion_retina.pdf", { type: "application/pdf" }));
  };

  const handleStartProcessing = async () => {
    if (!simulatedTitle.trim()) return;

    setIsProcessing(true);
    setProcessStep(0);

    await new Promise((r) => setTimeout(r, 600));
    setProcessStep(1);

    await new Promise((r) => setTimeout(r, 800));
    setProcessStep(2);

    await new Promise((r) => setTimeout(r, 700));
    setProcessStep(3);

    await new Promise((r) => setTimeout(r, 500));

    const authorsArr = simulatedAuthors.split(",").map((a) => a.trim()).filter(Boolean);
    addPaper({
      title: simulatedTitle.trim(),
      authors: authorsArr.length > 0 ? authorsArr : ["Dr. Sarah Chen et al."],
      year: parseInt(simulatedYear) || 2024,
      venue: "Synthetic Conf. on Medical Imaging (2024)",
      topic: simulatedTopic,
      tags: [simulatedTopic, "Deep Learning", "Synthetic Demo"],
      status: "ready",
      statusMessage: "Extracted 8 evidence citations • Embeddings ready",
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "3.2 MB",
      pageCount: 10,
      doiOrArxiv: "10.1016/j.litlens.demo." + Math.floor(Math.random() * 9000 + 1000),
      abstract:
        "This sample manuscript evaluates automated deep learning representations for ophthalmic image classification. The study examines cross-device generalization limits and proposes multiscale self-attention to improve sensitivity on subtle lesion boundaries.",
      objective: "Evaluate deep neural architectures on high-resolution ophthalmic scans and quantify boundary detection accuracy.",
      dataset: "Synthetic Multi-Center Imaging Benchmark (4,000 standardized scans).",
      methodology: "Multistage supervised fine-tuning with spatial attention maps and contrastive loss regularization.",
      modelArchitecture: "Vision Transformer Base (86M parameters) with lightweight convolutional patch embedding.",
      evaluationMetrics: "Area Under ROC (AUC), Quadratic Weighted Kappa, Sensitivity at 95% Specificity.",
      reportedResults: "Achieved 0.952 AUC on held-out evaluation splits, outperforming baseline ResNet architectures.",
      limitations: "Higher latency compared to quantized convolutional models; evaluation restricted to synthetic benchmark cohort.",
      keyFindings: [
        "Spatial attention heads selectively identify microaneurysms.",
        "Demonstrates robust convergence with ordinal penalty losses.",
      ],
      isSampleData: true,
      objectiveCitation: {
        id: "cit-upload-obj",
        paperId: "paper-uploaded",
        paperTitle: simulatedTitle,
        authors: simulatedAuthors,
        year: parseInt(simulatedYear) || 2024,
        location: "Section 1.2, Page 2",
        badge: "[p. 2, §1.2]",
        excerpt: "The primary objective is mitigating clinical false negatives on peripheral retinal lesions via transformer attention.",
        context: "Section 1: Introduction — Synthetically extracted from uploaded PDF demonstration.",
      },
      limitationsCitation: {
        id: "cit-upload-lim",
        paperId: "paper-uploaded",
        paperTitle: simulatedTitle,
        authors: simulatedAuthors,
        year: parseInt(simulatedYear) || 2024,
        location: "Section 5.1, Page 8",
        badge: "[p. 8, §5.1]",
        excerpt: "Inference latency was not optimized for mobile edge hardware.",
        context: "Section 5: Limitations — Synthetically extracted from uploaded PDF demonstration.",
      },
    });

    setIsProcessing(false);
    setIsUploadOpen(false);
    setSelectedFile(null);
    setSimulatedTitle("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-xl bg-[#111114] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-zinc-200 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h3 className="text-base font-bold text-white">Upload Research Papers</h3>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">
              Frontend demonstration dropzone • Parses PDF structure & citations
            </p>
          </div>

          <button
            onClick={() => setIsUploadOpen(false)}
            disabled={isProcessing}
            className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Disclaimer banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-white">Prototype Notice:</span> Files are processed locally in your browser memory for interface demonstration.
            </div>
          </div>

          {/* Processing Screen */}
          {isProcessing ? (
            <div className="py-8 px-4 flex flex-col items-center justify-center text-center space-y-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-white animate-spin flex items-center justify-center"></div>
                <Sparkles className="w-6 h-6 text-white absolute inset-0 m-auto" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Synthesizing Literature & Citations
                </h4>
                <p className="text-xs font-mono text-zinc-400 max-w-sm">
                  {steps[processStep]}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-xs bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${((processStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              <div className="space-y-1 text-left w-full max-w-sm pt-2">
                {steps.map((st, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-[11px] font-mono ${
                      i < processStep
                        ? "text-emerald-400 font-medium"
                        : i === processStep
                        ? "text-white font-semibold"
                        : "text-zinc-600"
                    }`}
                  >
                    {i < processStep ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">
                        {i + 1}
                      </div>
                    )}
                    <span className="truncate">{st}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-white bg-white/10 scale-[1.01]"
                    : selectedFile
                    ? "border-emerald-400 bg-emerald-500/10"
                    : "border-white/15 hover:border-white/30 bg-black/40 hover:bg-black/60"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/15 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <UploadCloud className="w-6 h-6" />
                </div>

                {selectedFile ? (
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white font-mono">
                      Selected: {selectedFile.name}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to parse
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-white">
                      Drag and drop your research PDF here, or{" "}
                      <span className="underline text-blue-400">browse files</span>
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500">
                      Supports PDF up to 64MB • Extracts headings, tables, and references
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Preset Button */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="text-xs">
                  <p className="font-semibold text-zinc-200">No PDF on hand?</p>
                  <p className="text-[11px] font-mono text-zinc-500">
                    Load a sample retinal paper preprint to test the pipeline.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleUsePreset}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono text-zinc-200 transition-colors shrink-0"
                >
                  Load Sample Paper
                </button>
              </div>

              {/* Metadata Fields */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Paper Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter or confirm extracted paper title..."
                    value={simulatedTitle}
                    onChange={(e) => setSimulatedTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-zinc-900 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Authors
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Rostova, Marcus Vance"
                      value={simulatedAuthors}
                      onChange={(e) => setSimulatedAuthors(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-zinc-900 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Research Topic
                    </label>
                    <select
                      value={simulatedTopic}
                      onChange={(e) => setSimulatedTopic(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-zinc-900 border border-white/15 text-white focus:outline-none focus:ring-1 focus:ring-white"
                    >
                      <option value="Diabetic Retinopathy & Vision Transformers">
                        Diabetic Retinopathy & Vision Transformers
                      </option>
                      <option value="OCT Segmentation & Self-Supervised Learning">
                        OCT Segmentation & Self-Supervised
                      </option>
                      <option value="Vascular Morphometry & Graph Neural Networks">
                        Vascular Morphometry & Graph Networks
                      </option>
                      <option value="OCTA Super-Resolution & Diffusion Models">
                        OCTA Super-Resolution & Diffusion
                      </option>
                      <option value="Foundation Models & Multi-Disease Screening">
                        Foundation Models & Multi-Disease
                      </option>
                      <option value="Edge AI & Low-Resource Screening">
                        Edge AI & Low-Resource Screening
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#09090b] flex items-center justify-end gap-2">
          <button
            onClick={() => setIsUploadOpen(false)}
            disabled={isProcessing}
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          {!isProcessing && (
            <button
              onClick={handleStartProcessing}
              disabled={!simulatedTitle.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-xs disabled:opacity-40 transition-all"
            >
              <span>Index & Parse Paper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
