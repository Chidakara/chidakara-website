import { create } from "zustand";
import { GraphService, GraphNode, GraphEdge } from "../services/graph.service";

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: GraphNode | null;
  hoveredEdge: GraphEdge | null;
  searchQuery: string;
  filterType: string;
  isLoading: boolean;
  panX: number;
  panY: number;
  zoom: number;
  loadGraph: () => Promise<void>;
  setSelectedNode: (node: GraphNode | null) => void;
  setHoveredEdge: (edge: GraphEdge | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: string) => void;
  updateNodePosition: (id: string, x: number, y: number) => void;
  setPan: (x: number, y: number) => void;
  setZoom: (zoom: number) => void;
  resetView: () => void;
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  hoveredEdge: null,
  searchQuery: "",
  filterType: "All",
  isLoading: false,
  panX: 0,
  panY: 0,
  zoom: 1,
  loadGraph: async () => {
    set({ isLoading: true, selectedNode: null, hoveredEdge: null });
    const { nodes, edges } = await GraphService.getGraphData();
    set({ nodes, edges, isLoading: false });
  },
  setSelectedNode: (node) => set({ selectedNode: node }),
  setHoveredEdge: (edge) => set({ hoveredEdge: edge }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterType: (type) => set({ filterType: type }),
  updateNodePosition: (id, x, y) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, x, y } : n)
  })),
  setPan: (x, y) => set({ panX: x, panY: y }),
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.4), 2.5) }),
  resetView: () => set({ panX: 0, panY: 0, zoom: 1 })
}));
