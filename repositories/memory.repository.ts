import { apiFetch } from "../lib/platform/api/config";
import { useWorkspaceStore } from "../stores/workspaceStore";

export class MemoryRepository {
  static async getMemory(): Promise<[string, string][]> {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    // Fallback URL query parameters prepared for future backend releases
    try {
      return await apiFetch<[string, string][]>(`/memory?workspaceId=${activeWsId}`);
    } catch (e) {
      return apiFetch<[string, string][]>("/memory");
    }
  }

  static async clearMemory(): Promise<{ status: string }> {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    try {
      return await apiFetch<{ status: string }>(`/memory/clear?workspaceId=${activeWsId}`, {
        method: "POST",
      });
    } catch (e) {
      return apiFetch<{ status: string }>("/memory/clear", {
        method: "POST",
      });
    }
  }
}
