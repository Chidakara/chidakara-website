"use client";

import { motion } from "framer-motion";

const terminalLines = [
  "Initializing AI infrastructure...",
  "Connecting enterprise workflows...",
  "Realtime analytics synchronized.",
  "Monitoring operational intelligence.",
  "Automation pipelines active.",
  "AI systems running successfully.",
];

export default function AITerminal() {
  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-2xl">

      {/* TERMINAL TOP BAR */}

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
          CHIDAKARA TERMINAL
        </p>

      </div>

      {/* TERMINAL BODY */}

      <div className="relative overflow-hidden p-8 font-mono">

        {/* BACKGROUND GLOW */}

        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 space-y-5">

          {terminalLines.map((line, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >

              <span className="text-green-400">
                $
              </span>

              <span className="text-gray-300">
                {line}
              </span>

            </motion.div>

          ))}

          {/* CURSOR */}

          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="mt-6 h-5 w-3 rounded-sm bg-blue-500"
          />

        </div>

      </div>

    </section>
  );
}