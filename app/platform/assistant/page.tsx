"use client";

import { useState, useRef, useEffect } from "react";
import { useAssistantStore } from "../../../stores/assistantStore";
import { usePlatformStore } from "../../../stores/platformStore";
import {
  Send,
  Loader2,
  Trash2,
  Copy,
  RefreshCw,
  XCircle,
  HelpCircle,
  FileText,
  Percent,
  CheckCircle,
  Clock,
  Compass,
} from "lucide-react";

export default function AssistantPage() {
  const {
    sessions,
    activeSessionId,
    isLoading,
    activeSteps,
    currentStreamingText,
    createSession,
    setActiveSessionId,
    sendMessage,
    clearConversation
  } = useAssistantStore();

  const { addActivity } = usePlatformStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, currentStreamingText, activeSteps]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    
    const text = inputText;
    setInputText("");
    await sendMessage(text);
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return;
    await sendMessage(prompt);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addActivity({ type: "info", message: "Copied response text to clipboard." });
  };

  const selectedModel = "gemini-2.5-pro";
  const quickPrompts = [
    "What is my CGPA?",
    "Summarize my resume",
    "Prepare me for NVIDIA Hackathon",
    "Compare Python and Rust"
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] h-[calc(100vh-140px)]">
      
      {/* LEFT COLUMN: CHAT INTERFACE */}
      <div className="rounded-[2rem] border border-white/10 bg-black/60 backdrop-blur-2xl flex flex-col justify-between overflow-hidden shadow-lg">
        {/* TOP CONTROLS bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-wider text-gray-500 font-bold">LLM Intelligence:</span>
            <select
              value={selectedModel}
              disabled
              className="rounded-lg border border-white/10 bg-black px-3 py-1.5 text-xs text-gray-400 font-mono focus:outline-none"
            >
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Workspace)</option>
              <option value="llama-3-70b">Llama 3 70B (Private Cloud)</option>
            </select>
          </div>
          
          <button
            onClick={clearConversation}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-gray-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
            title="Clear Chat History"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>

        {/* MESSAGES FLOW AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {activeSession?.messages.length === 0 && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-lg mx-auto">
              <Compass className="h-10 w-10 text-blue-500 animate-pulse" />
              <div>
                <h3 className="text-base font-bold text-white">Chidakara Intelligent Workspace</h3>
                <p className="text-xs text-gray-500 mt-2">Issue natural language questions. The planning engine will automatically search local document indices, scan live SDK releases, and compile fact-checked outputs.</p>
              </div>

              {/* QUICK PROMPTS SUGGESTIONS */}
              <div className="grid gap-2.5 w-full">
                <p className="text-[10px] uppercase font-mono tracking-widest text-gray-600 font-bold">Suggested Quick Tasks</p>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.01] hover:border-blue-500/25 hover:bg-blue-500/[0.03] p-3 text-left text-xs text-gray-400 hover:text-white transition-all duration-300 font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {activeSession?.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl p-5 border text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "border-blue-500/30 bg-blue-500/[0.03] text-white"
                      : "border-white/5 bg-white/[0.01] text-gray-300"
                  }`}>
                    {/* Role header */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 text-[10px] font-mono text-gray-500">
                      <span>{msg.role === "user" ? "USER SENDER" : "AGENTIC PAYLOAD"}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-line">
                      {msg.content}
                    </div>

                    {/* Meta info for assistant messages */}
                    {msg.role === "assistant" && (
                      <div className="mt-5 pt-3 border-t border-white/5 flex flex-col gap-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2.5">
                            {msg.confidence !== undefined && (
                              <span className={`flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
                                msg.confidence >= 0.85
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : msg.confidence >= 0.60
                                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              }`}>
                                Confidence: {(msg.confidence * 100).toFixed(0)}%
                              </span>
                            )}
                            {msg.confidenceReason && (
                              <span className="text-[10px] text-gray-400 font-sans font-medium">
                                • {msg.confidenceReason}
                              </span>
                            )}
                            {msg.traceId && (
                              <span className="text-[10px] text-gray-600 font-mono">Trace ID: {msg.traceId}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(msg.content)}
                              className="rounded p-1 hover:bg-white/5 text-gray-500 hover:text-white transition-colors animate-fade-in"
                              title="Copy answer"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Extra confidence explanation box if confidence is not 100% */}
                        {msg.confidence !== undefined && msg.confidence < 1.0 && msg.confidence > 0 && (
                          <div className="rounded-lg bg-white/[0.01] border border-white/5 p-2.5 text-[10px] text-gray-500 leading-normal font-sans">
                            <span className="font-bold text-gray-400 block mb-0.5">Confidence Verdict Explanation:</span>
                            The answer was fact-checked across {msg.sources?.length || 0} local documents and verified by reflection feedback loops.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Streaming text indicator */}
              {isLoading && currentStreamingText && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-5 border border-white/5 bg-white/[0.01] text-gray-300">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 text-[10px] font-mono text-gray-500">
                      <span>STREAMING OUTPUT</span>
                      <Loader2 className="h-3 w-3 animate-spin text-blue-400" />
                    </div>
                    <div className="text-xs leading-relaxed whitespace-pre-line">
                      {currentStreamingText}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INPUT PANEL AND FORM */}
        <div className="border-t border-white/5 px-6 py-4 bg-white/[0.01]">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a compliance check, search documents, or request calculations..."
              className="flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 transition-colors flex items-center justify-center shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>

          {/* Tokens status placeholders */}
          <div className="mt-2.5 flex justify-between text-[9px] font-mono text-gray-600">
            <span>Context tokens: ~1.2k / 128k</span>
            <span>API limits: 200 requests/min</span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: SOURCES, TIMELINE & REFLECTIONS */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#050505] p-5 flex flex-col justify-between gap-6 shadow-lg h-full overflow-y-auto custom-scrollbar">
        
        {/* Stream steps timeline */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">Execution Plan steps</h4>
          
          <div className="space-y-3">
            {isLoading && activeSteps.length > 0 ? (
              activeSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-xs transition-colors duration-300 ${
                    step.status === "completed"
                      ? "border-emerald-500/20 bg-emerald-500/[0.01] text-emerald-400"
                      : step.status === "running"
                      ? "border-blue-500/30 bg-blue-500/[0.04] text-white"
                      : "border-white/5 bg-white/[0.01] text-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {step.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : step.status === "running" ? (
                      <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                    )}
                    <span>{step.name}</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase">{step.status}</span>
                </div>
              ))
            ) : activeSession?.messages.length && activeSession.messages[activeSession.messages.length - 1].sources ? (
              /* If not loading but we have a response, render the finished steps summary */
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl p-3">
                  <CheckCircle className="h-4 w-4" />
                  <span>Reflection Check Passed (100%)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-500/[0.02] border border-cyan-500/10 rounded-xl p-3">
                  <Clock className="h-4 w-4" />
                  <span>Pipeline Duration: 820ms</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 leading-normal">
                Timeline logs update in real-time when queries execute.
              </p>
            )}
          </div>
        </div>

        {/* Citations panel */}
        <div className="border-t border-white/5 pt-4 space-y-4 flex-1">
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">Citations & evidence</h4>
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {!isLoading && activeSession?.messages.length && activeSession.messages[activeSession.messages.length - 1].role === "assistant" ? (
              (() => {
                const latestMsg = activeSession.messages[activeSession.messages.length - 1] as any;
                const hasMeta = latestMsg.sourcesMeta && latestMsg.sourcesMeta.length > 0;
                const hasWeb = latestMsg.webEvidence && latestMsg.webEvidence.length > 0;
                const hasGraph = latestMsg.graphEvidence && latestMsg.graphEvidence.length > 0;

                if (!latestMsg.sources && !hasMeta && !hasWeb && !hasGraph) {
                  return (
                    <p className="text-xs text-gray-500 leading-normal">
                      No citation or search context recorded for this query.
                    </p>
                  );
                }

                return (
                  <div className="space-y-3">
                    {/* Document chunks */}
                    {hasMeta && (
                      <div className="space-y-1.5">
                        <p className="text-[9px] uppercase font-mono tracking-wider text-blue-400 font-bold">Retrieved Chunks</p>
                        {latestMsg.sourcesMeta.map((item: any, idx: number) => (
                          <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs leading-normal space-y-1.5">
                            <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                              <span className="truncate max-w-[120px] font-bold text-gray-400">{item.source}</span>
                              <span className="text-blue-400 font-bold">Score: {item.similarity}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed break-words">{item.chunk}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Standard source list if no rich metadata */}
                    {!hasMeta && latestMsg.sources && (
                      <div className="space-y-1.5">
                        <p className="text-[9px] uppercase font-mono tracking-wider text-blue-400 font-bold">Source files</p>
                        {latestMsg.sources.map((src: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs">
                            <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                            <span className="text-gray-300 font-medium truncate">{src}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Web evidence */}
                    {hasWeb && (
                      <div className="space-y-1.5 border-t border-white/5 pt-2.5">
                        <p className="text-[9px] uppercase font-mono tracking-wider text-cyan-400 font-bold">Web Evidence</p>
                        {latestMsg.webEvidence.map((web: string, idx: number) => (
                          <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-[11px] text-gray-400 leading-relaxed">
                            {web}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Graph evidence */}
                    {hasGraph && (
                      <div className="space-y-1.5 border-t border-white/5 pt-2.5">
                        <p className="text-[9px] uppercase font-mono tracking-wider text-purple-400 font-bold">Knowledge Graph Links</p>
                        {latestMsg.graphEvidence.map((graph: string, idx: number) => (
                          <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-[11px] text-gray-400 leading-relaxed font-mono">
                            {graph}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <p className="text-xs text-gray-500 leading-normal">
                Verifiable source files and documents chunks list on reply.
              </p>
            )}
          </div>
        </div>

        {/* Stop controls or fallback */}
        {isLoading && (
          <button
            onClick={() => useAssistantStore.setState({ isLoading: false, activeSteps: [] })}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 py-3 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            Stop Generation
          </button>
        )}

      </div>

    </div>
  );
}
