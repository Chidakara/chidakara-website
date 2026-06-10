import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative z-10 px-6 py-24">

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-950/30 to-black p-14 text-center backdrop-blur-2xl">

        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-cyan-400">
          BUILD WITH CHIDAKARA
        </p>

        <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          Engineer Intelligent Systems at Enterprise Scale
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-gray-400">
          AI automation platforms, intelligent dashboards,
          operational infrastructure, workflow orchestration,
          and scalable enterprise ecosystems.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">

          <Link
            href="/contact"
            className="rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500"
          >
            Start a Project
          </Link>

          <Link
            href="/solutions"
            className="rounded-full border border-white/10 px-10 py-5 font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
          >
            Explore Solutions
          </Link>

        </div>

      </div>

    </section>
  );
}