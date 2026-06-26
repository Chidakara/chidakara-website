import { apiFetch } from "../lib/platform/api/config";

export interface DecisionTemplate {
  id: string;
  name: string;
  description: string;
}

export interface DecisionRisk {
  name: string;
  description: string;
  probability: number;
  impact: number;
  mitigation: string;
}

export interface DecisionAlternative {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  estimated_cost: string;
  estimated_time: string;
}

export interface DecisionActionItem {
  task: string;
  owner: string;
  timeline: string;
  kpi: string;
}

export interface ProposedDecision {
  id: string;
  decision_type: string;
  problem_statement: string;
  context: string;
  evidence: string[];
  supporting_knowledge: string[];
  affected_teams: string[];
  affected_projects: string[];
  dependencies: string[];
  risks: DecisionRisk[];
  benefits: string[];
  alternatives: DecisionAlternative[];
  recommended_option: string;
  confidence: number;
  action_plan: DecisionActionItem[];
  estimated_impact: string;
  scores: Record<string, number>;
}

export interface StrategyComparison {
  decision_id: string;
  decision_type: string;
  recommended_option: string;
  recommended_strategy_profile: string;
  recommended_strategy_explanation: string;
  comparisons: Record<
    string,
    {
      aggregate_score: number;
      weights: Record<string, number>;
    }
  >;
  summaries: Record<string, string>;
}

export class DecisionRepository {
  static async getTemplates(): Promise<DecisionTemplate[]> {
    return apiFetch<DecisionTemplate[]>("/decision/templates");
  }

  static async analyze(type: string, weights: Record<string, number>, customParams: Record<string, any>): Promise<ProposedDecision> {
    return apiFetch<ProposedDecision>("/decision/analyze", {
      method: "POST",
      body: JSON.stringify({ type, weights, customParams }),
    });
  }

  static async compare(type: string, weights: Record<string, number>, customParams: Record<string, any>): Promise<StrategyComparison> {
    return apiFetch<StrategyComparison>("/decision/compare", {
      method: "POST",
      body: JSON.stringify({ type, weights, customParams }),
    });
  }

  static async generateReport(type: string, weights: Record<string, number>, customParams: Record<string, any>): Promise<{ report: string }> {
    return apiFetch<{ report: string }>("/decision/report", {
      method: "POST",
      body: JSON.stringify({ type, weights, customParams }),
    });
  }

  static async getHistory(): Promise<ProposedDecision[]> {
    return apiFetch<ProposedDecision[]>("/decision/history");
  }
}
