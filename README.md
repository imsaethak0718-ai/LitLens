# LitLens — AI Research Literature Review Platform

> **"Your research, understood."**  
> Turn papers into evidence. Discover connections. Review with confidence.

LitLens is a frontend prototype for an AI-powered literature review platform designed for medical researchers, ophthalmologists, and machine learning scientists. It enables users to organize research libraries, compare methodologies and datasets side-by-side in evidence matrices, inspect verifiable page citations, and chat with a literature assistant.

---

## 🔬 Sample Data Disclaimer

> **Important**: All papers, author names, venues, and benchmark evaluation runs included in this application are **synthetically generated mock data** for UI/UX prototyping. They do not represent genuine published medical literature or actual clinical studies.

---

## ✨ Key Features & Pages

### 1. 📊 Research Dashboard (`/`)
- **Hero Overview**: Greeting with quick action triggers and search jump.
- **Summary Cards**: Real-time stats on indexed papers, active research topics, created matrices, and questions asked.
- **Recent Papers Table**: Quick status monitoring with primary citation shortcuts.
- **Continue Researching**: Workspace switcher with active research project tracking.
- **Quick Actions**: One-click paths for paper uploads, comparison matrices, and AI inquiries.

### 2. 📚 My Research Library (`/library`)
- **Search & Multi-Filters**: Instant keyword filter, topic taxonomy pills, and publication year ranges.
- **Grid & List Views**: Flexible card view with abstract previews or high-density table view.
- **Sort Options**: Sort by Recently Added, Publication Year, Citation Count, and Title (A-Z).
- **Embedded Dropzone**: Drag-and-drop PDF upload zone with simulated parsing stages.
- **Paper Detail Drawer**: Full abstract, extracted structured evidence, topic tags, and one-click BibTeX export.

### 3. ⚖️ Compare Papers Matrix (`/compare`)
- **Side-by-Side Evidence Table**: Aligns selected papers across 7 key research dimensions:
  - Research Objective
  - Dataset & Cohorts
  - Methodology & Supervision
  - Model Architecture & Parameters
  - Evaluation Metrics
  - Reported Results
  - Explicit Limitations
- **Page Citation Badges**: Click any badge (e.g. `[p. 4, §3.2]`) to inspect the exact supporting excerpt and section context.
- **Explicit Missing Data Handling**: Visual badges for unmentioned parameters (e.g., "Not reported in manuscript") rather than invented values.
- **Functional CSV Export**: Downloads a real formatted `.csv` comparison matrix of selected papers directly to your machine.

### 4. 💬 Research Assistant (`/assistant`)
- **Interactive Multi-Paper Chat**: Ask questions across papers in your library with simulated multi-phase synthesis.
- **Suggested Prompts**: Clickable research inquiries covering datasets, limitations, and model comparisons.
- **Citation Cards**: Verified excerpts highlighting exact page numbers and quotes.
- **Paper Scoping**: Filter which papers the assistant focuses on during its synthesis.

### 5. 📈 Evaluation & Benchmarks (`/evaluation`)
- **Quality Metrics**: Citation correctness (96.8%), retrieval relevance (94.2%), answer completeness (91.5%), and average latency (1.24s).
- **SVG Trend Visualization**: Quality curves tracking retrieval precision over successive benchmark runs.
- **Execution Run Traces**: Inspect recent validation runs and audit logs.
- **Interactive Benchmark Trigger**: Simulate running new automated validation suites in real time.

### 6. ⚙️ Settings & Preferences (`/settings`)
- **Researcher Profile**: Name, academic affiliation, email, research taxonomy, and notification preferences.
- **Theme Switcher**: Research Light (default off-white canvas with navy typography), System Sync, and Dark Room Preview.
- **Workspace & Extraction Configuration**: Adjust citation grounding strictness (Conservative Grounding vs. Exploratory) and default export formats.
- **Storage Quota**: Visual indicator of local vector storage utilization.

### 7. ⌨️ Global Features
- **Command Palette (`⌘K` / `Ctrl+K`)**: Instant modal search across all papers, authors, topics, and app views.
- **Toast Notifications**: Feedback for uploads, CSV exports, citation copies, and workspace switches.
- **Mobile Responsive Drawer**: Collapsible sidebar with mobile navigation drawer.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`ResearchContext`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm (or pnpm/yarn)

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd LitLens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🔌 Future Backend Integration

LitLens is structured to seamlessly connect to a production backend:
- **FastAPI / Python**: Expose `/api/upload`, `/api/chat`, and `/api/compare` endpoints.
- **Vector Search (Qdrant / Milvus / pgvector)**: Store chunk embeddings and section coordinates.
- **Document Layout Parsing (Grobid / Marker / Unstructured)**: Replace frontend upload simulation with real PDF section extraction.
- **LLM APIs (Claude 3.5 Sonnet / Gemini 1.5 Pro)**: Stream real multi-hop citations directly into the Research Assistant.
