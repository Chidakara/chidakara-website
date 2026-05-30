import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import MetricCard from "@/components/MetricCard";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "Showcase — Chidakara",
};
import Footer from "@/components/Footer";
import Link from "next/link";
export default function ShowcasePage() {

  return (

    <>
    
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-black px-6 pb-24 pt-40 text-white">

  <div className="mx-auto max-w-7xl">

    {/* HERO */}
    <Reveal>

    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/40 px-8 py-24 backdrop-blur-2xl md:px-16">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_65%)]" />

      <div className="relative z-10 max-w-4xl">

        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
          SYSTEM SHOWCASE
        </p>

        <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">

          Enterprise AI
          <br />
          Infrastructure Systems

        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400">

          Premium automation infrastructures, realtime analytics systems,
          operational intelligence platforms, and scalable AI workflow ecosystems
          engineered for modern enterprises.

        </p>

      </div>

    </section>
    </Reveal>
    {/* COMMAND CENTER */}
    <Reveal>
    <section className="py-24">

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">

        {/* LEFT PANEL */}

        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                LIVE SYSTEM
              </p>

              <h2 className="mt-4 text-4xl font-semibold">
                AI Command Center
              </h2>

            </div>

            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
              Systems Stable
            </div>

          </div>

          {/* CHART */}

          <div className="mt-16 flex h-[320px] items-end justify-between gap-4">

            {[40, 75, 55, 95, 72, 88, 98].map((height, i) => (

              <div
                key={i}
                className="group relative flex-1 overflow-hidden rounded-t-[30px] bg-gradient-to-t from-blue-600 via-cyan-400 to-cyan-200 transition-all duration-700 hover:scale-[1.02]"
                style={{
                  height: `${height}%`,
                }}
              >

                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-6">

          {[
            "AI Assistants",
            "Workflow Engine",
            "Infrastructure Core",
            "Realtime Analytics",
          ].map((item, index) => (

            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-medium">
                  {item}
                </h3>

                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />

              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{
                    width: `${70 + index * 7}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
    </Reveal>
    {/* METRICS */}
    <Reveal>
    <section className="py-24">

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {[
          ["48+", "AI Automations"],
          ["99.99%", "Infrastructure Uptime"],
          ["3.2M", "Realtime Data Events"],
          ["24/7", "Operational Monitoring"],
        ].map(([number, label], index) => (

          <MetricCard
  key={index}
  number={number}
  label={label}
/>

        ))}

      </div>

    </section>
    </Reveal>
    {/* WORKFLOW */}
    <Reveal>
    <section className="py-24">

      <div className="overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

        <div className="max-w-3xl">

          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
            AUTOMATION PIPELINE
          </p>

          <h2 className="text-5xl font-semibold leading-tight">
            Intelligent Operational Workflow Architecture
          </h2>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-4">

          {[
            "Data Input",
            "AI Processing",
            "Workflow Engine",
            "Insights & Scaling",
          ].map((step, index) => (

            <div
              key={index}
              className="relative rounded-3xl border border-white/10 bg-black/30 p-8"
            >

              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-xl font-semibold text-cyan-400">

                0{index + 1}

              </div>

              <h3 className="text-2xl font-semibold">
                {step}
              </h3>

              <p className="mt-4 leading-relaxed text-gray-400">

                Enterprise AI systems engineered for operational intelligence,
                scalable automation workflows, and intelligent infrastructure systems.

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
    </Reveal>
    {/* CTA */}
    <Reveal>
    <section className="pb-10">

      <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black px-8 py-20 text-center md:px-16">

        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
          BUILD WITH CHIDAKARA
        </p>

        <h2 className="mx-auto max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">

          AI Systems Designed
          <br />
          for Modern Enterprises

        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400">

          Premium operational intelligence platforms, infrastructure systems,
          automation ecosystems, and enterprise AI architectures engineered
          for scalable growth.

        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6">

          <Link
  href="/contact"
  className="rounded-full bg-blue-600 px-8 py-4 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500"
>
  Start Building
</Link>
          <button className="rounded-full border border-white/10 px-8 py-4 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]">
            Explore Systems
          </button>

        </div>

      </div>

    </section>
    </Reveal>
  </div>

</main>

      <Footer />

    </>

  );
}