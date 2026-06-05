import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service — Chidakara",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pt-40 pb-24 text-white">

        <div className="mx-auto max-w-4xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            LEGAL
          </p>

          <h1 className="mt-6 text-5xl font-semibold md:text-7xl">
            Terms of Service
          </h1>

          <div className="mt-12 space-y-8 text-gray-400">

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Services
              </h2>

              <p className="mt-4">
                Chidakara provides AI infrastructure,
                automation systems, analytics platforms,
                and related technology consulting services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Intellectual Property
              </h2>

              <p className="mt-4">
                All website content, branding, and materials remain
                the property of Chidakara unless otherwise specified.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Limitation of Liability
              </h2>

              <p className="mt-4">
                Services are provided on a best-effort basis and
                Chidakara shall not be liable for indirect or
                consequential damages.
              </p>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}