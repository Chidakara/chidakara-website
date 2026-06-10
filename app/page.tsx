"use client";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import VisualEffects from "@/components/VisualEffects";

import LiveMetrics from "@/components/LiveMetrics";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";

export default function Home() {

  return (
    <>
  <main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">
<Navbar />
<VisualEffects />
      {/* HERO SECTION */}
      <FadeIn>
     <section className="relative z-10 flex min-h-[85vh] items-center pt-28 pb-16">

  <div className="mx-auto max-w-7xl">

    <div className="max-w-6xl">

      {/* LABEL */}

      <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">

        <div className="h-2 w-2 rounded-full bg-cyan-400" />

        <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">

          ENTERPRISE AI INFRASTRUCTURE

        </p>

      </div>

      {/* TITLE */}

      <h1 className="text-6xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">

        Engineering
        <span className="text-blue-500"> Intelligent</span>
        <br />

        Systems for
        <span className="text-cyan-400"> Modern Enterprises</span>

      </h1>

      {/* DESCRIPTION */}

      <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">

        Chidakara develops scalable AI infrastructures,
        enterprise automation ecosystems, operational intelligence systems,
        predictive analytics platforms, and futuristic digital architectures.

      </p>

      {/* BUTTONS */}

     <div className="mt-14 flex flex-wrap gap-6">

  {/* PRIMARY BUTTON */}

  <button className="group relative overflow-hidden rounded-full bg-blue-600 px-10 py-5 text-sm font-medium tracking-wide transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:bg-blue-500 hover:shadow-[0_0_60px_rgba(37,99,235,0.45)] active:scale-[0.98]">

    <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-1000 group-hover:translate-x-[120%]"></div>

    <span className="relative z-10">
      Start Building
    </span>

  </button>

  {/* SECONDARY BUTTON */}

  <button className="group relative overflow-hidden rounded-full border border-white/8 bg-black/60 px-10 py-5 text-sm font-medium tracking-wide backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_50px_rgba(37,99,235,0.25)] active:scale-[0.98]">

    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_70%)]"></div>

    <span className="relative z-10">
      Explore Solutions
    </span>

  </button>

</div>

      {/* METRICS */}



    </div>

  </div>

</section>
</FadeIn>
<LiveMetrics />
<section className="relative z-10 px-6 py-24">

  <div className="mx-auto max-w-7xl">

    <div className="mb-16 text-center">

      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
        ECOSYSTEM
      </p>

      <h2 className="text-4xl font-semibold md:text-5xl">
        How Chidakara Systems Operate
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
        Intelligent systems connected through automation,
        analytics, infrastructure, and operational intelligence.
      </p>

    </div>

    <div className="grid gap-6 md:grid-cols-5">

      {[
        "AI Agents",
        "Automation",
        "Data Layer",
        "Analytics",
        "Operations",
      ].map((item) => (
        <div
          key={item}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl"
        >
          <h3 className="text-xl font-semibold">
            {item}
          </h3>
        </div>
      ))}

    </div>

  </div>

</section>

{/* CASE STUDIES SECTION */}

<section
  id="projects"
  className="relative z-10 border-t border-white/5 bg-black px-6 py-24 md:py-24 md:py-32"
