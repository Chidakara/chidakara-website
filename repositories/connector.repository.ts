import { apiFetch } from "../lib/platform/api/config";

export interface ConnectorInfo {
  provider: string;
  name: string;
  version: string;
  api_endpoint: string;
  connected: boolean;
  supported_objects: string[];
  status: {
    connected: boolean;
    latency_ms: number;
    health_score: number;
    errors: string[];
  };
  last_sync: number;
}

export interface ConnectorStatusSummary {
  connected_count: number;
  total_count: number;
  health_score: number;
  health_rating: string;
}

export interface SyncJobLog {
  id: string;
  provider: string;
  mode: string;
  timestamp: number;
  duration_ms: number;
  items_count: number;
  status: "Success" | "Failure";
  errors: string[];
}

export class ConnectorRepository {
  static async listConnectors(): Promise<ConnectorInfo[]> {
    return apiFetch<ConnectorInfo[]>("/connectors");
  }

  static async connect(provider: string, config: Record<string, any>): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/connectors/connect", {
      method: "POST",
      body: JSON.stringify({ provider, config }),
    });
  }

  static async disconnect(provider: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>("/connectors/disconnect", {
      method: "POST",
      body: JSON.stringify({ provider }),
    });
  }

  static async sync(provider: string, mode: "full" | "incremental"): Promise<{ success: boolean; job_id: string; items_synced: number; duration_ms: number }> {
    return apiFetch<{ success: boolean; job_id: string; items_synced: number; duration_ms: number }>("/connectors/sync", {
      method: "POST",
      body: JSON.stringify({ provider, mode }),
    });
  }

  static async getStatusSummary(): Promise<ConnectorStatusSummary> {
    return apiFetch<ConnectorStatusSummary>("/connectors/status");
  }

  static async getSyncHistory(): Promise<SyncJobLog[]> {
    return apiFetch<SyncJobLog[]>("/connectors/history");
  }
}
