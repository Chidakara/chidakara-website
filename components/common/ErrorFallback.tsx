"use client";

import { AlertOctagon, RefreshCw } from "lucide-react";

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorFallback({ message, onRetry }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] border border-rose-500/10 bg-rose-500/[0.02] text-center max-w-md mx-auto space-y-4 my-6 backdrop-blur-md">
      <div className="h-12 w-12 rounded-full border border-rose-500/20 bg-rose-500/10 flex items-center justify-center text-rose-400">
        <AlertOctagon className="h-6 w-6 animate-pulse" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">System Connection Error</h4>
        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
          {message || "The platform was unable to communicate with the FastAPI backend. Check that the service is running at localhost:8000."}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white transition-all hover:bg-white/[0.05]"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry Connection
        </button>
      )}
    </div>
  );
}
