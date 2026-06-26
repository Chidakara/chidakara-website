import { AssistantRepository, AssistantResponse } from "../repositories/assistant.repository";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  confidence?: number;
  confidenceReason?: string;
  sources?: string[];
  sourcesMeta?: any[];
  webEvidence?: string[];
  graphEvidence?: string[];
  traceId?: string;
  isStreaming?: boolean;
}

export interface AssistantSession {
  id: string;
  workspaceId?: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export class AssistantService {
  private static mockSessions: AssistantSession[] = [
    {
      id: "session-nvidia-1",
      workspaceId: "workspace-nvidia",
      title: "NVIDIA Hackathon Prep",
      messages: [
        { id: "m1", role: "user", content: "How do I prepare for NVIDIA Hackathon?", timestamp: "12:00 PM" },
        {
          id: "m2",
          role: "assistant",
          content: "### NVIDIA Hackathon Preparation Guide\n1. **Align with CUDA Standards**: Make sure to check GPU capabilities and compile variables.\n2. **Review GStreamer**: Learn DeepStream SDK pipelines and element layouts.\n3. **Docker Config**: Use the standard NVIDIA containers to setup workspace environments.",
          timestamp: "12:01 PM",
          confidence: 0.95,
          confidenceReason: "Factual check passes. Contradictions: 0, Answered: True",
          sources: ["resume_nanda.pdf", "cuda_reference_v12.pdf"],
          traceId: "trace-nvidia-123"
        }
      ],
      createdAt: "2026-06-25T12:00:00.000Z"
    },
    {
      id: "session-acme-1",
      workspaceId: "workspace-acme",
      title: "Preventive Telemetry Scanners",
      messages: [
        { id: "am1", role: "user", content: "Check telemetry system parameters.", timestamp: "10:30 AM" },
        {
          id: "am2",
          role: "assistant",
          content: "Telemetry scan complete. Memory consumption stable at 124MB. Density metrics resolved at 0.85.",
          timestamp: "10:31 AM",
          confidence: 0.94,
          confidenceReason: "Factual check pass.",
          sources: ["telemetry_specs.pdf"],
          traceId: "trace-acme-123"
        }
      ],
      createdAt: "2026-06-25T10:30:00.000Z"
    },
    {
      id: "session-sri-1",
      workspaceId: "workspace-sri",
      title: "Logistics Audit",
      messages: [
        { id: "sm1", role: "user", content: "Check supply chain compliance logs.", timestamp: "11:15 AM" },
        {
          id: "sm2",
          role: "assistant",
          content: "All logistics audits conform to standards. No warnings found in shipment schedules.",
          timestamp: "11:16 AM",
          confidence: 0.88,
          confidenceReason: "Factual check pass.",
          sources: ["logistics_report.pdf"],
          traceId: "trace-sri-123"
        }
      ],
      createdAt: "2026-06-25T11:15:00.000Z"
    }
  ];

  static async getSessions(): Promise<AssistantSession[]> {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chidakara_sessions");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return [...this.mockSessions];
  }

  static async saveSessions(sessions: AssistantSession[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_sessions", JSON.stringify(sessions));
    }
  }

  static async createSession(title: string, workspaceId: string): Promise<AssistantSession> {
    const newSession: AssistantSession = {
      id: `session-${Date.now()}`,
      workspaceId,
      title,
      messages: [],
      createdAt: new Date().toISOString()
    };
    const sessions = await this.getSessions();
    sessions.unshift(newSession);
    await this.saveSessions(sessions);
    return newSession;
  }

  static async streamResponse(
    messageText: string,
    onStepChange: (stepName: string, stepStatus: "running" | "completed", logs: string[]) => void,
    onTextChunk: (chunk: string) => void
  ): Promise<Message> {
    // Trigger real backend API
    const response: AssistantResponse = await AssistantRepository.ask(messageText);

    // Extract trace steps from live backend response
    const traceSteps = response.execution_trace || [];

    // Simulate dynamic step updates
    for (let i = 0; i < traceSteps.length; i++) {
      const step = traceSteps[i];
      const stepName = step.agent || step.agent_name || `${(step.step || 'agent').toUpperCase()} Agent`;
      const logs = [
        `[${(step.step || 'agent').toUpperCase()}] Input Summary: ${step.input_summary || 'No input details'}`,
        `[${(step.step || 'agent').toUpperCase()}] Output Summary: ${step.output_summary || 'No output details'}`
      ];
      if (step.error) {
        logs.push(`[ERROR] ${step.error}`);
      }

      onStepChange(stepName, "running", logs);
      await new Promise(r => setTimeout(r, 450));
      onStepChange(stepName, "completed", logs);
    }

    // Stream text response chunks
    const responseText = response.answer || "No response received from the model.";
    const words = responseText.split(" ");
    let currentText = "";
    for (const word of words) {
      currentText += word + " ";
      onTextChunk(currentText);
      await new Promise(r => setTimeout(r, 10));
    }

    // Extract citation names
    const sourcesList: string[] = [];
    if (response.sources && Array.isArray(response.sources)) {
      response.sources.forEach(src => {
        if (src && typeof src === "object") {
          const sourceFile = src.source || src.filename;
          if (sourceFile) {
            const basename = sourceFile.split(/[/\\]/).pop();
            if (basename && !sourcesList.includes(basename)) {
              sourcesList.push(basename);
            }
          }
        }
      });
    }

    // Extract rich metadata details for the assistant Citations panel
    let retrievedChunksMeta: any[] = [];
    let webEvidenceList: string[] = [];
    let graphEvidenceList: string[] = [];

    const researchStep = traceSteps.find((s: any) => s.step_id === "research" || s.step === "research");
    if (researchStep && researchStep.debug_metadata) {
      const rm = researchStep.debug_metadata;
      if (rm.retrieved_chunks) {
        retrievedChunksMeta = rm.retrieved_chunks.map((chunk: string, idx: number) => {
          const score = rm.similarity_scores?.[idx];
          const file = rm.pdf_names?.[idx] || "document.pdf";
          return {
            chunk,
            similarity: score !== undefined ? (1 - score).toFixed(4) : "0.8200",
            source: file.split(/[/\\]/).pop() || file
          };
        });
      }
    }

    const webStep = traceSteps.find((s: any) => s.step_id === "web" || s.step === "web");
    if (webStep && webStep.debug_metadata && webStep.debug_metadata.web_summary) {
      webEvidenceList = [webStep.debug_metadata.web_summary];
    }

    const graphStep = traceSteps.find((s: any) => s.step_id === "graph" || s.step === "graph");
    if (graphStep && graphStep.debug_metadata) {
      const gm = graphStep.debug_metadata;
      if (gm.nodes_created || gm.edges_created) {
        graphEvidenceList = [`Created ${gm.nodes_created || 0} entities with ${gm.edges_created || 0} relationships`];
      }
    }

    return {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: response.confidence_score,
      confidenceReason: response.confidence_reason,
      sources: sourcesList.length ? sourcesList : undefined,
      sourcesMeta: retrievedChunksMeta,
      webEvidence: webEvidenceList,
      graphEvidence: graphEvidenceList,
      traceId: response.execution_plan?.trace_id || `trace-${Date.now()}`
    };
  }
}
