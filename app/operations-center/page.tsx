"use client";

const systems = [
  {
    name: "Neural Analytics Core",
    status: "Online",
    uptime: "99.98%",
  },
  {
    name: "Enterprise Automation Grid",
    status: "Operational",
    uptime: "24/7",
  },
  {
    name: "AI Decision Engine",
    status: "Active",
    uptime: "99.2%",
  },
  {
    name: "Infrastructure Monitoring",
    status: "Secure",
    uptime: "100%",
  },
];

const activity = [
  "AI predictive engine generated operational forecast",
  "Workflow automation optimized logistics pipeline",
  "Customer intelligence system updated analytics",
  "Infrastructure node synchronization completed",
  "AI orchestration network stabilized globally",
];

export default function OperationsCenterPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-6 py-28 text-white">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      {/* HEADER */}

      <div className="relative z-10 mx-auto max-w-6xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          OPERATIONS CENTER
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          Autonomous AI Infrastructure
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Real-time enterprise intelligence systems operating
          across automation pipelines, predictive analytics,
          infrastructure orchestration, and AI decision networks.
        </p>

      </div>

      {/* TOP GRID */}

      <div className="relative z-10 mx-auto mt-24 grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">

        {/* SYSTEM MAP */}

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                SYSTEM NETWORK
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Global AI Node Activity
              </h2>

            </div>

            <div className="rounded-full bg-green-500/10 px-5 py-2 text-sm text-green-400">
              LIVE
            </div>

          </div>

          {/* NETWORK */}

          <div className="relative mt-20 h-[400px]">

            {/* LINES */}

            <div className="absolute left-1/2 top-1/2 h-[2px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0" />

            <div className="absolute left-1/2 top-1/2 h-[60%] w-[2px] -translate-y-1/2 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0" />

            {/* CENTER NODE */}

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-xl font-bold text-blue-400 shadow-[0_0_40px_rgba(37,99,235,0.4)]">
              AI
            </div>

            {/* OUTER NODES */}

            {[
              "Analytics",
              "Security",
              "Automation",
              "Infrastructure",
            ].map((node, index) => {

              const positions = [
                "left-1/2 top-0 -translate-x-1/2",
                "right-0 top-1/2 -translate-y-1/2",
                "bottom-0 left-1/2 -translate-x-1/2",
                "left-0 top-1/2 -translate-y-1/2",
              ];

              return (

                <div
                  key={index}
                  className={`absolute ${positions[index]} flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-gray-300`}
                >

                  {node}

                </div>

              );

            })}

          </div>

        </div>

        {/* ACTIVITY */}

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Live Activity
            </h2>

            <div className="h-3 w-3 rounded-full bg-green-500" />

          </div>

          <div className="mt-10 space-y-5">

            {activity.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-black/30 p-5"
              >

                <p className="text-sm leading-7 text-gray-300">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* BOTTOM GRID */}

      <div className="relative z-10 mx-auto mt-10 grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">

        {systems.map((system, index) => (

          <div
            key={index}
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
          >

            <div className="flex items-center justify-between">

              <div className="h-3 w-3 rounded-full bg-green-500" />

              <p className="text-sm uppercase tracking-widest text-green-400">
                {system.status}
              </p>

            </div>

            <h3 className="mt-10 text-2xl font-semibold">
              {system.name}
            </h3>

            <p className="mt-6 text-5xl font-bold text-blue-500">
              {system.uptime}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}