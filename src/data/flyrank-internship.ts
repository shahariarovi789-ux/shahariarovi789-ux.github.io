export interface Assignment {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}

export const FLYRANK_INTERNSHIP = {
  company: "FlyRank AI",
  role: "Backend AI Engineer — Intern",
  duration: "Jun 2026 — Sep 2026 (Completed)",
  track: "Backend AI Systems & Quota Engineering",
  summary:
    "Architected an enterprise usage metering and quota enforcement engine using FastAPI & PostgreSQL with micro-dollar pricing, exactly-once idempotency, and Stripe webhook synchronization. Developed automated LLM ticket triage services with Pydantic v2 schemas and retry repair loops. Awarded official Certificate of Completion.",
  techStack: [
    "FastAPI",
    "PostgreSQL",
    "Stripe",
    "Docker",
    "Python",
    "Pydantic v2",
    "GitHub Actions CI",
    "Pytest"
  ],
  githubUrl: "https://github.com/shahariarovi789-ux/flyrank-capstone-metering-billing",
  liveDemoUrl: "https://shahariarovi789-ux.github.io/flyrank-capstone-metering-billing/",
  certificateUrl: "/certificates/flyrank-backend-ai-engineering.pdf",
};

export const ASSIGNMENTS: Assignment[] = [
  {
    number: "01",
    title: "Usage Metering & Micro-Dollar Pricing Engine",
    tagline: "Exact integer micro-dollar calculation",
    description:
      "Designed and implemented high-precision multi-tenant usage metering with exact integer micro-dollar arithmetic to eliminate floating-point rounding errors across API token consumption.",
    tags: ["FastAPI", "Python", "Pydantic v2", "Micro-Dollar Pricing"],
  },
  {
    number: "02",
    title: "Stripe Webhook Sync & Idempotent Deduplication",
    tagline: "Exactly-once event processing",
    description:
      "Engineered a resilient Stripe webhook processing pipeline featuring cryptographic signature verification, database transaction isolation, and guaranteed exactly-once idempotency keys.",
    tags: ["Stripe", "Webhooks", "PostgreSQL", "Idempotency"],
  },
  {
    number: "03",
    title: "Automated LLM Ticket Triage & Schema Validation",
    tagline: "Structured AI outputs with repair loops",
    description:
      "Developed automated LLM ticket triage services using strict Pydantic v2 validation schemas and automated retry repair loops to handle edge-case schema deviations gracefully.",
    tags: ["Pydantic v2", "LLMs", "Schema Validation", "Retry Loops"],
  },
  {
    number: "04",
    title: "Automated CI/CD Pipeline & Test Suite",
    tagline: "Containerized testing & deployment",
    description:
      "Configured automated GitHub Actions workflows running complete Pytest test suites across metering, quota enforcement, and webhook synchronization workflows.",
    tags: ["GitHub Actions", "Docker", "Pytest", "CI/CD"],
  },
];

export const CAPSTONE_PROJECT = {
  title: "Usage Metering & Billing Engine — FlyRank Capstone",
  tagline: "Mission-critical metering, subscription quotas, and Stripe webhook sync",
  description:
    "A production-ready usage metering, subscription quota enforcement, AI token pricing, and Stripe webhook synchronization engine. Built with exact integer micro-dollar pricing, guaranteed exactly-once idempotency deduplication, and automated GitHub Actions CI test suites.",
  techStack: [
    "FastAPI",
    "PostgreSQL",
    "Stripe",
    "Docker",
    "Python",
    "Pydantic v2",
    "Pytest",
    "GitHub Actions"
  ],
  githubUrl: "https://github.com/shahariarovi789-ux/flyrank-capstone-metering-billing",
  liveUrl: "https://shahariarovi789-ux.github.io/flyrank-capstone-metering-billing/",
  status: "Completed & Verified",
};
