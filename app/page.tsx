"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import AIChat from "@/components/AIChat";
import BackgroundEffects from "@/components/BackgroundEffects";
import FadeIn from "@/components/FadeIn";
import AnimatedCounter from "@/components/AnimatedCounter";
export default function Home() {


  const [projects, setProjects] = useState(0);
  const [automations, setAutomations] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [mousePosition, setMousePosition] = useState({
  
  x: 0,
  y: 0,
});

  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjects((prev) => (prev < 12 ? prev + 1 : 12));
      setAutomations((prev) => (prev < 48 ? prev + 2 : 48));
      setUptime((prev) => (prev < 99 ? prev + 3 : 99));
    }, 60);
    const handleMouseMove = (e: MouseEvent) => {
  setMousePosition({
    x: e.clientX,
    y: e.clientY,
  });
};
const handleScroll = () => {
  setScrolled(window.scrollY > 50);
  setScrollY(window.scrollY);
};
window.addEventListener("mousemove", handleMouseMove);

window.addEventListener("scroll", handleScroll);

    return () => {
  clearInterval(interval);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("scroll", handleScroll);
};
  }, []);

  return (
  <main className="relative min-h-screen overflow-hidden bg-black px-6 text-white">
    <BackgroundEffects />

<div className="pointer-events-none absolute inset-0 overflow-hidden">

  <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />

  <div className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

  <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[140px]" />

</div>
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

  <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

  <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[110px]" />

</div>
    <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px] animate-pulse"></div>

<div className="pointer-events-none absolute right-0 top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[90px]"></div>

<div className="pointer-events-none absolute left-0 bottom-[10%] h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[90px]"></div>
{/* AURORA BACKGROUND */}

<div className="pointer-events-none fixed inset-0 overflow-hidden">

  <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 opacity-40 blur-[110px] "></div>

  <div className="absolute right-[-10%] top-[30%] h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[110px] animate-pulse"></div>

  <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px] animate-pulse"></div>

</div>
  <div className="grid-background fixed inset-0 -z-10 opacity-[0.05]"></div>
  {/* NEURAL FLOW LINES */}

<div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">

  <div className="absolute left-[10%] top-[20%] h-[1px] w-[300px] rotate-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm"></div>

  <div className="absolute right-[5%] top-[35%] h-[1px] w-[400px] -rotate-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"></div>

  <div className="absolute left-[20%] bottom-[25%] h-[1px] w-[350px] rotate-[25deg] bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"></div>

  <div className="absolute right-[15%] bottom-[15%] h-[1px] w-[250px] -rotate-[18deg] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-sm"></div>
  {/* MOVING DATA STREAM 1 */}
<div className="absolute left-[-20%] top-[15%] h-[2px] w-[500px] rotate-[12deg] overflow-hidden">

  <div className="h-full w-[40%] animate-[aiFlow_6s_linear_infinite] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-sm"></div>

</div>

{/* MOVING DATA STREAM 2 */}
<div className="absolute right-[-20%] top-[55%] h-[2px] w-[600px] -rotate-[18deg] overflow-hidden">

  <div className="h-full w-[40%] animate-[aiFlow_8s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm"></div>

</div>

{/* MOVING DATA STREAM 3 */}
<div className="absolute left-[10%] bottom-[10%] h-[2px] w-[400px] rotate-[25deg] overflow-hidden">

  <div className="h-full w-[40%] animate-[aiFlow_7s_linear_infinite] bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-sm"></div>

</div>
</div>
  <div
  className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl opacity-40 blur-[90px] transition-transform duration-200"
  style={{
  left: mousePosition.x - 200,
  top: mousePosition.y - 200,
  transform: `translateY(${scrollY * 0.08}px)`,
}}
/>

    


      {/* NAVBAR */}
      <nav
  className={`fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] ${
    scrolled
  ? "border-white/10 bg-black/40 py-3 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
  : "border-white/10 bg-black/40 py-4 backdrop-blur-xl"
  }`}
>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

          <div className="text-lg font-semibold tracking-[0.18em] text-white">
            CHIDAKARA
          </div>

          <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
            <a
  href="#solutions"
  className="group relative text-gray-300 transition duration-300 hover:text-blue-400"
>
<span>Solutions</span>

<span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] group-hover:w-full"></span>
            </a>

            <a
  href="#showcase"
  className="group relative text-gray-300 transition duration-300 hover:text-blue-400"
>
               <span>Showcase</span>

  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] group-hover:w-full"></span>
