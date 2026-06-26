import { Workspace } from "../types/workspace";
import { WorkspaceRepository } from "../repositories/workspace.repository";

export class WorkspaceService {
  private static defaultWorkspaces: Workspace[] = [
    {
      id: "workspace-acme",
      name: "Acme Manufacturing",
      description: "Compliance and telemetry automation workspace.",
      icon: "Factory",
      color: "text-blue-400",
      createdAt: new Date("2026-06-01").toISOString(),
      updatedAt: new Date("2026-06-25").toISOString(),
      statistics: {
        documentsIndexed: 14,
        avgLatencyMs: 1250,
        confidenceScore: 0.94,
        queriesToday: 45,
        memoryUsageMb: 124,
        graphNodes: 48,
        graphRelations: 74
      },
      members: ["Nanda Krishna", "Sarah Connor"]
    },
    {
      id: "workspace-sri",
      name: "Sri Food Products",
      description: "Recipe database indexing and supply chain logistics audits.",
      icon: "ShoppingBag",
      color: "text-emerald-400",
      createdAt: new Date("2026-06-10").toISOString(),
      updatedAt: new Date("2026-06-24").toISOString(),
      statistics: {
        documentsIndexed: 8,
        avgLatencyMs: 820,
        confidenceScore: 0.88,
        queriesToday: 22,
        memoryUsageMb: 48,
        graphNodes: 24,
        graphRelations: 32
      },
      members: ["Nanda Krishna", "Rajesh Kumar"]
    },
    {
      id: "workspace-internal",
      name: "Chidakara Internal",
      description: "Chidakara Agentic SDK configurations and local engineering specifications.",
      icon: "Brain",
      color: "text-purple-400",
      createdAt: new Date("2026-05-15").toISOString(),
      updatedAt: new Date("2026-06-25").toISOString(),
      statistics: {
        documentsIndexed: 42,
        avgLatencyMs: 1480,
        confidenceScore: 0.97,
        queriesToday: 180,
        memoryUsageMb: 256,
        graphNodes: 142,
        graphRelations: 218
      },
      members: ["Nanda Krishna", "Developer Agent"]
    },
    {
      id: "workspace-nvidia",
      name: "NVIDIA Hackathon",
      description: "CUDA unified memory optimizations and deep learning models reference guide.",
      icon: "Cpu",
      color: "text-amber-400",
      createdAt: new Date("2026-06-24").toISOString(),
      updatedAt: new Date("2026-06-25").toISOString(),
      statistics: {
        documentsIndexed: 5,
        avgLatencyMs: 650,
        confidenceScore: 0.91,
        queriesToday: 18,
        memoryUsageMb: 32,
        graphNodes: 15,
        graphRelations: 20
      },
      members: ["Nanda Krishna"]
    }
  ];

  static async getWorkspaces(): Promise<Workspace[]> {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chidakara_workspaces");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore parsing error
        }
      }
    }
    try {
      const list = await WorkspaceRepository.getWorkspaces();
      if (list && list.length) return list;
    } catch (e) {
      // Backend fallback ignored for local-first design
    }
    return [...this.defaultWorkspaces];
  }

  static async saveWorkspaces(workspaces: Workspace[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_workspaces", JSON.stringify(workspaces));
    }
  }

  static async createWorkspace(name: string, description: string, color: string): Promise<Workspace> {
    const newWorkspace: Workspace = {
      id: `workspace-${Date.now()}`,
      name,
      description,
      icon: "Layers",
      color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statistics: {
        documentsIndexed: 0,
        avgLatencyMs: 0,
        confidenceScore: 1.00,
        queriesToday: 0,
        memoryUsageMb: 0,
        graphNodes: 0,
        graphRelations: 0
      },
      members: ["Nanda Krishna"]
    };

    const list = await this.getWorkspaces();
    list.push(newWorkspace);
    await this.saveWorkspaces(list);

    try {
      await WorkspaceRepository.createWorkspace({
        name,
        description,
        icon: "Layers",
        color
      });
    } catch (e) {
      // backend off
    }

    return newWorkspace;
  }

  static async updateWorkspace(id: string, patch: Partial<Omit<Workspace, "id" | "statistics">>): Promise<Workspace | null> {
    const list = await this.getWorkspaces();
    const idx = list.findIndex(w => w.id === id);
    if (idx === -1) return null;

    list[idx] = {
      ...list[idx],
      ...patch,
      updatedAt: new Date().toISOString()
    };
    await this.saveWorkspaces(list);

    try {
      await WorkspaceRepository.updateWorkspace(id, patch);
    } catch (e) {
      // backend off
    }

    return list[idx];
  }

  static async deleteWorkspace(id: string): Promise<boolean> {
    const list = await this.getWorkspaces();
    const idx = list.findIndex(w => w.id === id);
    if (idx === -1) return false;

    list.splice(idx, 1);
    await this.saveWorkspaces(list);

    try {
      await WorkspaceRepository.deleteWorkspace(id);
    } catch (e) {
      // backend off
    }

    return true;
  }
}
