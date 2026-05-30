import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MetricCard from "@/components/MetricCard";
export const metadata = {
  title: "Solutions — Chidakara",
};
export default function SolutionsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pb-24 pt-40 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-4xl">

            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
              AI SOLUTIONS
            </p>

            <h1 className="text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
              Intelligent Systems Built for Modern Operations
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400">
              Chidakara develops scalable AI infrastructure, workflow automations,
              analytics systems, and intelligent operational platforms engineered
              for modern businesses.
            </p>

          </div>

        </div>

      </main>
      {/* SOLUTIONS GRID */}

<section className="py-24">

  <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

    {[
      {
        title: "AI Automation Systems",
        desc: "Intelligent workflow infrastructures engineered for scalable business automation and operational efficiency.",
      },

      {
        title: "Analytics Infrastructure",
        desc: "Realtime dashboards, data visibility layers, reporting systems, and intelligent monitoring platforms.",
      },

      {
        title: "AI Assistants",
        desc: "Conversational AI systems designed for customer support, operations, onboarding, and workflow integration.",
      },

      {
        title: "Workflow Intelligence",
        desc: "AI-powered orchestration systems connecting business processes, notifications, and operational pipelines.",
      },

      {
        title: "Infrastructure Monitoring",
        desc: "Enterprise-grade visibility systems for uptime monitoring, analytics, infrastructure tracking, and reliability.",
      },

      {
        title: "Custom AI Platforms",
        desc: "Tailored AI ecosystems engineered for enterprise operations, analytics systems, and scalable automation.",
      },

    ].map((item, index) => (

      <div
        key={index}
        className="group rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:border-cyan-400/20 hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]"
      >

        <div className="mb-6 h-14 w-14 rounded-2xl border border-white/10 bg-white/[0.03]" />

        <h3 className="text-2xl font-semibold text-white">
          {item.title}
        </h3>

        <p className="mt-4 leading-relaxed text-gray-400">
          {item.desc}
        </p>

      </div>

    ))}

  </div>

</section>
{/* ENTERPRISE METRICS */}

<section className="py-24">

  <div className="overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

    <div className="grid gap-10 md:grid-cols-4">

      {[
  ["48+", "AI Systems"],
  ["99%", "Infrastructure Uptime"],
  ["3.2M", "Data Events"],
  ["24/7", "Realtime Monitoring"],
].map(([number, label], index) => (

  <MetricCard
    key={index}
    number={number}
    label={label}
  />

))}

    </div>

  </div>

</section>
{/* CTA */}

<section className="pb-24">

  <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-12 text-center">

    <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
      BUILD WITH CHIDAKARA
    </p>

    <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
      Engineered AI Systems for Modern Enterprises
    </h2>

    <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-gray-400">
      Premium automation systems, intelligent analytics infrastructures,
      AI assistants, and scalable operational platforms engineered for
      high-performance businesses.
    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-6">

      <button className="rounded-full bg-blue-600 px-8 py-4 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500">
        Start a Project
      </button>

      <button className="rounded-full border border-white/10 px-8 py-4 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]">
        Schedule Consultation
      </button>

    </div>

  </div>

</section>

      <Footer />
    </>
  );
}