// ============================================================================
//  ✏️  EDIT THIS FILE — all your portfolio content lives here.
//  Pre-filled from your CV. Only TODO left: your GitHub username (+ optional Kaggle).
// ============================================================================

export const profile = {
  name: "Shahariar Asfaq Ovi",
  // Short headline / kicker shown above your name in the hero
  headline: "AI Enthusiast · Competitive Programmer · CSE Undergrad",
  // Stacked role list shown on the right of the hero
  roles: ["Artificial Intelligence", "Large Language Models", "Machine Learning", "Competitive Programming"],
  // Short 1–2 sentence line for the HERO
  heroIntro:
    "CSE undergrad at ULAB, AI enthusiast & 2× ICPC Dhaka Regionalist — now a Backend AI Engineer Intern at FlyRank AI, building with Python, ML & LLMs.",
  // Fuller elevator pitch (shown in the About section)
  about:
    "I'm a Computer Science & Engineering undergrad at the University of Liberal Arts Bangladesh, " +
    "passionate about Artificial Intelligence and competitive programming. A two-time ICPC Dhaka Regionalist, " +
    "I've spent the last three years sharpening my problem-solving in C++, and now work hands-on " +
    "with Python, machine learning, and LLMs. Currently a Backend AI Engineer Intern at FlyRank AI, " +
    "I love turning technology into real-world impact.",
  location: "Dhaka, Bangladesh",
  email: "shahariar.ovi789@gmail.com",
  phone: "+880 1837737947",
  resumeUrl: "/resume.pdf",                  // your CV is copied here automatically

  socials: {
    github: "https://github.com/shahariarovi789-ux",
    linkedin: "https://linkedin.com/in/only-ovi",
    kaggle: "",                                         // optional
    twitter: "",                                        // optional
  },
}

export const skills = [
  {
    group: "Languages",
    items: ["C++", "Python", "Java", "JavaScript", "PHP"],
  },
  {
    group: "AI / ML",
    items: ["Large Language Models", "Machine Learning", "Supervised & Unsupervised Learning", "Agentic AI"],
  },
  {
    group: "Web & Databases",
    items: ["HTML", "CSS", "MySQL"],
  },
  {
    group: "Tools",
    items: ["Jupyter Notebook", "LaTeX", "Git", "Google Workspace"],
  },
]

// Real, verifiable wins from your CV. ICPC results lead.
export const achievements = [
  { title: "ICPC Dhaka Regionalist", org: "ICPC Dhaka Regional Contest", year: "2024" },
  { title: "ICPC Dhaka Regionalist", org: "ICPC Dhaka Regional Contest", year: "2023" },
  { title: "2nd Runners-up", org: "Take-off Programming Contest · ULAB CPC", year: "2023" },
  { title: "Certificate of Appreciation", org: "Take-off Programming Contest · ULAB CPC", year: "2022" },
  { title: "Participant", org: "IUT 11th National ICT Fest", year: "2024" },
]

export const certifications = [
  { title: "Foundations of Agentic AI", org: "Hugging Face", year: "2025" },
  { title: "Unsupervised Learning, Recommenders & Reinforcement Learning", org: "Coursera", year: "2025" },
  { title: "Advanced Learning Algorithms", org: "Coursera", year: "2024" },
  { title: "Supervised Machine Learning: Regression & Classification", org: "Coursera", year: "2024" },
  { title: "Android App Development", org: "Creative IT Institute", year: "2021" },
]

export const education = [
  {
    school: "University of Liberal Arts Bangladesh (ULAB)",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "Jan 2022 — Present",
    detail: "Final semester · CGPA 3.10. Focus: Artificial Intelligence, Algorithms & competitive programming.",
  },
]

