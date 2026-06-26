import { apiFetch } from "../lib/platform/api/config";

export interface OrgNode {
  id: string;
  label: string; // The category type in backend (e.g. Person, Team, Department)
  properties: {
    name?: string;
    role?: string;
    status?: string;
    priority?: string;
    version?: string;
    val?: number;
    [key: string]: any;
  };
}

export interface OrgEdge {
  source: string;
  target: string;
  predicate: string;
  properties?: Record<string, any>;
}

export interface OrgOverview {
  total_nodes: number;
  total_edges: number;
  health_report: {
    organizational_structure_summary: {
      total_departments: number;
      total_teams: number;
      total_personnel: number;
      total_projects: number;
      total_skills: number;
    };
    departmental_skill_coverage: Record<string, number>;
    overall_operational_risk: {
      score_percent: number;
      blocked_projects_count: number;
      rating: string;
    };
  };
  highlights: string[];
}

export interface OrgInsights {
  projects_depend_on_python: Array<{
    technology: string;
    tech_id: string;
    projects: string[];
  }>;
  teams_using_cuda: Array<{
    technology: string;
    tech_id: string;
    teams: string[];
  }>;
  project_owners: Array<{
    project_id: string;
    project_name: string;
    departments: string[];
    people: string[];
    lead: string;
  }>;
  missing_skills: Array<{
    project: string;
    project_id: string;
    missing_skills: string[];
    current_team_size: number;
  }>;
  blocked_projects: Array<{
    project: string;
    project_id: string;
    priority: string;
    reasons: string[];
  }>;
  obsolete_technologies: Array<{
    technology: string;
    tech_id: string;
    version: string;
    affected_projects: string[];
  }>;
  duplicate_documents: Array<{
    duplicate_document: string;
    duplicate_id: string;
    main_document: string;
    similarity: string;
    reasons: string;
  }>;
  workflow_bottlenecks: Array<{
    type: string;
    resource: string;
    resource_id: string;
    active_tasks_count: number;
    details: string;
  }>;
}

export interface OrgRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  action: string;
  impacted_entities: string[];
}

export interface OrgSimulationResult {
  success: boolean;
  scenario: string;
  target_id: string;
  target_name: string;
  target_type: string;
  risk_level: "Low" | "Medium" | "High";
  summary: string;
  affected_nodes_count: number;
  affected_nodes: Array<{
    id: string;
    name: string;
    type: string;
    relation: string;
  }>;
  dependency_chains: string[];
  error?: string;
}

export class OrganizationRepository {
  static async getOverview(): Promise<OrgOverview> {
    return apiFetch<OrgOverview>("/organization/overview");
  }

  static async getGraph(): Promise<{ nodes: OrgNode[]; edges: OrgEdge[] }> {
    return apiFetch<{ nodes: OrgNode[]; edges: OrgEdge[] }>("/organization/graph");
  }

  static async getInsights(): Promise<OrgInsights> {
    return apiFetch<OrgInsights>("/organization/insights");
  }

  static async getRecommendations(): Promise<OrgRecommendation[]> {
    return apiFetch<OrgRecommendation[]>("/organization/recommendations");
  }

  static async simulate(type: string, targetId: string): Promise<OrgSimulationResult> {
    return apiFetch<OrgSimulationResult>("/organization/simulate", {
      method: "POST",
      body: JSON.stringify({ type, targetId }),
    });
  }
}
