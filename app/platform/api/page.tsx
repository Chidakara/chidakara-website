"use client";

import { useState } from "react";
import { usePlatformStore } from "../../../stores/platformStore";
import { Terminal, Copy, Check, Server, Shield, Send, ArrowRight } from "lucide-react";

export default function ApiExplorerPage() {
  const { addActivity } = usePlatformStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addActivity({ type: "info", message: `Copied API code block to clipboard.` });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/ask",
      description: "Submit a natural language question. Initiates Planner goal decomposition and routes to specialized agents.",
      requestBody: `{
  "query": "Help me prepare for NVIDIA Hackathon.",
  "model": "gemini-2.5-pro",
  "temperature": 0.2
}`,
      responseSchema: `{
  "id": "msg-nvidia-987",
  "role": "assistant",
  "content": "### NVIDIA Hackathon Preparation Guide\\n1. Setup DeepStream SDK...",
  "confidence": 0.95,
  "sources": ["resume_nanda.pdf", "cuda_notes_v12.pdf"],
  "traceId": "trace-nvidia-123"
}`
    },
    {
      method: "POST",
      path: "/upload",
      description: "Upload document files (PDF, TXT, MD, JSON) to the platform temporary directories.",
      requestBody: `[Multipart Form Data]
file: File bytes (binary)
category: "resumes" | "documentation" | "other"`,
      responseSchema: `{
  "id": "doc-nanda-resume-10",
  "name": "resume_nanda.pdf",
  "size": "240 KB",
  "status": "processing",
  "chunkCount": 0
}`
    },
    {
      method: "POST",
      path: "/ingest",
      description: "Ingest and process the uploaded document ID into ChromaDB vector database index collections.",
      requestBody: `{
  "documentId": "doc-nanda-resume-10",
  "chunkSize": 500,
  "overlap": 50
}`,
      responseSchema: `{
  "documentId": "doc-nanda-resume-10",
  "status": "online",
  "chunkCount": 24,
  "embeddingProgress": 100
}`
    },
    {
      method: "GET",
      path: "/trace/latest",
      description: "Retrieve the latest multi-agent execution trace log structure for the Visual Debugger timeline.",
      requestBody: "None",
      responseSchema: `{
  "id": "trace-nvidia-123",
  "query": "Help me prepare for my NVIDIA Hackathon.",
  "status": "completed",
  "totalDurationMs": 1350,
  "parallelSpeedup": "1.62x",
  "nodes": [
    { "id": "t-planner", "name": "Planner", "status": "completed", "durationMs": 120, "logs": [...] },
    { "id": "t-research", "name": "Research", "status": "completed", "durationMs": 320, "logs": [...] }
  ]
}`
    },
    {
      method: "GET",
      path: "/trace/history",
      description: "Fetch historical trace telemetry objects and plan structures.",
      requestBody: "None",
      responseSchema: `[
  {
    "id": "trace-nvidia-123",
    "query": "Help me prepare for my NVIDIA Hackathon.",
    "status": "completed",
    "totalDurationMs": 1350
  }
]`
    },
    {
      method: "GET",
      path: "/telemetry",
      description: "Query system operations stats, query counts, active agents, and memory details.",
      requestBody: "None",
      responseSchema: `{
  "queriesCountToday": 48,
  "avgLatencyMs": 1350,
  "indexedDocuments": 2,
  "memoryUsageMb": 245.5
}`
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] h-[calc(100vh-140px)]">
      
      {/* LEFT COLUMN: API ENDPOINTS DOCUMENTATIONS */}
      <div className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 lg:p-8 backdrop-blur-2xl overflow-y-auto custom-scrollbar shadow-lg">
        <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-8">
          <Terminal className="h-5 w-5 text-blue-400" />
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">Developer REST API Reference</h3>
            <p className="text-xs text-gray-500 mt-0.5">Integrate Chidakara multi-agent operations into your backend client apps.</p>
          </div>
        </div>

        {/* ENDPOINTS CARDS */}
        <div className="space-y-10">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="space-y-4 border-b border-white/5 pb-8 last:border-b-0">
              
              {/* Method and Path */}
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className={`rounded-lg px-3 py-1 font-bold text-white ${
                  ep.method === "POST" ? "bg-blue-600" : "bg-emerald-600"
                }`}>
                  {ep.method}
                </span>
                <span className="text-sm font-semibold text-gray-300">{ep.path}</span>
              </div>

              <p className="text-xs text-gray-400 leading-normal">{ep.description}</p>

              {/* JSON code blocks */}
              <div className="grid gap-4 md:grid-cols-2 mt-4 font-mono text-[10px]">
                
                {/* Request Body */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-1">
                    <span>REQUEST BODY Schema</span>
                    <button
                      onClick={() => handleCopy(`${idx}-req`, ep.requestBody)}
                      className="hover:text-white transition-colors"
                    >
                      {copiedKey === `${idx}-req` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  <pre className="rounded-xl bg-black p-4 text-gray-300 overflow-x-auto custom-scrollbar leading-relaxed">
                    <code>{ep.requestBody}</code>
                  </pre>
                </div>

                {/* Response Body */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-1">
                    <span>RESPONSE SCHEMA payload</span>
                    <button
                      onClick={() => handleCopy(`${idx}-res`, ep.responseSchema)}
                      className="hover:text-white transition-colors"
                    >
                      {copiedKey === `${idx}-res` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  <pre className="rounded-xl bg-black p-4 text-gray-300 overflow-x-auto custom-scrollbar leading-relaxed">
                    <code>{ep.responseSchema}</code>
                  </pre>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: API AUTHORIZATIONS KEYS */}
      <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-6">Authorization Scopes</h4>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-gray-500 font-mono">Platform API Token</p>
              <div className="flex justify-between items-center rounded-xl border border-white/5 bg-black p-3.5 mt-2 font-mono text-[10px] text-gray-300">
                <span className="truncate max-w-[150px]">chidakara_sk_live_2026_xyz</span>
                <button
                  onClick={() => handleCopy("sk-key", "chidakara_sk_live_2026_xyz")}
                  className="text-gray-500 hover:text-white"
                >
                  {copiedKey === "sk-key" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3 text-xs leading-normal">
              <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">Usage Guidelines</h5>
              <p className="text-gray-500">
                To issue requests outside the sandbox, place your security credentials in the HTTP header key payload:
              </p>
              <pre className="rounded-lg bg-black p-3.5 font-mono text-[9px] text-cyan-400">
                Authorization: Bearer sk_live_...
              </pre>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5 mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <Shield className="h-4 w-4 text-gray-600" />
          <span>AES-256 secure requests verified</span>
        </div>
      </div>

    </div>
  );
}
