export interface WorkspaceStatistics {
  documentsIndexed: number;
  avgLatencyMs: number;
  confidenceScore: number;
  queriesToday: number;
  memoryUsageMb: number;
  graphNodes: number;
  graphRelations: number;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  icon: string; // key of lucide icon or generic string
  color: string; // CSS color string or color class name
  createdAt: string;
  updatedAt: string;
  statistics: WorkspaceStatistics;
  members?: string[];
}
