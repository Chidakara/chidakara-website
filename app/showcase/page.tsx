import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  Brain,
  MonitorSmartphone,
  Workflow,
  Bot,
  Database,
  Radar,
} from "lucide-react";

export const metadata = {
  title: "Showcase — Chidakara",
};

const showcaseItems = [
  {
    title: "AI Operations Dashboard",
    description:
      "Realtime enterprise monitoring systems powered by predictive intelligence and AI analytics.",
    icon: MonitorSmartphone,
    tag: "Realtime Intelligence",
  },

  {
    title: "Autonomous AI Agents",
    description:
      "Enterprise AI agents capable of workflow execution, automation orchestration, and operational reasoning.",
    icon: Bot,
    tag: "AI Agents",
  },

  {
    title: "Workflow Automation Engine",
    description:
      "AI-driven orchestration pipelines connecting enterprise infrastructure, alerts, and intelligent actions.",
    icon: Workflow,
    tag: "Automation Systems",
  },

  {
    title: "Predictive Intelligence",
    description:
      "Advanced analytics systems designed for forecasting, anomaly detection, and operational optimization.",
    icon: Brain,
    tag: "Predictive AI",
  },

  {
    title: "Enterprise Data Infrastructure",
    description:
      "Scalable AI-ready data ecosystems engineered for analytics, monitoring, and intelligent decision systems.",
    icon: Database,
    tag: "Infrastructure",
  },

  {
    title: "AI Surveillance & Monitoring",
    description:
      "Realtime AI visibility systems designed for operational awareness and enterprise monitoring.",
    icon: Radar,
    tag: "Operational Visibility",
  },
];

export default function ShowcasePage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-52 text-white">
      <BackgroundEffects />
        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

          <div className="absolute right-0 top-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        </div>

        {/* HERO */}

        <section className="relative z-10">

          <div className="mx-auto max-w-7xl text-center">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">

              ENTERPRISE SHOWCASE

            </p>

            <h1 className="mx-auto mt-8 max-w-6xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">

              Futuristic AI Infrastructure
              <span className="text-blue-500"> Engineered for Scale</span>

            </h1>

            <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

              Explore intelligent ecosystems, automation architectures,
              AI monitoring systems, and enterprise-grade operational platforms
              built for modern organizations.

            </p>

          </div>

        </section>

        {/* SHOWCASE GRID */}

        <section className="relative z-10 py-28">

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">

            {showcaseItems.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-blue-500/[0.03] hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]"
                >

                  {/* TOP VISUAL */}

                  <div className="relative mb-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-8">

                    <div className="absolute inset-0 opacity-40">

                      <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

                    </div>

                    <div className="relative z-10 flex items-center justify-between">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">

                        <Icon className="h-8 w-8 text-blue-400" />

                      </div>

                      <div className="rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-4 py-2 text-xs uppercase tracking-[0.25em] text-blue-400">

                        {item.tag}

                      </div>

                    </div>

                    {/* FAKE DASHBOARD */}

                    <div className="relative z-10 mt-10 space-y-4">

                      <div className="h-3 w-full rounded-full bg-white/10" />

                      <div className="h-3 w-4/5 rounded-full bg-blue-500/40" />

                      <div className="h-3 w-3/5 rounded-full bg-white/10" />

                      <div className="mt-8 grid grid-cols-3 gap-3">

                        <div className="h-16 rounded-2xl border border-white/10 bg-white/[0.03]" />

                        <div className="h-16 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05]" />

                        <div className="h-16 rounded-2xl border border-white/10 bg-white/[0.03]" />

                      </div>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <h2 className="text-2xl font-semibold">

                    {item.title}

                  </h2>

                  <p className="mt-5 leading-relaxed text-gray-400">

                    {item.description}

                  </p>

                </div>

              );

            })}

          </div>

        </section>

        {/* FEATURE STRIP */}

        <section className="relative z-10 py-10">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-2xl">

            <div className="grid gap-8 p-10 md:grid-cols-2 xl:grid-cols-4">

              {[
                ["48+", "Enterprise Deployments"],
                ["24/7", "Realtime Monitoring"],
                ["3.2M", "AI Events Processed"],
                ["99%", "Infrastructure Reliability"],
              ].map(([number, label], index) => (

                <div
                  key={index}
                  className="rounded-[2rem] border border-white/10 bg-black/30 p-8 transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
                >

                  <h3 className="text-5xl font-bold text-white">

                    {number}

                  </h3>

                  <p className="mt-4 text-gray-400">

                    {label}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="relative z-10 pb-10 pt-28">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-14 text-center">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">

              BUILD THE FUTURE

            </p>

            <h2 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">

              AI Systems Designed
              for Intelligent Enterprises

            </h2>

            <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

              Chidakara engineers scalable AI ecosystems,
              automation infrastructures, enterprise analytics,
              and intelligent operational systems for modern businesses.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-6">

              <button className="rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500">

                Start Building

              </button>

              <button className="rounded-full border border-white/10 px-10 py-5 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]">

                View AI Systems

              </button>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}