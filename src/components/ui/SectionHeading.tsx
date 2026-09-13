import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight sm:text-5xl text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-muted text-base sm:text-lg">{description}</p>
      )}
    </div>
  );
}
