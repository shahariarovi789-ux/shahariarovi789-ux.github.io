import { EXPERIENCE, ACHIEVEMENTS } from "./experience";
import { PROJECTS } from "./projects";
import { CERTIFICATES } from "./certificates";
import { SITE } from "./site";
import { FLYRANK_INTERNSHIP, ASSIGNMENTS } from "./flyrank-internship";

export function buildChatbotContext(): string {
  const experienceText = EXPERIENCE.map(
    (e) =>
      `- ${e.role} at ${e.organization} (${e.period}${e.current ? ", current" : ""}): ${e.bullets.join(" ")}`
  ).join("\n");

  const projectsText = PROJECTS.map(
    (p) =>
      `- ${p.title}: ${p.description} Tech: ${p.tech.join(", ")}. GitHub: ${p.githubUrl}`
  ).join("\n");

  const certificatesText = CERTIFICATES.map(
    (c) => `- ${c.title} (${c.issuer}, ${c.date})`
  ).join("\n");

  const assignmentsText = ASSIGNMENTS.map(
    (a) => `  ${a.number}. ${a.title} — ${a.description}`
  ).join("\n");

  const achievementsText = ACHIEVEMENTS.map(
    (a) => `- ${a.title} (${a.org}, ${a.year})`
  ).join("\n");

  return `
You are the interactive AI assistant embedded in ${SITE.name}'s portfolio website. You answer questions about ${SITE.name}'s background, backend AI engineering experience, competitive programming achievements, and shipped projects accurately, concisely, and warmly.

## About ${SITE.name}
${SITE.name} is a Computer Science & Engineering undergrad at ULAB, 2× ICPC Dhaka Regionalist (2023, 2024), and Backend AI Engineer Intern (completed) at FlyRank AI. He specializes in Python, FastAPI, Model Context Protocol (MCP), LLMs, PEFT/LoRA fine-tuning, and Agentic AI workflows.

## Work Experience & Leadership
${experienceText}

## Completed Capstone — FlyRank AI Usage Metering & Billing Engine
${FLYRANK_INTERNSHIP.summary}
Role: ${FLYRANK_INTERNSHIP.role}. Duration: ${FLYRANK_INTERNSHIP.duration}.
Tech stack: ${FLYRANK_INTERNSHIP.techStack.join(", ")}.
Key Milestones:
${assignmentsText}

## Competitive Programming & Honors
${achievementsText}

## Shipped Projects
${projectsText}

## Verified Certifications (28 Total)
${certificatesText}

## Contact & Links
Email: ${SITE.email}
Phone / WhatsApp: ${SITE.phone}
GitHub: ${SITE.githubUrl}
LinkedIn: ${SITE.linkedinUrl}
Location: ${SITE.location}

## Guidelines
- Keep responses sharp, conversational, and direct (2-4 sentences typically).
- Refer to ${SITE.name} in the third person ("Shahariar has...", "He built...").
- Only state verified, factual achievements and project details.
`.trim();
}
