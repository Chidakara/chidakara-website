import { apiFetch } from "../lib/platform/api/config";
import { Workspace } from "../types/workspace";

export class WorkspaceRepository {
  static async getWorkspaces(): Promise<Workspace[]> {
    return apiFetch<Workspace[]>("/workspaces");
  }

  static async createWorkspace(workspace: Omit<Workspace, "id" | "createdAt" | "updatedAt" | "statistics">): Promise<Workspace> {
    return apiFetch<Workspace>("/workspaces", {
      method: "POST",
      body: JSON.stringify(workspace)
    });
  }

  static async updateWorkspace(id: string, patch: Partial<Omit<Workspace, "id" | "statistics">>): Promise<Workspace> {
    return apiFetch<Workspace>(`/workspaces/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch)
    });
  }

  static async deleteWorkspace(id: string): Promise<{ success: boolean }> {
    return apiFetch<{ success: boolean }>(`/workspaces/${id}`, {
      method: "DELETE"
    });
  }
}
