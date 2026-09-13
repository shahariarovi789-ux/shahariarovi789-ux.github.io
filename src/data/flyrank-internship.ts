export interface Assignment {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}

export const FLYRANK_INTERNSHIP = {
  company: "FlyRank AI",
  role: "Backend AI Engineering Internship",
  duration: "July 2026 – September 2026",
  track: "Backend & Agentic Systems Track",
  summary:
    "Architected and deployed high-performance distributed backend microservices, Redis-based multi-tenant quota engines, and Model Context Protocol (MCP) servers powering enterprise AI scraping agents.",
  techStack: [
    "FastAPI",
    "Python",
    "Redis",
    "Model Context Protocol (MCP)",
    "PostgreSQL 16",
    "Celery",
    "Playwright",
    "Docker Compose"
  ],
  githubUrl: "https://github.com/shahariarovi789-ux",
};

export const ASSIGNMENTS: Assignment[] = [
  {
    number: "01",
    title: "Multi-Tenant Quota & Token-Bucket Architecture",
    tagline: "Atomic distributed rate-limiting at scale",
    description:
      "Designed and implemented distributed token-bucket rate limiters in Redis Lua scripts to eliminate race conditions, managing tiered API quotas across multiple agent tenants.",
    tags: ["Redis", "Lua Scripts", "Distributed Systems", "FastAPI"],
  },
  {
    number: "02",
    title: "Asynchronous Scraping Mesh & Proxy Rotator",
    tagline: "Resilient headless browser extraction",
    description:
      "Engineered a distributed Celery and Playwright scraping mesh with dynamic proxy pool rotation, automated backoff retry policies, and fingerprint masking with >99.8% success rates.",
    tags: ["Playwright", "Celery", "PostgreSQL", "Proxy Rotation"],
  },
  {
    number: "03",
    title: "Model Context Protocol (MCP) Server Integration",
    tagline: "Standardized agent-to-backend tooling",
    description:
      "Built custom Model Context Protocol (MCP) servers allowing autonomous AI agents to query live database metrics, invoke extraction tools, and execute verified database queries safely.",
    tags: ["MCP", "LLM Tooling", "Anthropic Spec", "Python"],
  },
  {
    number: "04",
    title: "Database Indexing & Latency Hardening",
    tagline: "Sub-85ms p95 API response optimization",
    description:
      "Analyzed SQL query plans, added composite B-tree and GiST indices in PostgreSQL 16, and implemented Redis caching layers to reduce database load by 45%.",
    tags: ["PostgreSQL 16", "Query Optimization", "Caching", "Redis"],
  },
];

export const CAPSTONE_PROJECT = {
  title: "Distributed Rate-Limiting & Real-Time AI Agent Engine",
  tagline: "Production-grade backend infrastructure for AI agent swarms",
  description:
    "Shipped a resilient, production-grade microservice that manages dynamic API token allocations, coordinates headless agent workers across Docker clusters, and provides real-time telemetry through MCP endpoints with 99.9% uptime and sub-85ms latency.",
  techStack: [
    "FastAPI",
    "Redis Clusters",
    "PostgreSQL 16",
    "Model Context Protocol (MCP)",
    "Docker Compose",
    "Celery",
    "Prometheus / Grafana"
  ],
  status: "Completed & Deployed",
};