</a>

            <a
  href="#case-study"
  className="group relative text-gray-300 transition duration-300 hover:text-blue-400"
>
              <span>Case Studies</span>
  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] group-hover:w-full"></span>
</a>
            

            <a
  href="#contact"
  className="group relative text-gray-300 transition duration-300 hover:text-blue-400"
>
              <span>Contact</span>
            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] group-hover:w-full"></span>
</a>
          </div>

          <button className="rounded-full border border-blue-500 bg-blue-600 px-5 py-2 text-sm font-medium tracking-wide transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.35)]">
            Let’s Build
          </button>
<div className="absolute inset-0 opacity-[0.03]">

  <div className="grid-background h-full w-full" />

</div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <FadeIn>
     <section className="relative z-10 flex min-h-[92vh] items-center pt-32">

  <div className="mx-auto max-w-7xl">

    <div className="max-w-5xl">

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

        <button className="rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500">

          Start Building

        </button>

        <button className="rounded-full border border-white/10 bg-white/[0.03] px-10 py-5 font-medium backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">

          Explore Solutions

        </button>

      </div>

      {/* METRICS */}

{/* METRICS */}

<div className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

  <AnimatedCounter
    end={48}
    suffix="+"
    label="AI Systems"
  />

  <AnimatedCounter
    end={32}
    suffix="M"
    label="AI Events"
  />

  <AnimatedCounter
    end={99}
    suffix="%"
    label="Infrastructure Uptime"
  />

  <AnimatedCounter
    end={24}
    suffix="/7"
    label="Realtime Monitoring"
  />


      </div>

    </div>

  </div>

</section>
</FadeIn>
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

      <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
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
      
      <section id="solutions" className="relative z-10 border-t border-transparent bg-[#050505] px-6 py-24 md:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
              AI SOLUTIONS
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              Intelligent Systems Built for Modern Business
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Chidakara develops scalable AI systems, intelligent automations,
              dashboards, and digital infrastructures designed to optimize
              modern business operations.
            </p>
          </div>

          <div className="grid gap-6 md:p-8 md:grid-cols-2 xl:grid-cols-4">

            {/* CARD 1 */}
            <div
        
  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_60px_rgba(37,99,235,0.18)] before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-700 before:content-[''] before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(37,99,235,0.18),transparent_40%)] hover:before:opacity-100"
  style={
    {
      "--x": `${mousePosition.x}px`,
      "--y": `${mousePosition.y}px`,
    } as React.CSSProperties
  }
>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/5">

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
      <Reveal>
            {/* SHOWCASE SECTION */}
      
      <section id="showcase" className="relative z-10 border-t border-transparent bg-black px-6 py-24 md:py-24 md:py-32">

        <div className="mx-auto max-w-7xl">
          {/* FLOATING SYSTEM ORBS */}

<div className="pointer-events-none absolute inset-0 overflow-hidden">

  <div className="absolute left-[8%] top-[20%] h-40 w-40 rounded-full border border-blue-500/10 bg-blue-500/5 blur-3xl"></div>

  <div className="absolute right-[10%] top-[35%] h-52 w-52 rounded-full border border-cyan-400/10 bg-cyan-400/5 blur-3xl"></div>

  <div className="absolute bottom-[10%] left-[35%] h-44 w-44 rounded-full border border-indigo-500/10 bg-indigo-500/5 blur-3xl"></div>

