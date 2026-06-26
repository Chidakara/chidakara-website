"use client";

import { usePlatformStore } from "../../../stores/platformStore";
import { useMemoryStore } from "../../../stores/memoryStore";
import { Brain, History, CheckCircle, Database, Server, RefreshCw } from "lucide-react";

export default function MemoryPage() {
  const { metrics } = usePlatformStore();
  const { memories, isLoading, error, clearMemory } = useMemoryStore();

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-[#050505] border border-white/5 rounded-3xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">Conversational Memory Explorer</h2>
          <p className="text-xs text-gray-500 mt-0.5">Thread-safe sliding Turn deque tracking short-term context variables.</p>
        </div>
        <div className="flex items-center gap-3">
          {memories.length > 0 && (
            <button
              onClick={clearMemory}
              className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-3.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-all font-mono font-bold"
            >
              Clear Memory
            </button>
          )}
          <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.03] px-3.5 py-1.5 text-[10px] font-mono font-bold text-blue-400">
            <Brain className="h-3.5 w-3.5" />
            Deque capacity: 10 Turns
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        
        {/* LEFT COLUMN: ACTIVE TURN HISTORY DEQUE */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-6">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 font-mono flex items-center gap-2">
            <History className="h-4.5 w-4.5 text-blue-400" />
            Short-Term Deque History
          </h3>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-xs text-gray-500 py-8 text-center animate-pulse">Loading memory deque logs...</div>
            ) : error ? (
              <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.02] p-5 text-center text-xs space-y-2">
                <p className="text-yellow-500 font-bold">Memory Endpoint Offline</p>
                <p className="text-gray-500">{error}</p>
                <p className="text-gray-600 font-mono text-[10px]">No fake conversational data is rendered.</p>
              </div>
            ) : memories.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-8 text-center text-xs text-gray-500 font-mono">
                No active conversational turns in memory. Ask queries in the Assistant tab to populate this deque.
              </div>
            ) : (
              memories.map((mem, idx) => (
                <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.01] p-5 space-y-3 transition-colors hover:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 border-b border-white/5 pb-2">
                    <span className="text-blue-400 font-bold">{mem.turn}</span>
                    <span>Turn Resolved</span>
                  </div>
                  <p className="text-xs font-semibold text-white">Query: "{mem.user}"</p>
                  <div className="rounded-xl bg-black p-3 text-xs border border-white/5 leading-relaxed text-gray-400 font-mono">
                    <span className="text-[9px] text-cyan-400 block mb-1">CONVERSATIONAL ENTITIES MAP</span>
                    {mem.resolved}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MEMORY STACK INDEX & LONG-TERM PLACEHOLDERS */}
        <div className="space-y-6">
          
          {/* Memory stack variables */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-6">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400 font-mono flex items-center gap-2">
              <Database className="h-4.5 w-4.5 text-blue-400" />
              State variables
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-gray-500">Active User:</span>
                <span className="text-white font-semibold">Nanda Krishna</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-gray-500">Degree Value:</span>
                <span className="text-white font-semibold">B.Tech</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-gray-500">CUDA familiarity:</span>
                <span className="text-emerald-400 font-bold uppercase">Expert</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-gray-500">Target context:</span>
                <span className="text-white font-semibold">NVIDIA Hackathon</span>
              </div>
            </div>
          </div>

          {/* Long Term Memory Coming Soon */}
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 to-black p-8 text-center relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl" />
            
            <RefreshCw className="h-8 w-8 text-gray-500 animate-spin mx-auto mb-4" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Long-Term Memory Synapse</h4>
            <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
              We are building a vector database retrieval agent layer to store cross-session interactions. 
              Subsequent sprints will expose persistent memory databases.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
