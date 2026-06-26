import { TraceRepository, BackendTrace } from "../repositories/trace.repository";
import { useWorkspaceStore } from "../stores/workspaceStore";

export interface TraceNode {
  id: string;
  name: string;
  agentName: string;
  status: "pending" | "running" | "completed" | "failed";
  durationMs: number;
  confidence?: number;
  retrievedChunks?: string[];
  webResults?: string[];
  logs: string[];
  graphMetrics?: string;
  webMetrics?: string;
  reflectionOutput?: string;
}

export interface ExecutionTrace {
  id: string;
  workspaceId?: string;
  query: string;
  status: "running" | "completed" | "failed";
  totalDurationMs: number;
  parallelSpeedup: string;
  nodes: TraceNode[];
  timestamp: string;
  confidenceScore?: number;
  confidenceReason?: string;
  reflection?: any;
}

export class TraceService {
  private static localMockTraces: ExecutionTrace[] = [
    {
      id: "trace-nvidia-123",
      workspaceId: "workspace-nvidia",
      query: "Help me prepare for my NVIDIA Hackathon.",
      status: "completed",
      totalDurationMs: 1350,
      parallelSpeedup: "75% efficiency",
      timestamp: "2026-06-25 12:01 PM",
      nodes: [
        {
          id: "t-planner",
          name: "Planner",
          agentName: "Planner Engine",
          status: "completed",
          durationMs: 120,
          logs: [
            "[PLANNER] Decomposing 'NVIDIA Hackathon' query into subtasks.",
            "[PLANNER] Dependency sorted: research -> web -> reflection -> critic."
          ],
          confidence: 0.99
        },
        {
          id: "t-research",
          name: "Research",
          agentName: "Research Agent",
          status: "completed",
          durationMs: 320,
          retrievedChunks: [
            "resume_nanda.pdf: Nanda is a C++/CUDA programmer with PyTorch experience.",
            "cuda_docs.pdf: CUDA 12.8 release offers unified memory models optimization."
          ],
          logs: [
            "[RESEARCH] Scanning database collections.",
            "[RESEARCH] Chunk extracted: Skill lists mapping."
          ],
          graphMetrics: "density: 0.85, entities: 14"
        },
        {
          id: "t-web",
          name: "Web Search",
          agentName: "Web Agent",
          status: "completed",
          durationMs: 520,
          webResults: [
            "NVIDIA developer forum: DeepStream SDK v7.0 released in May 2026.",
            "NVIDIA release notes: DeepStream 7.0 requires GStreamer bindings."
          ],
          logs: [
            "[WEB] Fetching live release info on DuckDuckGo API.",
            "[WEB] Found DeepStream SDK release parameters."
          ],
          webMetrics: "rate limits: 8/10, status: ok"
        },
        {
          id: "t-reflect",
          name: "Reflection",
          agentName: "Reflection Agent",
          status: "completed",
          durationMs: 250,
          logs: [
            "[REFLECTION] Verification loop: Comparing draft vs retrieved chunk references.",
            "[REFLECTION] Hallucinations validation checking complete. Pass."
          ],
          reflectionOutput: "Factual check passes. Contradictions: 0, Answered: True"
        },
        {
          id: "t-critic",
          name: "Critic Editor",
          agentName: "Critic Agent",
          status: "completed",
          durationMs: 110,
          logs: [
            "[CRITIC] Structuring roadmap markdown headings.",
            "[CRITIC] Editorial formatting audit completed."
          ]
        }
      ]
    },
    {
      id: "trace-acme-123",
      workspaceId: "workspace-acme",
      query: "Check telemetry system parameters.",
      status: "completed",
      totalDurationMs: 1250,
      parallelSpeedup: "68% efficiency",
      timestamp: "2026-06-25 10:31 AM",
      nodes: [
        {
          id: "t-planner",
          name: "Planner",
          agentName: "Planner Engine",
          status: "completed",
          durationMs: 100,
          logs: ["[PLANNER] Task parser match: 'telemetry_scan'"],
          confidence: 0.98
        },
        {
          id: "t-research",
          name: "Research",
          agentName: "Research Agent",
          status: "completed",
          durationMs: 400,
          retrievedChunks: ["telemetry_specs.pdf: Memory consumption thresholds mapped."],
          logs: ["[RESEARCH] Accessing indices."],
          graphMetrics: "density: 0.74, entities: 8"
        },
        {
          id: "t-web",
          name: "Web Search",
          agentName: "Web Agent",
          status: "completed",
          durationMs: 350,
          webResults: [],
          logs: ["[WEB] Telemetry bounds checking bypassed."],
          webMetrics: "Status: ok"
        },
        {
          id: "t-reflect",
          name: "Reflection",
          agentName: "Reflection Agent",
          status: "completed",
          durationMs: 200,
          logs: ["[REFLECTION] Bounds validation pass."],
          reflectionOutput: "Factual check passes."
        },
        {
          id: "t-critic",
          name: "Critic Editor",
          agentName: "Critic Agent",
          status: "completed",
          durationMs: 200,
          logs: ["[CRITIC] Formatted logs."]
        }
      ]
    },
    {
      id: "trace-sri-123",
      workspaceId: "workspace-sri",
      query: "Check supply chain compliance logs.",
      status: "completed",
      totalDurationMs: 950,
      parallelSpeedup: "80% efficiency",
      timestamp: "2026-06-25 11:16 AM",
      nodes: [
        {
          id: "t-planner",
          name: "Planner",
          agentName: "Planner Engine",
          status: "completed",
          durationMs: 80,
          logs: ["[PLANNER] Task parsed: compliance checking."],
          confidence: 0.95
        },
        {
          id: "t-research",
          name: "Research",
          agentName: "Research Agent",
          status: "completed",
          durationMs: 300,
          retrievedChunks: ["logistics_report.pdf: Shipments schedules check."],
          logs: ["[RESEARCH] Hit logs collections."],
          graphMetrics: "density: 0.52, entities: 6"
        },
        {
          id: "t-web",
          name: "Web Search",
          agentName: "Web Agent",
          status: "completed",
          durationMs: 250,
          logs: ["[WEB] Checked external shipments directories."],
          webMetrics: "Status: ok"
        },
        {
          id: "t-reflect",
          name: "Reflection",
          agentName: "Reflection Agent",
          status: "completed",
          durationMs: 200,
          logs: ["[REFLECTION] Checked compliance bounds."],
          reflectionOutput: "Factual check passes."
        },
        {
          id: "t-critic",
          name: "Critic Editor",
          agentName: "Critic Agent",
          status: "completed",
          durationMs: 120,
          logs: ["[CRITIC] Editorial pass complete."]
        }
      ]
    }
  ];

