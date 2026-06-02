import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

export const metadata = {
  title: "Contact — Chidakara",
};

const contactCards = [
  {
    title: "Enterprise Consultation",
    value: "AI Strategy Session",
    icon: Phone,
  },

  {
    title: "Email Intelligence",
    value: "hello.chidakara@gmail.com",
    icon: Mail,
  },

  {
    title: "Operations Location",
    value: "Hyderabad, India",
    icon: MapPin,
  },

  {
    title: "Availability",
    value: "24/7 AI Systems",
    icon: Clock3,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black px-6 pb-24 pt-52 text-white">
      <BackgroundEffects />
        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

          <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

        </div>

        {/* HERO */}

        <section className="relative z-10">

          <div className="mx-auto max-w-7xl">

            <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">

              CONTACT CHIDAKARA

            </p>

            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">

              Engineer Intelligent
              <span className="text-blue-500"> AI Infrastructure</span>

            </h1>

            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400">

              Connect with Chidakara to build scalable AI ecosystems,
              automation infrastructures, predictive intelligence systems,
              and enterprise operational platforms.

            </p>

          </div>

        </section>

        {/* CONTACT GRID */}

        <section className="relative z-10 py-24">

          <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[1fr_0.85fr]">

            {/* FORM */}

            <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 p-10 backdrop-blur-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">

                    ENTERPRISE INQUIRY

                  </p>

                  <h2 className="mt-4 text-4xl font-semibold">

                    Start Your AI Project

                  </h2>

                </div>

                <ArrowUpRight className="h-8 w-8 text-blue-400" />

              </div>

              {/* FORM */}

              <div className="mt-14 grid gap-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500/30"
                />

                <input
                  type="email"
                  placeholder="Business Email"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500/30"
                />

                <input
                  type="text"
                  placeholder="Organization / Company"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500/30"
                />

                <textarea
                  rows={6}
                  placeholder="Describe your AI infrastructure or automation requirements..."
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-blue-500/30"
                />

                <button className="mt-4 rounded-full bg-blue-600 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500">

                  Submit Enterprise Inquiry

                </button>

              </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="space-y-8">

              {contactCards.map((item, index) => {

                const Icon = item.icon;

                return (

                  <div
                    key={index}
                    className="rounded-[2.5rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">

                        <Icon className="h-7 w-7 text-blue-400" />

                      </div>

                      <ArrowUpRight className="h-5 w-5 text-gray-500" />

                    </div>

                    <p className="mt-10 text-sm uppercase tracking-[0.3em] text-cyan-400">

                      {item.title}

                    </p>

                    <h3 className="mt-5 text-3xl font-semibold leading-tight">

                      {item.value}

                    </h3>

                  </div>

                );

              })}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}