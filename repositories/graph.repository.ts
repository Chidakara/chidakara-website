import { useWorkspaceStore } from "../stores/workspaceStore";

export interface GraphNode {
  id: string;
  label: string;
  type: "Person" | "Technology" | "Event" | "Product" | "Database" | "Document";
  val: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

export class GraphRepository {
  private static nvidiaNodes: GraphNode[] = [
    { id: "n-1", label: "Nanda Krishna", type: "Person", val: 25 },
    { id: "n-2", label: "CUDA 12.8", type: "Technology", val: 20 },
    { id: "n-3", label: "B.Tech Degree", type: "Document", val: 15 },
    { id: "n-4", label: "NVIDIA Hackathon", type: "Event", val: 22 },
    { id: "n-5", label: "DeepStream SDK", type: "Product", val: 18 },
    { id: "n-6", label: "ChromaDB", type: "Database", val: 16 },
    { id: "n-7", label: "resume_nanda.pdf", type: "Document", val: 18 },
    { id: "n-8", label: "GStreamer API", type: "Technology", val: 14 }
  ];

  private static nvidiaEdges: GraphEdge[] = [
    { source: "n-1", target: "n-7", type: "Author Of" },
    { source: "n-7", target: "n-2", type: "Lists Skill" },
    { source: "n-7", target: "n-3", type: "Mentions" },
    { source: "n-1", target: "n-4", type: "Prepares For" },
    { source: "n-4", target: "n-5", type: "Requires" },
    { source: "n-5", target: "n-8", type: "Built On" },
    { source: "n-6", target: "n-7", type: "Indexes Chunks" },
    { source: "n-2", target: "n-6", type: "Configures" }
  ];

  private static acmeNodes: GraphNode[] = [
    { id: "acme-1", label: "Acme Manufacturing", type: "Product", val: 25 },
    { id: "acme-2", label: "Telemetry Scanners", type: "Technology", val: 20 },
    { id: "acme-3", label: "Memory Bound: 124MB", type: "Database", val: 16 },
    { id: "acme-4", label: "ChromaDB Segment", type: "Database", val: 18 },
    { id: "acme-5", label: "telemetry_specs.pdf", type: "Document", val: 18 },
    { id: "acme-6", label: "Safety Flags Alert", type: "Event", val: 15 }
  ];

  private static acmeEdges: GraphEdge[] = [
    { source: "acme-1", target: "acme-5", type: "Indexes Source" },
    { source: "acme-5", target: "acme-2", type: "Defines Specs" },
    { source: "acme-2", target: "acme-3", type: "Measures Bounds" },
    { source: "acme-3", target: "acme-4", type: "Stored In" },
    { source: "acme-4", target: "acme-6", type: "Raises Warning" }
  ];

  private static sriNodes: GraphNode[] = [
    { id: "sri-1", label: "Sri Food Products", type: "Product", val: 25 },
    { id: "sri-2", label: "recipe_standards.pdf", type: "Document", val: 18 },
    { id: "sri-3", label: "logistics_report.pdf", type: "Document", val: 18 },
    { id: "sri-4", label: "Shipment Schedules", type: "Technology", val: 16 },
    { id: "sri-5", label: "Quality Control", type: "Person", val: 20 },
    { id: "sri-6", label: "Logistics Dept", type: "Person", val: 20 }
  ];

  private static sriEdges: GraphEdge[] = [
    { source: "sri-1", target: "sri-2", type: "Conforms To" },
    { source: "sri-1", target: "sri-3", type: "Publishes Report" },
    { source: "sri-3", target: "sri-4", type: "Lists Schedules" },
    { source: "sri-5", target: "sri-2", type: "Audits Specs" },
    { source: "sri-6", target: "sri-3", type: "Prepares Ledger" }
  ];

  private static internalNodes: GraphNode[] = [
    { id: "int-1", label: "Chidakara Core SDK", type: "Technology", val: 25 },
    { id: "int-2", label: "Orchestrator Agent", type: "Person", val: 20 },
    { id: "int-3", label: "Planner Agent", type: "Person", val: 20 },
    { id: "int-4", label: "Memory Deque", type: "Database", val: 16 },
    { id: "int-5", label: "Parallel Exec Engine", type: "Technology", val: 22 }
  ];

  private static internalEdges: GraphEdge[] = [
    { source: "int-1", target: "int-2", type: "Orchestrated By" },
    { source: "int-2", target: "int-3", type: "Plans Subtasks" },
    { source: "int-2", target: "int-5", type: "Runs Concurrent Stage" },
    { source: "int-3", target: "int-4", type: "Loads Turn History" }
  ];

  static async getGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;

    return new Promise((resolve) => {
      let nodes = this.nvidiaNodes;
      let edges = this.nvidiaEdges;

      if (activeWsId === "workspace-acme") {
        nodes = this.acmeNodes;
        edges = this.acmeEdges;
      } else if (activeWsId === "workspace-sri") {
        nodes = this.sriNodes;
        edges = this.sriEdges;
      } else if (activeWsId === "workspace-internal") {
        nodes = this.internalNodes;
        edges = this.internalEdges;
      }

      setTimeout(() => resolve({
        nodes: [...nodes],
        edges: [...edges]
      }), 100);
    });
  }

  static async search(query: string): Promise<GraphNode[]> {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    let nodes = this.nvidiaNodes;
    
    if (activeWsId === "workspace-acme") {
      nodes = this.acmeNodes;
    } else if (activeWsId === "workspace-sri") {
      nodes = this.sriNodes;
    } else if (activeWsId === "workspace-internal") {
      nodes = this.internalNodes;
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(
        nodes.filter(n => n.label.toLowerCase().includes(query.toLowerCase()))
      ), 100);
    });
  }
}
