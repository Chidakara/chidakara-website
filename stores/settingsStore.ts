import { create } from "zustand";
import { SettingsService, PlatformSettings } from "../services/settings.service";

interface SettingsState {
  settings: PlatformSettings | null;
  isLoading: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<PlatformSettings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  loadSettings: async () => {
    set({ isLoading: true });
    const settings = await SettingsService.getSettings();
    set({ settings, isLoading: false });
  },
  updateSettings: async (newSettings) => {
    set({ isLoading: true });
    const settings = await SettingsService.saveSettings(newSettings);
    set({ settings, isLoading: false });
  }
}));
