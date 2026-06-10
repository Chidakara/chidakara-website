import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VisualEffects from "@/components/VisualEffects";
import { solutions } from "@/lib/solutions";
import { notFound } from "next/navigation";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import AIChatDemo from "@/components/AIChatDemo";

import AnalyticsCharts from "@/components/AnalyticsCharts";
import AITerminal from "@/components/AITerminal";
import AINetwork from "@/components/AINetwork";
import ActivityFeed from "@/components/ActivityFeed";
export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const solution = solutions.find((item) => item.slug === slug);

  if (!solution) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pt-40 text-white">

        <VisualEffects />
       
     

        <section className="relative z-10 mx-auto max-w-6xl">

          <div className="rounded-[3rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              CHIDAKARA SOLUTIONS
            </p>

            <h1 className="mt-6 text-5xl font-semibold md:text-7xl">
              {solution.title}
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-400">
              {solution.description}
            </p>

            <div className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

              <h2 className="text-2xl font-semibold">
                System Overview
              </h2>

              <p className="mt-5 leading-relaxed text-gray-400">
                {solution.content}
              </p>

            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">

              {solution.features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="text-lg font-medium">
                    {feature}
                  </h3>
                </div>
              ))}


</div>
{/* BUSINESS OUTCOMES */}

<div className="mt-16">

  <h2 className="text-3xl font-semibold">
    Expected Business Outcomes
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    {[
      ["40%", "Faster Operations"],
      ["60%", "Reduced Manual Work"],
      ["24/7", "System Availability"],
    ].map(([value, label]) => (

      <div
        key={label}
        className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
      >
        <h3 className="text-4xl font-bold text-blue-400">
          {value}
        </h3>

        <p className="mt-4 text-gray-400">
          {label}
        </p>

      </div>

    ))}

  </div>
            </div>
            {/* AI DASHBOARD PREVIEW */}

<div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-blue-950/30 to-black p-8">

  <div className="flex flex-col gap-8 lg:flex-row">

    {/* LEFT PANEL */}

    <div className="flex-1">

      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        Realtime Infrastructure
      </p>

      <h2 className="mt-5 text-3xl font-semibold">
        Operational Intelligence Dashboard
      </h2>

      <p className="mt-6 max-w-2xl leading-relaxed text-gray-400">

        Intelligent infrastructure monitoring systems designed
        for realtime operational visibility, predictive analytics,
        workflow orchestration, and AI-driven automation.

      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">

        {[
          "Realtime Analytics",
          "AI Event Processing",
          "Workflow Orchestration",
          "Enterprise Monitoring",
        ].map((feature, index) => (

          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-gray-300"
          >
            {feature}
          </div>

        ))}

      </div>

    </div>

    {/* RIGHT PANEL */}

    <div className="flex-1">

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-xl">

        {/* TOP METRICS */}

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Uptime
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              99.99%
            </h3>

          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-4">

            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Events
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              3.2M
            </h3>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Workflows
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              48+
            </h3>

          </div>

        </div>

        {/* CHART */}

        <div className="mt-6 h-64 rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/[0.06] to-transparent" />

      </div>

    </div>

  </div>

</div>
<section className="mt-24">

  <h2 className="text-3xl font-semibold">
    Industries Using This Solution
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {[
      "Healthcare",
      "Finance",
      "Logistics",
      "Retail",
    ].map((industry) => (

      <div
        key={industry}
        className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
      >
        {industry}
      </div>

    ))}

  </div>

</section>
<section className="mt-20">
  <ActivityFeed />
</section>
<section className="mt-24">
  <AINetwork />
</section>
<section className="mt-24 pb-6">
  <AITerminal />
</section>
<section className="mt-24 pb-10">
  <AnalyticsCharts />
</section>
<section className="mt-24 pb-10">
  <AIChatDemo />
</section>
<section className="mt-24 text-center">

  <h2 className="text-4xl font-semibold">
    Ready To Build This System?
  </h2>

  <p className="mx-auto mt-6 max-w-2xl text-gray-400">
    Discuss architecture, integrations, deployment,
    and implementation with Chidakara.
  </p>

  <div className="mt-10">

    <a
      href="/contact"
      className="rounded-full bg-blue-600 px-8 py-4 font-medium"
    >
      Start Your Project
    </a>

  </div>

</section>
<section className="mt-24 pb-20">
  <LeadCaptureForm />
</section>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}