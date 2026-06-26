import {
  ConnectorRepository,
  ConnectorInfo,
  ConnectorStatusSummary,
  SyncJobLog
} from "../repositories/connector.repository";

export class ConnectorService {
  static async listConnectors(): Promise<ConnectorInfo[]> {
    return ConnectorRepository.listConnectors();
  }

  static async connect(provider: string, config: Record<string, any>): Promise<boolean> {
    const res = await ConnectorRepository.connect(provider, config);
    return res.success;
  }

  static async disconnect(provider: string): Promise<boolean> {
    const res = await ConnectorRepository.disconnect(provider);
    return res.success;
  }

  static async sync(provider: string, mode: "full" | "incremental") {
    return ConnectorRepository.sync(provider, mode);
  }

  static async getStatusSummary(): Promise<ConnectorStatusSummary> {
    return ConnectorRepository.getStatusSummary();
  }

  static async getSyncHistory(): Promise<SyncJobLog[]> {
    const history = await ConnectorRepository.getSyncHistory();
    // Sort descending by timestamp
    return history.sort((a, b) => b.timestamp - a.timestamp);
  }
}
