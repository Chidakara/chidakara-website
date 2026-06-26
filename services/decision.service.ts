import {
  DecisionRepository,
  DecisionTemplate,
  ProposedDecision,
  StrategyComparison
} from "../repositories/decision.repository";

export class DecisionService {
  static async getTemplates(): Promise<DecisionTemplate[]> {
    return DecisionRepository.getTemplates();
  }

  static async analyze(type: string, weights: Record<string, number>, customParams: Record<string, any> = {}): Promise<ProposedDecision> {
    return DecisionRepository.analyze(type, weights, customParams);
  }

  static async compare(type: string, weights: Record<string, number>, customParams: Record<string, any> = {}): Promise<StrategyComparison> {
    return DecisionRepository.compare(type, weights, customParams);
  }

  static async generateReport(type: string, weights: Record<string, number>, customParams: Record<string, any> = {}): Promise<string> {
    const res = await DecisionRepository.generateReport(type, weights, customParams);
    return res.report;
  }

  static async getHistory(): Promise<ProposedDecision[]> {
    return DecisionRepository.getHistory();
  }
}
