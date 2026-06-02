"use client";

const steps = [
  {
    title: "Discovery & Analysis",
    description:
      "Understanding business infrastructure, operational workflows, and AI integration opportunities.",
  },
  {
    title: "AI Architecture Planning",
    description:
      "Designing scalable AI ecosystems, automation pipelines, and enterprise intelligence systems.",
  },
  {
    title: "System Development",
    description:
      "Engineering dashboards, automation frameworks, AI workflows, and intelligent interfaces.",
  },
  {
    title: "Deployment & Optimization",
    description:
      "Launching AI systems with monitoring, analytics, predictive intelligence, and optimization.",
  },
];

export default function ClientOnboardingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-6 py-28 text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      {/* HEADER */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          CLIENT ONBOARDING
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          AI Transformation Journey
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Chidakara guides businesses through intelligent automation,
          AI infrastructure integration, operational intelligence,
          and enterprise AI transformation.
        </p>

      </div>

      {/* TIMELINE */}

      <div className="relative z-10 mx-auto mt-28 max-w-5xl">

        <div className="absolute left-8 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 md:block" />

        <div className="space-y-16">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative flex flex-col gap-8 md:flex-row md:items-start"
            >

              {/* STEP NUMBER */}

              <div className="relative z-20 flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-black text-2xl font-bold text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">

                {index + 1}

              </div>

              {/* CONTENT */}

              <div className="flex-1 rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

                <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                  PHASE {index + 1}
                </p>

                <h2 className="mt-4 text-4xl font-bold">
                  {step.title}
                </h2>

                <p className="mt-6 leading-8 text-gray-400">
                  {step.description}
                </p>

                {/* STATUS */}

                <div className="mt-10 flex items-center gap-4">

                  <div className="h-3 w-3 rounded-full bg-green-500" />

                  <p className="text-sm uppercase tracking-[0.3em] text-green-400">
                    Enterprise Ready
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* FINAL CTA */}

      <div className="relative z-10 mx-auto mt-32 max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur-xl">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          START BUILDING
        </p>

        <h2 className="mt-6 text-5xl font-bold">
          Build Your AI Infrastructure
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Partner with Chidakara to engineer intelligent systems,
          enterprise automation workflows, predictive analytics,
          and scalable AI ecosystems.
        </p>

        <button className="mt-10 rounded-2xl bg-blue-600 px-10 py-5 text-sm font-medium transition-all duration-300 hover:bg-blue-500">

          Schedule Consultation

        </button>

      </div>

    </main>
  );
}