</div>
        </div>
          <div className="mb-16 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
              SHOWCASE
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              Built for Modern Intelligent Infrastructure
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Exploring the future of AI-powered systems, intelligent workflows,
              analytics infrastructure, and business automation platforms.
            </p>

          

          <div className="grid gap-12">
          </div> 
            <div className="mt-20 rounded-[2rem] border border-white/8 bg-black/60 backdrop-blur-2xl bg-black/40 p-6 md:p-8">

  <div className="mb-14 text-center">

    <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">
      AI WORKFLOW SYSTEM
    </p>

    <h3 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
      Intelligent Automation Pipeline
    </h3>

    <p className="mx-auto mt-6 max-w-3xl leading-relaxed text-gray-400">
      Chidakara systems are engineered to automate operational workflows,
      intelligent processing, analytics pipelines, and scalable AI-driven
      infrastructure systems.
    </p>

  </div>

  <div className="grid gap-6 md:p-8 md:grid-cols-2 xl:grid-cols-4">

    {/* STEP 1 */}
    <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-black/30 p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-cyan-400/30">

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5">

        <div className="h-5 w-5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.7)]"></div>

      </div>

      <h4 className="text-[1.75rem] font-semibold leading-tight">
        Data Input
      </h4>

      <p className="mt-4 leading-relaxed text-gray-400">
        Business operations, customer workflows, and infrastructure events
        enter the intelligent automation system.
      </p>

    </div>

    {/* STEP 2 */}
    <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-black/30 p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/30">

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/5">

        <div className="grid grid-cols-2 gap-1">

          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
          <div className="h-2 w-2 rounded-full bg-blue-400"></div>

        </div>

      </div>

      <h4 className="text-[1.75rem] font-semibold leading-tight">
        AI Processing
      </h4>

      <p className="mt-4 leading-relaxed text-gray-400">
        Intelligent systems analyze operational data, optimize workflows,
        and generate scalable automation logic.
      </p>

    </div>

    {/* STEP 3 */}
    <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-black/30 p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-indigo-400/30">

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/5">

        <div className="flex gap-1">

          <div className="h-6 w-1 rounded-full bg-indigo-400"></div>
          <div className="h-4 w-1 rounded-full bg-indigo-400"></div>
          <div className="h-8 w-1 rounded-full bg-indigo-400"></div>

        </div>

      </div>

      <h4 className="text-[1.75rem] font-semibold leading-tight">
        Automation Engine
      </h4>

      <p className="mt-4 leading-relaxed text-gray-400">
        AI workflows trigger automations, integrations, notifications,
        and scalable infrastructure operations.
      </p>

    </div>

    {/* STEP 4 */}
    <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-black/30 p-6 md:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-violet-400/30">

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/5">

        <div className="relative h-6 w-6 rounded-full border border-violet-400">

          <div className="absolute inset-1 rounded-full bg-violet-400/70"></div>

        </div>

      </div>

      <h4 className="text-[1.75rem] font-semibold leading-tight">
        Insights & Scaling
      </h4>

      <p className="mt-4 leading-relaxed text-gray-400">
        Intelligent dashboards provide analytics, infrastructure visibility,
        and long-term operational optimization.
      </p>

    </div>

  </div>

</div>

           
            {/* SHOWCASE CARD 2 */}
            <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-black/60 backdrop-blur-2xl bg-black/40">


  {/* TOP BAR */}
  <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">

    <div>

      <p className="text-sm text-gray-400">
        Chidakara Command Center
      </p>

      <h3 className="mt-1 text-[1.75rem] font-semibold leading-tight">
        AI Infrastructure Operations
      </h3>

    </div>

    <div className="flex items-center gap-3">

      <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">

        <div className="relative flex h-2 w-2">

          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>

          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>

        </div>

        <span className="text-sm text-emerald-300">
          Systems Online
        </span>

      </div>

    </div>

  </div>

  {/* MAIN CONTENT */}
  <div className="grid gap-6 md:p-8 p-6 md:p-8 md:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

    {/* LEFT PANEL */}
    <div className="space-y-6">

      <div className="rounded-3xl border border-white/8 bg-black/40 backdrop-blur-2xl p-6">

        <p className="text-sm text-gray-400">
          Deployment Status
        </p>

        <h3 className="mt-3 text-4xl font-bold text-blue-500">
          12
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Active AI deployments
        </p>

      </div>

      <div className="rounded-3xl border border-white/8 bg-black/40 backdrop-blur-2xl p-6">

        <div className="mb-4 flex items-center justify-between">

          <span className="text-sm text-gray-400">
            Infrastructure Load
          </span>

          <span className="text-sm text-cyan-400">
            82%
          </span>

        </div>

        <div className="h-2 rounded-full bg-white/10">

          <div className="h-2 w-[82%] rounded-full bg-cyan-400"></div>

        </div>

      </div>

    </div>

    {/* CENTER PANEL */}
    <div className="rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 to-black p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-400">
            AI Network
          </p>

          <h3 className="mt-1 text-xl font-semibold">
            Infrastructure Nodes
          </h3>

        </div>

        <span className="text-sm text-blue-400">
          Synced
        </span>

      </div>

      <div className="relative flex h-[220px] items-center justify-center">

        {/* CONNECTION LINES */}
        <div className="absolute h-[2px] w-[180px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

        <div className="absolute h-[180px] w-[2px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent"></div>

        {/* CENTER NODE */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">

          <div className="h-6 w-6 rounded-full bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.7)]"></div>

        </div>

        {/* OUTER NODES */}
        <div className="absolute top-6 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">

          <div className="h-3 w-3 rounded-full bg-cyan-400"></div>

        </div>

        <div className="absolute bottom-6 flex h-12 w-12 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-400/10">

          <div className="h-3 w-3 rounded-full bg-indigo-400"></div>

        </div>

        <div className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/20 bg-violet-400/10">

          <div className="h-3 w-3 rounded-full bg-violet-400"></div>

        </div>

        <div className="absolute right-6 flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10">

          <div className="h-3 w-3 rounded-full bg-blue-400"></div>

        </div>

      </div>

    </div>

    {/* RIGHT PANEL */}
    <div className="space-y-4">

      {[
        "AI Processing Cluster",
        "Automation Runtime",
        "Realtime Analytics",
        "Cloud Infrastructure",
      ].map((item) => (

        <div
          key={item}
          className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] px-5 py-4"
        >

          <span className="text-sm text-gray-300">
            {item}
          </span>

          <div className="relative flex h-2 w-2">

            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>

          </div>

        </div>

      ))}

    </div>

  </div>
