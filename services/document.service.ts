import { DocumentRepository } from "../repositories/document.repository";
import { useWorkspaceStore } from "../stores/workspaceStore";

export interface Document {
  id: string;
  workspaceId?: string;
  name: string;
  size: string;
  uploadDate: string;
  status: "processing" | "indexing" | "online" | "failed";
  chunkCount: number;
  embeddingProgress: number; // 0 to 100
  metadata: {
    author?: string;
    keywords?: string[];
    dimensions?: string;
    fileType: string;
  };
}

export class DocumentService {
  private static mockDocs: Document[] = [
    {
      id: "doc-1",
      workspaceId: "workspace-nvidia",
      name: "resume_nanda.pdf",
      size: "240 KB",
      uploadDate: "2026-06-25 11:30 AM",
      status: "online",
      chunkCount: 24,
      embeddingProgress: 100,
      metadata: { author: "Nanda Krishna", keywords: ["AI Engineer", "CUDA", "PyTorch"], fileType: "application/pdf" }
    },
    {
      id: "doc-2",
      workspaceId: "workspace-nvidia",
      name: "cuda_reference_v12.pdf",
      size: "4.8 MB",
      uploadDate: "2026-06-24 2:10 PM",
      status: "online",
      chunkCount: 382,
      embeddingProgress: 100,
      metadata: { author: "NVIDIA Corp", keywords: ["CUDA API", "Memory Management", "GPGPU"], fileType: "application/pdf" }
    },
    {
      id: "doc-acme-1",
      workspaceId: "workspace-acme",
      name: "telemetry_specs.pdf",
      size: "380 KB",
      uploadDate: "2026-06-25 10:30 AM",
      status: "online",
      chunkCount: 38,
      embeddingProgress: 100,
      metadata: { author: "System Extractor", keywords: ["Telemetry", "Memory", "Sensors"], fileType: "application/pdf" }
    },
    {
      id: "doc-sri-1",
      workspaceId: "workspace-sri",
      name: "recipe_standards.pdf",
      size: "1.2 MB",
      uploadDate: "2026-06-25 11:15 AM",
      status: "online",
      chunkCount: 84,
      embeddingProgress: 100,
      metadata: { author: "Quality Control", keywords: ["Food Safety", "Recipes"], fileType: "application/pdf" }
    },
    {
      id: "doc-sri-2",
      workspaceId: "workspace-sri",
      name: "logistics_report.pdf",
      size: "750 KB",
      uploadDate: "2026-06-24 4:15 PM",
      status: "online",
      chunkCount: 52,
      embeddingProgress: 100,
      metadata: { author: "Logistics Dept", keywords: ["Shipments", "Supply Chain"], fileType: "application/pdf" }
    }
  ];

  static async getDocuments(): Promise<Document[]> {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chidakara_documents");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return [...this.mockDocs];
  }

  static async saveDocuments(docs: Document[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem("chidakara_documents", JSON.stringify(docs));
    }
  }

  static async uploadDocument(
    file: File,
    onProgress: (progress: number, status: Document["status"]) => void
  ): Promise<Document> {
    onProgress(10, "processing");
    await new Promise(r => setTimeout(r, 200));
    onProgress(35, "processing");

    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId || "workspace-acme";

    try {
      // Trigger backend /upload endpoint
      const response = await DocumentRepository.upload(file);
      
      onProgress(70, "indexing");
      await new Promise(r => setTimeout(r, 300));
      
      const chunkCount = response.chunks_created || 0;
      
      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        workspaceId: activeWsId,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "online",
        chunkCount: chunkCount,
        embeddingProgress: 100,
        metadata: {
          fileType: file.type || "application/pdf",
          author: file.name.includes("nanda") ? "Nanda Krishna" : "System Extractor",
          keywords: ["Indexed", "Vector Space", `${chunkCount} Chunks`]
        }
      };

      const docs = await this.getDocuments();
      docs.unshift(newDoc);
      await this.saveDocuments(docs);
      
      onProgress(100, "online");
      return newDoc;
    } catch (error: any) {
      onProgress(0, "failed");
      throw new Error(error.message || "Failed to upload document to backend.");
    }
  }

  static async deleteDocument(id: string): Promise<boolean> {
    const docs = await this.getDocuments();
    const index = docs.findIndex(d => d.id === id);
    if (index === -1) return false;
    docs.splice(index, 1);
    await this.saveDocuments(docs);
    return true;
  }

  static async reindexDocument(id: string, onProgress: (progress: number) => void): Promise<boolean> {
    const docs = await this.getDocuments();
    const target = docs.find(d => d.id === id);
    if (!target) return false;

    target.status = "indexing";
    target.embeddingProgress = 0;

    for (let progress = 25; progress <= 100; progress += 25) {
      await new Promise(r => setTimeout(r, 200));
      target.embeddingProgress = progress;
      onProgress(progress);
    }

    target.status = "online";
    await this.saveDocuments(docs);
    return true;
  }
}
export type { Document };
