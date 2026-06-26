import { create } from "zustand";
import { DecisionService } from "../services/decision.service";
import {
  DecisionTemplate,
  ProposedDecision,
  StrategyComparison
} from "../repositories/decision.repository";

interface DecisionState {
  templates: DecisionTemplate[];
  selectedTemplateId: string;
  weights: Record<string, number>;
  activeAnalysis: ProposedDecision | null;
  activeComparison: StrategyComparison | null;
  activeReport: string;
  history: ProposedDecision[];
  isLoading: boolean;

  loadTemplatesAndHistory: () => Promise<void>;
  setSelectedTemplateId: (id: string) => void;
  setWeights: (weights: Record<string, number>) => void;
  runAnalysis: (type: string, customParams?: Record<string, any>) => Promise<void>;
}

export const useDecisionStore = create<DecisionState>((set, get) => ({
  templates: [],
  selectedTemplateId: "upgrade_software",
  weights: {
    business_impact: 0.25,
    technical_complexity: 0.15,
    risk: 0.20,
    cost: 0.15,
    time: 0.10,
    org_readiness: 0.15
  },
  activeAnalysis: null,
  activeComparison: null,
  activeReport: "",
  history: [],
  isLoading: false,

  loadTemplatesAndHistory: async () => {
    set({ isLoading: true });
    try {
      const [templates, history] = await Promise.all([
        DecisionService.getTemplates(),
        DecisionService.getHistory()
      ]);
      set({ templates, history, isLoading: false });
    } catch (error) {
      console.error("Failed to load decision intelligence templates/history:", error);
      set({ isLoading: false });
    }
  },

  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  
  setWeights: (weights) => set({ weights: { ...get().weights, ...weights } }),

  runAnalysis: async (type, customParams = {}) => {
    set({ isLoading: true, activeAnalysis: null, activeComparison: null, activeReport: "" });
    try {
      const currentWeights = get().weights;
      const [analysis, comparison, report] = await Promise.all([
        DecisionService.analyze(type, currentWeights, customParams),
        DecisionService.compare(type, currentWeights, customParams),
        DecisionService.generateReport(type, currentWeights, customParams)
      ]);

      // Reload history
      const history = await DecisionService.getHistory();

      set({
        activeAnalysis: analysis,
        activeComparison: comparison,
        activeReport: report,
        history,
        isLoading: false
      });
    } catch (error) {
      console.error("Failed running decision analysis:", error);
      set({ isLoading: false });
    }
  }
}));
