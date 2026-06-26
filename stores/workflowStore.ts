import { create } from "zustand";
import { WorkflowService, Workflow } from "../services/workflow.service";
import { useWorkspaceStore } from "./workspaceStore";

interface WorkflowState {
  workflows: Workflow[];
  isLoading: boolean;
  activeExecWorkflowId: string | null;
  activeExecSteps: { [stepName: string]: "pending" | "running" | "completed" };
  loadWorkflows: () => Promise<void>;
  createWorkflow: (name: string, description: string, steps: string[]) => Promise<void>;
  duplicateWorkflow: (id: string) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  executeWorkflow: (id: string) => Promise<void>;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: [],
  isLoading: false,
  activeExecWorkflowId: null,
  activeExecSteps: {},
  loadWorkflows: async () => {
    set({ isLoading: true });
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    const list = await WorkflowService.getWorkflows();
    const filtered = list.filter(w => w.workspaceId === activeWsId);
    set({ workflows: filtered, isLoading: false });
  },
  createWorkflow: async (name, description, steps) => {
    const newWf = await WorkflowService.createWorkflow(name, description, steps);
    set((state) => ({ workflows: [...state.workflows, newWf] }));
  },
  duplicateWorkflow: async (id) => {
    const copy = await WorkflowService.duplicateWorkflow(id);
    if (copy) {
      set((state) => ({ workflows: [...state.workflows, copy] }));
    }
  },
  deleteWorkflow: async (id) => {
    const success = await WorkflowService.deleteWorkflow(id);
    if (success) {
      set((state) => ({ workflows: state.workflows.filter(w => w.id !== id) }));
    }
  },
  executeWorkflow: async (id) => {
    const target = get().workflows.find(w => w.id === id);
    if (!target) return;

    const initialStepsState: { [key: string]: "pending" | "running" | "completed" } = {};
    target.steps.forEach(s => {
      initialStepsState[s] = "pending";
    });

    set({
      activeExecWorkflowId: id,
      activeExecSteps: initialStepsState
    });

    set((state) => ({
      workflows: state.workflows.map(w => w.id === id ? { ...w, status: "running" } : w)
    }));

    await WorkflowService.executeWorkflow(id, (stepName, status) => {
      set((state) => ({
        activeExecSteps: { ...state.activeExecSteps, [stepName]: status }
      }));
    });

    set((state) => ({
      workflows: state.workflows.map(w => w.id === id ? { ...w, status: "completed", updatedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : w),
      activeExecWorkflowId: null,
      activeExecSteps: {}
    }));
  }
}));
