export type ProcessingStatus = "ready" | "processing" | "indexing" | "error";

export interface Citation {
  id: string;
  paperId: string;
  paperTitle: string;
  authors: string;
  year: number;
  location: string; // e.g. "Page 4, Section 3.2" or "Table 2, Page 6"
  badge: string; // e.g. "[p. 4, §3.2]"
  excerpt: string;
  context: string;
  relevanceScore?: number;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  topic: string;
  tags: string[];
  status: ProcessingStatus;
  statusMessage?: string;
  dateAdded: string;
  fileSize: string;
  pageCount: number;
  citationCount: number;
  doiOrArxiv: string;
  abstract: string;
  
  // Comparative dimensions
  objective: string;
  dataset: string;
  methodology: string;
  modelArchitecture: string;
  evaluationMetrics: string;
  reportedResults: string;
  limitations: string;

  // Extracted citations for each dimension
  objectiveCitation?: Citation;
  datasetCitation?: Citation;
  methodologyCitation?: Citation;
  modelCitation?: Citation;
  metricsCitation?: Citation;
  resultsCitation?: Citation;
  limitationsCitation?: Citation;

  // Key findings & highlights
  keyFindings: string[];
  isSampleData: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  paperCount: number;
  comparisonsCount: number;
  lastActive: string;
  isDefault?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  citations?: Citation[];
  isDemo?: boolean;
  scopedPaperIds?: string[];
  synthesisSteps?: string[];
}

export interface EvaluationMetric {
  id: string;
  name: string;
  value: number; // e.g., 96.8
  unit: string; // "%", "s", etc.
  change: string; // "+1.4% vs last benchmark"
  changeType: "positive" | "neutral" | "negative";
  target: number;
  description: string;
  sampleCount: number;
}

export interface EvaluationRun {
  id: string;
  timestamp: string;
  query: string;
  papersEvaluated: number;
  citationCorrectness: number;
  retrievalRelevance: number;
  answerCompleteness: number;
  latencySeconds: number;
  status: "passed" | "flagged" | "warning";
  notes: string;
}

export type ToastType = "success" | "info" | "warning" | "error";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}