</div>
</div>

</section>
      </Reveal>
      <Reveal>
            {/* CASE STUDY SECTION */}
      

      <section id="case-study" className="relative z-10 border-t border-transparent bg-[#050505] px-6 py-24 md:py-24 md:py-32">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
              CASE STUDY
            </p>

            <h2 className="text-4xl font-bold leading-tight md:text-6xl">
              AI-Powered Business Infrastructure for Modern Operations
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-gray-400">
              Chidakara is actively exploring intelligent systems designed to
              optimize operational workflows, business visibility, analytics,
              and customer management for modern businesses.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6">
                <h3 className="mb-2 text-3xl font-bold text-blue-500">
                  24/7
                </h3>

                <p className="leading-relaxed text-gray-400">
                  Intelligent automation infrastructure
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] p-6">
                <h3 className="mb-2 text-3xl font-bold text-blue-500">
                  AI
                </h3>

                <p className="leading-relaxed text-gray-400">
                  Analytics and workflow intelligence
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT VISUAL */}
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 to-black p-6 md:p-8">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Operations Dashboard
                </p>

                <h3 className="mt-1 text-[1.75rem] font-semibold leading-tight">
                  Business Insights
                </h3>
              </div>

              <div className="rounded-full border border-blue-500/30 bg-blue-500/5 blur-3xl opacity-40 px-4 py-2 text-sm text-blue-400">
                Active
              </div>

            </div>

            <div className="space-y-6">

              <div className="rounded-2xl bg-white/[0.05] p-5">

                <div className="mb-3 flex justify-between text-sm">
                  <span className="leading-relaxed text-gray-400">
                    Inventory Visibility
                  </span>

                  <span className="text-blue-400">
                    Optimized
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[85%] rounded-full bg-blue-500"></div>
                </div>

              </div>

              <div className="rounded-2xl bg-white/[0.05] p-5">

                <div className="mb-3 flex justify-between text-sm">
                  <span className="leading-relaxed text-gray-400">
                    Workflow Automation
                  </span>

                  <span className="text-blue-400">
                    Active
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[72%] rounded-full bg-blue-500"></div>
                </div>

              </div>

              <div className="rounded-2xl bg-white/[0.05] p-5">

                <div className="mb-3 flex justify-between text-sm">
                  <span className="leading-relaxed text-gray-400">
                    Analytics Intelligence
                  </span>

                  <span className="text-blue-400">
                    Running
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[90%] rounded-full bg-blue-500"></div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      </Reveal>
      <Reveal>
            {/* TECH STACK SECTION */}
      
      <section className="relative z-10 border-t border-transparent bg-black px-6 py-24 md:py-32">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-20 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-blue-500">
              TECHNOLOGY STACK
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              Built with Modern Intelligent Infrastructure
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Chidakara leverages scalable technologies, modern AI systems,
              cloud-native infrastructure, and intelligent automation tools
              to engineer future-ready digital products.
            </p>

          </div>

          {/* TECH GRID */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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
                className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]"
              >
                <h3 className="text-[1.75rem] font-semibold leading-tight">{tech}</h3>
              </div>
            ))}

          </div>

          {/* METRICS */}
          <div className="mt-24 grid gap-6 md:p-8 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(37,99,235,0.15)]">

              <h3 className="text-5xl font-bold text-blue-500">
  {projects}+
