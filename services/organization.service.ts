import {
  OrganizationRepository,
  OrgOverview,
  OrgNode,
  OrgEdge,
  OrgInsights,
  OrgRecommendation,
  OrgSimulationResult
} from "../repositories/organization.repository";

export interface DisplayNode {
  id: string;
  label: string; // The display name
  type: string;  // Person, Technology, Project, etc.
  val: number;   // Weight
  properties: any;
  x: number;
  y: number;
}

export interface DisplayEdge {
  source: string;
  target: string;
  type: string;  // Predicate label
}

export class OrganizationService {
  static async getOverview(): Promise<OrgOverview> {
    return OrganizationRepository.getOverview();
  }

  static async getGraphData(): Promise<{ nodes: DisplayNode[]; edges: DisplayEdge[] }> {
    const rawData = await OrganizationRepository.getGraph();
    
    // Position nodes dynamically by grouping them into concentric layers or clusters based on type
    const typesOrder = [
      "Department", "Team", "Person", "Project", 
      "Task", "Technology", "Skill", "Document", 
      "Meeting", "Repository", "Policy", "Product",
      "Customer", "Vendor"
    ];

    const nodesByType: Record<string, OrgNode[]> = {};
    rawData.nodes.forEach(node => {
      const type = node.label || "Entity";
      if (!nodesByType[type]) {
        nodesByType[type] = [];
      }
      nodesByType[type].push(node);
    });

    const displayNodes: DisplayNode[] = [];
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    // Distribute categories radially
    let typeIndex = 0;
    const totalTypes = Object.keys(nodesByType).length;

    Object.entries(nodesByType).forEach(([type, nodes]) => {
      // Different radius for different types to form concentric circles
      const order = typesOrder.indexOf(type);
      const radius = order >= 0 ? 120 + order * 40 : 150 + typeIndex * 35;
      
      nodes.forEach((node, nodeIdx) => {
        const angle = (nodeIdx / nodes.length) * 2 * Math.PI + (typeIndex * (Math.PI / 4));
        const val = node.properties.val || 16;
        
        displayNodes.push({
          id: node.id,
          label: node.properties.name || node.id,
          type: type,
          val: Math.min(Math.max(val, 12), 25), // scale size between 12 and 25
          properties: node.properties,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius
        });
      });
      typeIndex++;
    });

    const displayEdges: DisplayEdge[] = rawData.edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      type: edge.predicate
    }));

    return { nodes: displayNodes, edges: displayEdges };
  }

  static async getInsights(): Promise<OrgInsights> {
    return OrganizationRepository.getInsights();
  }

  static async getRecommendations(): Promise<OrgRecommendation[]> {
    return OrganizationRepository.getRecommendations();
  }

  static async simulate(type: string, targetId: string): Promise<OrgSimulationResult> {
    return OrganizationRepository.simulate(type, targetId);
  }
}
