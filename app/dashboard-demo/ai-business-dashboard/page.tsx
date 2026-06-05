"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import FadeUp from "@/components/FadeUp";
import Link from "next/link";

import {
  Activity,
  Bot,
  Cpu,
  Database,
  Radar,
  ArrowRight,
  Workflow,
} from "lucide-react";

const metrics = [
  {
    title: "AI Requests",
    value: "3.2M",
    change: "+18%",
  },

  {
    title: "Automation Pipelines",
    value: "48",
    change: "+12%",
  },

  {
    title: "System Uptime",
    value: "99.9%",
    change: "+0.4%",
  },

  {
    title: "Realtime Processing",
    value: "24/7",
    change: "ACTIVE",
  },
];

const activities = [
  "AI Agent completed workflow execution",
  "New enterprise lead qualified",
  "Realtime infrastructure stabilized",
  "Automation pipeline triggered",
  "Analytics engine processed 12K events",
];

export default function AIBusinessDashboardPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-52 text-white">

        <BackgroundEffects />

        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        </div>

        {/* HERO */}
        <FadeUp>

        <section className="relative z-10">

          <div className="mx-auto max-w-7xl">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
              AI BUSINESS DASHBOARD
            </p>

            <h1 className="mt-8 max-w-6xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">

              Enterprise Intelligence
              <span className="text-blue-500"> Monitoring Systems</span>

            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

              Realtime analytics infrastructure designed for intelligent operations,
              AI visibility, enterprise monitoring, predictive systems,
              and scalable automation ecosystems.

            </p>

            <div className="mt-12 flex flex-wrap gap-6">

              <Link
                href="/contact"
                className="rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500"
              >
                Start Building
              </Link>

              <Link
                href="/solutions"
                className="rounded-full border border-white/10 px-10 py-5 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
              >
                Explore Solutions
              </Link>

            </div>

          </div>

        </section>
        </FadeUp>

        {/* METRICS */}

        <FadeUp>
  <section className="relative z-10 py-28">

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">

            {metrics.map((metric, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500">

                      {metric.title}

                    </p>

                    <h2 className="mt-5 text-5xl font-bold text-white">

                      {metric.value}

                    </h2>

                  </div>

                  <div className="rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-4 py-2 text-sm text-blue-400">

                    {metric.change}

                  </div>

                </div>

                <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">

                  <div className="h-full w-4/5 rounded-full bg-blue-500" />

                </div>

              </div>

            ))}

          </div>

        </section>
        </FadeUp>

        {/* DASHBOARD GRID */}
        <FadeUp>
        <section className="relative z-10 pb-28">

          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-3">

            {/* LEFT */}

            <div className="space-y-8 xl:col-span-2">

              {/* ANALYTICS */}

              <div className="rounded-[2rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">

                      Realtime Analytics

                    </p>

                    <h2 className="mt-4 text-3xl font-semibold">

                      AI Infrastructure Monitoring

                    </h2>

                  </div>

                  <Activity className="text-blue-400" size={32} />

                </div>

                {/* FAKE CHART */}

                <div className="mt-14 flex h-[320px] items-end gap-4">

                  {[40, 65, 55, 80, 72, 95, 88, 100].map((height, index) => (

                    <div
                      key={index}
                      className="flex-1 rounded-t-3xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 hover:scale-y-105"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  ))}

                </div>

              </div>

              {/* PIPELINE */}

              <div className="rounded-[2rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">

                      AI PROCESSING FLOW

                    </p>

                    <h2 className="mt-4 text-3xl font-semibold">

                      Enterprise Automation Pipeline

                    </h2>

                  </div>

                  <Workflow className="text-blue-400" size={32} />

                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-4">

                  {[
                    "Data Input",
                    "AI Processing",
                    "Automation",
                    "Decision Engine",
                  ].map((step, index) => (

                    <div
                      key={index}
                      className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 text-center transition-all duration-500 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
                    >

                      <div className="mb-6 flex justify-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">

                          <Cpu className="text-blue-400" />

                        </div>

                      </div>

                      <h3 className="font-medium">

                        {step}

                      </h3>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-8">

              {/* LIVE FEED */}

              <div className="rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-semibold">

                    Live Activity

                  </h2>

                  <Radar className="text-blue-400" size={28} />

                </div>

                <div className="mt-10 space-y-5">

                  {activities.map((activity, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-blue-500/20"
                    >

                      <div className="flex items-start gap-4">

                        <div className="mt-1 h-3 w-3 rounded-full bg-blue-500" />

                        <p className="text-sm leading-relaxed text-gray-300">

                          {activity}

                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* SYSTEM STATUS */}

              <div className="rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-semibold">

                    System Status

                  </h2>

                  <Database className="text-blue-400" size={28} />

                </div>

                <div className="mt-10 space-y-6">

                  {[
                    ["AI Core", "Operational"],
                    ["Analytics Engine", "Stable"],
                    ["Infrastructure", "99.9%"],
                    ["Automation Runtime", "Active"],
                  ].map(([label, status], index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >

                      <span className="text-gray-300">

                        {label}

                      </span>

                      <span className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1 text-sm text-green-400">

                        {status}

                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>
        </FadeUp>

        {/* CTA */}
        <FadeUp>
        <section className="relative z-10 pb-20">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-14 text-center">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">

              BUILD WITH CHIDAKARA

            </p>

            <h2 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">

              Realtime AI Infrastructure
              for Modern Enterprises

            </h2>

            <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

              Chidakara develops intelligent analytics ecosystems,
              enterprise monitoring infrastructures,
              automation platforms,
              and scalable AI operational systems.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-6">

              <Link
                href="/contact"
                className="rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500"
              >
                Start a Project
              </Link>

              <Link
                href="/showcase"
                className="rounded-full border border-white/10 px-10 py-5 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
              >
                Explore Showcase
              </Link>

            </div>

          </div>

        </section>
        </FadeUp>

      </main>

      <Footer />
    </>
  );
}