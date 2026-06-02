"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
const workflowSteps = [
  {
    title: "Data Intake",
    description:
      "Realtime ingestion pipelines collecting operational, customer, and infrastructure data.",
  },
  {
    title: "AI Processing",
    description:
      "Machine learning systems analyze workflows, detect patterns, and optimize operations.",
  },
  {
    title: "Automation Engine",
    description:
      "Intelligent orchestration systems trigger actions, routing, and enterprise workflows.",
  },
  {
    title: "Analytics Layer",
    description:
      "Realtime dashboards visualize KPIs, infrastructure metrics, and predictive insights.",
  },
];

export default function WorkflowVisualizerPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-black px-6 pb-32 pt-40 text-white">
        <BackgroundEffects />

        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        </div>

        {/* HERO */}

        <section className="relative z-10 mx-auto max-w-6xl text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
            AI WORKFLOW VISUALIZER
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">

            Enterprise
            <span className="text-blue-500"> AI Pipelines</span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">

            Visualize intelligent automation systems, AI infrastructure,
            realtime operational pipelines, and scalable enterprise workflows.

          </p>

        </section>

        {/* WORKFLOW */}

        <section className="relative z-10 mx-auto mt-28 max-w-6xl">

          <div className="grid gap-10 md:grid-cols-4">

            {workflowSteps.map((step, index) => (

              <div
                key={index}
                className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >

                {/* STEP NUMBER */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-xl font-bold text-blue-400">

                  {index + 1}

                </div>

                {/* CONNECTOR */}

                {index !== workflowSteps.length - 1 && (

                  <div className="absolute left-full top-1/2 hidden h-[2px] w-10 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 md:block" />

                )}

                <h2 className="mt-8 text-2xl font-bold">
                  {step.title}
                </h2>

                <p className="mt-5 leading-8 text-gray-400">
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* DASHBOARD MOCK */}

        <section className="relative z-10 mx-auto mt-32 max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

          <div className="flex items-center justify-between border-b border-white/10 pb-6">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                SYSTEM STATUS
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Infrastructure Monitoring
              </h2>

            </div>

            <div className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm text-green-400">
              Systems Online
            </div>

          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">

            {[
              ["99.98%", "Infrastructure Uptime"],
              ["3.2M", "Realtime Data Events"],
              ["124", "Active AI Automations"],
            ].map(([number, label], index) => (

              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-black/30 p-8"
              >

                <h3 className="text-4xl font-bold text-blue-500">
                  {number}
                </h3>

                <p className="mt-3 text-gray-400">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="relative z-10 mx-auto mt-32 max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-14 text-center">

          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
            BUILD INTELLIGENT SYSTEMS
          </p>

          <h2 className="mt-6 text-5xl font-bold">
            Engineer Enterprise AI Infrastructure
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">

            Chidakara develops enterprise automation systems,
            predictive analytics platforms, AI assistants,
            and intelligent operational ecosystems.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6">

            <button className="rounded-full bg-blue-600 px-8 py-4 font-medium transition-all duration-300 hover:bg-blue-500">
              Start AI Project
            </button>

            <button className="rounded-full border border-white/10 px-8 py-4 font-medium transition-all duration-300 hover:bg-white/[0.03]">
              Schedule Consultation
            </button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}