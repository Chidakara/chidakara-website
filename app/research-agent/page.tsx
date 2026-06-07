"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function ResearchAgentPage() {
  const [report, setReport] = useState<any>(null);

  const reports = {
  ecommerce: {
    industry: "E-Commerce",
    trends: "AI personalization, predictive recommendations, conversational commerce.",
    competitors: "Heavy investment in customer experience and automation.",
    growth: "Upselling, retention programs, intelligent product discovery.",
    risks: "High acquisition costs and increasing competition.",
  },

  healthcare: {
    industry: "Healthcare",
    trends: "Digital health systems, patient automation, AI diagnostics.",
    competitors: "Large providers investing in operational intelligence.",
    growth: "Patient support systems and workflow automation.",
    risks: "Regulatory compliance and data security.",
  },

  logistics: {
    industry: "Logistics",
    trends: "Route optimization, real-time visibility, predictive analytics.",
    competitors: "Automation-first logistics providers.",
    growth: "Fleet intelligence and operational dashboards.",
    risks: "Fuel volatility and supply chain disruptions.",
  },
};

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">

        <div className="mx-auto max-w-6xl">

          <div className="mb-16 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
              AI AGENT DEMONSTRATION
            </p>

            <h1 className="text-5xl md:text-7xl font-semibold">
              Research Agent
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Analyze industries, identify operational challenges,
              and discover AI implementation opportunities.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <h3 className="mb-6 text-xl font-semibold">
                Industry Research
              </h3>

              <div className="space-y-3">

                <button
                  onClick={() => setReport(reports.ecommerce)}
                  className="w-full rounded-2xl border border-white/10 p-4 text-left hover:border-blue-500"
                >
                  E-Commerce
                </button>

                <button
                  onClick={() => setReport(reports.healthcare)}
                  className="w-full rounded-2xl border border-white/10 p-4 text-left hover:border-blue-500"
                >
                  Healthcare
                </button>

                <button
                  onClick={() => setReport(reports.logistics)}
                  className="w-full rounded-2xl border border-white/10 p-4 text-left hover:border-blue-500"
                >
                  Logistics
                </button>

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <h3 className="mb-6 text-2xl font-semibold">
  Research Report
</h3>

{report ? (

  <div className="grid gap-6 md:grid-cols-2">

    <div className="rounded-2xl border border-white/10 p-6">
      <h4 className="mb-3 text-xl font-semibold">
        Market Trends
      </h4>

      <p className="text-gray-400">
        {report.trends}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 p-6">
      <h4 className="mb-3 text-xl font-semibold">
        Competitor Analysis
      </h4>

      <p className="text-gray-400">
        {report.competitors}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 p-6">
      <h4 className="mb-3 text-xl font-semibold">
        Growth Opportunities
      </h4>

      <p className="text-gray-400">
        {report.growth}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 p-6">
      <h4 className="mb-3 text-xl font-semibold">
        Risk Factors
      </h4>

      <p className="text-gray-400">
        {report.risks}
      </p>
    </div>

  </div>

) : (

  <p className="text-gray-500">
    Select an industry to generate a research report.
  </p>

)}
<div className="mt-10">

  <a
    href="/contact?source=research-agent"
    className="rounded-full bg-blue-600 px-8 py-4 font-medium"
  >
    Discuss Findings
  </a>

</div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}