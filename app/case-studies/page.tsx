
export const metadata = {
  title: "Case Studies — Chidakara",
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
const caseStudies = [
  {
    company: "Nexus Logistics",
    industry: "Supply Chain Intelligence",
    result: "42% workflow optimization",
    description:
      "Implemented AI automation pipelines and predictive analytics systems for enterprise logistics monitoring.",
  },
  {
    company: "Aether Finance",
    industry: "Financial Intelligence",
    result: "3.2M AI predictions daily",
    description:
      "Developed enterprise-grade AI dashboards for predictive financial reporting and operational forecasting.",
  },
  {
    company: "Vertex Healthcare",
    industry: "Healthcare Automation",
    result: "68% faster processing",
    description:
      "Built intelligent automation systems for patient workflow management and infrastructure optimization.",
  },
];

export default function CaseStudiesPage() {
  return (
  <>
    <Navbar />

    <main className="min-h-screen overflow-hidden bg-black px-6 py-28 text-white">
    <BackgroundEffects />
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      {/* HEADER */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          ENTERPRISE CASE STUDIES
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">

          Real AI
          <span className="text-blue-500"> Transformation</span>

        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">

          Discover how intelligent automation, predictive systems,
          and AI infrastructure transformed enterprise operations.

        </p>

      </div>

      {/* CASE STUDIES */}

      <div className="relative z-10 mx-auto mt-24 grid max-w-7xl gap-10">

        {caseStudies.map((study, index) => (

          <div
            key={index}
            className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/40 hover:bg-blue-500/[0.04]"
          >

            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">

              {/* LEFT */}

              <div className="max-w-3xl">

                <p className="text-sm uppercase tracking-[0.3em] text-blue-500">

                  {study.industry}

                </p>

                <h2 className="mt-4 text-4xl font-bold">

                  {study.company}

                </h2>

                <p className="mt-6 leading-8 text-gray-400">

                  {study.description}

                </p>

              </div>

              {/* RIGHT */}

              <div className="rounded-[2rem] border border-blue-500/20 bg-blue-500/[0.06] px-10 py-8 text-center">

                <p className="text-sm uppercase tracking-[0.3em] text-blue-400">

                  PERFORMANCE

                </p>

                <h3 className="mt-4 text-4xl font-bold text-blue-500">

                  {study.result}

                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* CTA */}

      <div className="relative z-10 mx-auto mt-32 max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-14 text-center backdrop-blur-xl">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">

          NEXT-GEN ENTERPRISE AI

        </p>

        <h2 className="mt-6 text-5xl font-bold">

          Engineer Your AI Ecosystem

        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">

          Chidakara helps organizations deploy intelligent automation,
          enterprise dashboards, predictive analytics,
          and scalable AI infrastructure systems.

        </p>

        <button className="mt-10 rounded-2xl bg-blue-600 px-10 py-5 text-sm font-medium transition-all duration-300 hover:bg-blue-500">

          Start AI Consultation

        </button>

      </div>

    </main>

    <Footer />
  </>
);
}