"use client";

import { motion } from "framer-motion";

const activities = [
  {
    title: "AI Workflow Executed",
    time: "2 seconds ago",
  },

  {
    title: "Realtime Analytics Updated",
    time: "12 seconds ago",
  },

  {
    title: "Enterprise Event Processed",
    time: "27 seconds ago",
  },

  {
    title: "Infrastructure Health Verified",
    time: "1 minute ago",
  },

  {
    title: "Automation Pipeline Triggered",
    time: "2 minutes ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Live Infrastructure
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-white">
            AI Activity Feed
          </h3>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-sm text-gray-400">
            Live
          </span>

        </div>

      </div>

      <div className="mt-10 space-y-4">

        {activities.map((activity, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
          >

            <div className="flex items-center gap-4">

              <div className="relative">

                <div className="h-3 w-3 rounded-full bg-blue-500" />

                <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-40" />

              </div>

              <p className="text-sm text-gray-200">
                {activity.title}
              </p>

            </div>

            <span className="text-xs text-gray-500">
              {activity.time}
            </span>

          </motion.div>

        ))}

      </div>

    </div>
  );
}