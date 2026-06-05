"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* LEFT GLOW */}

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]"
      />

      {/* CENTER BLUE */}

      <motion.div
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
      />

      {/* RIGHT GLOW */}

      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-[140px]"
      />

    </div>
  );
}