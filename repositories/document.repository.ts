import { apiFetch } from "../lib/platform/api/config";

export interface UploadResponse {
  status: string;
  chunks_created: number;
}

export class DocumentRepository {
  static async upload(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<UploadResponse>("/upload", {
      method: "POST",
      body: formData,
    });
  }
}
