export interface PlatformSettings {
  llmModel: string;
  embeddingProvider: string;
  searchProvider: string;
  temperature: number;
  chunkSize: number;
  topK: number;
  theme: "dark" | "light";
  apiKey: string;
}

export class SettingsService {
  private static settings: PlatformSettings = {
    llmModel: "gemini-2.5-pro",
    embeddingProvider: "sentence-transformers-local",
    searchProvider: "duckduckgo-sdk",
    temperature: 0.2,
    chunkSize: 500,
    topK: 5,
    theme: "dark",
    apiKey: "chidakara_sk_live_2026_xyz"
  };

  static async getSettings(): Promise<PlatformSettings> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.settings }), 200);
    });
  }

  static async saveSettings(newSettings: Partial<PlatformSettings>): Promise<PlatformSettings> {
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.settings }), 200);
    });
  }
}
