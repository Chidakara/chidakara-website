"use client";

const services = [
  {
    title: "AI Automation Systems",
    description:
      "Automate business workflows using intelligent AI pipelines, task orchestration, and enterprise-grade automation systems.",
  },
  {
    title: "Custom AI Chatbots",
    description:
      "Build advanced conversational AI systems powered by LLMs, enterprise integrations, and real-time intelligence.",
  },
  {
    title: "Enterprise Dashboards",
    description:
      "Create futuristic analytics dashboards with predictive insights, AI reporting, and operational intelligence.",
  },
  {
    title: "AI Infrastructure",
    description:
      "Design scalable AI ecosystems with cloud deployment, API architecture, vector databases, and AI pipelines.",
  },
  {
    title: "Predictive Analytics",
    description:
      "Transform raw business data into predictive insights using machine learning and intelligent forecasting systems.",
  },
  {
    title: "Workflow Intelligence",
    description:
      "Optimize operations with AI-driven monitoring, smart triggers, automation routing, and decision systems.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-6 py-28 text-white">

      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      {/* Header */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          ENTERPRISE SERVICES
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          AI Solutions Engineered
          <span className="text-blue-500"> for Scale</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Chidakara builds intelligent AI infrastructures, enterprise automation systems,
          predictive intelligence platforms, and futuristic digital ecosystems.
        </p>

      </div>

      {/* Services Grid */}

      <div className="relative z-10 mx-auto mt-24 grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">

        {services.map((service, index) => (

          <div
            key={index}
            className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/40 hover:bg-blue-500/[0.05]"
          >

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl text-blue-400">

              ✦

            </div>

            <h2 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-blue-400">

              {service.title}

            </h2>

            <p className="mt-5 leading-8 text-gray-400">

              {service.description}

            </p>

            <div className="mt-8 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-blue-400">

              <div className="h-2 w-2 rounded-full bg-blue-500" />

              AI Powered

            </div>

          </div>

        ))}

      </div>

      {/* CTA */}

      <div className="relative z-10 mx-auto mt-32 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-14 text-center backdrop-blur-xl">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          BUILD WITH CHIDAKARA
        </p>

        <h2 className="mt-6 text-5xl font-bold">
          Future-Ready AI Infrastructure
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Launch intelligent systems, automation ecosystems,
          enterprise dashboards, and scalable AI architectures tailored for modern businesses.
        </p>

        <button className="mt-10 rounded-2xl bg-blue-600 px-10 py-5 text-sm font-medium transition-all duration-300 hover:bg-blue-500">

          Schedule AI Consultation

        </button>

      </div>

    </main>
  );
}