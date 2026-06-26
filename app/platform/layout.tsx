"use client";

import { useEffect } from "react";
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";
import { usePlatformStore } from "../../stores/platformStore";
import { useAssistantStore } from "../../stores/assistantStore";
import { useDocumentStore } from "../../stores/documentStore";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkflowStore } from "../../stores/workflowStore";
import { useDebuggerStore } from "../../stores/debuggerStore";
import { useGraphStore } from "../../stores/graphStore";
import { useMemoryStore } from "../../stores/memoryStore";
import { useWorkspaceStore } from "../../stores/workspaceStore";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = usePlatformStore();
  const loadSessions = useAssistantStore((s) => s.loadSessions);
  const loadDocuments = useDocumentStore((s) => s.loadDocuments);
  const loadSettings = useSettingsStore((s) => s.loadSettings);
  const loadWorkflows = useWorkflowStore((s) => s.loadWorkflows);
  const loadTraces = useDebuggerStore((s) => s.loadTraces);
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const loadMemory = useMemoryStore((s) => s.loadMemory);
  const loadWorkspaces = useWorkspaceStore((s) => s.loadWorkspaces);

  // Initialize mock stores data on mount
  useEffect(() => {
    const init = async () => {
      await loadWorkspaces();
      loadSessions();
      loadDocuments();
      loadSettings();
      loadWorkflows();
      loadTraces();
      loadGraph();
      loadMemory();
    };
    init();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Premium collapsable sidebar */}
      <Sidebar />

      {/* Header bar */}
      <Header />

      {/* Main content wrapper */}
      <div
        className={`pt-16 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "pl-20" : "pl-64"
        }`}
      >
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
