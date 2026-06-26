import { GraphRepository, GraphNode, GraphEdge } from "../repositories/graph.repository";

export class GraphService {
  static async getGraphData(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
    const data = await GraphRepository.getGraph();
    
    const nodes = data.nodes.map((n, idx) => {
      const angle = (idx / data.nodes.length) * 2 * Math.PI;
      const radius = 180;
      return {
        ...n,
        x: 400 + Math.cos(angle) * radius,
        y: 250 + Math.sin(angle) * radius
      };
    });

    return { nodes, edges: data.edges };
  }

  static async searchNodes(query: string): Promise<GraphNode[]> {
    return GraphRepository.search(query);
  }
}
export type { GraphNode, GraphEdge };
