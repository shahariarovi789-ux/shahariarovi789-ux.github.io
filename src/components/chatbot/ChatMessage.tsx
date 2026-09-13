import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-md",
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white/10 text-blue-400 border border-blue-500/30"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed",
          isUser
            ? "bg-blue-600 text-white rounded-tr-xs"
            : "bg-surface border border-white/10 text-white/90 rounded-tl-xs"
        )}
      >
        <p className="whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}
