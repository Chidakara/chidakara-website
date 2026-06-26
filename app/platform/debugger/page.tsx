"use client";

import { useEffect, useState } from "react";
import { useDebuggerStore } from "../../../stores/debuggerStore";
import { usePlatformStore } from "../../../stores/platformStore";
import {
  Terminal as TermIcon,
  Play,
  Loader2,
  Clock,
  Percent,
  CheckCircle,
  Eye,
  Activity,
  ChevronRight,
  Database,
  Globe,
  Layers,
} from "lucide-react";

export default function DebuggerPage() {
  const {
    traces,
    selectedTrace,
    activeTraceNode,
    isLoading,
    loadTraces,
    setSelectedTraceById,
    setActiveTraceNode,
    runMockTraceExecution
  } = useDebuggerStore();

  const { addActivity } = usePlatformStore();
  const [customQuery, setCustomQuery] = useState("Help me prepare for my NVIDIA Hackathon.");

  useEffect(() => {
    loadTraces();
  }, []);

  const handleRunExecution = async () => {
    if (isLoading) return;
    addActivity({ type: "info", message: "Starting visual trace debugger execution." });
    await runMockTraceExecution(customQuery);
    addActivity({ type: "success", message: "Trace debugger execution completed." });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr_340px] h-[calc(100vh-140px)]">
      
      {/* COLUMN 1: TRACES HISTORY LIST */}
      <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">Execution Traces</h4>
          
          <div className="space-y-2.5">
            {traces.map((trace) => {
              const isSelected = selectedTrace?.id === trace.id;
              return (
                <div
                  key={trace.id}
                  onClick={() => setSelectedTraceById(trace.id)}
                  className={`rounded-2xl border p-4 cursor-pointer text-left transition-all duration-300 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/[0.03] text-white shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                      : "border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/15"
                  }`}
                >
                  <p className="text-xs font-semibold truncate">"{trace.query}"</p>
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-3">
                    <span>{trace.totalDurationMs}ms</span>
                    <span className="text-cyan-400 font-bold">{trace.parallelSpeedup}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 mt-6 text-[9px] text-gray-600 font-mono">
          <span>* Integrates with GET /trace/history *</span>
        </div>
      </div>

      {/* COLUMN 2: TOPOLOGICAL TIMELINE AND TRIGGER CONTROLS */}
      <div className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 backdrop-blur-2xl flex flex-col justify-between overflow-hidden shadow-lg h-full">
        {/* TOP CONTROLS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
          <div className="flex-1 w-full">
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Enter debug target query..."
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleRunExecution}
            disabled={isLoading || !customQuery.trim()}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 transition-colors shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start Simulation
              </>
            )}
          </button>
        </div>

        {/* NODES VISUALIZATION STAGE */}
        <div className="flex-1 relative overflow-y-auto custom-scrollbar flex items-center justify-center p-6">
          {selectedTrace ? (
            <div className="w-full max-w-sm flex flex-col items-center gap-6 text-xs font-mono">
              
              {/* Planner Node */}
              {selectedTrace.nodes.slice(0, 1).map((node) => (
                <div
                  key={node.id}
                  onClick={() => setActiveTraceNode(node)}
                  className={`w-full rounded-2xl border px-5 py-3 cursor-pointer text-left transition-all duration-300 ${
                    activeTraceNode?.id === node.id
                      ? "border-blue-500 bg-blue-500/[0.05] text-white shadow-[0_0_15px_rgba(37,99,235,0.15)] active-node-pulse"
                      : node.status === "completed"
                      ? "border-emerald-500/20 bg-emerald-500/[0.01] text-emerald-400"
                      : node.status === "running"
                      ? "border-blue-500/30 bg-blue-500/[0.05] text-white animate-pulse"
                      : "border-white/5 bg-white/[0.01] text-gray-500"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{node.name}</span>
                    <span className="text-[10px] text-gray-500">{node.durationMs}ms</span>
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1 font-mono">{node.agentName}</p>
                </div>
              ))}

              <span className="text-gray-600 font-sans">↓</span>

              {/* Parallel Stage Nodes Row */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {selectedTrace.nodes.slice(1, 3).map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setActiveTraceNode(node)}
                    className={`rounded-2xl border px-4 py-3.5 cursor-pointer text-left transition-all duration-300 ${
                      activeTraceNode?.id === node.id
                        ? "border-blue-500 bg-blue-500/[0.05] text-white shadow-[0_0_15px_rgba(37,99,235,0.15)] active-node-pulse"
                        : node.status === "completed"
                        ? "border-emerald-500/20 bg-emerald-500/[0.01] text-emerald-400"
                        : node.status === "running"
                        ? "border-blue-500/30 bg-blue-500/[0.05] text-white animate-pulse"
                        : "border-white/5 bg-white/[0.01] text-gray-500"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{node.name}</span>
                      <span className="text-[9px] text-gray-500">{node.durationMs}ms</span>
                    </div>
                    <p className="text-[8px] text-gray-500 mt-1 font-mono truncate">{node.agentName}</p>
                  </div>
                ))}
              </div>

              <span className="text-gray-600 font-sans">↓</span>

              {/* Reflection Node */}
              {selectedTrace.nodes.slice(3, 4).map((node) => (
                <div
                  key={node.id}
                  onClick={() => setActiveTraceNode(node)}
                  className={`w-full rounded-2xl border px-5 py-3 cursor-pointer text-left transition-all duration-300 ${
                    activeTraceNode?.id === node.id
                      ? "border-blue-500 bg-blue-500/[0.05] text-white shadow-[0_0_15px_rgba(37,99,235,0.15)] active-node-pulse"
                      : node.status === "completed"
                      ? "border-emerald-500/20 bg-emerald-500/[0.01] text-emerald-400"
                      : node.status === "running"
                      ? "border-blue-500/30 bg-blue-500/[0.05] text-white animate-pulse"
                      : "border-white/5 bg-white/[0.01] text-gray-500"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{node.name}</span>
                    <span className="text-[10px] text-gray-500">{node.durationMs}ms</span>
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1 font-mono">{node.agentName}</p>
                </div>
              ))}

              <span className="text-gray-600 font-sans">↓</span>

              {/* Critic Node */}
              {selectedTrace.nodes.slice(4, 5).map((node) => (
                <div
                  key={node.id}
                  onClick={() => setActiveTraceNode(node)}
                  className={`w-full rounded-2xl border px-5 py-3 cursor-pointer text-left transition-all duration-300 ${
                    activeTraceNode?.id === node.id
                      ? "border-blue-500 bg-blue-500/[0.05] text-white shadow-[0_0_15px_rgba(37,99,235,0.15)] active-node-pulse"
                      : node.status === "completed"
                      ? "border-emerald-500/20 bg-emerald-500/[0.01] text-emerald-400"
                      : node.status === "running"
                      ? "border-blue-500/30 bg-blue-500/[0.05] text-white animate-pulse"
                      : "border-white/5 bg-white/[0.01] text-gray-500"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{node.name}</span>
                    <span className="text-[10px] text-gray-500">{node.durationMs}ms</span>
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1 font-mono">{node.agentName}</p>
                </div>
              ))}

            </div>
          ) : (
            <p className="text-xs text-gray-500">Prerendering traces logs view pending...</p>
          )}
        </div>

        <div className="border-t border-white/5 pt-4 text-[10px] text-gray-500 font-mono flex justify-between">
          <span>Concurrency speedup: {selectedTrace?.parallelSpeedup}</span>
          <span>Wall clock: {selectedTrace?.totalDurationMs}ms</span>
        </div>
      </div>

      {/* COLUMN 3: NODE INSPECTOR PANELS */}
      <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-6">Trace Node Inspector</h4>
          
          {activeTraceNode ? (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-500 font-mono">Agent Name</p>
                <p className="text-sm font-semibold text-white mt-1 break-all">{activeTraceNode.agentName}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-mono">Telemetry Stats</p>
                <div className="flex justify-between text-xs text-gray-300 mt-1.5 font-mono">
                  <span>Latency:</span>
                  <span className="font-bold">{activeTraceNode.durationMs}ms</span>
                </div>
                <div className="flex justify-between text-xs text-gray-300 mt-1 font-mono">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-bold uppercase">{activeTraceNode.status}</span>
                </div>
              </div>

              {/* RENDER DYNAMIC RESULTS DETAILS */}
              {activeTraceNode.retrievedChunks && (
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <p className="text-[10px] text-gray-500 font-mono">Retrieved Chunks</p>
                  {activeTraceNode.retrievedChunks.map((ch, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs leading-relaxed text-gray-400">
                      <Database className="h-4 w-4 text-blue-400 mb-1" />
                      {ch}
                    </div>
                  ))}
                </div>
              )}

              {activeTraceNode.webResults && (
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <p className="text-[10px] text-gray-500 font-mono">Web Scrapes</p>
                  {activeTraceNode.webResults.map((web, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs leading-relaxed text-gray-400">
                      <Globe className="h-4 w-4 text-blue-400 mb-1" />
                      {web}
                    </div>
                  ))}
                </div>
              )}

              {activeTraceNode.reflectionOutput && (
                <div className="border-t border-white/5 pt-4 space-y-1.5">
                  <p className="text-[10px] text-gray-500 font-mono">Reflection Verification Report</p>
                  <p className="text-xs text-yellow-400 font-semibold font-mono bg-yellow-500/[0.02] border border-yellow-500/10 rounded-xl p-3">
                    {activeTraceNode.reflectionOutput}
                  </p>
                </div>
              )}

              {/* Terminal Logs */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-[10px] text-gray-500 font-mono block mb-2.5">Agent Console Logs</p>
                <div className="rounded-xl bg-black p-3.5 font-mono text-[10px] text-gray-300 leading-normal max-h-[140px] overflow-y-auto custom-scrollbar">
                  {activeTraceNode.logs.map((log, idx) => (
                    <p key={idx} className="text-gray-400">{log}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 leading-normal">
              Click on a workflow timeline node to audit its latency details, web results, RAG contexts, and local terminal console logs.
            </p>
          )}
        </div>

        <div className="border-t border-white/5 pt-5 mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <TermIcon className="h-4 w-4 text-gray-600 animate-pulse" />
          <span>Streams directly from GET /trace/latest</span>
        </div>
      </div>

    </div>
  );
}
