import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import MetricCard from "@/components/MetricCard";
import VisualEffects from "@/components/VisualEffects";
import {
  Bot,
  BarChart3,
  MessageSquare,
  Workflow,
  Activity,
  Cpu,
} from "lucide-react";

export const metadata = {
  title: "Solutions — Chidakara",
};

const solutions = [
  {
     title: "AI Automation Systems",
  desc: "Automate repetitive business operations with intelligent workflows, integrations, and AI-powered decision making.",
    icon: Bot,
    route: "/solutions/workflow-automation",
  },

  {
    title: "Analytics Infrastructure",
  desc: "Transform operational data into real-time dashboards, predictive insights, and executive reporting systems.",
    icon: BarChart3,
    route: "/solutions/ai-dashboards",
  },

  {
    title: "AI Assistants",
  desc: "Deploy AI assistants for customer support, internal knowledge retrieval, and business operations.",
    icon: MessageSquare,
    route: "/solutions/ai-assistants",
  },

  {
    title: "Workflow Intelligence",
  desc: "Connect systems, automate approvals, and orchestrate complex business processes at scale.",
    icon: Workflow,
    route: "/solutions/workflow-automation",
  },

  {
    title: "Infrastructure Monitoring",
  desc: "Gain visibility into business operations, system health, and performance through intelligent monitoring.",
    icon: Activity,
    route: "/solutions/intelligent-systems",
  },

  {
    title: "Custom AI Platforms",
  desc: "Build tailored AI systems, multi-agent architectures, and enterprise-grade intelligent platforms.",
    icon: Cpu,
    route: "/solutions/intelligent-systems",
  },
];
export default function SolutionsPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-52 text-white">
      <VisualEffects />
        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        </div>

        {/* HERO */}

        <section className="relative z-10">

          <div className="mx-auto max-w-7xl">

            <div className="max-w-5xl">

              <p className="mb-6 text-sm uppercase tracking-[0.35em] text-cyan-400">
                AI SOLUTIONS
              </p>

              <h1 className="text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">

                Intelligent Systems Built for Modern Operations

              </h1>

              <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

                Chidakara develops scalable AI infrastructure,
                workflow automations, analytics systems,
                and intelligent operational platforms engineered
                for modern businesses.

              </p>

            </div>

          </div>

        </section>

        {/* SOLUTIONS GRID */}

        <section className="relative z-10 py-28">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {solutions.map((item, index) => {

                const Icon = item.icon;

                return (

                  <Link
  href={item.route}
  key={index}
  className="group rounded-[2rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-blue-500/[0.03] hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]"
>

                    {/* ICON */}

                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.08]">

                      <Icon className="h-7 w-7 text-blue-400" />

                    </div>

                    {/* CONTENT */}

                    <h3 className="text-2xl font-semibold text-white">

                      {item.title}

                    </h3>

                    <p className="mt-5 leading-relaxed text-gray-400">

                      {item.desc}

                    </p>

                  </Link>

                );

              })}

            </div>

          </div>

        </section>
{/* INDUSTRIES */}

<section className="relative z-10 py-20">

  <div className="mx-auto max-w-7xl">

    <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
      INDUSTRIES
    </p>

    <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
      Industries We Serve
    </h2>

    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {[
        "Healthcare",
        "Finance",
        "Logistics",
        "Retail",
        "Manufacturing",
        "Education",
      ].map((industry) => (

        <div
          key={industry}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <h3 className="text-2xl font-semibold">
            {industry}
          </h3>
        </div>

      ))}

    </div>

  </div>

</section>
        {/* ENTERPRISE METRICS */}

        <section className="relative z-10 py-10">

          <div className="mx-auto max-w-7xl">

            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

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

          </div>

        </section>
{/* PROCESS */}

<section className="relative z-10 py-28">

  <div className="mx-auto max-w-7xl">

    <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
      OUR PROCESS
    </p>

    <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
      How We Build
    </h2>

    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {[
        ["01", "Discovery"],
        ["02", "Architecture"],
        ["03", "Development"],
        ["04", "Deployment"],
      ].map(([number, title]) => (

        <div
          key={number}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
        >
          <p className="text-blue-400 text-4xl font-bold">
            {number}
          </p>

          <h3 className="mt-6 text-2xl font-semibold">
            {title}
          </h3>
        </div>

      ))}

    </div>

  </div>

</section>
        {/* CTA */}

        <section className="relative z-10 pb-24 pt-28">

          <div className="mx-auto max-w-7xl">

            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-blue-950/40 to-black p-14 text-center">

              <p className="mb-6 text-sm uppercase tracking-[0.35em] text-cyan-400">

                BUILD WITH CHIDAKARA

              </p>

              <h2 className="mx-auto max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">

                Engineered AI Systems for Modern Enterprises

              </h2>

              <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

                Premium automation systems, intelligent analytics infrastructures,
                AI assistants, and scalable operational platforms engineered
                for high-performance businesses.

              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-6">

                <button className="rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500">

                  Start a Project

                </button>

                <button className="rounded-full border border-white/10 px-10 py-5 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]">

                  Schedule Consultation

                </button>

              </div>

            </div>

          </div>

        </section>

      </main>
      <CTASection />

      <Footer />
    </>
  );
}