"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    number: "3.2M+",
    label: "AI Events Processed",
  },
  {
    number: "99.99%",
    label: "System Uptime",
  },
  {
    number: "48+",
    label: "Enterprise Workflows",
  },
  {
    number: "24/7",
    label: "Realtime Monitoring",
  },
];

export default function LiveMetrics() {
  return (
    <section className="relative z-10 px-6 py-28">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ENTERPRISE METRICS
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
            AI Infrastructure
            <span className="text-blue-500"> Operating at Scale</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            Realtime intelligent systems engineered for scalability,
            operational visibility, predictive intelligence, and enterprise automation.
          </p>

        </div>

        {/* GRID */}

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {metrics.map((metric, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
            >

              {/* GLOW */}

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

              {/* NUMBER */}

              <h3 className="relative z-10 text-5xl font-bold text-white">

                {metric.number}

              </h3>

              {/* LABEL */}

              <p className="relative z-10 mt-4 text-lg text-gray-400">

                {metric.label}

              </p>

              {/* BOTTOM LINE */}

              <div className="relative z-10 mt-10 h-[2px] w-full overflow-hidden rounded-full bg-white/10">

                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="h-full w-1/3 bg-blue-500"
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}