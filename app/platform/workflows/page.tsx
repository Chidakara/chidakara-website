"use client";

import { useState } from "react";
import { useWorkflowStore } from "../../../stores/workflowStore";
import { usePlatformStore } from "../../../stores/platformStore";
import {
  Play,
  Copy,
  Trash2,
  Plus,
  Workflow as WorkIcon,
  CheckCircle,
  Loader2,
  Info,
  Clock,
  Zap,
} from "lucide-react";

export default function WorkflowsPage() {
  const {
    workflows,
    isLoading,
    activeExecWorkflowId,
    activeExecSteps,
    createWorkflow,
    duplicateWorkflow,
    deleteWorkflow,
    executeWorkflow
  } = useWorkflowStore();

  const { addActivity } = usePlatformStore();
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("wf-1");

  // Create workflow modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [selectedSteps, setSelectedSteps] = useState<string[]>([
    "Planner", "Research", "Knowledge", "Reflection", "Critic"
  ]);

  const activeWorkflow = workflows.find(w => w.id === selectedWorkflowId) || workflows[0];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    await createWorkflow(newName, newDesc, selectedSteps);
    addActivity({ type: "success", message: `Created new workflow: ${newName}` });
    
    // reset form
    setNewName("");
    setNewDesc("");
    setShowCreateModal(false);
  };

  const handleDuplicate = async (id: string) => {
    await duplicateWorkflow(id);
    addActivity({ type: "info", message: "Duplicated workflow template configuration." });
  };

  const handleDelete = async (id: string) => {
    await deleteWorkflow(id);
    addActivity({ type: "warning", message: "Deleted workflow template." });
    if (selectedWorkflowId === id) {
      setSelectedWorkflowId("wf-1");
    }
  };

  const handleExecute = async (id: string) => {
    addActivity({ type: "info", message: "Initiating multi-agent parallel scheduler execution." });
    await executeWorkflow(id);
    addActivity({ type: "success", message: "Workflow DAG execution completed successfully." });
  };

  const handleStepCheckbox = (stepName: string) => {
    if (selectedSteps.includes(stepName)) {
      if (selectedSteps.length > 2) {
        setSelectedSteps(selectedSteps.filter(s => s !== stepName));
      }
    } else {
      setSelectedSteps([...selectedSteps, stepName]);
    }
  };

  const availableAgentSteps = ["Planner", "Research", "Web", "Graph", "Knowledge", "Reflection", "Critic", "Memory"];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      
      {/* LEFT COLUMN: WORKFLOWS LIST & CONTROLS */}
      <div className="space-y-6">
        
        {/* ACTION HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#050505] border border-white/5 rounded-3xl p-6">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">Workflow DAG Orchestrator</h2>
            <p className="text-xs text-gray-500 mt-0.5">Topological stage coordinators sorting agent runs concurrency.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase hover:bg-blue-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create workflow
          </button>
        </div>

        {/* WORKFLOWS TEMPLATE LIST */}
        <div className="space-y-3">
          {workflows.map((wf) => {
            const isSelected = selectedWorkflowId === wf.id;
            const isRunning = activeExecWorkflowId === wf.id;
            return (
              <div
                key={wf.id}
                onClick={() => setSelectedWorkflowId(wf.id)}
                className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/[0.03] shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                    : "border-white/5 bg-white/[0.01] hover:border-white/15"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs uppercase font-mono tracking-wider text-gray-500 font-bold">Template ID: {wf.id}</h3>
                    <h4 className="text-sm font-semibold text-white mt-1">{wf.name}</h4>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{wf.description}</p>
                    <div className="flex gap-1.5 mt-3">
                      {wf.steps.map((st, i) => (
                        <span key={i} className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[9px] font-mono text-gray-500">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => handleExecute(wf.id)}
                      disabled={isLoading || isRunning}
                      className="flex items-center gap-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 px-4 py-2 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-60"
                    >
                      {isRunning ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Running
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" />
                          Execute
                        </>
                      )}
                    </button>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleDuplicate(wf.id)}
                        className="rounded p-2 border border-white/5 bg-white/[0.01] hover:bg-white/5 text-gray-400"
                        title="Duplicate Template"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(wf.id)}
                        className="rounded p-2 border border-white/5 bg-white/[0.01] hover:bg-rose-500/10 text-gray-500 hover:text-rose-400"
                        title="Delete Template"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* RIGHT COLUMN: VISUAL DAG RUNNER PIPELINE */}
      <div className="rounded-[2.5rem] border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-6">Pipeline Topologies Visualizer</h4>
          
          {activeWorkflow ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">{activeWorkflow.name}</h3>
                <p className="text-[10px] text-gray-500 font-mono mt-1">Status: {activeWorkflow.status}</p>
              </div>

              {/* Render Vertical DAG Connecting Line & Nodes */}
              <div className="relative pl-6 space-y-4">
                {/* Connecting dash line */}
                <div className="absolute top-3 bottom-3 left-9 w-0.5 border-l border-dashed border-gray-800 pointer-events-none" />

                {activeWorkflow.steps.map((step, idx) => {
                  const isRunning = activeExecWorkflowId === activeWorkflow.id;
                  const stepStatus = isRunning ? activeExecSteps[step] : (activeWorkflow.status === "completed" ? "completed" : "pending");

                  return (
                    <div key={idx} className="flex items-center gap-4 relative">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all z-10 ${
                        stepStatus === "completed"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                          : stepStatus === "running"
                          ? "border-blue-500/30 bg-blue-500/15 text-blue-400 animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                          : "border-white/5 bg-black text-gray-500"
                      }`}>
                        {idx + 1}
                      </div>

                      <div className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                        stepStatus === "completed"
                          ? "border-emerald-500/20 bg-emerald-500/[0.01] text-emerald-400"
                          : stepStatus === "running"
                          ? "border-blue-500/20 bg-blue-500/[0.05] text-white"
                          : "border-white/5 bg-white/[0.01] text-gray-500"
                      }`}>
                        {step} Agent
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500">Select a template schema to visualize execution lines.</p>
          )}
        </div>

        <div className="border-t border-white/5 pt-5 mt-6 flex flex-col gap-2.5 text-[10px] text-gray-500 font-mono">
          <div className="flex justify-between">
            <span>Execution Speedup:</span>
            <span className="text-cyan-400 font-bold">1.62x Speedup</span>
          </div>
          <div className="flex justify-between">
            <span>Concurrency Lock:</span>
            <span className="text-gray-400">ThreadSafeDict verified</span>
          </div>
        </div>
      </div>

      {/* CREATE WORKFLOW MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2.5rem] border border-white/10 bg-[#050505] p-6 lg:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Create New Workflow DAG</h3>
              <p className="text-xs text-gray-500 mt-1">Specify template name and agent execution stack.</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">Workflow Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sales Pipeline Audit"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summarize target pipeline goals..."
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold block">Agent Stack Selection</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {availableAgentSteps.map((step) => {
                    const isChecked = selectedSteps.includes(step);
                    return (
                      <label key={step} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.01] p-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleStepCheckbox(step)}
                          className="rounded border-white/10 bg-black text-blue-600 focus:ring-0"
                        />
                        <span className="text-gray-300">{step}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-xs font-bold uppercase hover:bg-blue-500 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
