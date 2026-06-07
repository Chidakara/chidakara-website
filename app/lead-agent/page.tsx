"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LeadAgentPage() {
  const [step, setStep] = useState(1);

  const [projectType, setProjectType] = useState("");
  const [challenge, setChallenge] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const [completed, setCompleted] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">

        <div className="mx-auto max-w-5xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
              AI AGENT DEMONSTRATION
            </p>

            <h1 className="text-5xl font-semibold md:text-7xl">
              Lead Qualification Agent
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Interact with an AI qualification agent that analyzes
business needs, identifies challenges, and recommends
the most suitable Chidakara solution.
            </p>
          </div>

          {!completed && (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">

              <div className="mb-10">
                <div className="mb-3 flex justify-between text-sm text-gray-400">
                  <span>Qualification Progress</span>
                  <span>{step}/4</span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-700"
                    style={{
                      width: `${(step / 4) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {step === 1 && (
                <>
                  <h2 className="mb-6 text-3xl font-semibold">
                    What type of solution are you looking for?
                  </h2>

                  <div className="grid gap-4">
                    {[
                      "AI Assistant",
                      "Workflow Automation",
                      "AI Dashboard",
                      "Custom AI System",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setProjectType(item);
                          setStep(2);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-500"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="mb-6 text-3xl font-semibold">
                    What challenge are you trying to solve?
                  </h2>

                  <div className="grid gap-4">
                    {[
                      "Too Much Manual Work",
                      "Customer Support Bottlenecks",
                      "Poor Reporting & Visibility",
                      "Lead Management Problems",
                      "Workflow Inefficiencies",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setChallenge(item);
                          setStep(3);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-500"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="mb-6 text-3xl font-semibold">
                    What is your expected budget?
                  </h2>

                  <div className="grid gap-4">
                    {[
                      "Not Sure Yet",
                      "₹25,000 - ₹50,000",
                      "₹50,000 - ₹1,00,000",
                      "₹1,00,000 - ₹3,00,000",
                      "₹3,00,000+",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setBudget(item);
                          setStep(4);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-500"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="mb-6 text-3xl font-semibold">
                    What timeline are you targeting?
                  </h2>

                  <div className="grid gap-4">
                    {[
                      "ASAP",
                      "Within 1 Month",
                      "Within 3 Months",
                      "Flexible",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setTimeline(item);
                          setCompleted(true);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-500"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}

            </div>
          )}

          {completed && (
            <div className="rounded-[2rem] border border-blue-500/20 bg-blue-500/[0.05] p-10">

              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
                RECOMMENDATION
              </p>

              <h2 className="mb-8 text-4xl font-semibold">
                Project Qualification Summary
              </h2>
              <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.05] p-6">

  <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
    AI ANALYSIS
  </p>

  <p className="mt-4 text-lg text-gray-300">
    Based on the provided requirements, the prospect appears
    to be a strong candidate for intelligent automation and
    operational efficiency improvements. Recommended next
    step is a discovery consultation.
  </p>

</div>

              <div className="space-y-6">

                <div>
                  <p className="text-sm text-gray-500">
                    Recommended Solution
                  </p>
                  <p className="text-xl">{projectType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Business Challenge
                  </p>
                  <p className="text-xl">{challenge}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Budget Range
                  </p>
                  <p className="text-xl">{budget}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Timeline
                  </p>
                  <p className="text-xl">{timeline}</p>
                </div>
                <div>
  <p className="text-sm text-gray-500">
    Estimated Project Value
  </p>
<div>
  <p className="text-sm text-gray-500">
    Qualification Score
  </p>

  <p className="text-xl text-cyan-400">
    92% Match
  </p>
</div>
  <p className="text-xl text-green-400">
    Qualified Prospect
  </p>
</div>

              </div>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
  href="/contact?source=lead-agent"

                  className="rounded-full bg-blue-600 px-8 py-4 font-medium transition hover:bg-blue-500"
                >
                  Continue to Consultation
                </Link>

                <button
                  onClick={() => {
                    setStep(1);
                    setProjectType("");
                    setChallenge("");
                    setBudget("");
                    setTimeline("");
                    setCompleted(false);
                  }}
                  className="rounded-full border border-white/10 px-8 py-4 transition hover:border-blue-500"
                >
                  Start Again
                </button>

              </div>

            </div>
          )}

        </div>

      </main>
    </>
  );
}