  static mapBackendTrace(bt: BackendTrace): ExecutionTrace {
    const nodes: TraceNode[] = (bt.steps || []).map((step) => {
      const logs: string[] = [
        `[${step.step_id.toUpperCase()}] Initiating execution...`,
        `[${step.step_id.toUpperCase()}] Input: ${step.input_summary || "None"}`,
      ];
      if (step.output_summary) {
        logs.push(`[${step.step_id.toUpperCase()}] Output: ${step.output_summary}`);
      }
      if (step.error) {
        logs.push(`[ERROR] ${step.error}`);
      }

      const meta = step.debug_metadata || {};
      let retrievedChunks: string[] | undefined = undefined;
      let webResults: string[] | undefined = undefined;
      let graphMetrics: string | undefined = undefined;
      let webMetrics: string | undefined = undefined;
      let reflectionOutput: string | undefined = undefined;

      if (step.step_id === "research") {
        if (meta.retrieved_chunks) {
          retrievedChunks = meta.retrieved_chunks.map((chunk: string, idx: number) => {
            const score = meta.similarity_scores?.[idx];
            const pdf = meta.pdf_names?.[idx] || "document.pdf";
            return `${pdf} (Similarity: ${(score !== undefined ? (1 - score).toFixed(2) : "0.80")}): ${chunk}`;
          });
        }
      }

      if (step.step_id === "web") {
        if (meta.web_summary) {
          webResults = [meta.web_summary];
        }
        webMetrics = `Status: ${meta.status || "ok"}`;
      }

      if (step.step_id === "graph") {
        graphMetrics = `Nodes created: ${meta.nodes_created || 0}, Edges: ${meta.edges_created || 0}`;
      }

      if (step.step_id === "reflection") {
        reflectionOutput = `Answered: ${meta.answered ? "Yes" : "No"}, Hallucination Detected: ${meta.hallucination_detected ? "Yes" : "No"}`;
      }

      return {
        id: step.step_id,
        name: step.step_id.charAt(0).toUpperCase() + step.step_id.slice(1),
        agentName: step.agent_name,
        status: step.status,
        durationMs: Math.round(step.duration_ms),
        confidence: step.step_id === "planner" ? 0.99 : undefined,
        retrievedChunks,
        webResults,
        logs,
        graphMetrics,
        webMetrics,
        reflectionOutput,
      };
    });

    const speedup = bt.parallel_metrics?.parallel_efficiency
      ? `${(bt.parallel_metrics.parallel_efficiency * 100).toFixed(0)}% efficiency`
      : "1.00x";

    return {
      id: bt.trace_id,
      workspaceId: bt.workspaceId || useWorkspaceStore.getState().activeWorkspaceId || "workspace-nvidia",
      query: bt.question,
      status: bt.success ? "completed" : "failed",
      totalDurationMs: Math.round(bt.total_duration_ms),
      parallelSpeedup: speedup,
      nodes,
      timestamp: new Date(bt.timestamp).toLocaleString(),
      confidenceScore: bt.confidence_score,
      confidenceReason: bt.confidence_reason,
      reflection: bt.reflection,
    };
  }

  static async getTracesHistory(): Promise<ExecutionTrace[]> {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    let list: ExecutionTrace[] = [];

    try {
      const history = await TraceRepository.getTraceHistory();
      list = history.map(t => this.mapBackendTrace(t));
    } catch (e) {
      // Backend off
    }

    // Add local mock fallbacks
    const mocks = this.localMockTraces;
    const combined = [...list, ...mocks];
    
    // Filter by active workspace
    return combined.filter(t => t.workspaceId === activeWsId);
  }

  static async getTraceById(id: string): Promise<ExecutionTrace | null> {
    try {
      const bt = await TraceRepository.getTraceById(id);
      return this.mapBackendTrace(bt);
    } catch (e) {
      const fallback = this.localMockTraces.find(t => t.id === id);
      return fallback || null;
    }
  }

  static async getLatestTrace(): Promise<ExecutionTrace | null> {
    const history = await this.getTracesHistory();
    return history[0] || null;
  }
}
export type { BackendTrace };
