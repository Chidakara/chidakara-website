"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

const agents = [
  {
    name: "Athena",
    role: "Business Intelligence",
    status: "Active",
    metric: "24 Reports",
    value: "99.2%",
    link: "/research-agent",
  },
  {
  name: "Orion",
  role: "Sales Intelligence",
  status: "Processing",
  metric: "12 Proposals",
  value: "91%",
  link: "/sales-agent",
},
  {
    name: "Nova",
    role: "Customer Support",
    status: "Online",
    metric: "146 Conversations",
    value: "96%",
    link: "/customer-support-agent",
  },
  {
    name: "Sentinel",
    role: "Lead Qualification",
    status: "Monitoring",
    metric: "52 Leads",
    value: "92%",
    link: "/lead-agent",
  },
];

const activity = [
  "Athena generated business report",
  "Orion automated CRM workflow",
  "Nova resolved customer issue",
  "Sentinel qualified enterprise lead",
  "Automation pipeline updated dashboard",
  "Analytics engine refreshed metrics",
];

export default function CommandCenterPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
              CHIDAKARA COMMAND CENTER
            </p>

            <h1 className="mt-6 text-5xl font-bold md:text-7xl">
              Unified Autonomous AI Network
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-400">
              Monitor AI agents, workflows, analytics,
              customer systems, and business intelligence
              from a single interface.
            </p>

          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

              <p className="mb-10 text-sm uppercase tracking-[0.3em] text-cyan-400">
                AI NETWORK
              </p>

              <div className="flex flex-col items-center gap-16">

                <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-10 py-6">
                  Athena
                </div>

                <div className="flex items-center gap-12">

                  <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-10 py-6">
                    Nova
                  </div>

                  <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-10 py-6 font-bold">
                    CORE
                  </div>

                  <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-10 py-6">
                    Orion
                  </div>

                </div>

                <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-10 py-6">
                  Sentinel
                </div>

              </div>

            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

              <p className="mb-8 text-sm uppercase tracking-[0.3em] text-cyan-400">
                LIVE ACTIVITY
              </p>

              <div className="space-y-4">

                {activity.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 p-4"
                  >
                    <p className="text-sm text-gray-300">
                      {item}
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {agents.map((agent) => (

              <Link
                href={agent.link}
                key={agent.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-blue-500"
              >

                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                  {agent.status}
                </p>

                <h3 className="mt-6 text-3xl font-bold">
                  {agent.name}
                </h3>

                <p className="mt-2 text-gray-400">
                  {agent.role}
                </p>

                <div className="mt-8 space-y-3">

                  <p className="text-gray-300">
                    {agent.metric}
                  </p>

                  <p className="text-blue-400">
                    {agent.value}
                  </p>

                </div>

              </Link>

            ))}

          </div>

          <div className="mt-16 text-center">

            <Link
              href="/ai-agents"
              className="rounded-full bg-blue-600 px-8 py-4 font-medium"
            >
              View All Agents
            </Link>

          </div>

        </div>

      </main>
    </>
  );
}