>

  <div className="mx-auto max-w-7xl">

    <div className="mb-20 text-center">

      <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
        CASE STUDIES
      </p>

      <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
        Intelligent Systems Built for Real Operations
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
        Premium AI infrastructures, automation systems, and analytics
        platforms engineered for scalable business performance.
      </p>

    </div>

    <div className="grid gap-6 md:p-8 md:grid-cols-2 xl:grid-cols-3">

      {/* CARD 1 */}

      <div className="group rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/40 hover:bg-white/[0.05]">

        <div className="mb-6 flex items-center justify-between">

          <div className="rounded-full border border-blue-500/30 px-4 py-1 text-sm text-blue-400">
            AI Automation
          </div>

          <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"></div>

        </div>
        <div className="mb-8 h-40 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5" />

        <h3 className="mb-6 text-[1.75rem] font-semibold leading-tight">
          Lead Qualification Engine
        </h3>

        <p className="mb-10 leading-relaxed text-gray-400">
          Automated AI system for capturing, filtering, and managing
          high-value customer leads across digital channels.
        </p>

        <div className="flex items-end justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Conversion Efficiency
            </p>

            <h4 className="text-4xl font-bold text-blue-500">
              +48%
            </h4>
          </div>

          <div className="text-sm text-gray-500">
            Live Infrastructure
          </div>

        </div>

      </div>

      {/* CARD 2 */}

      <div className="group rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-cyan-400/40 hover:bg-white/[0.05]">

        <div className="mb-6 flex items-center justify-between">

          <div className="rounded-full border border-cyan-400/30 px-4 py-1 text-sm text-cyan-300">
            Analytics Core
          </div>

          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>

        </div>
        <div className="mb-8 h-40 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5" />

        <h3 className="mb-6 text-[1.75rem] font-semibold leading-tight">
          AI Business Dashboard
        </h3>

        <p className="mb-10 leading-relaxed text-gray-400">
          Realtime analytics infrastructure with operational monitoring,
          reporting systems, and intelligent visibility layers.
        </p>

        <div className="flex items-end justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Data Processing
            </p>

            <h4 className="text-4xl font-bold text-cyan-400">
              3.2M
            </h4>
          </div>

          <div className="text-sm text-gray-500">
            AI Monitoring
          </div>

        </div>

      </div>
      
      {/* CARD 3 */}

      <div className="group rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-violet-400/40 hover:bg-white/[0.05]">

        <div className="mb-6 flex items-center justify-between">

          <div className="rounded-full border border-violet-400/30 px-4 py-1 text-sm text-violet-300">
            Voice Intelligence
          </div>

          <div className="h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(192,132,252,0.8)]"></div>

        </div>
        <div className="mb-8 h-40 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5" />

        <h3 className="mb-6 text-[1.75rem] font-semibold leading-tight">
          AI Support Assistant
        </h3>

        <p className="mb-10 leading-relaxed text-gray-400">
          Intelligent conversational system engineered for realtime
          customer support, automation, and workflow integration.
        </p>

        <div className="flex items-end justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Operational Uptime
            </p>

            <h4 className="text-4xl font-bold text-violet-400">
              99.9%
            </h4>
          </div>

          <div className="text-sm text-gray-500">
            Realtime AI
          </div>

        </div>

      </div>

    </div>

  </div>
  
</section>

<Reveal>
{/* SOLUTIONS SECTION */}
      
      <section
  id="solutions"
  className="relative z-10 border-t border-transparent bg-[#050505] px-6 py-24 md:py-32"
>

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
              AI SOLUTIONS
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Intelligent Systems Built for Modern Business
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Chidakara develops scalable AI systems, intelligent automations,
              dashboards, and digital infrastructures designed to optimize
              modern business operations.
            </p>
          </div>

          <div className="grid gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_60px_rgba(37,99,235,0.18)]">         <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/5">

  <div className="h-6 w-6 rounded-lg bg-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.6)]"></div>

</div>

              <h3 className="mb-4 text-[1.75rem] font-semibold leading-tight">
                AI Assistants
              </h3>

              <p className="leading-relaxed text-gray-400">
                Intelligent AI systems designed for customer support,
                lead qualification, and business automation.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/50 hover:bg-white/[0.05] hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5">

  <div className="h-6 w-6 rotate-45 rounded-sm bg-cyan-400/70 shadow-[0_0_20px_rgba(34,211,238,0.6)]"></div>

