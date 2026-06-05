"use client";

import { motion } from "framer-motion";

const nodes = [
  { top: "12%", left: "18%" },
  { top: "30%", left: "72%" },
  { top: "58%", left: "25%" },
  { top: "70%", left: "78%" },
  { top: "42%", left: "50%" },
];

export default function AINetwork() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

      {/* HEADER */}

      <div className="relative z-10">

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
          AI NETWORK
        </p>

        <h2 className="mt-5 text-4xl font-semibold md:text-5xl">
          Intelligent Infrastructure Connectivity
        </h2>

        <p className="mt-6 max-w-3xl leading-relaxed text-gray-400">

          Enterprise AI systems connected through intelligent
          automation pipelines, realtime monitoring,
          predictive analytics, and operational intelligence layers.

        </p>

      </div>

      {/* NETWORK AREA */}

      <div className="relative mt-20 h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/20 to-black">

        {/* GRID */}

        <div className="absolute inset-0 opacity-[0.06]">

          <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:50px_50px]" />

        </div>

        {/* CENTER GLOW */}

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        {/* CONNECTION LINES */}

        <svg className="absolute inset-0 h-full w-full">

          <line
            x1="20%"
            y1="20%"
            x2="50%"
            y2="42%"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="2"
          />

          <line
            x1="50%"
            y1="42%"
            x2="72%"
            y2="30%"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="2"
          />

          <line
            x1="50%"
            y1="42%"
            x2="25%"
            y2="58%"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="2"
          />

          <line
            x1="50%"
            y1="42%"
            x2="78%"
            y2="70%"
            stroke="rgba(59,130,246,0.3)"
            strokeWidth="2"
          />

        </svg>

        {/* NODES */}

        {nodes.map((node, index) => (

          <motion.div
            key={index}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.4,
            }}
            className="absolute"
            style={{
              top: node.top,
              left: node.left,
            }}
          >

            <div className="relative">

              <div className="h-5 w-5 rounded-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.9)]" />

              <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-40" />

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}