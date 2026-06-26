"use client";

import { useEffect, useState } from "react";
import { useDecisionStore } from "../../../stores/decisionStore";
import {
  Compass,
  AlertTriangle,
  CheckCircle,
  Play,
  TrendingUp,
  Server,
  Activity,
  FileText,
  Layers,
  ArrowRight,
  ShieldAlert,
  Percent,
  Clock,
  Briefcase,
  Users,
  Copy,
  DollarSign,
  HelpCircle,
  Target
} from "lucide-react";

export default function DecisionCenterPage() {
  const {
    templates,
    selectedTemplateId,
    weights,
    activeAnalysis,
    activeComparison,
    activeReport,
    history,
    isLoading,
    loadTemplatesAndHistory,
    setSelectedTemplateId,
    setWeights,
    runAnalysis
  } = useDecisionStore();

  const [activeTab, setActiveTab] = useState<"analysis" | "risks" | "comparison" | "report">("analysis");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadTemplatesAndHistory();
    // Default initial run on mount
    runAnalysis("upgrade_software");
  }, []);

  const handleWeightChange = (criteria: string, val: number) => {
    setWeights({ [criteria]: val });
  };

  const executeAnalysis = () => {
    runAnalysis(selectedTemplateId);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(activeReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 5x5 Risk Grid helper
  const getRiskCellColor = (prob: number, imp: number) => {
    const score = prob * imp;
    if (score >= 15) return "bg-rose-500/25 border-rose-500 text-rose-400";
    if (score >= 8) return "bg-amber-500/20 border-amber-500 text-amber-400";
    return "bg-emerald-500/10 border-emerald-500 text-emerald-400";
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-mono flex items-center gap-2">
            <Compass className="h-5 w-5 text-blue-500" />
            Decision Intelligence Center
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Evaluate corporate actions, compare operational postures, and output actionable executive roadmaps.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        
        {/* LEFT COLUMN: CONTROL PANEL & HISTORY */}
        <div className="space-y-6">
          {/* CONTROL PARAMETERS CARD */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-white">
              Analysis Configuration
            </h3>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Proposed Decision</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-3 py-2.5 text-xs text-gray-300 focus:outline-none"
              >
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Weights sliders */}
            <div className="space-y-3.5 border-t border-white/5 pt-4">
              <p className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold">Criteria Weighting</p>
              
              {Object.entries(weights).map(([criteria, weight]) => (
                <div key={criteria} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono uppercase">
                    <span className="text-gray-400">{criteria.replace("_", " ")}</span>
                    <span className="text-blue-400 font-semibold">{Math.round(weight * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weight}
                    onChange={(e) => handleWeightChange(criteria, parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={executeAnalysis}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Play className="h-4 w-4" />
              Evaluate Pathway
            </button>
          </div>

          {/* SIMULATION HISTORY CARD */}
          <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-500">
              Evaluation History
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {history.map((h, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedTemplateId(h.decision_type);
                    runAnalysis(h.decision_type);
                  }}
                  className="rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 p-3 text-left cursor-pointer transition-all space-y-1 font-mono text-[9px]"
                >
                  <div className="flex justify-between font-bold text-gray-300">
                    <span className="truncate max-w-[120px]">{h.decision_type.replace("_", " ")}</span>
                    <span className="text-blue-400">{(h.confidence * 100).toFixed(0)}% Conf</span>
                  </div>
                  <p className="text-gray-500 truncate">{h.recommended_option}</p>
                </div>
              ))}
              {history.length === 0 && (
                <p className="text-[10px] text-gray-600 font-mono text-center py-4">No logged runs in this session.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CORE DASHBOARD TABS */}
        <div className="space-y-6">
          {/* TABS HEADER */}
          <div className="flex border-b border-white/5 gap-1 select-none overflow-x-auto custom-scrollbar">
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "analysis"
                  ? "border-blue-500 text-blue-400 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              Option Analysis
            </button>
            <button
              onClick={() => setActiveTab("risks")}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "risks"
                  ? "border-blue-500 text-blue-400 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              Risk Matrix
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "comparison"
                  ? "border-blue-500 text-blue-400 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              Strategy Comparison
            </button>
            <button
              onClick={() => setActiveTab("report")}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "report"
                  ? "border-blue-500 text-blue-400 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              Executive Report
            </button>
          </div>

          {/* RENDERING VIEWS */}

          {/* TAB 1: OPTION ANALYSIS */}
          {activeTab === "analysis" && activeAnalysis && (
            <div className="space-y-6">
              {/* PRIMARY PATHWAY CARD */}
              <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/15 to-transparent p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded bg-blue-500/10 border border-blue-500/25 px-2.5 py-0.5 text-[9px] font-mono text-blue-400 uppercase font-bold tracking-wider">
                    Recommended Pathway
                  </span>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
                    <Percent className="h-4 w-4 text-emerald-400" />
                    Confidence Rating: <span className="text-emerald-400 font-bold">{Math.round(activeAnalysis.confidence * 100)}%</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white leading-tight">{activeAnalysis.recommended_option}</h3>
                <p className="text-xs text-gray-400 leading-normal max-w-3xl">{activeAnalysis.problem_statement}</p>
                <p className="text-xs text-emerald-400/90 font-mono mt-1 flex items-center gap-1">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  {activeAnalysis.estimated_impact}
                </p>
              </div>

              {/* CONTEXT AND EVIDENCE GRIDS */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    Decision Context
                  </h4>
                  <p className="text-xs text-gray-300 leading-normal">{activeAnalysis.context}</p>

                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gray-500 font-bold">Affected Areas</span>
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px]">
                      {activeAnalysis.affected_projects.map(p => (
                        <span key={p} className="rounded-lg border border-white/5 bg-white/[0.01] px-2.5 py-1 text-gray-400">{p}</span>
                      ))}
                      {activeAnalysis.affected_teams.map(t => (
                        <span key={t} className="rounded-lg border border-white/5 bg-white/[0.01] px-2.5 py-1 text-gray-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-500" />
                    Supporting Evidence
                  </h4>
                  <div className="space-y-2.5">
                    {activeAnalysis.evidence.map((ev, idx) => (
                      <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.01] p-3 text-xs flex gap-2.5 items-start">
                        <CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-300 leading-normal">{ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ROADMAP ACTION PLAN */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  Proposed Implementation Roadmap
                </h4>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/5 text-gray-500">
                        <th className="pb-3">Task Name</th>
                        <th className="pb-3">Owner</th>
                        <th className="pb-3">Timeline</th>
                        <th className="pb-3">KPI Indicator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {activeAnalysis.action_plan.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-3 font-sans font-medium text-white">{item.task}</td>
                          <td className="py-3 text-gray-400">{item.owner}</td>
                          <td className="py-3 text-blue-400 font-semibold">{item.timeline}</td>
                          <td className="py-3 text-emerald-400 font-semibold">{item.kpi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RISK MATRIX */}
          {activeTab === "risks" && activeAnalysis && (
            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
              {/* 5X5 HEATMAP */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-rose-500" />
                    Operational Risk Heatmap (5x5)
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1">Cross-references risk impact levels against event probabilities.</p>
                </div>

                <div className="grid grid-cols-[30px_1fr] gap-2 items-center">
                  {/* Y Axis Label (Impact) */}
                  <div className="text-[9px] uppercase font-mono tracking-widest text-gray-500 transform -rotate-90 origin-center text-center w-36 -translate-x-12 select-none font-bold">
                    Impact ➔
                  </div>

                  {/* Grid cells */}
                  <div className="grid grid-cols-5 gap-2.5 font-mono text-xs">
                    {[5, 4, 3, 2, 1].map(y => (
                      <div key={y} className="contents">
                        {[1, 2, 3, 4, 5].map(x => {
                          // Find risks landing in this cell
                          const cellRisks = activeAnalysis.risks.filter(r => r.probability === x && r.impact === y);
                          const isOccupied = cellRisks.length > 0;
                          
                          return (
                            <div
                              key={`${x}-${y}`}
                              className={`h-16 rounded-xl border flex flex-col items-center justify-center transition-all ${
                                isOccupied
                                  ? getRiskCellColor(x, y) + " border-2 scale-102 font-bold shadow-lg"
                                  : "border-white/5 bg-white/[0.01] text-gray-600"
                              }`}
                              title={isOccupied ? cellRisks.map(r => r.name).join(", ") : `P:${x}, I:${y}`}
                            >
                              {isOccupied ? (
                                <span className="text-[10px] animate-pulse">
                                  {cellRisks.length > 1 ? `${cellRisks.length} Risks` : "ALERT"}
                                </span>
                              ) : (
                                <span className="text-[8px] opacity-40">{x},{y}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* X Axis Label */}
                <div className="text-[9px] uppercase font-mono tracking-widest text-gray-500 text-center select-none font-bold ml-10">
                  Probability (Likelihood) ➔
                </div>
              </div>

              {/* RISK DETAIL CARDS */}
              <div className="space-y-4 h-[440px] overflow-y-auto custom-scrollbar pr-1">
                {activeAnalysis.risks.map((risk, i) => (
                  <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold font-sans">{risk.name}</span>
                      <span className="text-[10px] text-rose-400 font-mono font-semibold">
                        Rating: {risk.probability * risk.impact}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-normal">{risk.description}</p>
                    <div className="rounded-lg bg-rose-500/[0.03] border border-rose-500/10 p-2.5 text-[10px] text-rose-300 font-mono">
                      <span className="font-bold uppercase tracking-wider block text-[8px] text-rose-400">Mitigation Policy</span>
                      {risk.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STRATEGY COMPARISON */}
          {activeTab === "comparison" && activeComparison && (
            <div className="space-y-6">
              {/* MAX UTILITY SUMMARY CARD */}
              <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.02] p-6 space-y-3">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider inline-block">
                  Optimal Strategic Profile Recommendation
                </span>
                <p className="text-xs text-gray-300 leading-normal">{activeComparison.recommended_strategy_explanation}</p>
              </div>

              {/* COMPARISONS GRID */}
              <div className="grid gap-4 md:grid-cols-5">
                {Object.entries(activeComparison.comparisons).map(([name, detail]) => {
                  const isOptimal = activeComparison.recommended_strategy_profile === name;
                  return (
                    <div
                      key={name}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                        isOptimal
                          ? "border-emerald-500/30 bg-emerald-500/[0.01] shadow-emerald-500/[0.02]"
                          : "border-white/5 bg-white/[0.01]"
                      }`}
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-white truncate font-mono">{name}</h4>
                          <p className="text-[9px] text-gray-500 mt-1 leading-snug">
                            {activeComparison.summaries[name]}
                          </p>
                        </div>

                        {/* WEIGHTS MATRIX MINI GRIDS */}
                        <div className="space-y-2 border-t border-white/5 pt-3">
                          <p className="text-[8px] font-mono uppercase tracking-widest text-gray-500 font-bold">Policy Weightings</p>
                          <div className="space-y-1 font-mono text-[8px] text-gray-400">
                            {Object.entries(detail.weights).slice(0, 3).map(([criteria, w]) => (
                              <div key={criteria} className="flex justify-between">
                                <span className="truncate max-w-[50px]">{criteria}</span>
                                <span>{Math.round(w * 100)}%</span>
                              </div>
                            ))}
                            <span className="text-[7px] text-gray-500 block text-right font-bold">* View more... *</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-3.5 mt-4 text-center">
                        <p className="text-[10px] font-mono text-gray-500">MCDA utility score</p>
                        <p className={`text-xl font-bold font-mono mt-1 ${isOptimal ? "text-emerald-400" : "text-white"}`}>
                          {detail.aggregate_score} pts
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: EXECUTIVE REPORT */}
          {activeTab === "report" && activeReport && (
            <div className="rounded-3xl border border-white/10 bg-[#050505] p-6 backdrop-blur-2xl shadow-lg relative space-y-6">
              {/* TOP CONTROLS */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-white flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-blue-500" />
                  Print-Ready Executive Summary
                </h4>

                <button
                  onClick={copyReport}
                  className="rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20 px-3.5 py-2 text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy Markdown"}
                </button>
              </div>

              {/* REPORT DISPLAY FRAME */}
              <div className="rounded-xl border border-white/5 bg-black/40 p-6 max-h-[420px] overflow-y-auto custom-scrollbar font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                {activeReport}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
