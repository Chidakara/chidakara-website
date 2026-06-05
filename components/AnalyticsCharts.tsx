"use client";

import { motion } from "framer-motion";

const bars = [45, 72, 58, 90, 64, 78, 52];

export default function AnalyticsCharts() {
  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">

      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Realtime Analytics
          </p>

          <h2 className="mt-5 text-4xl font-semibold md:text-5xl">
            AI Infrastructure Monitoring
          </h2>

          <p className="mt-6 max-w-3xl leading-relaxed text-gray-400">

            Enterprise operational analytics systems designed for
            realtime infrastructure intelligence, predictive visibility,
            and automation monitoring.

          </p>

        </div>

        {/* METRIC */}

        <div className="rounded-[2rem] border border-blue-500/20 bg-blue-500/[0.06] px-8 py-6">

          <p className="text-sm uppercase tracking-[0.25em] text-gray-400">
            Processing Load
          </p>

          <h3 className="mt-4 text-5xl font-bold text-white">
            87%
          </h3>

        </div>

      </div>

      {/* CHART AREA */}

      <div className="mt-16 grid gap-8 lg:grid-cols-3">

        {/* BAR CHART */}

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">

          <div className="flex items-end justify-between gap-3 h-64">

            {bars.map((height, index) => (

              <motion.div
                key={index}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{
                  duration: 1,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="w-full rounded-t-2xl bg-gradient-to-t from-blue-600 to-cyan-400"
              />

            ))}

          </div>

          <p className="mt-6 text-sm text-gray-400">
            Infrastructure Traffic
          </p>

        </div>

        {/* METRICS */}

        <div className="space-y-6">

          {[
            ["AI Events", "3.2M+"],
            ["Automation Runs", "48K"],
            ["System Accuracy", "99.2%"],
          ].map(([label, value], index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
            >

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                {label}
              </p>

              <h3 className="mt-4 text-4xl font-semibold">
                {value}
              </h3>

            </motion.div>

          ))}

        </div>

        {/* LIVE GRAPH */}

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">

          <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">

            {/* GLOW */}

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            {/* LINE */}

            <svg
              viewBox="0 0 300 200"
              className="absolute inset-0 h-full w-full"
            >

              <motion.path
                d="M0 160 Q50 120 100 130 T200 90 T300 40"
                fill="none"
                stroke="rgba(59,130,246,0.9)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                }}
                viewport={{ once: true }}
              />

            </svg>

          </div>

          <p className="mt-6 text-sm text-gray-400">
            Predictive Intelligence Stream
          </p>

        </div>

      </div>

    </section>
  );
}