"use client";

import { useEffect, useState } from "react";
import { useConnectorStore } from "../../../stores/connectorStore";
import {
  GitPullRequest,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Settings,
  RefreshCw,
  Clock,
  Terminal,
  Activity,
  ArrowRight,
  Database,
  Users,
  FileText,
  MessageSquare,
  AlertCircle,
  Info,
  Server
} from "lucide-react";

export default function ConnectorsPage() {
  const {
    connectors,
    summary,
    history,
    isLoading,
    isSyncing,
    loadAllData,
    connectProvider,
    disconnectProvider,
    syncProvider
  } = useConnectorStore();

  const [activeTab, setActiveTab] = useState<"available" | "history">("available");
  const [configParams, setConfigParams] = useState<Record<string, { endpoint: string; secret: string }>>({});
  const [showConfig, setShowConfig] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadAllData();
  }, []);

  const handleConnect = async (provider: string) => {
    const config = configParams[provider] || { endpoint: "", secret: "" };
    const success = await connectProvider(provider, {
      api_endpoint: config.endpoint || "https://api.mock.com",
      api_secret: config.secret || "mock_key_xxxx"
    });
    if (success) {
      setShowConfig(prev => ({ ...prev, [provider]: false }));
    }
  };

  const handleDisconnect = async (provider: string) => {
    if (confirm(`Are you sure you want to disconnect ${provider}?`)) {
      await disconnectProvider(provider);
    }
  };

  const handleSync = async (provider: string, mode: "full" | "incremental") => {
    await syncProvider(provider, mode);
  };

  const updateConfig = (provider: string, key: "endpoint" | "secret", val: string) => {
    setConfigParams(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [key]: val
      }
    }));
  };

  // Extract stat count summaries from current connectors list
  const totalConnectors = connectors.length;
  const connectedCount = connectors.filter(c => c.connected).length;
  
  // Calculate mock stat aggregates based on connected state
  const mockDocumentsCount = connectors.find(c => c.provider === "GoogleDrive")?.connected ? 15 : 0;
  const mockReposCount = connectors.find(c => c.provider === "GitHub")?.connected ? 2 : 0;
  const mockMessagesCount = connectors.find(c => c.provider === "Slack")?.connected ? 104 : 0;
  const mockIssuesCount = connectors.find(c => c.provider === "Jira")?.connected ? 8 : 0;
  const mockUsersCount = (connectors.find(c => c.provider === "GitHub")?.connected ? 2 : 0) + 
                         (connectors.find(c => c.provider === "Slack")?.connected ? 2 : 0);

  const statCards = [
    { title: "Connected Systems", value: `${connectedCount} / ${totalConnectors}`, icon: Server, color: "text-blue-400" },
    { title: "Personnel Discovered", value: mockUsersCount, icon: Users, color: "text-cyan-400" },
    { title: "Repos Synced", value: mockReposCount, icon: GitPullRequest, color: "text-purple-400" },
    { title: "Docs Indexed", value: mockDocumentsCount, icon: FileText, color: "text-emerald-400" },
    { title: "Ingested Messages", value: mockMessagesCount, icon: MessageSquare, color: "text-pink-400" },
    { title: "Tracked Issues", value: mockIssuesCount, icon: AlertCircle, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-mono flex items-center gap-2">
            <GitPullRequest className="h-5 w-5 text-blue-500" />
            Enterprise Connectors
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Ingest external corporate assets directly into Chidakara's vector pipelines and knowledge indexes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh Status
          </button>
        </div>
      </div>

      {/* METRIC WIDGETS */}
      {summary && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-left">
                <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${card.color}`} />
                  {card.title}
                </span>
                <p className="text-xl font-bold font-mono mt-2 text-white">{card.value}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* SUMMARY STATUS METRICS CARD */}
      {summary && (
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-gradient-to-r from-blue-950/20 to-transparent border border-white/5 rounded-3xl p-5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Connector Health Rating</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Aggregate connection latency and uptime metric calculations.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Uptime Score</p>
              <p className="text-sm font-bold font-mono mt-0.5 text-white">{summary.health_score}%</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Uptime Index</p>
              <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold font-mono uppercase mt-0.5 ${
                summary.health_rating === "Excellent"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {summary.health_rating}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION TABS */}
      <div className="flex border-b border-white/5 gap-1 select-none overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab("available")}
          className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "available"
              ? "border-blue-500 text-blue-400 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Available Connectors
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === "history"
              ? "border-blue-500 text-blue-400 font-bold"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          Sync History ({history.length})
        </button>
      </div>

      {/* RENDER ACTIVE SUBTAB VIEW */}

      {/* TAB: AVAILABLE CONNECTORS */}
      {activeTab === "available" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {connectors.map(conn => {
            const isConnSyncing = isSyncing[conn.provider];
            const isConfigOpen = showConfig[conn.provider];
            const providerConfig = configParams[conn.provider] || { endpoint: "", secret: "" };

            return (
              <div
                key={conn.provider}
                className={`rounded-2xl border bg-black/40 p-5 flex flex-col justify-between transition-all duration-300 ${
                  conn.connected
                    ? "border-blue-500/20 shadow-blue-500/[0.02]"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="space-y-4">
                  {/* TOP CONNECTOR CARD TITLE */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">{conn.provider}</h4>
                      <p className="text-[9px] text-gray-500 font-mono mt-1">v{conn.version}</p>
                    </div>

                    <span className={`h-2.5 w-2.5 rounded-full ${
                      conn.connected
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-gray-700"
                    }`} title={conn.connected ? "Connected" : "Disconnected"} />
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-1.5 font-mono text-[9px] text-gray-400">
                    <p className="truncate">Endpoint: {conn.connected ? conn.api_endpoint : "N/A"}</p>
                    <p>Supported: {conn.supported_objects.join(", ")}</p>
                    {conn.connected && conn.last_sync > 0 && (
                      <p className="text-gray-500">Last Sync: {new Date(conn.last_sync * 1000).toLocaleTimeString()}</p>
                    )}
                  </div>
                </div>

                {/* DYNAMIC ACTIONS */}
                <div className="mt-5 border-t border-white/5 pt-4 space-y-2">
                  {conn.connected ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSync(conn.provider, "incremental")}
                          className="flex-1 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/5 text-[10px] font-mono text-gray-300 py-1.5 transition-all flex items-center justify-center gap-1.5"
                          disabled={isConnSyncing}
                        >
                          <Clock className="h-3 w-3" />
                          Inc Sync
                        </button>
                        <button
                          onClick={() => handleSync(conn.provider, "full")}
                          className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-[10px] font-mono font-bold text-white py-1.5 transition-all flex items-center justify-center gap-1.5"
                          disabled={isConnSyncing}
                        >
                          <Play className="h-3 w-3" />
                          Full Sync
                        </button>
                      </div>

                      <button
                        onClick={() => handleDisconnect(conn.provider)}
                        className="w-full rounded-lg border border-rose-500/20 bg-rose-500/[0.02] hover:bg-rose-500/10 text-[10px] font-mono text-rose-400 py-1.5 transition-all"
                        disabled={isConnSyncing}
                      >
                        Disconnect Credentials
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {isConfigOpen ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={providerConfig.endpoint}
                            onChange={(e) => updateConfig(conn.provider, "endpoint", e.target.value)}
                            placeholder="API Endpoint URL"
                            className="w-full rounded-lg border border-white/10 bg-black px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="password"
                            value={providerConfig.secret}
                            onChange={(e) => updateConfig(conn.provider, "secret", e.target.value)}
                            placeholder="API Access Key Secret"
                            className="w-full rounded-lg border border-white/10 bg-black px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-blue-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowConfig(prev => ({ ...prev, [conn.provider]: false }))}
                              className="flex-1 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/5 text-[9px] font-semibold text-gray-400 py-1.5"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleConnect(conn.provider)}
                              className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-[9px] font-bold uppercase text-white py-1.5"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowConfig(prev => ({ ...prev, [conn.provider]: true }))}
                          className="w-full rounded-lg border border-white/10 bg-white/[0.01] hover:bg-white/5 text-[10px] font-mono text-gray-400 py-1.5 transition-all"
                        >
                          Configure Credentials
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: SYNC HISTORY */}
      {activeTab === "history" && (
        <div className="rounded-3xl border border-white/10 bg-[#050505] p-6 backdrop-blur-2xl shadow-lg">
          <div className="flex justify-between items-center mb-5 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-blue-500" />
              Synchronization Logs
            </h4>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            {history.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500">
                    <th className="pb-3.5">Job ID</th>
                    <th className="pb-3.5">Provider</th>
                    <th className="pb-3.5">Mode</th>
                    <th className="pb-3.5">Timestamp</th>
                    <th className="pb-3.5">Duration</th>
                    <th className="pb-3.5">Items Synced</th>
                    <th className="pb-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {history.map((job) => (
                    <tr key={job.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3">{job.id}</td>
                      <td className="py-3 text-white font-bold">{job.provider}</td>
                      <td className="py-3 uppercase text-[10px] font-semibold">{job.mode}</td>
                      <td className="py-3 text-gray-500">{new Date(job.timestamp * 1000).toLocaleString()}</td>
                      <td className="py-3">{job.duration_ms}ms</td>
                      <td className="py-3 font-semibold text-blue-400">{job.items_count}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                          job.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {job.status === "Success" ? (
                            <>
                              <CheckCircle className="h-2.5 w-2.5" />
                              Success
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-2.5 w-2.5" />
                              Failed
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10 text-gray-500 font-mono">
                <Info className="h-8 w-8 mx-auto mb-2 text-gray-600 animate-pulse" />
                No synchronization runs logged in this session yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
