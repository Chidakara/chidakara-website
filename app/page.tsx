import Reveal from "../components/Reveal";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="text-lg font-semibold tracking-[0.2em] text-white">
            CHIDAKARA
          </div>

          <div className="hidden gap-8 text-sm text-gray-300 md:flex">
            <a href="#" className="transition hover:text-white">
              Solutions
            </a>

            <a href="#" className="transition hover:text-white">
              Showcase
            </a>

            <a href="#" className="transition hover:text-white">
              Case Studies
            </a>

            <a href="#" className="transition hover:text-white">
              Contact
            </a>
          </div>

          <button className="rounded-full border border-blue-500 bg-blue-600 px-5 py-2 text-sm font-medium transition hover:bg-blue-500">
            Let’s Build
          </button>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">

        {/* GLOW EFFECT */}
        <div className="absolute top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl"></div>

        <p className="relative mb-6 text-sm uppercase tracking-[0.4em] text-blue-500">
          ENGINEERED FOR INTELLIGENT SYSTEMS
        </p>
      <Reveal>
        <h1 className="relative max-w-6xl text-5xl font-bold leading-tight md:text-8xl">
          Building the Future of
          <span className="text-blue-500"> AI Automation</span>
        </h1>
      </Reveal>
        <p className="relative mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
          Chidakara designs premium AI systems, intelligent workflows,
          automation infrastructures, dashboards, and modern digital solutions
          for forward-thinking businesses.
        </p>

        <div className="relative mt-12 flex flex-wrap justify-center gap-4">

          <button className="rounded-full bg-blue-600 px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)]">"
            Explore Solutions
          </button>

          <button className="rounded-full border border-white/10 px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            View Showcase
          </button>

        </div>

      </section>
            {/* SOLUTIONS SECTION */}
      <Reveal>
      <section className="border-t border-white/10 bg-[#050505] px-6 py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-500">
              AI SOLUTIONS
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
              Intelligent Systems Built for Modern Business
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Chidakara develops scalable AI systems, intelligent automations,
              dashboards, and digital infrastructures designed to optimize
              modern business operations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {/* CARD 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-blue-500/50 hover:bg-white/[0.05]">
              <div className="mb-6 text-4xl">🤖</div>

              <h3 className="mb-4 text-2xl font-semibold">
                AI Assistants
              </h3>

              <p className="text-gray-400">
                Intelligent AI systems designed for customer support,
                lead qualification, and business automation.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-blue-500/50 hover:bg-white/[0.05]">
              <div className="mb-6 text-4xl">⚡</div>

              <h3 className="mb-4 text-2xl font-semibold">
                Workflow Automation
              </h3>

              <p className="text-gray-400">
                Automating repetitive business processes using modern AI
                infrastructure and intelligent workflows.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-blue-500/50 hover:bg-white/[0.05]">
              <div className="mb-6 text-4xl">📊</div>

              <h3 className="mb-4 text-2xl font-semibold">
                AI Dashboards
              </h3>

              <p className="text-gray-400">
                Premium analytics dashboards with intelligent insights,
                reporting systems, and business visibility tools.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-blue-500/50 hover:bg-white/[0.05]">
              <div className="mb-6 text-4xl">🧠</div>

              <h3 className="mb-4 text-2xl font-semibold">
                Intelligent Systems
              </h3>

              <p className="text-gray-400">
                Custom-built AI-powered platforms engineered for scalability,
                performance, and operational efficiency.
              </p>
            </div>

          </div>

        </div>

      </section>
      </Reveal>
            {/* SHOWCASE SECTION */}
      <Reveal>
      <section className="border-t border-white/10 bg-black px-6 py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-500">
              SHOWCASE
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
              Built for Modern Intelligent Infrastructure
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Exploring the future of AI-powered systems, intelligent workflows,
              analytics infrastructure, and business automation platforms.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-2">

            {/* SHOWCASE CARD 1 */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/30">

              <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-blue-600/20 to-black">

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="grid w-[80%] grid-cols-3 gap-4">

                    <div className="h-20 rounded-2xl bg-blue-500/20 backdrop-blur-xl"></div>

                    <div className="h-20 rounded-2xl bg-white/10 backdrop-blur-xl"></div>

                    <div className="h-20 rounded-2xl bg-blue-500/20 backdrop-blur-xl"></div>

                    <div className="col-span-2 h-32 rounded-2xl bg-white/10 backdrop-blur-xl"></div>

                    <div className="h-32 rounded-2xl bg-blue-500/20 backdrop-blur-xl"></div>

                  </div>

                </div>

              </div>

              <div className="p-8">

                <h3 className="mb-4 text-3xl font-semibold">
                  AI Analytics Dashboard
                </h3>

                <p className="text-gray-400">
                  Intelligent analytics systems designed for business insights,
                  performance monitoring, and AI-powered reporting workflows.
                </p>

              </div>

            </div>

            {/* SHOWCASE CARD 2 */}
            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/30">
              <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-blue-500/20 to-black">

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="flex flex-col gap-6">

                    <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm">
                      Lead Captured
                    </div>

                    <div className="mx-auto h-12 w-[2px] bg-blue-500/40"></div>

                    <div className="rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm">
                      AI Qualification
                    </div>

                    <div className="mx-auto h-12 w-[2px] bg-blue-500/40"></div>

                    <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm">
                      CRM + Automation
                    </div>

                  </div>

                </div>

              </div>

              <div className="p-8">

                <h3 className="mb-4 text-3xl font-semibold">
                  Workflow Automation
                </h3>

                <p className="text-gray-400">
                  AI-powered automation infrastructures built to streamline
                  operations, optimize workflows, and reduce manual effort.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
      </Reveal>
      
            {/* CASE STUDY SECTION */}
      <Reveal>

      <section className="border-t border-white/10 bg-[#050505] px-6 py-32">

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-500">
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

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-2 text-3xl font-bold text-blue-500">
                  24/7
                </h3>

                <p className="text-gray-400">
                  Intelligent automation infrastructure
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="mb-2 text-3xl font-bold text-blue-500">
                  AI
                </h3>

                <p className="text-gray-400">
                  Analytics and workflow intelligence
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT VISUAL */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-black p-8">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  Operations Dashboard
                </p>

                <h3 className="mt-1 text-2xl font-semibold">
                  Business Insights
                </h3>
              </div>

              <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                Active
              </div>

            </div>

            <div className="space-y-6">

              <div className="rounded-2xl bg-white/[0.05] p-5">

                <div className="mb-3 flex justify-between text-sm">
                  <span className="text-gray-400">
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
                  <span className="text-gray-400">
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
                  <span className="text-gray-400">
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
            {/* TECH STACK SECTION */}
      <Reveal>
      <section className="border-t border-white/10 bg-black px-6 py-32">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-20 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-500">
              TECHNOLOGY STACK
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
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
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center transition hover:border-blue-500/40 hover:bg-white/[0.05]"
              >
                <h3 className="text-2xl font-semibold">{tech}</h3>
              </div>
            ))}

          </div>

          {/* METRICS */}
          <div className="mt-24 grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

              <h3 className="text-5xl font-bold text-blue-500">
                AI
              </h3>

              <p className="mt-4 text-gray-400">
                Automation-First Architecture
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

              <h3 className="text-5xl font-bold text-blue-500">
                Cloud
              </h3>

              <p className="mt-4 text-gray-400">
                Scalable Modern Infrastructure
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

              <h3 className="text-5xl font-bold text-blue-500">
                24/7
              </h3>

              <p className="mt-4 text-gray-400">
                Intelligent Operational Systems
              </p>

            </div>

          </div>

        </div>

      </section>
      </Reveal>
      
            {/* CTA SECTION */}
      <Reveal>
      <section className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-40">

        {/* BACKGROUND GLOW */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-5xl text-center">

          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-blue-500">
            LET’S BUILD THE FUTURE
          </p>

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
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

            <button className="rounded-full bg-blue-600 px-8 py-4 text-sm font-medium transition hover:bg-blue-500">
              Start a Project
            </button>

            <button className="rounded-full border border-white/10 px-8 py-4 text-sm font-medium transition hover:border-white/30">
              Explore Systems
            </button>

          </div>

        </div>

      </section>
      </Reveal>
            {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

          <div>
            <h3 className="text-2xl font-bold tracking-[0.2em]">
              CHIDAKARA
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Engineered for Intelligent Systems.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">

            <a href="#" className="transition hover:text-white">
              LinkedIn
            </a>

            <a href="#" className="transition hover:text-white">
              GitHub
            </a>

            <a href="#" className="transition hover:text-white">
              Contact
            </a>

          </div>

        </div>

      </footer>
    </main>
  );
}