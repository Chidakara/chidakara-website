"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { usePlatformStore } from "../../../stores/platformStore";
import { Settings, Save, Shield, Sliders, Server, Check } from "lucide-react";

export default function SettingsPage() {
  const { settings, isLoading, loadSettings, updateSettings } = useSettingsStore();
  const { addActivity } = usePlatformStore();

  const [localModel, setLocalModel] = useState("gemini-2.5-pro");
  const [localEmbed, setLocalEmbed] = useState("sentence-transformers-local");
  const [localSearch, setLocalSearch] = useState("duckduckgo-sdk");
  const [localTemp, setLocalTemp] = useState(0.2);
  const [localChunk, setLocalChunk] = useState(500);
  const [localTopK, setLocalTopK] = useState(5);
  const [localKey, setLocalKey] = useState("");
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  // Update local states when store loaded
  useEffect(() => {
    if (settings) {
      setLocalModel(settings.llmModel);
      setLocalEmbed(settings.embeddingProvider);
      setLocalSearch(settings.searchProvider);
      setLocalTemp(settings.temperature);
      setLocalChunk(settings.chunkSize);
      setLocalTopK(settings.topK);
      setLocalKey(settings.apiKey);
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      llmModel: localModel,
      embeddingProvider: localEmbed,
      searchProvider: localSearch,
      temperature: localTemp,
      chunkSize: localChunk,
      topK: localTopK,
      apiKey: localKey
    });

    addActivity({ type: "success", message: "Saved platform settings changes." });
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-[#050505] border border-white/5 rounded-3xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono">Platform Configuration Panel</h2>
          <p className="text-xs text-gray-500 mt-0.5">Control pipeline thresholds, chunk parameters, and API keys.</p>
        </div>
        <Settings className="h-5 w-5 text-gray-500" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSave} className="rounded-[2.5rem] border border-white/10 bg-black/60 p-6 lg:p-8 space-y-6 backdrop-blur-2xl">
        
        {/* SECTION 1: LLM MODELS */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase font-mono tracking-widest text-gray-500 font-bold flex items-center gap-2">
            <Server className="h-4.5 w-4.5 text-blue-400" />
            Provider Settings
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-gray-500 font-bold">Language Model</label>
              <select
                value={localModel}
                onChange={(e) => setLocalModel(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="llama-3-70b-local">Llama 3 70B (Local VPC)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-gray-500 font-bold">Embedding Provider</label>
              <select
                value={localEmbed}
                onChange={(e) => setLocalEmbed(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="sentence-transformers-local">SentenceTransformers (Local)</option>
                <option value="openai-embeddings-3">OpenAI text-embedding-3</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono text-gray-500 font-bold">Search Provider API</label>
            <select
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="duckduckgo-sdk">DuckDuckGo Python SDK</option>
              <option value="google-custom-search">Google Search REST API</option>
            </select>
          </div>
        </div>

        {/* SECTION 2: THRESHOLDS SLIDERS */}
        <div className="space-y-4 border-t border-white/5 pt-6">
          <h3 className="text-xs uppercase font-mono tracking-widest text-gray-500 font-bold flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-blue-400" />
            Model Thresholds
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-semibold">LLM Temperature</span>
              <span className="text-blue-400 font-mono font-bold">{localTemp}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.1"
              value={localTemp}
              onChange={(e) => setLocalTemp(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-gray-500 font-bold">Chunk size (words)</label>
              <input
                type="number"
                value={localChunk}
                onChange={(e) => setLocalChunk(parseInt(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-gray-500 font-bold">Top K contexts</label>
              <input
                type="number"
                value={localTopK}
                onChange={(e) => setLocalTopK(parseInt(e.target.value))}
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: API KEYS */}
        <div className="space-y-4 border-t border-white/5 pt-6">
          <h3 className="text-xs uppercase font-mono tracking-widest text-gray-500 font-bold flex items-center gap-2">
            <Shield className="h-4.5 w-4.5 text-blue-400" />
            Security & Integration Keys
          </h3>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono text-gray-500 font-bold">Platform API Key (sk_live)</label>
            <input
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder="chidakara_sk_live_..."
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-2.5 text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="border-t border-white/5 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSavedAlert && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold font-mono">
                <Check className="h-4 w-4" />
                Settings saved!
              </span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase hover:bg-blue-500 text-white transition-colors"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>

      </form>
    </div>
  );
}
