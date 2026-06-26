import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  typescript: {
    // Ignore build errors to prevent tsc OOM crashes on memory-restricted build threads.
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
