export type ExperienceType = "work" | "achievement" | "leadership" | "education";

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  period: string;
  current: boolean;
  bullets: string[];
  tags: string[];
  caseStudyUrl?: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "flyrank",
    type: "work",
    role: "Backend AI Engineer Intern",
    organization: "FlyRank AI",
    period: "July 2026 – September 2026",
    current: true,
    bullets: [
      "Architected distributed rate-limiting and quota management microservices using FastAPI, Redis Lua scripts, and PostgreSQL for multi-tenant AI agents.",
      "Engineered high-concurrency asynchronous scraping pipelines with Celery and Playwright, maintaining >99.8% extraction reliability across dynamic web targets.",
      "Implemented custom Model Context Protocol (MCP) servers enabling LLMs to safely interact with live SQL databases and search telemetry.",
      "Optimized query execution plans and Redis caching layers, achieving sub-85ms p95 API response latencies."
    ],
    tags: ["FastAPI", "Python", "Redis", "MCP", "PostgreSQL", "Docker", "AsyncIO"],
    caseStudyUrl: "/projects/flyrank-backend-internship"
  },
  {
    id: "icpc",
    type: "achievement",
    role: "2× ICPC Regionalist & Algorithmist",
    organization: "International Collegiate Programming Contest (ICPC)",
    period: "2023 & 2024",
    current: false,
    bullets: [
      "Qualified and represented university at the ICPC Dhaka Regional Contests in both 2023 and 2024.",
      "Solved 500+ algorithmic problems across Codeforces, LeetCode, and HackerRank with a focus on Graph Algorithms, DP, and Number Theory.",
      "Consistently ranked in the top tier of national and inter-university programming contests."
    ],
    tags: ["C++", "Algorithms", "Graph Theory", "Dynamic Programming", "ICPC"]
  },
  {
    id: "tech-titans",
    type: "leadership",
    role: "Lead Developer & Project Lead",
    organization: "Tech Titans Development Group",
    period: "May 2024 – November 2024",
    current: false,
    bullets: [
      "Led a team of 4 student developers to build full-stack web applications and microservice backends for hackathons.",
      "Established GitHub Actions CI/CD pipelines, automated testing suites, and enforced clean architecture principles.",
      "Mentored junior developers in Git workflows, REST API design, and asynchronous Python programming."
    ],
    tags: ["Team Leadership", "GitHub Actions", "Architecture", "Python", "REST APIs"]
  },
  {
    id: "education",
    type: "education",
    role: "B.Sc. in Computer Science and Engineering",
    organization: "University of Liberal Arts Bangladesh (ULAB)",
    period: "2022 – Expected 2026",
    current: true,
    bullets: [
      "Focusing on Distributed Backend Systems, Database Internals, Artificial Intelligence, and Advanced Algorithms.",
      "Active leader in the ULAB Competitive Programming Club and peer programming mentor for Data Structures."
    ],
    tags: ["Computer Science", "Algorithms", "Distributed Systems", "AI"]
  }
];
