import { apiFetch } from "../lib/platform/api/config";
import { useWorkspaceStore } from "../stores/workspaceStore";

export interface QuestionRequest {
  question: string;
  workspaceId?: string;
}

export interface AssistantResponse {
  answer: string;
  agents: string[];
  workflow: string[];
  execution_trace: any[];
  trace: any[];
  confidence_score: number;
  confidence_reason: string;
  reflection_summary: any;
  execution_plan: any;
  plan_status: string;
  current_task: string;
  completed_tasks: string[];
  remaining_tasks: string[];
  parallel_metrics: any;
  sources?: any[];
}

export class AssistantRepository {
  static async ask(question: string, workspaceId?: string): Promise<AssistantResponse> {
    const wsId = workspaceId || useWorkspaceStore.getState().activeWorkspaceId || "default";
    return apiFetch<AssistantResponse>("/ask", {
      method: "POST",
      body: JSON.stringify({ question, workspaceId: wsId }),
    });
  }
}
