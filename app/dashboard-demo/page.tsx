import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  Activity,
  Brain,
  Bot,
  ShieldCheck,
  Database,
  Workflow,
  ArrowUpRight,
} from "lucide-react";

export const metadata = {
  title: "Dashboard Demo — Chidakara",
};

const systems = [
  {
    title: "AI Infrastructure",
    value: "99.98%",
    status: "Operational",
    icon: Database,
  },

  {
    title: "Automation Systems",
    value: "248",
    status: "Realtime Active",
    icon: Workflow,
  },

  {
    title: "AI Predictions",
    value: "3.2M",
    status: "Daily Events",
    icon: Brain,
  },

  {
    title: "Security Layer",
    value: "Secure",
    status: "Protected",
    icon: ShieldCheck,
  },
];

const activityFeed = [
  "AI forecasting engine generated operational prediction",
  "Workflow orchestration pipeline synchronized successfully",
  "Enterprise monitoring infrastructure updated globally",
  "Realtime automation event processed successfully",
  "Neural intelligence analytics system calibrated",
];

export default function DashboardDemoPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-52 text-white">
      <BackgroundEffects />
        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

          <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        </div>

        {/* HERO */}

        <section className="relative z-10">

          <div className="mx-auto max-w-7xl">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">

              AI OPERATIONS DASHBOARD

            </p>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">

              Realtime Enterprise
              <span className="text-blue-500"> Intelligence Systems</span>

            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

              Advanced AI infrastructure monitoring, predictive analytics,
              automation orchestration, and enterprise operational intelligence
              engineered for modern organizations.

            </p>

          </div>

        </section>

        {/* TOP GRID */}

        <section className="relative z-10 py-24">

          <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.2fr_0.8fr]">

            {/* ANALYTICS PANEL */}

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">

                    SYSTEM ANALYTICS

                  </p>

                  <h2 className="mt-4 text-3xl font-semibold">

                    Enterprise Intelligence Grid

                  </h2>

                </div>

                <div className="flex items-center gap-3 rounded-full border border-green-500/20 bg-green-500/[0.08] px-5 py-2">

                  <div className="h-3 w-3 rounded-full bg-green-500" />

                  <p className="text-sm text-green-400">

                    LIVE

                  </p>

                </div>

              </div>

              {/* CHART */}

              <div className="mt-14">

                <div className="flex h-[320px] items-end gap-5">

                  {[45, 65, 35, 90, 70, 100, 85, 60, 95, 75].map(
                    (height, index) => (

                      <div
                        key={index}
                        className="relative flex-1 rounded-t-[1rem] bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 hover:opacity-80"
                        style={{
                          height: `${height}%`,
                        }}
                      >

                        <div className="absolute inset-0 rounded-t-[1rem] bg-white/10" />

                      </div>

                    )
                  )}

                </div>

                <div className="mt-8 flex justify-between text-sm text-gray-500">

                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>

                </div>

              </div>

            </div>

            {/* ACTIVITY FEED */}

            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">

                    LIVE ACTIVITY

                  </p>

                  <h2 className="mt-4 text-3xl font-semibold">

                    AI Event Feed

                  </h2>

                </div>

                <Activity className="h-7 w-7 text-blue-400" />

              </div>

              <div className="mt-12 space-y-5">

                {activityFeed.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
                  >

                    <div className="flex items-start gap-4">

                      <div className="mt-2 h-3 w-3 rounded-full bg-green-500" />

                      <p className="leading-relaxed text-gray-300">

                        {item}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* SYSTEM GRID */}

        <section className="relative z-10 py-10">

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">

            {systems.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">

                      <Icon className="h-7 w-7 text-blue-400" />

                    </div>

                    <ArrowUpRight className="h-5 w-5 text-gray-500" />

                  </div>

                  <p className="mt-10 text-sm uppercase tracking-[0.3em] text-cyan-400">

                    {item.title}

                  </p>

                  <h3 className="mt-5 text-5xl font-semibold">

                    {item.value}

                  </h3>

                  <p className="mt-5 text-gray-400">

                    {item.status}

                  </p>

                </div>

              );

            })}

          </div>

        </section>

        {/* AI AGENT PANEL */}

        <section className="relative z-10 py-28">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-14">

            <div className="grid gap-16 xl:grid-cols-[1fr_0.9fr]">

              {/* LEFT */}

              <div>

                <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">

                  AI AGENT NETWORK

                </p>

                <h2 className="mt-8 max-w-3xl text-5xl font-semibold leading-tight md:text-6xl">

                  Autonomous Enterprise Intelligence Infrastructure

                </h2>

                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-gray-400">

                  Chidakara AI systems coordinate predictive analytics,
                  workflow automation, enterprise monitoring,
                  and realtime infrastructure intelligence across
                  scalable operational ecosystems.

                </p>

              </div>

              {/* RIGHT */}

              <div className="grid gap-6 sm:grid-cols-2">

                {[
                  ["248+", "AI Pipelines"],
                  ["99%", "Realtime Reliability"],
                  ["24/7", "Autonomous Monitoring"],
                  ["3.2M", "Daily AI Events"],
                ].map(([number, label], index) => (

                  <div
                    key={index}
                    className="rounded-[2rem] border border-white/10 bg-black/30 p-8 transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
                  >

                    <h3 className="text-5xl font-semibold">

                      {number}

                    </h3>

                    <p className="mt-5 text-gray-400">

                      {label}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}