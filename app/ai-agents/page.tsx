"use client";

const agents = [
  {
    name: "Athena",
    role: "Business Intelligence Agent",
    status: "Active",
    tasks: "Analytics • Forecasting • Reporting",
  },
  {
    name: "Orion",
    role: "Workflow Automation Agent",
    status: "Processing",
    tasks: "CRM • Pipelines • Operations",
  },
  {
    name: "Nova",
    role: "Customer Interaction Agent",
    status: "Online",
    tasks: "Support • Conversations • Assistance",
  },
  {
    name: "Sentinel",
    role: "Infrastructure Monitoring Agent",
    status: "Monitoring",
    tasks: "Servers • Uptime • Security",
  },
];

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-28 text-white">

      {/* HEADER */}

      <div className="mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          CHIDAKARA AI AGENTS
        </p>

        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          Autonomous Intelligence Systems
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Enterprise AI agents operating across automation,
          analytics, customer systems, infrastructure,
          and operational intelligence.
        </p>

      </div>

      {/* AGENT GRID */}

      <div className="mx-auto mt-24 grid max-w-7xl gap-8 md:grid-cols-2">

        {agents.map((agent, index) => (

          <div
            key={index}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-blue-500/40"
          >

            {/* GLOW */}

            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            </div>

            <div className="relative z-10">

              {/* STATUS */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="h-3 w-3 rounded-full bg-green-500" />

                  <p className="text-sm uppercase tracking-widest text-green-400">
                    {agent.status}
                  </p>

                </div>

                <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs uppercase tracking-widest text-blue-400">
                  AI AGENT
                </div>

              </div>

              {/* NAME */}

              <h2 className="mt-10 text-4xl font-bold">
                {agent.name}
              </h2>

              <p className="mt-3 text-lg text-blue-400">
                {agent.role}
              </p>

              {/* TASKS */}

              <div className="mt-10 rounded-2xl border border-white/5 bg-black/30 p-6">

                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  ACTIVE SYSTEMS
                </p>

                <p className="mt-4 text-gray-300">
                  {agent.tasks}
                </p>

              </div>

              {/* METRICS */}

              <div className="mt-8 grid grid-cols-3 gap-4">

                {[
                  ["99.2%", "Accuracy"],
                  ["24/7", "Runtime"],
                  ["2.4K", "Operations"],
                ].map(([value, label], i) => (

                  <div
                    key={i}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center"
                  >

                    <h3 className="text-xl font-bold text-blue-400">
                      {value}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      {label}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}