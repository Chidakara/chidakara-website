import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import VisualEffects from "@/components/VisualEffects";

const stack = [
  {
    title: "Next.js",
    description:
      "Modern React framework powering scalable web applications and AI platforms.",
  },
  {
    title: "TypeScript",
    description:
      "Type-safe development for reliability, maintainability, and enterprise systems.",
  },
  {
    title: "Supabase",
    description:
      "Authentication, databases, storage, realtime events, and backend infrastructure.",
  },
  {
    title: "OpenAI",
    description:
      "Advanced language intelligence, automation, assistants, and AI workflows.",
  },
  {
    title: "n8n",
    description:
      "Workflow orchestration and business process automation across platforms.",
  },
  {
    title: "FastAPI",
    description:
      "High-performance backend APIs powering AI services and integrations.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-40 text-white">

        <VisualEffects />

        {/* HERO */}

        <section className="relative z-10 mx-auto max-w-7xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            TECHNOLOGY
          </p>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">
            Built On Modern AI Infrastructure
          </h1>

          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">
            Chidakara combines modern software engineering,
            artificial intelligence, automation systems,
            analytics infrastructure, and scalable cloud
            architectures to deliver intelligent business systems.
          </p>

        </section>

        {/* STACK */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            TECHNOLOGY STACK
          </p>

          <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
            Core Technologies
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {stack.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >

                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-5 leading-relaxed text-gray-400">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* ARCHITECTURE */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <div className="rounded-[3rem] border border-white/10 bg-white/[0.03] p-12">

            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              ARCHITECTURE
            </p>

            <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
              How Chidakara Systems Work
            </h2>

            <div className="mt-14 grid gap-6 md:grid-cols-5">

              {[
                "Users",
                "AI Agents",
                "Automation",
                "Analytics",
                "Infrastructure",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[2rem] border border-white/10 bg-black/30 p-6 text-center"
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </section>
{/* INFRASTRUCTURE LAYERS */}

<section className="relative z-10 mx-auto mt-28 max-w-7xl">

  <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
    SYSTEM ARCHITECTURE
  </p>

  <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
    Infrastructure Layers
  </h2>

  <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-400">
    Chidakara systems are designed using modular architecture layers
    that separate user experiences, business logic, AI processing,
    automation workflows, data infrastructure, and deployment systems.
  </p>

  <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

    {[
      "Frontend Layer",
      "Backend Layer",
      "AI Layer",
      "Automation Layer",
      "Data Layer",
      "Deployment Layer",
    ].map((layer) => (

      <div
        key={layer}
        className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
      >
        <h3 className="text-2xl font-semibold">
          {layer}
        </h3>
      </div>

    ))}

  </div>

</section>
        {/* SECURITY */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            SECURITY
          </p>

          <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
            Enterprise Ready Foundations
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {[
              "Role Based Access Control",
              "Secure Authentication",
              "Encrypted Data Handling",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
              >
                {item}
              </div>
            ))}

          </div>

        </section>

        {/* DEPLOYMENT */}

        <section className="relative z-10 mx-auto mt-28 max-w-7xl">

          <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/20 to-black p-12">

            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              DEPLOYMENT
            </p>

            <h2 className="mt-6 text-4xl font-semibold md:text-6xl">
              Built For Scale
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-gray-400">
              Chidakara systems are designed for scalability,
              reliability, realtime operations, and future growth.
              Whether supporting startups or enterprise environments,
              our infrastructure is engineered to evolve with demand.
            </p>

          </div>

        </section>

      </main>

      <CTASection />
      <Footer />

    </>
  );
}