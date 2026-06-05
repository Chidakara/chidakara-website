"use client";

import { motion } from "framer-motion";

const messages = [
  {
    role: "user",
    text: "Generate enterprise automation workflow.",
  },

  {
    role: "ai",
    text: "AI workflow generated successfully. Integrating realtime analytics and operational monitoring.",
  },

  {
    role: "user",
    text: "Enable predictive intelligence systems.",
  },

  {
    role: "ai",
    text: "Predictive analytics engine activated. Monitoring infrastructure events continuously.",
  },
];

export default function AIChatDemo() {
  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/50 backdrop-blur-2xl">

      {/* TOP BAR */}

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            AI Assistant
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Chidakara Intelligence
          </h2>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-sm text-gray-400">
            Live AI
          </span>

        </div>

      </div>

      {/* CHAT AREA */}

      <div className="space-y-6 p-6">

        {messages.map((message, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            viewport={{ once: true }}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-white/10 bg-white/[0.03] text-gray-300"
              }`}
            >

              {message.text}

            </div>

          </motion.div>

        ))}

        {/* INPUT */}

        <div className="mt-10 flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-4">

          <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />

          <p className="text-sm text-gray-500">
            Ask Chidakara AI anything...
          </p>

        </div>

      </div>

    </section>
  );
}