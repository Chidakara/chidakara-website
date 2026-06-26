import { create } from "zustand";
import { TraceService, ExecutionTrace, TraceNode } from "../services/trace.service";
import { AssistantRepository } from "../repositories/assistant.repository";
import { usePlatformStore } from "./platformStore";

interface DebuggerState {
  traces: ExecutionTrace[];
  selectedTrace: ExecutionTrace | null;
  activeTraceNode: TraceNode | null;
  isLoading: boolean;
  loadTraces: () => Promise<void>;
  setSelectedTraceById: (id: string) => Promise<void>;
  setActiveTraceNode: (node: TraceNode | null) => void;
  runMockTraceExecution: (query: string) => Promise<void>;
}

export const useDebuggerStore = create<DebuggerState>((set, get) => ({
  traces: [],
  selectedTrace: null,
  activeTraceNode: null,
  isLoading: false,
  loadTraces: async () => {
    set({ isLoading: true });
    try {
      const list = await TraceService.getTracesHistory();
      set({
        traces: list,
        selectedTrace: list[0] || null,
        activeTraceNode: list[0]?.nodes[0] || null,
        isLoading: false
      });
      
      // Update platform store average latency and confidence metrics using the latest trace
      if (list[0]) {
        usePlatformStore.getState().updateMetrics({
          avgLatencyMs: list[0].totalDurationMs,
          confidenceScore: list[0].confidenceScore || 0.92,
        });
      }
    } catch (e) {
      set({ isLoading: false });
    }
  },
  setSelectedTraceById: async (id) => {
    const trace = await TraceService.getTraceById(id);
    set({
      selectedTrace: trace,
      activeTraceNode: trace?.nodes[0] || null
    });
  },
  setActiveTraceNode: (node) => set({ activeTraceNode: node }),
  runMockTraceExecution: async (query) => {
    set({ isLoading: true });
    try {
      // Execute the query live on the backend
      const response = await AssistantRepository.ask(query);
      const trace = TraceService.mapBackendTrace(response);
      
      set((state) => {
        const nextTraces = [trace, ...state.traces.filter(t => t.id !== trace.id)];
        return {
          traces: nextTraces,
          selectedTrace: trace,
          activeTraceNode: trace.nodes[0] || null,
          isLoading: false
        };
      });

      // Update platform store metrics
      usePlatformStore.getState().updateMetrics({
        avgLatencyMs: trace.totalDurationMs,
        confidenceScore: trace.confidenceScore || 0.90,
      });

      // Add actual trace to history
      usePlatformStore.getState().addActivity({
        type: "success",
        message: `Execution complete. Total Latency: ${trace.totalDurationMs}ms | Speedup: ${trace.parallelSpeedup}`
      });

    } catch (e: any) {
      set({ isLoading: false });
      usePlatformStore.getState().addActivity({
        type: "warning",
        message: `Debugger execution failed: ${e.message || "FastAPI is offline."}`
      });
    }
  }
}));
