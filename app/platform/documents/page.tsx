"use client";

import { useState, useRef } from "react";
import { useDocumentStore } from "../../../stores/documentStore";
import { useWorkspaceStore } from "../../../stores/workspaceStore";
import {
  FileText,
  Upload,
  Search,
  Trash2,
  RefreshCw,
  Clock,
  Layers,
  Database,
  CheckCircle,
  AlertCircle,
  FileCheck,
} from "lucide-react";

export default function DocumentsPage() {
  const {
    documents,
    isLoading,
    isUploading,
    uploadProgress,
    uploadStatusText,
    selectedDoc,
    uploadFile,
    deleteDocument,
    reindexDocument,
    setSelectedDoc
  } = useDocumentStore();

  const activeWorkspace = useWorkspaceStore((s) => s.workspaces.find(w => w.id === s.activeWorkspaceId));
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await uploadFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      
      {/* LEFT COLUMN: UPLOAD & SEARCH & LIST */}
      <div className="space-y-6">
        
        {/* DRAG & DROP UPLOAD */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          className={`group rounded-[2rem] border border-dashed p-10 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-blue-500 bg-blue-500/[0.04]"
              : "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.txt,.md,.json"
          />

          {isUploading ? (
            <div className="space-y-4 max-w-xs mx-auto">
              <Upload className="h-8 w-8 text-blue-500 animate-bounce mx-auto" />
              <div>
                <p className="text-xs font-semibold text-white">{uploadStatusText}</p>
                <div className="mt-2.5 w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="text-[10px] text-gray-500 font-mono mt-1">{uploadProgress}% Complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="h-8 w-8 text-gray-500 group-hover:text-blue-400 mx-auto transition-colors" />
              <div>
                <p className="text-sm font-semibold text-gray-300">Drag & drop files here, or click to upload</p>
                <p className="text-[10px] text-gray-500 mt-1">Supports PDF, TXT, MD, or JSON up to 10MB.</p>
              </div>
            </div>
          )}
        </div>

        {/* SEARCH & DOCS LIST */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-gray-400 font-mono">Document Catalogue</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Index files to vector stores for RAG queries.</p>
              </div>
              {activeWorkspace && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[9px] font-mono font-bold text-blue-400 self-start sm:self-center">
                  <Database className="h-3 w-3" />
                  Boundary: {activeWorkspace.name}
                </span>
              )}
            </div>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search file database..."
                className="w-full rounded-xl border border-white/10 bg-black py-2 pl-9 pr-4 text-xs text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* LIST */}
          <div className="space-y-3">
            {filteredDocs.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No indexed documents found matching queries.</p>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                    selectedDoc?.id === doc.id
                      ? "border-blue-500 bg-blue-500/[0.03] shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                      : "border-white/5 bg-white/[0.01] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 text-gray-400 shrink-0">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[200px]">{doc.name}</h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500 font-mono mt-1">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Chunks: {doc.chunkCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Embedding progress / reindex / delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <div className="flex items-center gap-2">
                      {doc.status === "online" ? (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                          <CheckCircle className="h-3 w-3" />
                          Online
                        </span>
                      ) : doc.status === "indexing" || doc.status === "processing" ? (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-[9px] font-mono text-blue-400 animate-pulse">
                            <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                            {doc.status}...
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">{doc.embeddingProgress}%</span>
                        </div>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[9px] font-mono font-bold text-rose-400">
                          <AlertCircle className="h-3 w-3" />
                          Failed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => reindexDocument(doc.id, () => {})}
                        disabled={doc.status === "indexing"}
                        className="rounded p-2 border border-white/5 bg-white/[0.01] hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                        title="Re-index embeddings"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="rounded p-2 border border-white/5 bg-white/[0.01] hover:bg-rose-500/10 hover:border-rose-500/20 text-gray-500 hover:text-rose-400 transition-colors"
                        title="Delete document"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: PREVIEW METADATA SIDEBAR */}
      <div className="rounded-3xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between shadow-lg h-full overflow-y-auto custom-scrollbar">
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-6">Metadata Inspector</h4>
          
          {selectedDoc ? (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-500 font-mono">Ingested Filename</p>
                <p className="text-sm font-semibold text-white mt-1 break-all">{selectedDoc.name}</p>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-mono">Upload Timestamp</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1 font-mono">
                  <Clock className="h-3.5 w-3.5 text-gray-600" />
                  <span>{selectedDoc.uploadDate}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-mono">File Size Details</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1 font-mono">
                  <Layers className="h-3.5 w-3.5 text-gray-600" />
                  <span>{selectedDoc.size}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <p className="text-[10px] text-gray-500 font-mono block mb-2">Extraction Attributes</p>
                {selectedDoc.metadata.author && (
                  <div className="text-xs text-gray-400 font-sans mt-1">
                    <span className="text-gray-500 font-mono uppercase text-[9px] block">Author</span>
                    {selectedDoc.metadata.author}
                  </div>
                )}
                {selectedDoc.metadata.keywords && (
                  <div className="text-xs text-gray-400 font-sans mt-3">
                    <span className="text-gray-500 font-mono uppercase text-[9px] block">Keywords</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedDoc.metadata.keywords.map((kw, i) => (
                        <span key={i} className="rounded bg-blue-500/10 px-2 py-0.5 text-[9px] font-mono text-blue-400">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-400 font-sans mt-3">
                  <span className="text-gray-500 font-mono uppercase text-[9px] block">Type</span>
                  {selectedDoc.metadata.fileType}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 leading-normal">
              Select a document from the left catalog checklist to inspect its metadata schema, chunks size, and extracted attributes.
            </p>
          )}
        </div>

        <div className="border-t border-white/5 pt-5 mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
          <Database className="h-4 w-4 text-gray-600" />
          <span>Ingested to ChromaDB vector namespace</span>
        </div>
      </div>

    </div>
  );
}
