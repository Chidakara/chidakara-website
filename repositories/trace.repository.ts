import { apiFetch } from "../lib/platform/api/config";

export interface TraceStep {
  step_id: string;
  agent_name: string;
  start_time: string;
  end_time: string;
  duration_ms: number;
  status: "pending" | "running" | "completed" | "failed";
  input_summary: string;
  output_summary: string;
  error: string | null;
  debug_metadata: any;
  parallel_group: number;
  dependency_chain: string[];
  critical_path: boolean;
  stage_number: number;
}

export interface BackendTrace {
  trace_id: string;
  workspaceId?: string;
  question: string;
  workflow: string[];
  success: boolean;
  total_duration_ms: number;
  skipped_steps: string[];
  retry_count: number;
  steps: TraceStep[];
  confidence_score: number;
  confidence_reason: string;
  reflection: any;
  parallel_metrics: any;
  timestamp: string;
  execution_plan?: any;
  plan_status?: string;
  current_task?: string;
  completed_tasks?: string[];
  remaining_tasks?: string[];
}

export class TraceRepository {
  static async getLatestTrace(): Promise<BackendTrace> {
    return apiFetch<BackendTrace>("/trace/latest");
  }

  static async getTraceHistory(): Promise<BackendTrace[]> {
    return apiFetch<BackendTrace[]>("/trace/history");
  }

  static async getTraceById(traceId: string): Promise<BackendTrace> {
    return apiFetch<BackendTrace>(`/trace/${traceId}`);
  }
}
