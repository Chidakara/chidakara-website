import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BackgroundEffects from "@/components/BackgroundEffects";
import Link from "next/link";

export const metadata = {
  title: "About — Chidakara",
};

const technologies = [
  "Next.js",
  "FastAPI",
  "OpenAI",
  "Supabase",
  "n8n",
  "TypeScript",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-40 text-white">

        <BackgroundEffects />

        {/* HERO */}

        <section className="relative z-10 mx-auto max-w-7xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ABOUT CHIDAKARA
          </p>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">
            Engineering Intelligent Infrastructure
            <span className="text-blue-500"> for the Future</span>
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">
            Chidakara designs AI systems, automation platforms,
            operational intelligence solutions, enterprise dashboards,
            and intelligent infrastructure for modern organizations.
          </p>

        </section>
{/* WHO WE ARE */}

<section className="relative z-10 mx-auto mt-28 max-w-7xl">

  <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

    <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
      WHO WE ARE
    </p>

    <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
      Building Intelligent Digital Ecosystems
    </h2>

    <p className="mt-8 max-w-5xl text-lg leading-relaxed text-gray-400">
      Chidakara is an AI infrastructure and automation company focused on
      designing intelligent systems for modern organizations. Our work spans
      AI assistants, workflow automation, enterprise dashboards, predictive
      analytics, operational intelligence, and scalable digital platforms.
    </p>

    <p className="mt-6 max-w-5xl text-lg leading-relaxed text-gray-400">
      We combine artificial intelligence, automation technologies,
      analytics systems, and modern software engineering to help
      organizations operate more efficiently and make smarter decisions.
    </p>

  </div>

</section>
        {/* MISSION */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              OUR MISSION
            </p>

            <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
              Build Systems That Think, Adapt and Scale
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-400">
              Our mission is to help businesses leverage artificial
              intelligence, automation, analytics, and operational
              intelligence to create scalable and efficient systems.
            </p>

          </div>

        </section>

        {/* TECHNOLOGY STACK */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            TECHNOLOGY STACK
          </p>

          <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
            Built With Modern Technologies
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {technologies.map((tech, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
              >
                <h3 className="text-2xl font-semibold">
                  {tech}
                </h3>
              </div>
            ))}

          </div>

        </section>
{/* CORE PRINCIPLES */}

<section className="relative z-10 mx-auto mt-28 max-w-7xl">

  <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
    CORE PRINCIPLES
  </p>

  <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
    What Drives Our Engineering
  </h2>

  <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {[
      {
        title: "Intelligence",
        desc: "Systems should learn, adapt, and provide actionable insights.",
      },
      {
        title: "Automation",
        desc: "Manual processes should become intelligent workflows.",
      },
      {
        title: "Scalability",
        desc: "Infrastructure should evolve with organizational growth.",
      },
      {
        title: "Innovation",
        desc: "Technology should continuously improve and create value.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
      >
        <h3 className="text-2xl font-semibold">
          {item.title}
        </h3>

        <p className="mt-5 leading-relaxed text-gray-400">
          {item.desc}
        </p>
      </div>
    ))}

  </div>

</section>{/* CORE PRINCIPLES */}

<section className="relative z-10 mx-auto mt-28 max-w-7xl">

  <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
    CORE PRINCIPLES
  </p>

  <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
    What Drives Our Engineering
  </h2>

  <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

    {[
      {
        title: "Intelligence",
        desc: "Systems should learn, adapt, and provide actionable insights.",
      },
      {
        title: "Automation",
        desc: "Manual processes should become intelligent workflows.",
      },
      {
        title: "Scalability",
        desc: "Infrastructure should evolve with organizational growth.",
      },
      {
        title: "Innovation",
        desc: "Technology should continuously improve and create value.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.03]"
      >
        <h3 className="text-2xl font-semibold">
          {item.title}
        </h3>

        <p className="mt-5 leading-relaxed text-gray-400">
          {item.desc}
        </p>
      </div>
    ))}

  </div>

</section>

        {/* VISION */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/30 to-black p-12">

            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              OUR VISION
            </p>

            <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
              Building the Next Generation of AI Infrastructure
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-400">
              Chidakara aims to become a leading AI infrastructure company
              delivering intelligent automation ecosystems, enterprise
              platforms, operational intelligence systems, and future-ready
              technology solutions that empower organizations to scale.
            </p>

          </div>

        </section>
{/* ROADMAP */}

<section className="relative z-10 mx-auto mt-28 max-w-7xl">

  <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/20 to-black p-12">

    <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
      COMPANY ROADMAP
    </p>

    <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
      Building the Future, Step by Step
    </h2>

    <div className="mt-14 grid gap-8 lg:grid-cols-3">

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <h3 className="text-2xl font-semibold">
          Today
        </h3>

        <ul className="mt-6 space-y-3 text-gray-400">
          <li>AI Assistants</li>
          <li>Workflow Automation</li>
          <li>Enterprise Dashboards</li>
          <li>Operational Intelligence</li>
        </ul>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <h3 className="text-2xl font-semibold">
          Next Phase
        </h3>

        <ul className="mt-6 space-y-3 text-gray-400">
          <li>Enterprise AI Platforms</li>
          <li>Intelligent Infrastructure</li>
          <li>Business Automation Ecosystems</li>
          <li>Advanced Analytics Systems</li>
        </ul>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <h3 className="text-2xl font-semibold">
          Long-Term Vision
        </h3>

        <ul className="mt-6 space-y-3 text-gray-400">
          <li>Global AI Infrastructure Company</li>
          <li>Technology Ecosystem</li>
          <li>Industry Transformation</li>
          <li>Intelligent Digital Futures</li>
        </ul>
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