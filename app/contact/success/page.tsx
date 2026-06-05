import Link from "next/link";

export default function ContactSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      <div className="max-w-3xl text-center">

        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
          MESSAGE RECEIVED
        </p>

        <h1 className="mt-6 text-5xl font-semibold md:text-7xl">
          Thank You
        </h1>

        <p className="mt-8 text-lg text-gray-400">
          We've received your inquiry and will review your
          requirements. Our team will get back to you shortly.
        </p>

        <div className="mt-12 flex justify-center gap-4">

          <Link
            href="/"
            className="rounded-full bg-blue-600 px-8 py-4"
          >
            Back Home
          </Link>

          <Link
            href="/solutions"
            className="rounded-full border border-white/10 px-8 py-4"
          >
            Explore Solutions
          </Link>

        </div>

      </div>

    </main>
  );
}