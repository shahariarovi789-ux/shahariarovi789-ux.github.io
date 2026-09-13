"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Award, Code2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Experience", href: "/experience", icon: Briefcase },
  { label: "Projects", href: "/projects", icon: Code2 },
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "Contact", href: "/contact", icon: Mail },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-colors",
                isActive ? "text-blue-400 font-semibold" : "text-muted hover:text-white"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-blue-400 drop-shadow-[0_0_8px_#3b82f6]")} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
