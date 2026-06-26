import { create } from "zustand";
import { WorkspaceService } from "../services/workspace.service";
import { Workspace } from "../types/workspace";
import { usePlatformStore } from "./platformStore";

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  isLoading: boolean;
  loadWorkspaces: () => Promise<void>;
  setActiveWorkspaceId: (id: string) => void;
  createWorkspace: (name: string, description: string, color: string) => Promise<Workspace>;
  renameWorkspace: (id: string, name: string, description: string) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
  getActiveWorkspace: () => Workspace | undefined;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  activeWorkspaceId: null,
  isLoading: false,
  loadWorkspaces: async () => {
    set({ isLoading: true });
    const list = await WorkspaceService.getWorkspaces();
    let savedId: string | null = null;
    if (typeof window !== "undefined") {
      savedId = localStorage.getItem("chidakara_active_workspace_id");
    }
    const activeWorkspaceId = (savedId && list.some(w => w.id === savedId))
      ? savedId
      : (list[0]?.id || null);

    set({
      workspaces: list,
      activeWorkspaceId,
      isLoading: false
    });

    if (activeWorkspaceId) {
      const active = list.find(w => w.id === activeWorkspaceId);
      if (active) {
        usePlatformStore.getState().updateMetrics({
          documentsIndexed: active.statistics.documentsIndexed,
          avgLatencyMs: active.statistics.avgLatencyMs,
          confidenceScore: active.statistics.confidenceScore,
          queriesToday: active.statistics.queriesToday,
          memoryUsageMb: active.statistics.memoryUsageMb,
          graphNodes: active.statistics.graphNodes,
          graphRelations: active.statistics.graphRelations
        });
      }
    }
  },
  setActiveWorkspaceId: (id) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_active_workspace_id", id);
    }
    set({ activeWorkspaceId: id });

    const active = get().workspaces.find(w => w.id === id);
    if (active) {
      usePlatformStore.getState().updateMetrics({
        documentsIndexed: active.statistics.documentsIndexed,
        avgLatencyMs: active.statistics.avgLatencyMs,
        confidenceScore: active.statistics.confidenceScore,
        queriesToday: active.statistics.queriesToday,
        memoryUsageMb: active.statistics.memoryUsageMb,
        graphNodes: active.statistics.graphNodes,
        graphRelations: active.statistics.graphRelations
      });
      usePlatformStore.getState().addActivity({
        type: "info",
        message: `Switched workspace context to: ${active.name}`
      });
    }

    // Dynamic runtime loads of scoped stores to refresh workspace-isolated lists
    const { useAssistantStore } = require("./assistantStore");
    const { useDocumentStore } = require("./documentStore");
    const { useWorkflowStore } = require("./workflowStore");
    const { useDebuggerStore } = require("./debuggerStore");
    const { useGraphStore } = require("./graphStore");
    const { useMemoryStore } = require("./memoryStore");

    if (useAssistantStore?.getState()?.loadSessions) useAssistantStore.getState().loadSessions();
    if (useDocumentStore?.getState()?.loadDocuments) useDocumentStore.getState().loadDocuments();
    if (useWorkflowStore?.getState()?.loadWorkflows) useWorkflowStore.getState().loadWorkflows();
    if (useDebuggerStore?.getState()?.loadTraces) useDebuggerStore.getState().loadTraces();
    if (useGraphStore?.getState()?.loadGraph) useGraphStore.getState().loadGraph();
    if (useMemoryStore?.getState()?.loadMemory) useMemoryStore.getState().loadMemory();
  },
  createWorkspace: async (name, description, color) => {
    const ws = await WorkspaceService.createWorkspace(name, description, color);
    set((state) => ({
      workspaces: [...state.workspaces, ws]
    }));
    return ws;
  },
  renameWorkspace: async (id, name, description) => {
    const updated = await WorkspaceService.updateWorkspace(id, { name, description });
    if (updated) {
      set((state) => ({
        workspaces: state.workspaces.map(w => w.id === id ? updated : w)
      }));
    }
  },
  deleteWorkspace: async (id) => {
    const success = await WorkspaceService.deleteWorkspace(id);
    if (success) {
      const nextList = get().workspaces.filter(w => w.id !== id);
      const fallbackId = nextList[0]?.id || null;
      
      set({
        workspaces: nextList,
        activeWorkspaceId: get().activeWorkspaceId === id ? fallbackId : get().activeWorkspaceId
      });
      
      if (get().activeWorkspaceId === fallbackId && fallbackId) {
        get().setActiveWorkspaceId(fallbackId);
      }
    }
  },
  getActiveWorkspace: () => {
    const { workspaces, activeWorkspaceId } = get();
    return workspaces.find(w => w.id === activeWorkspaceId);
  }
}));
