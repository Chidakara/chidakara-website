import { create } from "zustand";
import { ConnectorService } from "../services/connector.service";
import {
  ConnectorInfo,
  ConnectorStatusSummary,
  SyncJobLog
} from "../repositories/connector.repository";

interface ConnectorState {
  connectors: ConnectorInfo[];
  summary: ConnectorStatusSummary | null;
  history: SyncJobLog[];
  isLoading: boolean;
  isSyncing: Record<string, boolean>; // track sync state per provider

  loadAllData: () => Promise<void>;
  connectProvider: (provider: string, config: Record<string, any>) => Promise<boolean>;
  disconnectProvider: (provider: string) => Promise<boolean>;
  syncProvider: (provider: string, mode: "full" | "incremental") => Promise<boolean>;
}

export const useConnectorStore = create<ConnectorState>((set, get) => ({
  connectors: [],
  summary: null,
  history: [],
  isLoading: false,
  isSyncing: {},

  loadAllData: async () => {
    set({ isLoading: true });
    try {
      const [connectors, summary, history] = await Promise.all([
        ConnectorService.listConnectors(),
        ConnectorService.getStatusSummary(),
        ConnectorService.getSyncHistory()
      ]);
      set({ connectors, summary, history, isLoading: false });
    } catch (error) {
      console.error("Failed to load connector data:", error);
      set({ isLoading: false });
    }
  },

  connectProvider: async (provider, config) => {
    set({ isLoading: true });
    try {
      const success = await ConnectorService.connect(provider, config);
      if (success) {
        // Reload data
        const [connectors, summary] = await Promise.all([
          ConnectorService.listConnectors(),
          ConnectorService.getStatusSummary()
        ]);
        set({ connectors, summary });
      }
      set({ isLoading: false });
      return success;
    } catch (error) {
      console.error(`Failed to connect ${provider}:`, error);
      set({ isLoading: false });
      return false;
    }
  },

  disconnectProvider: async (provider) => {
    set({ isLoading: true });
    try {
      const success = await ConnectorService.disconnect(provider);
      if (success) {
        // Reload data
        const [connectors, summary] = await Promise.all([
          ConnectorService.listConnectors(),
          ConnectorService.getStatusSummary()
        ]);
        set({ connectors, summary });
      }
      set({ isLoading: false });
      return success;
    } catch (error) {
      console.error(`Failed to disconnect ${provider}:`, error);
      set({ isLoading: false });
      return false;
    }
  },

  syncProvider: async (provider, mode) => {
    set((state) => ({
      isSyncing: { ...state.isSyncing, [provider]: true }
    }));
    try {
      const res = await ConnectorService.sync(provider, mode);
      
      // Reload history and connectors lists
      const [connectors, summary, history] = await Promise.all([
        ConnectorService.listConnectors(),
        ConnectorService.getStatusSummary(),
        ConnectorService.getSyncHistory()
      ]);

      set((state) => ({
        connectors,
        summary,
        history,
        isSyncing: { ...state.isSyncing, [provider]: false }
      }));
      return res.success;
    } catch (error) {
      console.error(`Failed to sync ${provider}:`, error);
      set((state) => ({
        isSyncing: { ...state.isSyncing, [provider]: false }
      }));
      return false;
    }
  }
}));
