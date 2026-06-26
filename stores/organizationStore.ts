import { create } from "zustand";
import {
  OrganizationService,
  DisplayNode,
  DisplayEdge
} from "../services/organization.service";
import {
  OrgOverview,
  OrgInsights,
  OrgRecommendation,
  OrgSimulationResult
} from "../repositories/organization.repository";

interface OrganizationState {
  overview: OrgOverview | null;
  nodes: DisplayNode[];
  edges: DisplayEdge[];
  selectedNode: DisplayNode | null;
  hoveredEdge: DisplayEdge | null;
  searchQuery: string;
  filterType: string;
  insights: OrgInsights | null;
  recommendations: OrgRecommendation[];
  simulationResult: OrgSimulationResult | null;
  simulationTargetId: string;
  simulationScenario: string;
  isLoading: boolean;
  panX: number;
  panY: number;
  zoom: number;

  loadAllData: () => Promise<void>;
  setSelectedNode: (node: DisplayNode | null) => void;
  setHoveredEdge: (edge: DisplayEdge | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: string) => void;
  runSimulation: (scenario: string, targetId: string) => Promise<void>;
  clearSimulation: () => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  setPan: (x: number, y: number) => void;
  setZoom: (zoom: number) => void;
  resetView: () => void;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  overview: null,
  nodes: [],
  edges: [],
  selectedNode: null,
  hoveredEdge: null,
  searchQuery: "",
  filterType: "All",
  insights: null,
  recommendations: [],
  simulationResult: null,
  simulationTargetId: "",
  simulationScenario: "",
  isLoading: false,
  panX: 0,
  panY: 0,
  zoom: 1,

  loadAllData: async () => {
    set({ isLoading: true });
    try {
      const [overview, graphData, insights, recommendations] = await Promise.all([
        OrganizationService.getOverview(),
        OrganizationService.getGraphData(),
        OrganizationService.getInsights(),
        OrganizationService.getRecommendations()
      ]);

      set({
        overview,
        nodes: graphData.nodes,
        edges: graphData.edges,
        insights,
        recommendations,
        isLoading: false
      });
    } catch (error) {
      console.error("Failed to load organization intelligence data:", error);
      set({ isLoading: false });
    }
  },

  setSelectedNode: (node) => set({ selectedNode: node }),
  setHoveredEdge: (edge) => set({ hoveredEdge: edge }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterType: (type) => set({ filterType: type }),

  runSimulation: async (scenario, targetId) => {
    set({ isLoading: true, simulationScenario: scenario, simulationTargetId: targetId });
    try {
      const result = await OrganizationService.simulate(scenario, targetId);
      set({ simulationResult: result, isLoading: false });
    } catch (error) {
      console.error("Simulation failed:", error);
      set({ isLoading: false });
    }
  },

  clearSimulation: () => set({ simulationResult: null, simulationScenario: "", simulationTargetId: "" }),
  updateNodePosition: (id, x, y) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, x, y } : n)
  })),
  setPan: (x, y) => set({ panX: x, panY: y }),
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.4), 2.5) }),
  resetView: () => set({ panX: 0, panY: 0, zoom: 1 })
}));
