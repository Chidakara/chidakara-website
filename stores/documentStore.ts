import { create } from "zustand";
import { DocumentService, Document } from "../services/document.service";
import { useWorkspaceStore } from "./workspaceStore";
import { usePlatformStore } from "./platformStore";

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  isUploading: boolean;
  uploadProgress: number;
  uploadStatusText: string;
  selectedDoc: Document | null;
  loadDocuments: () => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  reindexDocument: (id: string) => Promise<void>;
  setSelectedDoc: (doc: Document | null) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  isLoading: false,
  isUploading: false,
  uploadProgress: 0,
  uploadStatusText: "",
  selectedDoc: null,
  loadDocuments: async () => {
    set({ isLoading: true });
    const activeWsId = useWorkspaceStore.getState().activeWorkspaceId;
    const allDocs = await DocumentService.getDocuments();
    const filtered = allDocs.filter(d => d.workspaceId === activeWsId);
    set({ documents: filtered, isLoading: false });
    
    // Update platform global metrics count
    usePlatformStore.getState().updateMetrics({
      documentsIndexed: filtered.length
    });
  },
  uploadFile: async (file) => {
    set({ isUploading: true, uploadProgress: 0, uploadStatusText: "Uploading file bytes..." });
    
    try {
      const doc = await DocumentService.uploadDocument(file, (progress, status) => {
        set({
          uploadProgress: progress,
          uploadStatusText: status === "processing"
            ? "Analyzing document layout..."
            : status === "indexing"
            ? "Writing semantic embeddings..."
            : "Indexing completed."
        });
      });

      set((state) => ({
        documents: [doc, ...state.documents],
        isUploading: false,
        uploadProgress: 0,
        uploadStatusText: ""
      }));

      // Update metrics
      usePlatformStore.getState().updateMetrics({
        documentsIndexed: get().documents.length
      });
      usePlatformStore.getState().addActivity({
        type: "success",
        message: `Successfully indexed ${file.name}`
      });

    } catch (e: any) {
      set({ isUploading: false, uploadProgress: 0, uploadStatusText: "" });
      usePlatformStore.getState().addActivity({
        type: "warning",
        message: `Upload Failed: ${e.message || "FastAPI connection refused."}`
      });
    }
  },
  deleteDocument: async (id) => {
    const success = await DocumentService.deleteDocument(id);
    if (success) {
      set((state) => ({
        documents: state.documents.filter(d => d.id !== id),
        selectedDoc: state.selectedDoc?.id === id ? null : state.selectedDoc
      }));

      // Update metrics
      usePlatformStore.getState().updateMetrics({
        documentsIndexed: get().documents.length
      });
      usePlatformStore.getState().addActivity({
        type: "warning",
        message: `Deleted document from index (ID: ${id})`
      });
    }
  },
  reindexDocument: async (id) => {
    set((state) => ({
      documents: state.documents.map(d => d.id === id ? { ...d, status: "indexing", embeddingProgress: 0 } : d)
    }));

    await DocumentService.reindexDocument(id, (progress) => {
      set((state) => ({
        documents: state.documents.map(d => d.id === id ? { ...d, embeddingProgress: progress } : d)
      }));
    });

    set((state) => ({
      documents: state.documents.map(d => d.id === id ? { ...d, status: "online", embeddingProgress: 100 } : d)
    }));

    usePlatformStore.getState().addActivity({
      type: "info",
      message: `Re-indexed semantic embeddings for document (ID: ${id})`
    });
  },
  setSelectedDoc: (doc) => set({ selectedDoc: doc })
}));
