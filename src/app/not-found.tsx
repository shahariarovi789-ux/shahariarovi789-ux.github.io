import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 relative">
      <div className="max-w-xl w-full text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs font-mono text-blue-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          HTTP 404 — PAGE NOT FOUND
        </div>

        <h1 className="text-7xl sm:text-9xl font-heading font-extrabold tracking-tight text-white mb-4">
          4<span className="text-blue-500">0</span>4
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-slate-300 mb-4">
          Signal lost in deep space.
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">
          The requested coordinate does not exist in the routing mesh or has been relocated to another subsystem.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/25"
          >
            <Home className="w-4 h-4" />
            Back to Base Orbit
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-blue-500/40 bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white text-sm font-medium transition-all"
          >
            <Compass className="w-4 h-4" />
            Explore Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
