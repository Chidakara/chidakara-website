"use client";

import { usePlatformStore } from "../../../stores/platformStore";
import { useDocumentStore } from "../../../stores/documentStore";
import { useWorkflowStore } from "../../../stores/workflowStore";
import { useDebuggerStore } from "../../../stores/debuggerStore";
import { useWorkspaceStore } from "../../../stores/workspaceStore";
import {
  FileText,
  Bot,
  Clock,
  Percent,
  Search,
  Brain,
  Network,
  Layers,
  CheckCircle,
  Activity,
  ArrowRight,
  RefreshCw,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { metrics, recentActivity } = usePlatformStore();
  const { documents } = useDocumentStore();
  const { workflows } = useWorkflowStore();
  const { traces } = useDebuggerStore();
  const activeWorkspace = useWorkspaceStore((s) => s.workspaces.find(w => w.id === s.activeWorkspaceId));

  const statCards = [
    { title: "Documents Indexed", value: metrics.documentsIndexed, sub: "Vector search database", icon: FileText, color: "text-blue-400" },
    { title: "Agents Ready", value: "7 / 7", sub: "Agent platform registry", icon: Bot, color: "text-purple-400" },
    { title: "Average Latency", value: `${metrics.avgLatencyMs}ms`, sub: "Execution trace checks", icon: Clock, color: "text-cyan-400" },
    { title: "Overall Confidence", value: `${(metrics.confidenceScore * 100).toFixed(0)}%`, sub: "Hallucination evaluations", icon: Percent, color: "text-emerald-400" },
    { title: "Queries Today", value: metrics.queriesToday, sub: "Ask Assistant queries", icon: Search, color: "text-blue-400" },
    { title: "Memory Usage", value: `${metrics.memoryUsageMb} MB`, sub: "sliding Turned history deque", icon: Brain, color: "text-pink-400" },
    { title: "Graph Nodes", value: metrics.graphNodes, sub: "Extracted entities index", icon: Network, color: "text-yellow-400" },
    { title: "Graph Relations", value: metrics.graphRelations, sub: "Mapped relationship links", icon: Layers, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-950/20 to-transparent border border-white/5 rounded-3xl p-6 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-white">Chidakara Platform OS Console</h2>
          <p className="text-xs text-gray-500 mt-1">
            Active Workspace: <span className="text-blue-400 font-semibold">{activeWorkspace?.name || "Loading..."}</span> — Multi-agent orchestrations, vector chunking, and programmatic trace audit checks.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.03] px-3 py-1 text-[10px] font-mono font-bold text-emerald-400">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM OPERATIONAL
        </span>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/8 bg-white/[0.01] p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.03]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-500 font-bold uppercase tracking-wider">{card.title}</span>
                <Icon className={`h-4.5 w-4.5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold font-mono mt-3 text-white">{card.value}</p>
              <p className="text-[10px] text-gray-500 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* SECONDARY ROW */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        
        {/* LEFT COLUMN: ACTIVE WORKFLOWS & RECENT TRACES */}
        <div className="space-y-6">
          
          {/* Recent Workflows */}
          <div className="rounded-2xl border border-white/8 bg-black/40 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 font-mono">Topological Workflows</h3>
              <Link href="/platform/workflows" className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-mono">
                Manage Workflows
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {workflows.slice(0, 3).map((wf) => (
                <div key={wf.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-gray-200">{wf.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">{wf.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 font-mono">Steps: {wf.steps.length}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold ${
                      wf.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : wf.status === "running"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                        : "bg-gray-800 text-gray-500 border border-white/5"
                    }`}>
                      {wf.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution History Traces */}
          <div className="rounded-2xl border border-white/8 bg-black/40 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 font-mono">Latest Trace Telemetries</h3>
              <Link href="/platform/debugger" className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-mono">
                Inspect Debugger
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {traces.slice(0, 3).map((trace) => (
                <div key={trace.id} className="py-3.5 flex items-center justify-between text-xs font-mono">
                  <div className="max-w-md">
                    <p className="text-gray-300 font-sans font-medium truncate">"{trace.query}"</p>
                    <p className="text-[9px] text-gray-600 mt-1">ID: {trace.id} | Timestamp: {trace.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-[10px] text-gray-500">Duration</p>
                      <p className="text-xs font-bold text-gray-300">{trace.totalDurationMs}ms</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Speedup</p>
                      <p className="text-xs font-bold text-cyan-400">{trace.parallelSpeedup}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: RECENT ACTIVITIES & UPLOADS */}
        <div className="space-y-6">
          
          {/* Recent Activity Logs */}
          <div className="rounded-2xl border border-white/8 bg-black/40 p-6 space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 font-mono flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-blue-400" />
              Activity Console
            </h3>
            
            <div className="space-y-3 font-mono text-[10px] leading-relaxed max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
              {recentActivity.map((log) => (
                <div key={log.id} className="flex gap-2">
                  <span className="text-gray-600">[{log.time}]</span>
                  <span className={
                    log.type === "success"
                      ? "text-emerald-400"
                      : log.type === "warning"
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Uploaded Documents */}
          <div className="rounded-2xl border border-white/8 bg-black/40 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 font-mono flex items-center gap-2">
                <FolderOpen className="h-4.5 w-4.5 text-blue-400" />
                Indexed files
              </h3>
              <Link href="/platform/documents" className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-mono">
                Ingest Files
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500 shrink-0" />
                    <span className="text-gray-300 font-medium truncate max-w-[150px]">{doc.name}</span>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-mono uppercase font-bold ${
                    doc.status === "online"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-blue-500/10 text-blue-400 animate-pulse"
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
