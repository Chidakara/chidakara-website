import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy — Chidakara",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pt-40 pb-24 text-white">

        <div className="mx-auto max-w-4xl">

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            LEGAL
          </p>

          <h1 className="mt-6 text-5xl font-semibold md:text-7xl">
            Privacy Policy
          </h1>

          <div className="mt-12 space-y-8 text-gray-400">

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Information We Collect
              </h2>

              <p className="mt-4">
                Information submitted through our contact forms,
                including name, email address, company details,
                project requirements, and related communications.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                How We Use Information
              </h2>

              <p className="mt-4">
                Information is used solely for responding to inquiries,
                evaluating project requirements, and providing requested
                services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Data Protection
              </h2>

              <p className="mt-4">
                Chidakara takes reasonable measures to protect submitted
                information and does not sell personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                Contact
              </h2>

              <p className="mt-4">
                For privacy-related inquiries, please use the contact form
                available on our website.
              </p>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}