// Experience timeline (most recent first). AI / tech roles lead.
export const experience = [
  {
    role: "Backend AI Engineer — Intern",
    org: "FlyRank AI",
    url: "https://flyrank.ai/",
    period: "Jun 2026 — Present · Remote",
    detail: "Building backend systems for FlyRank AI — \"the autopilot for organic growth.\"",
  },
  {
    role: "AI Data Trainer",
    org: "GenMorphics AI Solution",
    period: "Jan 2025 — Nov 2025",
    detail: "Trained and refined AI/LLM models through high-quality data annotation and evaluation.",
  },
  {
    role: "Organizing Secretary",
    org: "ULAB Computer Programming Club",
    period: "Jan 2024 — Jan 2025",
    detail: "Led the club — organized programming contests, training sessions, and events for the CP community.",
  },
  {
    role: "Marketing Manager",
    org: "OnBajar",
    period: "Dec 2021 — Dec 2024",
    detail: "Led the marketing team, driving brand growth and campaigns.",
  },
  {
    role: "Marketing Contributor",
    org: "10 Minute School",
    period: "Oct 2021 — May 2022",
    detail: "Managed Facebook pages — content writing, posting, and planning.",
  },
]

// No code projects on the CV yet. Add your GitHub repos here (or send me your
// GitHub username and I'll fill them in). The Projects section shows only when
// this list is non-empty.
export const projects = [
  {
    title: "Orion — Multi-Agent Corrective RAG (CRAG)",
    description:
      "An advanced multi-agent research coordinator that retrieves local documents, grades relevance, falls back to DuckDuckGo web searches when internal document knowledge is insufficient, and executes self-corrective critique loops to eliminate hallucinations.",
    tags: ["Python", "Google Gemini API", "Streamlit", "Multi-Agent", "Vector Search"],
    repo: "https://github.com/shahariarovi789-ux/orion-agent-rag",
    featured: true,
  },
  {
    title: "AeroDraw — Edge AI Gesture Controller",
    description:
      "A local, privacy-first computer vision web application that translates hand movements into screen vectors and system cursor clicks. Parses hand landmarks fully client-side via WebAssembly-based MediaPipe tracking, allowing users to draw in the air and control browser interfaces with smooth pinch clicks.",
    tags: ["React", "Vite", "Tailwind CSS v4", "MediaPipe", "WebAssembly"],
    repo: "https://github.com/shahariarovi789-ux/gesture-control",
    featured: true,
  },
  {
    title: "OmegaNet — Neural Framework from Scratch",
    description:
      "A modular, object-oriented deep learning framework built in Python using only NumPy. Implements forward/backward passes, dense layers with parameter tracking, dropout regularization, activation derivatives (ReLU, Sigmoid, Softmax), losses, and a hand-coded Adam optimizer to train on non-linear spiral/MNIST data.",
    tags: ["Python", "NumPy", "Deep Learning", "Algorithms"],
    repo: "https://github.com/shahariarovi789-ux/omeganet",
    featured: true,
  },
  {
    title: "Agentic AI Toolkit",
    description:
      "A framework-free ReAct agent that reasons step by step and uses tools (calculator, file readers, word counter, clock) to solve tasks — powered by a local LLM via Ollama, with no API keys. Built with pure Python standard library so the whole agent loop is transparent.",
    tags: ["Python", "LLM", "AI Agents", "WebLLM"],
    repo: "https://github.com/shahariarovi789-ux/agentic-ai-toolkit",
    demo: "https://shahariarovi789-ux.github.io/agentic-ai-toolkit/",
    featured: true,
  },
  {
    title: "Pidoc — Hospital Management System",
    description:
      "A dynamic, full-portal healthcare management web application bridging patients, doctors, and administrators. Built with a PHP backend and MySQL database, it features secure registrations, duplicate email checks, auto-incrementing key session tracking, digital prescriptions, and automated PDF billing. Styled with a premium dark-themed glassmorphism interface.",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript", "UI/UX"],
    repo: "https://github.com/shahariarovi789-ux/hospital-management-system",
    featured: true,
  },
]
