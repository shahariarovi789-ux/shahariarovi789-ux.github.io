export interface SkillCategory {
  category: string;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Backend & Distributed Systems",
    items: ["FastAPI", "Python", "PostgreSQL", "Redis", "Celery", "Distributed Quotas", "Token Bucket Rate Limiting", "REST APIs", "AsyncIO", "Docker", "Microservices Architecture"]
  },
  {
    category: "AI, Agents & Tool Use",
    items: ["Model Context Protocol (MCP)", "LangChain", "LlamaIndex", "Local LLMs (Ollama/vLLM)", "Hugging Face", "Agentic Workflows", "Vector DBs (Chroma/pgvector)", "Prompt Engineering", "Semantic RAG"]
  },
  {
    category: "Competitive Programming & Core CS",
    items: ["Data Structures & Algorithms", "C++", "Dynamic Programming", "Graph Theory", "Number Theory", "Time Complexity Optimization", "500+ CP Problems"]
  },
  {
    category: "Data, Scraping & DevOps",
    items: ["Playwright", "Puppeteer", "Proxy Mesh Architecture", "SQL / Schema Design", "Git & GitHub", "GitHub Actions CI/CD", "Linux / Bash", "Postman"]
  }
];

export const SKILLS = [
  "FastAPI", "Python", "C++", "Model Context Protocol (MCP)", "PostgreSQL", "Redis",
  "Celery", "Distributed Rate Limiting", "Local LLMs", "LangChain", "Docker",
  "Proxy Mesh Scraping", "AsyncIO", "REST APIs", "ChromaDB", "Vector Search",
  "Git & GitHub Actions", "Linux / Bash", "Algorithms & DSA", "ICPC Regionalist", "SQL Optimization"
];
