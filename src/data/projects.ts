export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  caseStudyUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "flyrank-metering-billing",
    title: "Usage Metering & Billing Engine — FlyRank Capstone",
    description:
      "A mission-critical usage metering, subscription quota enforcement, AI token pricing, and Stripe webhook synchronization engine. Built with exact integer micro-dollar pricing, guaranteed exactly-once idempotency deduplication, and automated GitHub Actions CI test suites.",
    bullets: [
      "Engineered multi-tenant usage metering and tiered quota enforcement with integer micro-dollar arithmetic for precision billing.",
      "Implemented Stripe webhook synchronization with cryptographic signature verification and idempotent event deduplication.",
      "Configured automated GitHub Actions CI testing with full unit and integration test coverage across billing workflows."
    ],
    tech: ["FastAPI", "PostgreSQL", "Stripe", "Docker", "Python"],
    githubUrl: "https://github.com/shahariarovi789-ux/flyrank-capstone-metering-billing",
    liveUrl: "https://shahariarovi789-ux.github.io/flyrank-capstone-metering-billing/",
    featured: true,
    caseStudyUrl: "/projects/flyrank-backend-internship",
  },
  {
    id: "roar-prompt-tutor",
    title: "ROAR — Final Year Capstone Project (ULAB)",
    description:
      "Selected as the official final-year university capstone project. An intelligent, adaptive tutoring system utilizing a quantized local DeepSeek-7B model fine-tuned with PEFT/LoRA adapters to dynamically teach prompt engineering. Features a custom SQLite-backed learning state machine and a hybrid rule+LLM evaluation loop.",
    bullets: [
      "Fine-tuned a quantized local DeepSeek-7B model using PEFT/LoRA adapters to deliver personalized, dynamic prompt engineering instruction.",
      "Architected a custom SQLite-backed learning state machine tracking student progression and skill acquisition.",
      "Engineered a hybrid rule-based and LLM evaluation loop for automated real-time feedback with Gradio interface."
    ],
    tech: ["Python", "Transformers", "PEFT", "Gradio", "SQLite"],
    githubUrl: "https://github.com/shahariarovi789-ux/roar-prompt-tutor",
    featured: true,
  },
  {
    id: "orion-agent-rag",
    title: "Orion — Multi-Agent Corrective RAG (CRAG)",
    description:
      "An advanced multi-agent research coordinator that retrieves local documents, grades relevance, falls back to DuckDuckGo web searches when internal document knowledge is insufficient, and executes self-corrective critique loops to eliminate hallucinations.",
    bullets: [
      "Built an agentic CRAG workflow using Google Gemini API to evaluate and grade retrieved context against user queries.",
      "Engineered automated fallback web search with DuckDuckGo to supplement sparse vector retrieval.",
      "Constructed a self-corrective critique loop in Streamlit that verifies factual grounding before generating responses."
    ],
    tech: ["Python", "Google Gemini API", "Streamlit", "Multi-Agent", "Vector Search"],
    githubUrl: "https://github.com/shahariarovi789-ux/orion-agent-rag",
    featured: true,
  },
  {
    id: "gesture-control",
    title: "AeroDraw — Edge AI Gesture Controller",
    description:
      "A local, privacy-first computer vision web application that translates hand movements into screen vectors and system cursor clicks. Parses hand landmarks fully client-side via WebAssembly-based MediaPipe tracking, allowing users to draw in the air and control browser interfaces with smooth pinch clicks.",
    bullets: [
      "Implemented client-side hand tracking with MediaPipe compiled to WebAssembly for zero-latency, private gesture recognition.",
      "Mapped spatial hand coordinates to screen vectors enabling air-drawing, stroke smoothing, and pinch-click trigger detection.",
      "Built a lightweight React and Tailwind CSS v4 interactive canvas interface."
    ],
    tech: ["React", "Vite", "Tailwind CSS v4", "MediaPipe", "WebAssembly"],
    githubUrl: "https://github.com/shahariarovi789-ux/gesture-control",
    featured: true,
  },
  {
    id: "omeganet",
    title: "OmegaNet — Neural Framework from Scratch",
    description:
      "A modular, object-oriented deep learning framework built in Python using only NumPy. Implements forward/backward passes, dense layers with parameter tracking, dropout regularization, activation derivatives (ReLU, Sigmoid, Softmax), losses, and a hand-coded Adam optimizer to train on non-linear spiral/MNIST data.",
    bullets: [
      "Hand-coded dense layers, forward/backward propagation, and automatic gradient updates using pure NumPy with zero ML libraries.",
      "Implemented categorical cross-entropy, binary cross-entropy, MSE losses, and an Adam optimizer with momentum and decay.",
      "Validated framework performance by training multi-layer neural networks on non-linear spiral and MNIST classification datasets."
    ],
    tech: ["Python", "NumPy", "Deep Learning", "Algorithms"],
    githubUrl: "https://github.com/shahariarovi789-ux/omeganet",
    featured: true,
  },
  {
    id: "agentic-ai-toolkit",
    title: "Agentic AI Toolkit",
    description:
      "A framework-free ReAct agent that reasons step by step and uses tools (calculator, file readers, word counter, clock) to solve tasks — powered by a local LLM via Ollama, with no API keys. Built with pure Python standard library so the whole agent loop is transparent.",
    bullets: [
      "Built a framework-free ReAct (Reason + Act) loop in pure Python standard library for fully transparent execution.",
      "Integrated custom tool calling for file system access, calculation, and string analysis powered by local Ollama LLMs.",
      "Created an accompanying web demo showcasing interactive step-by-step reasoning traces."
    ],
    tech: ["Python", "LLM", "AI Agents", "WebLLM"],
    githubUrl: "https://github.com/shahariarovi789-ux/agentic-ai-toolkit",
    liveUrl: "https://shahariarovi789-ux.github.io/agentic-ai-toolkit/",
    featured: true,
  },
  {
    id: "hospital-management-system",
    title: "Pidoc — Hospital Management System",
    description:
      "A dynamic, full-portal healthcare management web application bridging patients, doctors, and administrators. Built with a PHP backend and MySQL database, it features secure registrations, duplicate email checks, auto-incrementing key session tracking, digital prescriptions, and automated PDF billing. Styled with a premium dark-themed glassmorphism interface.",
    bullets: [
      "Engineered multi-role authentication and RBAC for patients, doctors, and hospital administrators in PHP/MySQL.",
      "Implemented digital prescription generation, appointment scheduling, and automated PDF invoice generation.",
      "Designed responsive dark glassmorphism interface with client-side form validation and duplicate prevention."
    ],
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "UI/UX"],
    githubUrl: "https://github.com/shahariarovi789-ux/hospital-management-system",
    featured: true,
  },
  {
    id: "ai-job-search",
    title: "AI Job Search — Agentic Application Framework",
    description:
      "A local AI-powered job application framework built on Claude Code that runs entirely on your machine. Evaluates job postings against your profile, tailors CVs for each role, drafts cover letters, and prepares interview answers — with zero data sent to third-party services.",
    bullets: [
      "Built an agentic pipeline using Claude Code to evaluate job descriptions and score role–candidate fit automatically.",
      "Automated CV tailoring and cover letter generation with prompt chaining and structured output parsing.",
      "Designed for full local execution — no external API data sharing, fork-and-own architecture."
    ],
    tech: ["Claude Code", "Python", "AI Agents", "Prompt Engineering"],
    githubUrl: "https://github.com/shahariarovi789-ux/ai-job-search",
    featured: false,
  },
  {
    id: "markitdown-ui",
    title: "MarkItDown UI — File-to-Markdown Web Interface",
    description:
      "A professional, cyberpunk-themed web interface for Microsoft's MarkItDown library that converts PDF, Word, Excel, PowerPoint, images, audio files, and HTML into clean Markdown in one click. Supports MCP (Model Context Protocol) integration for use inside AI agent workflows.",
    bullets: [
      "Wrapped Microsoft's MarkItDown Python library in a responsive HTML/CSS/JS front-end with drag-and-drop file upload.",
      "Supported 7 file formats (PDF, DOCX, XLSX, PPTX, images, audio, HTML) with instant client-preview output.",
      "Added MCP (Model Context Protocol) tool integration for AI agent pipelines consuming converted Markdown."
    ],
    tech: ["HTML", "Python", "MarkItDown", "MCP", "UI/UX"],
    githubUrl: "https://github.com/shahariarovi789-ux/markitdown-ui",
    featured: false,
  },
  {
    id: "llm-triage-api",
    title: "LLM Triage API",
    description:
      "A lightweight Python REST API that routes incoming text payloads to the appropriate LLM handler based on content classification. Designed as a modular triage layer for multi-model agent systems where different models handle different task types.",
    bullets: [
      "Built a classification-driven routing layer to dispatch requests to specialist LLM endpoints based on payload content.",
      "Designed a modular handler architecture allowing hot-swapping of model backends without API contract changes.",
      "Implemented structured JSON response schemas for downstream agent and RAG pipeline consumption."
    ],
    tech: ["Python", "FastAPI", "LLM Routing", "REST API"],
    githubUrl: "https://github.com/shahariarovi789-ux/llm-triage-api",
    featured: false,
  },
  {
    id: "the-polite-scraper",
    title: "The Polite Scraper",
    description:
      "An ethical, robots.txt-respecting Python web scraper with built-in rate limiting, retry logic, and configurable crawl delays. Built for AI data collection workflows where responsible crawling and data quality matter as much as speed.",
    bullets: [
      "Implemented automatic robots.txt parsing and respect, with configurable per-domain crawl delay enforcement.",
      "Built exponential-backoff retry logic and polite rate limiting to avoid server overload during bulk data collection.",
      "Designed clean output pipelines (JSON/CSV) for direct ingestion into LLM fine-tuning and RAG dataset workflows."
    ],
    tech: ["Python", "Web Scraping", "Data Collection", "AI/ML"],
    githubUrl: "https://github.com/shahariarovi789-ux/the-polite-scraper",
    featured: false,
  },
];
