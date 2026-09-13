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
  url?: string;
  caseStudyUrl?: string;
  certificateUrl?: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "flyrank",
    type: "work",
    role: "Backend AI Engineer — Intern",
    organization: "FlyRank AI",
    period: "Jun 2026 — Sep 2026",
    current: false,
    bullets: [
      "Completed intensive backend AI engineering internship, architecting an enterprise usage metering and quota enforcement engine using FastAPI & PostgreSQL.",
      "Implemented exact integer micro-dollar pricing, guaranteed exactly-once idempotency deduplication, and automated Stripe webhook synchronization.",
      "Developed automated LLM ticket triage services with Pydantic v2 schemas and retry repair loops.",
      "Awarded official FlyRank Certificates of Completion in Backend AI Engineering and AI Fluency."
    ],
    tags: ["FastAPI", "PostgreSQL", "Stripe", "Docker", "Python", "Pydantic v2"],
    url: "https://flyrank.ai/",
    caseStudyUrl: "/projects/flyrank-backend-internship",
    certificateUrl: "/certificates/flyrank-backend-ai-engineering.pdf",
  },
  {
    id: "genmorphic",
    type: "work",
    role: "AI Data Trainer",
    organization: "GenMorphics AI Solution",
    period: "Jan 2025 — Nov 2025",
    current: false,
    bullets: [
      "Annotated and structured 1,000+ complex PDF documents using spatial bounding-box labeling for document intelligence models.",
      "Evaluated 10,000+ LLM prompt-response pairs for alignment, safety, and quality validation.",
      "Collaborated with data science teams to optimize training set consistency and layout parsing pipelines."
    ],
    tags: ["Bounding Box Annotation", "PDF Layout Analysis", "RLHF", "Data Alignment", "LLM Evaluation"]
  },
  {
    id: "ulab-cpc",
    type: "leadership",
    role: "Organizing Secretary",
    organization: "ULAB Computer Programming Club",
    period: "Jan 2024 — Jan 2025",
    current: false,
    bullets: [
      "Led club technical operations — organized competitive programming contests, workshops, and mentoring seminars for 150+ student members.",
      "Conducted problem-solving training sessions focusing on foundational data structures, graph theory, and algorithmic complexity."
    ],
    tags: ["Leadership", "Competitive Programming", "C++", "Mentoring", "Event Organization"]
  },
  {
    id: "onbajar",
    type: "work",
    role: "Marketing Manager",
    organization: "OnBajar",
    period: "Dec 2021 — Dec 2024",
    current: false,
    bullets: [
      "Led the marketing team, driving brand growth and targeted promotional campaigns across digital channels.",
      "Analyzed campaign performance metrics, conversion funnels, and customer acquisition strategies."
    ],
    tags: ["Team Leadership", "Digital Marketing", "Analytics", "Brand Growth"]
  },
  {
    id: "ten-minute-school",
    type: "work",
    role: "Marketing Contributor",
    organization: "10 Minute School",
    period: "Oct 2021 — May 2022",
    current: false,
    bullets: [
      "Managed social channels — content creation, posting schedules, and educational campaign planning.",
      "Engaged student communities and promoted ed-tech learning initiatives."
    ],
    tags: ["Content Strategy", "Social Media", "Community Outreach"]
  },
  {
    id: "education-ulab",
    type: "education",
    role: "B.Sc. in Computer Science & Engineering",
    organization: "University of Liberal Arts Bangladesh (ULAB)",
    period: "Jan 2022 — Present",
    current: true,
    bullets: [
      "Final semester · CGPA: 3.10 / 4.00.",
      "Focus: Artificial Intelligence, Backend AI Systems & Algorithms.",
      "Selected for final year university capstone project with ROAR adaptive AI tutoring system."
    ],
    tags: ["Computer Science", "Artificial Intelligence", "Algorithms", "Backend Systems"]
  }
];

export const ACHIEVEMENTS = [
  { title: "ICPC Dhaka Regionalist", org: "ICPC Dhaka Regional Contest", year: "2024" },
  { title: "ICPC Dhaka Regionalist", org: "ICPC Dhaka Regional Contest", year: "2023" },
  { title: "2nd Runners-up", org: "Take-off Programming Contest · ULAB CPC", year: "2023" },
  { title: "Certificate of Appreciation", org: "Take-off Programming Contest · ULAB CPC", year: "2022" },
  { title: "Participant", org: "IUT 11th National ICT Fest", year: "2024" },
];
