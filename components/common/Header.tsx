"use client";

import { usePathname } from "next/navigation";
import { usePlatformStore } from "../../stores/platformStore";
import { Shield, Settings, Server, RefreshCw } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { metrics } = usePlatformStore();

  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Platform Core";
    const sub = segments[1];
    return sub.charAt(0).toUpperCase() + sub.slice(1).replace("-", " ");
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl px-6 flex items-center justify-between z-40 fixed top-0 right-0 left-0 transition-all duration-300 md:left-20 lg:left-64 pl-24 md:pl-28">
      <div>
        <h1 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-6 text-xs text-gray-400 font-mono">
        {/* API Status */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.01] px-3.5 py-1 text-gray-500">
          <Server className="h-3.5 w-3.5 text-gray-600" />
          <span>API: </span>
          <span className="text-blue-500 font-bold">MOCK_MODE</span>
        </div>

        {/* Latency badge */}
        <div className="hidden md:flex items-center gap-1">
          <span className="text-gray-500">Avg Latency:</span>
          <span className="text-gray-300 font-bold">{metrics.avgLatencyMs}ms</span>
        </div>

        {/* Running Agents badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.03] px-3.5 py-1 text-blue-400">
          <RefreshCw className={`h-3 w-3 ${metrics.agentsRunning > 0 ? "animate-spin text-blue-400" : "text-gray-600"}`} />
          <span>Agents Active: </span>
          <span className="font-bold">{metrics.agentsRunning}</span>
        </div>
      </div>
    </header>
  );
}
