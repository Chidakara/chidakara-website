import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import { showcaseItems } from "@/lib/showcase";
import { notFound } from "next/navigation";

export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = showcaseItems.find((project) => project.slug === slug);

  if (!item) {
    notFound();
  }

  const Icon = item.icon;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pt-40 text-white">

        <BackgroundEffects />

        <section className="relative z-10 mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-2xl">

            {/* HERO */}

            <div className="relative overflow-hidden border-b border-white/10 p-10 md:p-16">

              <div className="absolute inset-0 opacity-40">

                <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

              </div>

              <div className="relative z-10">

                <div className="flex items-center gap-5">

                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">

                    <Icon className="h-10 w-10 text-blue-400" />

                  </div>

                  <div>

                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
                      CHIDAKARA SHOWCASE
                    </p>

                    <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
                      {item.title}
                    </h1>

                  </div>

                </div>

                <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

                  {item.description}

                </p>

              </div>

            </div>

            {/* CONTENT */}

            <div className="grid gap-8 p-10 lg:grid-cols-3">

              {/* LEFT */}

              <div className="lg:col-span-2">

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

                  <h2 className="text-2xl font-semibold">
                    System Architecture
                  </h2>

                  <p className="mt-6 leading-relaxed text-gray-400">

                    This intelligent AI infrastructure system is engineered for
                    enterprise scalability, realtime operational visibility,
                    automation orchestration, and intelligent decision-making.

                    Chidakara develops premium AI ecosystems capable of handling
                    automation pipelines, predictive analytics, workflow
                    execution, realtime monitoring, and enterprise integrations.

                  </p>

                </div>

                {/* MOCK DASHBOARD */}

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-950/30 to-black p-8">

                  <div className="grid gap-4 md:grid-cols-3">

                    <div className="h-32 rounded-3xl border border-white/10 bg-white/[0.03]" />

                    <div className="h-32 rounded-3xl border border-blue-500/20 bg-blue-500/[0.06]" />

                    <div className="h-32 rounded-3xl border border-white/10 bg-white/[0.03]" />

                  </div>

                  <div className="mt-6 h-64 rounded-[2rem] border border-white/10 bg-black/40" />

                </div>

              </div>

              {/* RIGHT */}

              <div className="space-y-8">

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

                  <h3 className="text-xl font-semibold">
                    Infrastructure Stack
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-3">

                    {[
                      "Next.js",
                      "FastAPI",
                      "OpenAI",
                      "Supabase",
                      "n8n",
                      "PostgreSQL",
                    ].map((tech, index) => (

                      <div
                        key={index}
                        className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-gray-300"
                      >
                        {tech}
                      </div>

                    ))}

                  </div>

                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">

                  <h3 className="text-xl font-semibold">
                    AI Capabilities
                  </h3>

                  <div className="mt-6 space-y-4">

                    {[
                      "Realtime Analytics",
                      "Automation Pipelines",
                      "Predictive Intelligence",
                      "Enterprise Monitoring",
                    ].map((feature, index) => (

                      <div
                        key={index}
                        className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-sm text-gray-300"
                      >
                        {feature}
                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}