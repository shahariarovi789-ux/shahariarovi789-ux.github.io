export interface SkillCategory {
  category: string;
  items: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    items: ["C++", "Python", "SQL", "JavaScript", "Java", "PHP", "Bash"],
  },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "Flask", "RESTful APIs", "Asynchronous Python (asyncio)", "Uvicorn", "API Integration"],
  },
  {
    category: "AI & LLM Systems",
    items: [
      "Model Context Protocol (MCP)",
      "Claude API & Gemini API",
      "Function / Tool Calling",
      "Agentic AI (ReAct)",
      "RAG & Vector Search",
      "PEFT / LoRA Fine-Tuning",
      "Quantization (4-bit NF4)",
      "Prompt Engineering",
    ],
  },
  {
    category: "Data, Vision & Annotation",
    items: [
      "Bounding Box Annotation",
      "PDF Layout Analysis",
      "Dataset Curation & RLHF",
      "Computer Vision (MediaPipe)",
      "WebAssembly",
      "PyTorch & NumPy",
    ],
  },
  {
    category: "Databases & Tools",
    items: ["MySQL", "SQLite", "PostgreSQL", "Git & GitHub Actions", "Docker", "Postman", "Linux / Bash", "Jupyter Notebook", "LaTeX"],
  },
];

export const SKILLS = [
  "FastAPI", "Python", "C++", "Model Context Protocol (MCP)", "LLMs", "RAG & Vector Search",
  "PEFT / LoRA", "Agentic AI", "Bounding Box Annotation", "PDF Layout Analysis",
  "PostgreSQL", "MySQL", "SQLite", "Docker", "Git & GitHub Actions",
  "MediaPipe", "WebAssembly", "NumPy & PyTorch", "REST APIs", "ICPC Regionalist"
];
