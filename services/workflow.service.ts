import { AssistantRepository } from "../repositories/assistant.repository";
import { useWorkspaceStore } from "../stores/workspaceStore";

export interface Workflow {
  id: string;
  workspaceId?: string;
  name: string;
  description: string;
  status: "idle" | "running" | "completed" | "failed";
  updatedAt: string;
  steps: string[];
}

export class WorkflowService {
  private static mockWorkflows: Workflow[] = [
    {
      id: "wf-1",
      workspaceId: "workspace-acme",
      name: "Preventive Telemetry Scanners",
      description: "Decomposes telemetry streams, scans historical bounds, scrapes forum data, and outputs work logs.",
      status: "idle",
      updatedAt: "2026-06-25 10:30 AM",
      steps: ["Planner", "Research", "Web", "Reflection", "Critic", "Memory"]
    },
    {
      id: "wf-2",
      workspaceId: "workspace-nvidia",
      name: "NDA Compliance Auditer",
      description: "Classifies legal terms, builds entity connections, flags warnings, and generates reports.",
      status: "completed",
      updatedAt: "2026-06-24 4:15 PM",
      steps: ["Planner", "Graph", "Reflection", "Critic"]
    },
    {
      id: "wf-sri-1",
      workspaceId: "workspace-sri",
      name: "Supply Chain Audit Tracker",
      description: "Scans supplier logs, matches shipment indexes, and publishes food safety standards metrics.",
      status: "idle",
      updatedAt: "2026-06-25 11:15 AM",
      steps: ["Planner", "Research", "Reflection", "Critic"]
    },
    {
      id: "wf-internal-1",
      workspaceId: "workspace-internal",
      name: "SDK Telemetry Diagnostic",
      description: "Profiles agent parameters, validates memory deques, and pushes context traces.",
      status: "idle",
      updatedAt: "2026-06-25 09:00 AM",
      steps: ["Planner", "Research", "Knowledge", "Critic", "Memory"]
    }
  ];

  static async getWorkflows(): Promise<Workflow[]> {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chidakara_workflows");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return [...this.mockWorkflows];
  }

  static async saveWorkflows(wfs: Workflow[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_workflows", JSON.stringify(wfs));
    }
  }

  static async createWorkflow(name: string, description: string, steps: string[]): Promise<Workflow> {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId || "workspace-acme";
    const newWorkflow: Workflow = {
      id: `wf-${Date.now()}`,
      workspaceId: activeWsId,
      name,
      description,
      status: "idle",
      updatedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      steps
    };
    const list = await this.getWorkflows();
    list.push(newWorkflow);
    await this.saveWorkflows(list);
    return newWorkflow;
  }

  static async duplicateWorkflow(id: string): Promise<Workflow | null> {
    const list = await this.getWorkflows();
    const target = list.find(w => w.id === id);
    if (!target) return null;

    const copy: Workflow = {
      ...target,
      id: `wf-${Date.now()}`,
      name: `${target.name} (Copy)`,
      updatedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    list.push(copy);
    await this.saveWorkflows(list);
    return copy;
  }

  static async deleteWorkflow(id: string): Promise<boolean> {
    const list = await this.getWorkflows();
    const index = list.findIndex(w => w.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    await this.saveWorkflows(list);
    return true;
  }

  static async executeWorkflow(
    id: string,
    onStepChange: (stepName: string, status: "pending" | "running" | "completed") => void
  ): Promise<boolean> {
    const list = await this.getWorkflows();
    const target = list.find(w => w.id === id);
    if (!target) return false;

    target.status = "running";
    await this.saveWorkflows(list);

    try {
      const testQuery = id === "wf-2"
        ? "Run security audit checks on retrieved NDA contexts"
        : "Compile parallel prepare instructions for hackathon workspace";

      const response = await AssistantRepository.ask(testQuery);
      const traceSteps = response.execution_trace || [];

      for (const step of traceSteps) {
        const stepId = step.step_id || step.step || "research";
        const stepName = stepId.charAt(0).toUpperCase() + stepId.slice(1);
        
        onStepChange(stepName, "running");
        await new Promise(r => setTimeout(r, 400));
        onStepChange(stepName, "completed");
      }

      target.status = "completed";
      target.updatedAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      await this.saveWorkflows(list);
      return true;
    } catch (e) {
      console.warn("Workflow live query execution failed, falling back to local thread emulation", e);
      
      for (const step of target.steps) {
        onStepChange(step, "running");
        await new Promise(r => setTimeout(r, 300));
        onStepChange(step, "completed");
      }

      target.status = "completed";
      target.updatedAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      await this.saveWorkflows(list);
      return true;
    }
  }
}
export type { Workflow };
