import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      <div className="text-center">

        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          ERROR 404
        </p>

        <h1 className="mt-6 text-6xl font-semibold md:text-8xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">

          <Link
            href="/"
            className="rounded-full bg-blue-600 px-8 py-4 font-medium transition-all duration-300 hover:bg-blue-500"
          >
            Back Home
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-white/10 px-8 py-4 font-medium transition-all duration-300 hover:border-blue-500/30"
          >
            Contact Us
          </Link>

        </div>

      </div>

    </main>
  );
}