</h3>

              <p className="mt-4 text-gray-400">
                Automation-First Architecture
              </p>

            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(37,99,235,0.15)]">

              <h3 className="text-5xl font-bold text-blue-500">
  {automations}+
</h3>

              <p className="mt-4 text-gray-400">
                Scalable Modern Infrastructure
              </p>

            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(37,99,235,0.15)]">

              <h3 className="text-5xl font-bold text-blue-500">
  {uptime}%
</h3>

              <p className="mt-4 text-gray-400">
                Intelligent Operational Systems
              </p>

            </div>

          </div>

        </div>
      

      </section>
      </Reveal>
      <Reveal>
            {/* CTA SECTION */}
      
      <section id="contact" className="relative z-10 overflow-hidden border-t border-transparent bg-[#050505] px-6 py-40">

        {/* BACKGROUND GLOW */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[110px]"></div>

        <div className="relative mx-auto max-w-5xl text-center">

          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-blue-500">
            LET’S BUILD THE FUTURE
          </p>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-8xl">
            Intelligent Systems
            <span className="text-blue-500"> Engineered</span>
            <br />
            for Modern Business
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Chidakara partners with forward-thinking businesses to design
            premium AI automation systems, scalable digital infrastructure,
            intelligent workflows, and modern operational platforms.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <button className="group relative overflow-hidden rounded-full bg-blue-600 px-8 py-4 text-sm font-medium tracking-wide transition-all duration-500   hover:-translate-y-2 hover:scale-[1.015] hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] active:scale-[0.98] hover:bg-blue-500 hover:shadow-[0_0_60px_rgba(37,99,235,0.45)]">

  <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] translate-x-[-120%] transition-transform duration-1000 group-hover:translate-x-[120%]"></div>

  <span className="relative z-10">
    Start a Project
  </span>

</button>

<button className="group relative overflow-hidden rounded-full border border-white/8 bg-black/60 backdrop-blur-2xl px-8 py-4 text-sm font-medium tracking-wide transition-all duration-500   hover:-translate-y-2 hover:scale-[1.015] hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_50px_rgba(37,99,235,0.25)]">

  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_70%)]"></div>

  <span className="relative z-10">
    Explore Systems
  </span>

</button>
          </div>

        </div>

      </section>
      </Reveal>
            {/* FOOTER */}
<footer className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-20">

  {/* BACKGROUND GLOW */}
  <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl opacity-40"></div>

  <div className="relative mx-auto max-w-7xl">

    <div className="grid gap-12 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

      {/* BRAND */}
      <div>

        <h3 className="text-3xl font-bold tracking-[0.2em] text-white">
          CHIDAKARA
        </h3>

        <p className="mt-5 max-w-sm leading-relaxed text-gray-400">
          Engineering premium AI systems, intelligent workflows,
          scalable infrastructure, and future-ready digital platforms.
        </p>

      </div>

      {/* NAVIGATION */}
      <div>

        <h4 className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-500">
          Navigation
        </h4>

        <div className="flex flex-col gap-4 text-gray-400">

          <a href="#solutions" className="opacity-70 transition-all duration-300 hover:text-blue-400 hover:opacity-100">
            Solutions
          </a>

          <a href="#showcase" className="opacity-70 transition-all duration-300 hover:text-blue-400 hover:opacity-100">
            Showcase
          </a>

          <a href="#case-study" className="opacity-70 transition-all duration-300 hover:text-blue-400 hover:opacity-100">
            Case Studies
          </a>

          <a href="#contact" className="opacity-70 transition-all duration-300 hover:text-blue-400 hover:opacity-100">
            Contact
          </a>

        </div>

      </div>

      {/* SOCIALS */}
      <div>

        <h4 className="mb-6 text-sm uppercase tracking-[0.25em] text-blue-500">
          Connect
        </h4>

        <div className="flex gap-4">

          {["LinkedIn", "GitHub", "X"].map((item) => (

            <div
              key={item}
              className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-white/8 bg-black/60 backdrop-blur-2xl bg-white/[0.03] transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.015] hover:border-blue-500/40 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(37,99,235,0.25)]"
            >

              <span className="text-sm text-gray-300 transition group-hover:text-blue-400">
                {item[0]}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

    {/* BOTTOM */}
    <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-sm text-gray-500 md:flex-row">

      <p>
        © 2026 Chidakara. Engineered for Intelligent Systems.
      </p>

      <p>
        Designed with AI-driven infrastructure & futuristic systems.
      </p>

    </div>

  </div>

</footer>
      <AIChat />
    </main>
  );
}