"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SalesAgentPage() {
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [challenge, setChallenge] = useState("");

  const completed = industry && companySize && challenge;

  const getRecommendation = () => {
    if (
      challenge === "Manual Work" ||
      challenge === "Operations"
    ) {
      return {
        solution: "Workflow Automation Platform",
        timeline: "4-8 Weeks",
      };
    }

    if (challenge === "Customer Support") {
      return {
        solution: "AI Customer Support Agent",
        timeline: "2-4 Weeks",
      };
    }

    if (challenge === "Reporting") {
      return {
        solution: "AI Business Dashboard",
        timeline: "3-6 Weeks",
      };
    }

    return {
      solution: "Lead Qualification Agent",
      timeline: "2-4 Weeks",
    };
  };

  const recommendation = getRecommendation();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
              AI AGENT DEMONSTRATION
            </p>

            <h1 className="text-5xl md:text-7xl font-semibold">
              Sales Agent
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Analyze business requirements, identify operational challenges,
and receive AI-powered solution recommendations.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[350px_1fr]">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

              <h3 className="mb-6 text-xl font-semibold">
                Business Profile
              </h3>

              <div className="space-y-6">

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Industry
                  </label>

                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <option value="">Select Industry</option>
                    <option>Healthcare</option>
                    <option>Logistics</option>
                    <option>Finance</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Company Size
                  </label>

                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <option value="">Select Size</option>
                    <option>Startup</option>
                    <option>Small Business</option>
                    <option>Mid-Market</option>
                    <option>Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Primary Challenge
                  </label>

                  <select
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <option value="">Select Challenge</option>
                    <option>Manual Work</option>
                    <option>Customer Support</option>
                    <option>Reporting</option>
                    <option>Lead Management</option>
                    <option>Operations</option>
                  </select>
                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              {!completed ? (
                <div className="flex h-full items-center justify-center text-center text-gray-500">
                  Complete the business profile to generate recommendations.
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
                    RECOMMENDATION
                  </p>

                  <h2 className="mb-8 text-4xl font-semibold">
                    {recommendation.solution}
                  </h2>

                  <div className="space-y-8">

                    <div>
                      <p className="mb-2 text-sm text-gray-500">
                        Reasoning
                      </p>

                      <p className="text-gray-300">
                        Based on your selected industry, company size,
                        and business challenge, this solution is expected
                        to deliver the highest operational impact.
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-sm text-gray-500">
                        Suggested Next Steps
                      </p>

                      <ul className="space-y-2 text-gray-300">
                        <li>• Business Process Analysis</li>
                        <li>• Solution Architecture</li>
                        <li>• AI Integration</li>
                        <li>• Deployment & Testing</li>
                      </ul>
                    </div>

                    <div>
                      <p className="mb-2 text-sm text-gray-500">
                        Estimated Timeline
                      </p>

                      <p className="text-xl">
                        {recommendation.timeline}
                      </p>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-4">

 <a
  href="/contact?source=sales-agent"
  className="rounded-full bg-blue-600 px-8 py-4 font-medium transition hover:bg-blue-500"
>
  Request Proposal
</a>
  <button
    className="rounded-full border border-white/10 px-8 py-4 transition hover:border-blue-500"
  >
    Schedule Consultation
  </button>

</div>
                    <div>
  <p className="mb-2 text-sm text-gray-500">
    Qualification Score
  </p>

  <p className="text-xl text-cyan-400">
    91% Match
  </p>
</div>



<div>
  <p className="mb-2 text-sm text-gray-500">
    Expected ROI
  </p>

  <p className="text-xl text-green-400">
    High Impact Opportunity
  </p>
</div>

                  </div>
                </>
              )}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}