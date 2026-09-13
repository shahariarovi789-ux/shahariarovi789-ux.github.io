export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
}

export const STATS: StatItem[] = [
  { label: "ICPC Dhaka Regionalist", value: "2×", subtext: "2023 & 2024 Contestant" },
  { label: "Verified Credentials", value: "25+", subtext: "Anthropic, FlyRank, Hugging Face, NASA" },
  { label: "Annotated Documents", value: "1,000+", subtext: "Spatial Bounding-Box Labeling" },
  { label: "LLM Prompts Evaluated", value: "10,000+", subtext: "Model Alignment & Validation" },
];
