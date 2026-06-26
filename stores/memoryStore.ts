import { create } from "zustand";
import { MemoryRepository } from "../repositories/memory.repository";
import { usePlatformStore } from "./platformStore";

export interface MemoryLog {
  turn: string;
  user: string;
  resolved: string;
}

interface MemoryState {
  memories: MemoryLog[];
  isLoading: boolean;
  error: string | null;
  loadMemory: () => Promise<void>;
  clearMemory: () => Promise<void>;
}

export const useMemoryStore = create<MemoryState>((set) => ({
  memories: [],
  isLoading: false,
  error: null,
  loadMemory: async () => {
    set({ isLoading: true, error: null });
    try {
      const raw = await MemoryRepository.getMemory();
      const memories: MemoryLog[] = raw.map((item, idx) => ({
        turn: `Turn ${idx + 1}`,
        user: item[0],
        resolved: item[1]
      }));
      set({ memories, isLoading: false });
    } catch (e: any) {
      set({
        memories: [],
        isLoading: false,
        error: "Memory endpoint '/memory' is unavailable or connection refused."
      });
    }
  },
  clearMemory: async () => {
    try {
      await MemoryRepository.clearMemory();
      set({ memories: [] });
      usePlatformStore.getState().addActivity({
        type: "warning",
        message: "Cleared conversational memory cache on backend."
      });
    } catch (e) {
      // ignore
    }
  }
}));
export type { MemoryLog };
