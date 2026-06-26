export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };
  
  // If the body is FormData, let the browser handle Content-Type & boundary
  if (options?.body instanceof FormData) {
    if (headers && typeof headers === 'object' && !Array.isArray(headers)) {
      const headersObj = headers as Record<string, string>;
      delete headersObj["Content-Type"];
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: options?.signal || controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;
      try {
        const errJson = await response.json();
        errorMessage = errJson.detail || errJson.message || errorMessage;
      } catch (e) {
        // ignore JSON parsing failure
      }
      throw new ApiError(errorMessage, response.status);
    }
    
    return await response.json() as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new ApiError("Request timed out or cancelled", 408);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || "Network connection failed. Please ensure the backend is running at " + API_BASE_URL);
  }
}
