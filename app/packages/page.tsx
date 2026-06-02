"use client";

const packages = [
  {
    name: "Starter Intelligence",
    price: "₹25K+",
    description:
      "AI-powered websites, intelligent dashboards, and automation foundations for startups.",
    features: [
      "AI Website Systems",
      "Dashboard Interfaces",
      "Workflow Automation",
      "Analytics Integration",
    ],
  },
  {
    name: "Enterprise Automation",
    price: "₹75K+",
    description:
      "Advanced AI infrastructure systems engineered for scalable business operations.",
    features: [
      "AI Automation Pipelines",
      "Operational Intelligence",
      "Predictive Analytics",
      "Enterprise Integrations",
    ],
  },
  {
    name: "AI Infrastructure Ecosystem",
    price: "Custom",
    description:
      "Complete AI ecosystem architecture for enterprise-grade automation and intelligence.",
    features: [
      "Multi-Agent Systems",
      "AI Operations Centers",
      "Custom Infrastructure",
      "Realtime AI Monitoring",
    ],
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-6 py-28 text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

      </div>

      {/* HEADER */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          AI CONSULTATION PACKAGES
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          Enterprise AI Solutions
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Chidakara builds intelligent AI infrastructures,
          automation ecosystems, operational intelligence systems,
          and scalable enterprise automation platforms.
        </p>

      </div>

      {/* PACKAGES */}

      <div className="relative z-10 mx-auto mt-28 grid max-w-7xl gap-8 lg:grid-cols-3">

        {packages.map((pkg, index) => (

          <div
            key={index}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/40 hover:bg-white/[0.05]"
          >

            {/* GLOW */}

            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            </div>

            <div className="relative z-10">

              <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                PACKAGE
              </p>

              <h2 className="mt-6 text-4xl font-bold">
                {pkg.name}
              </h2>

              <p className="mt-6 text-5xl font-bold text-blue-400">
                {pkg.price}
              </p>

              <p className="mt-8 leading-8 text-gray-400">
                {pkg.description}
              </p>

              {/* FEATURES */}

              <div className="mt-10 space-y-4">

                {pkg.features.map((feature, i) => (

                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/30 p-4"
                  >

                    <div className="h-3 w-3 rounded-full bg-blue-500" />

                    <p className="text-gray-300">
                      {feature}
                    </p>

                  </div>

                ))}

              </div>

              {/* BUTTON */}

              <button className="mt-10 w-full rounded-2xl bg-blue-600 py-4 text-sm font-medium transition-all duration-300 hover:bg-blue-500">

                Request Consultation

              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}