</div>

              <h3 className="mb-4 text-[1.75rem] font-semibold leading-tight">
                Workflow Automation
              </h3>

              <p className="leading-relaxed text-gray-400">
                Automating repetitive business processes using modern AI
                infrastructure and intelligent workflows.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/50 hover:bg-white/[0.05] hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/5">

  <div className="flex items-end gap-[3px]">

    <div className="h-3 w-1 rounded-full bg-indigo-400"></div>

    <div className="h-5 w-1 rounded-full bg-indigo-400"></div>

    <div className="h-7 w-1 rounded-full bg-indigo-400"></div>

  </div>

</div>

              <h3 className="mb-4 text-[1.75rem] font-semibold leading-tight">
                AI Dashboards
              </h3>

              <p className="leading-relaxed text-gray-400">
                Premium analytics dashboards with intelligent insights,
                reporting systems, and business visibility tools.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/50 hover:bg-white/[0.05] hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/5">

  <div className="grid grid-cols-2 gap-1">

    <div className="h-2 w-2 rounded-full bg-violet-400"></div>
    <div className="h-2 w-2 rounded-full bg-violet-400"></div>
    <div className="h-2 w-2 rounded-full bg-violet-400"></div>
    <div className="h-2 w-2 rounded-full bg-violet-400"></div>

  </div>

</div>

              <h3 className="mb-4 text-[1.75rem] font-semibold leading-tight">
                Intelligent Systems
              </h3>

              <p className="leading-relaxed text-gray-400">
                Custom-built AI-powered platforms engineered for scalability,
                performance, and operational efficiency.
              </p>
            </div>

          </div>

        </div>

      </section>
      </Reveal>
      <FadeIn>
<section className="relative z-10 py-20">

  <div className="mx-auto max-w-7xl">

    <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

      <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
        ABOUT CHIDAKARA
      </p>

      <h2 className="mt-6 max-w-5xl text-4xl font-semibold md:text-5xl">
        Building Intelligent Infrastructure
        for Modern Organizations
      </h2>

      <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-400">
        Chidakara engineers AI-powered systems that combine
        automation, analytics, operational intelligence,
        and modern software engineering into scalable
        digital ecosystems.
      </p>

      <div className="mt-10">

        <Link
          href="/about"
          className="rounded-full bg-blue-600 px-8 py-4 font-medium transition-all duration-300 hover:bg-blue-500"
        >
          Learn More About Us
        </Link>

      </div>

    </div>

  </div>

</section>
</FadeIn>
      <Reveal>
<section className="relative z-10 py-20">

  <div className="mx-auto max-w-7xl">

    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
        <h3 className="text-5xl font-bold text-blue-500">
          12+
        </h3>
        <p className="mt-4 text-gray-400">
          Automation-First Architecture
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
        <h3 className="text-5xl font-bold text-blue-500">
          48+
        </h3>
        <p className="mt-4 text-gray-400">
          Scalable Modern Infrastructure
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
        <h3 className="text-5xl font-bold text-blue-500">
          99%
        </h3>
        <p className="mt-4 text-gray-400">
          Intelligent Operational Systems
        </p>
      </div>

    </div>

  </div>

</section>
<div className="mx-auto max-w-7xl px-6">
  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
</div>
     
            {/* TECH STACK SECTION */}
      
      <section className="relative z-10 border-t border-transparent bg-black px-6 py-24 md:py-32">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-20 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
              TECHNOLOGY STACK
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
              Built with Modern Intelligent Infrastructure
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Chidakara leverages scalable technologies, modern AI systems,
              cloud-native infrastructure, and intelligent automation tools
              to engineer future-ready digital products.
            </p>

          </div>

          {/* TECH GRID */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              "Next.js",
              "FastAPI",
              "OpenAI APIs",
              "PostgreSQL",
              "n8n Automation",
              "Supabase",
              "Tailwind CSS",
              "AI Infrastructure",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-5 md:p-6 text-center transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]"
              >
                <h3 className="text-2xl font-semibold leading-tight">{tech}</h3>
              </div>
            ))}

          </div>

          {/* METRICS */}
          

        </div>
      

      </section>
      </Reveal>
      
    
     
    </main>
    <CTASection />
<Footer />
</>
  );
}