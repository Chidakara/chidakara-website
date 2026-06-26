"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded bg-white/[0.04] ${className}`} />
  );
}

export default function SkeletonLoader() {
  return (
    <div className="space-y-4 w-full p-6 border border-white/5 bg-white/[0.01] rounded-2xl">
      <Skeleton className="h-6 w-1/3 rounded-lg" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
    </div>
  );
}
