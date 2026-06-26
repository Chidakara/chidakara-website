import { create } from "zustand";
import { AssistantService, Message, AssistantSession } from "../services/assistant.service";
import { useWorkspaceStore } from "./workspaceStore";
import { useDebuggerStore } from "./debuggerStore";

interface AssistantState {
  sessions: AssistantSession[];
  activeSessionId: string | null;
  isLoading: boolean;
  activeSteps: { name: string; status: "pending" | "running" | "completed"; logs: string[] }[];
  currentStreamingText: string;
  loadSessions: () => Promise<void>;
  createSession: (title: string) => Promise<void>;
  setActiveSessionId: (id: string) => void;
  sendMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
}

export const useAssistantStore = create<AssistantState>((set, get) => ({
  sessions: [],
  activeSessionId: null,
  isLoading: false,
  activeSteps: [],
  currentStreamingText: "",
  loadSessions: async () => {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    const allSessions = await AssistantService.getSessions();
    const filtered = allSessions.filter(s => s.workspaceId === activeWsId);
    set({
      sessions: filtered,
      activeSessionId: filtered[0]?.id || null
    });
  },
  createSession: async (title) => {
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId || "workspace-acme";
    const newSession = await AssistantService.createSession(title, activeWsId);
    set((state) => ({
      sessions: [newSession, ...state.sessions],
      activeSessionId: newSession.id
    }));
  },
  setActiveSessionId: (id) => set({ activeSessionId: id }),
  sendMessage: async (text) => {
    const sessionId = get().activeSessionId;
    if (!sessionId) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: [...s.messages, userMsg] } : s
      ),
      isLoading: true,
      currentStreamingText: "",
      activeSteps: [
        { name: "Planner Decomposition", status: "running", logs: ["Goal parser parsing goals...", "Running autonomous decomposition..."] }
      ]
    }));

    try {
      const assistantMsg = await AssistantService.streamResponse(
        text,
        (stepName, status, logs) => {
          set((state) => {
            const index = state.activeSteps.findIndex(s => s.name === stepName);
            let updatedSteps = [...state.activeSteps];
            
            if (index !== -1) {
              updatedSteps[index] = { ...updatedSteps[index], status, logs };
            } else {
              updatedSteps = updatedSteps.map(s => 
                s.status === "running" ? { ...s, status: "completed" as const } : s
              );
              updatedSteps.push({ name: stepName, status, logs });
            }
            return { activeSteps: updatedSteps };
          });
        },
        (chunkText) => {
          set({ currentStreamingText: chunkText });
        }
      );

      set((state) => {
        const updatedSessions = state.sessions.map((s) =>
          s.id === sessionId ? { ...s, messages: [...s.messages, assistantMsg] } : s
        );

        // Save updated sessions back to master list in local storage
        AssistantService.getSessions().then((allSessions) => {
          const nextMaster = allSessions.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, assistantMsg] } : s);
          AssistantService.saveSessions(nextMaster);
        });

        return {
          sessions: updatedSessions,
          isLoading: false,
          activeSteps: [],
          currentStreamingText: ""
        };
      });

      const traceId = assistantMsg.traceId;
      if (traceId) {
        setTimeout(() => {
          const loadTraces = useDebuggerStore.getState().loadTraces;
          if (loadTraces) loadTraces();
        }, 800);
      }
    } catch (e: any) {
      const errorMsg: Message = {
        id: `msg-err-${Date.now()}`,
        role: "assistant",
        content: `### ⚠️ Connection Error\n\nFailed to contact the backend service.\n\n**Details**: ${e.message || "Unknown communication error."}\n\n**Troubleshooting**:\n1. Check if the FastAPI service is running: \`uvicorn app:app --reload\`\n2. Verify the base connection URL: \`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}\``,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 0,
        sources: []
      };

      set((state) => {
        const updatedSessions = state.sessions.map((s) =>
          s.id === sessionId ? { ...s, messages: [...s.messages, errorMsg] } : s
        );
        
        AssistantService.getSessions().then((allSessions) => {
          const nextMaster = allSessions.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, errorMsg] } : s);
          AssistantService.saveSessions(nextMaster);
        });

        return {
          sessions: updatedSessions,
          isLoading: false,
          activeSteps: [],
          currentStreamingText: ""
        };
      });
    }
  },
  clearConversation: () => {
    const sessionId = get().activeSessionId;
    if (!sessionId) return;
    set((state) => {
      const updated = state.sessions.map((s) =>
        s.id === sessionId ? { ...s, messages: [] } : s
      );

      AssistantService.getSessions().then((allSessions) => {
        const nextMaster = allSessions.map(s => s.id === sessionId ? { ...s, messages: [] } : s);
        AssistantService.saveSessions(nextMaster);
      });

      return { sessions: updated };
    });
  }
}));
