import { create } from "zustand";

export interface SystemMetrics {
  documentsIndexed: number;
  agentsRunning: number;
  avgLatencyMs: number;
  confidenceScore: number;
  queriesToday: number;
  memoryUsageMb: number;
  graphNodes: number;
  graphRelations: number;
}

export interface ActivityLog {
  id: string;
  type: "info" | "warning" | "success" | "error";
  message: string;
  time: string;
}

interface PlatformState {
  sidebarCollapsed: boolean;
  metrics: SystemMetrics;
  recentActivity: ActivityLog[];
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  updateMetrics: (newMetrics: Partial<SystemMetrics>) => void;
  addActivity: (activity: Omit<ActivityLog, "id" | "time">) => void;
  clearActivity: () => void;
}

// Client-side helper for localStorage safety
const getSavedSidebarState = (): boolean => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("chidakara_sidebar_collapsed");
    return saved === "true";
  }
  return false;
};

export const usePlatformStore = create<PlatformState>((set) => ({
  sidebarCollapsed: getSavedSidebarState(),
  metrics: {
    documentsIndexed: 2,
    agentsRunning: 0,
    avgLatencyMs: 1350,
    confidenceScore: 0.95,
    queriesToday: 48,
    memoryUsageMb: 245.5,
    graphNodes: 8,
    graphRelations: 8
  },
  recentActivity: [
    { id: "act-1", type: "success", message: "System online. Initialized ChromaDB client connection.", time: "12:30 PM" },
    { id: "act-2", type: "info", message: "Document 'resume_nanda.pdf' chunked and indexed successfully.", time: "11:32 AM" },
    { id: "act-3", type: "info", message: "Executed NVIDIA Hackathon planning query. Latency: 1350ms.", time: "11:01 AM" }
  ],
  toggleSidebar: () => set((state) => {
    const collapsed = !state.sidebarCollapsed;
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_sidebar_collapsed", String(collapsed));
    }
    return { sidebarCollapsed: collapsed };
  }),
  setSidebarCollapsed: (collapsed) => set(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_sidebar_collapsed", String(collapsed));
    }
    return { sidebarCollapsed: collapsed };
  }),
  updateMetrics: (newMetrics) => set((state) => ({
    metrics: { ...state.metrics, ...newMetrics }
  })),
  addActivity: (activity) => set((state) => {
    const log: ActivityLog = {
      ...activity,
      id: `act-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    return {
      recentActivity: [log, ...state.recentActivity.slice(0, 19)]
    };
  }),
  clearActivity: () => set(() => ({ recentActivity: [] }))
}));
