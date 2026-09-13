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
    id: "flyrank-backend",
    title: "FlyRank AI Backend Infrastructure",
    description: "Multi-tenant distributed rate-limiting, proxy mesh scraping, and Model Context Protocol (MCP) server endpoints powering AI agents at scale.",
    bullets: [
      "Engineered atomic token-bucket rate limiters in Redis Lua scripts handling 10,000+ requests/min across multi-tenant tier limits.",
      "Built resilient asynchronous web scraping workers with Celery and Playwright with automated CAPTCHA bypass and IP proxy rotation.",
      "Designed and deployed custom Model Context Protocol (MCP) servers allowing autonomous agents to query live database and search index telemetry."
    ],
    tech: ["FastAPI", "Python", "Redis", "Model Context Protocol (MCP)", "PostgreSQL", "Celery", "Docker"],
    githubUrl: "https://github.com/shahariarovi789-ux",
    caseStudyUrl: "/projects/flyrank-backend-internship",
    featured: true,
  },
  {
    id: "distributed-quota-engine",
    title: "Distributed Rate-Limiting & Quota Engine",
    description: "High-performance distributed rate limiter implementing sliding-window and token-bucket algorithms with Redis clusters and FastAPI.",
    bullets: [
      "Implemented thread-safe, distributed token-bucket rate limiting using atomic Redis Lua scripts to eliminate race conditions across worker clusters.",
      "Achieved sub-5ms latency overhead with Redis pipelining and connection pooling, supporting custom tiered quota policies per API key.",
      "Packaged with Docker Compose, Prometheus metrics scraping, and automated integration test suites."
    ],
    tech: ["FastAPI", "Python", "Redis", "Lua Scripts", "Docker", "AsyncIO", "Prometheus"],
    githubUrl: "https://github.com/shahariarovi789-ux/distributed-rate-limiter",
    featured: true,
  },
  {
    id: "mcp-research-agent",
    title: "MCP Autonomous Research Agent",
    description: "An agentic research assistant using the Model Context Protocol (MCP) to coordinate search, citation extraction, and vector memory.",
    bullets: [
      "Constructed a multi-tool agent using Anthropic's Model Context Protocol (MCP) specification to bridge local LLMs with external APIs and databases.",
      "Integrated ChromaDB vector search with recursive document chunking for context-aware Retrieval-Augmented Generation (RAG).",
      "Created structured citation pipelines that cross-verify extracted claims against ground-truth PDF documents."
    ],
    tech: ["Python", "MCP", "LangChain", "ChromaDB", "Local LLMs", "FastAPI"],
    githubUrl: "https://github.com/shahariarovi789-ux/mcp-research-agent",
    featured: true,
  },
  {
    id: "scraping-mesh",
    title: "Enterprise High-Concurrency Scraping Mesh",
    description: "Resilient asynchronous web scraping pipeline orchestrating headless browsers, proxy pools, and rate-adaptive workers.",
    bullets: [
      "Orchestrated parallel Playwright browser instances inside Docker containers for dynamic single-page application data extraction.",
      "Implemented exponential backoff retry policies, dynamic user-agent rotation, and fingerprint masking with a 99.8% success rate.",
      "Streamed structured data directly into PostgreSQL with automated deduplication and schema validation."
    ],
    tech: ["Python", "Playwright", "Celery", "Redis", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/shahariarovi789-ux/enterprise-scraping-mesh",
  },
  {
    id: "neural-sentiment-analyzer",
    title: "Neural Sentiment Analyzer Engine",
    description: "Deep learning text classification engine featuring custom embedding layers, bidirectional LSTM architectures, and interactive inference APIs.",
    bullets: [
      "Trained a neural classification model for multi-class sentiment detection with over 91% validation accuracy on benchmark datasets.",
      "Deployed an ultra-low latency REST endpoint with FastAPI and an interactive browser-based demonstration interface.",
      "Optimized inference runtime with ONNX runtime quantization, reducing cold-start latency by 60%."
    ],
    tech: ["Python", "FastAPI", "TensorFlow", "ONNX", "REST API"],
    githubUrl: "https://github.com/shahariarovi789-ux/sentiment-analyzer",
  },
  {
    id: "cp-algorithms-vault",
    title: "Competitive Programming & Algorithms Vault",
    description: "Curated collection of 500+ optimized algorithmic solutions in C++ covering Graph Theory, DP, Segment Trees, and Number Theory.",
    bullets: [
      "Repository of solved problems from ICPC Regionals, Codeforces, and LeetCode with rigorous time and space complexity annotations.",
      "Implemented templated data structures: Segment Trees with Lazy Propagation, Fenwick Trees, DSU, Dijkstra, and Tarjan's SCC.",
      "Used as the foundational training curriculum for the university competitive programming club."
    ],
    tech: ["C++", "Algorithms", "Data Structures", "Graph Theory", "Dynamic Programming"],
    githubUrl: "https://github.com/shahariarovi789-ux/competitive-programming-vault",
  }
];
