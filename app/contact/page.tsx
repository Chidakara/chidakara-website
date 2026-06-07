"use client";

import Navbar from "@/components/Navbar";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  

const searchParams = useSearchParams();

const source =
  searchParams.get("source") || "website";
  const router = useRouter();

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formRef.current) return;

  setLoading(true);

try {
 const formData = {
  source,
  user_name: (
    formRef.current.elements.namedItem("user_name") as HTMLInputElement
  ).value,

  user_email: (
    formRef.current.elements.namedItem("user_email") as HTMLInputElement
  ).value,

  company: (
    formRef.current.elements.namedItem("company") as HTMLInputElement
  ).value,

  project_type: (
    formRef.current.elements.namedItem("project_type") as HTMLSelectElement
  ).value,

  budget: (
    formRef.current.elements.namedItem("budget") as HTMLSelectElement
  ).value,

  timeline: (
    formRef.current.elements.namedItem("timeline") as HTMLSelectElement
  ).value,

  current_challenge: (
    formRef.current.elements.namedItem(
      "current_challenge"
    ) as HTMLSelectElement
  ).value,

  message: (
    formRef.current.elements.namedItem("message") as HTMLTextAreaElement
  ).value,
};
console.log("SERVICE ID:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
console.log("TEMPLATE ID:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
console.log("PUBLIC KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  const result = await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  formData,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
  console.log("SUCCESS!", result);

formRef.current.reset();

setSuccess(true);

router.push("/contact/success");
} catch (error: any) {
  console.error("FULL EMAIL ERROR:", error);

  alert(JSON.stringify(error));
} 
 finally {
    setLoading(false);
  }
};
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-black px-6 py-32 text-white">

        {/* BACKGROUND */}

        <div className="absolute inset-0 opacity-[0.08]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* CONTENT */}

        <section className="relative z-10 mx-auto max-w-5xl">

          <div className="mb-16">

            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-cyan-400">
              CONTACT CHIDAKARA
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
              Build the Future with{" "}
              <span className="text-blue-500">
                Intelligent Systems
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-gray-400">
              Let’s discuss AI infrastructure, automation systems,
              analytics platforms, enterprise dashboards, and futuristic
              operational ecosystems.
            </p>

          </div>

          {/* FORM */}

          <form
            ref={formRef}
            onSubmit={sendEmail}
            
            className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl"
          >

            <div className="grid gap-8 md:grid-cols-2">

              <div>
                <label className="mb-3 block text-sm text-gray-400">
                  Full Name
                </label>

                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm text-gray-400">
                  Email Address
                </label>

                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
                />
              </div>

            </div>

            <div>
              <label className="mb-3 block text-sm text-gray-400">
                Company / Organization
              </label>

              <input
                type="text"
                name="company"
                placeholder="Company name"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
              />
            </div>
            <div>
  <label className="mb-3 block text-sm text-gray-400">
    Project Type
  </label>

  <select
    name="project_type"
    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
  >
    <option>AI Assistant</option>
    <option>Workflow Automation</option>
    <option>AI Dashboard</option>
    <option>Custom AI System</option>
    <option>Other</option>
  </select>
</div>
<div>
  <label className="mb-3 block text-sm text-gray-400">
    Estimated Budget
  </label>

  <select
    name="budget"
    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
  >
    <option>Not Sure Yet</option>
<option>₹25,000 - ₹50,000</option>
<option>₹50,000 - ₹1,00,000</option>
<option>₹1,00,000 - ₹3,00,000</option>
<option>₹3,00,000 - ₹10,00,000</option>
<option>₹10,00,000+</option>
  </select>
</div>
<div>
  <label className="mb-3 block text-sm text-gray-400">
    Desired Timeline
  </label>

  <select
    name="timeline"
    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
  >
    <option>ASAP</option>
    <option>Within 1 Month</option>
    <option>Within 3 Months</option>
    <option>Flexible</option>
  </select>
</div>
<div>
  <label className="mb-3 block text-sm text-gray-400">
    Primary Business Challenge
  </label>

  <select
    name="current_challenge"
    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4"
  >
    <option>Too Much Manual Work</option>
    <option>Poor Reporting & Visibility</option>
    <option>Customer Support Bottlenecks</option>
    <option>Lead Management Problems</option>
    <option>Workflow Inefficiencies</option>
    <option>Multiple Software Systems</option>
    <option>Other</option>
  </select>
</div>
            <div>
              <label className="mb-3 block text-sm text-gray-400">
                Project Details
              </label>

              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition-all duration-300 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-blue-600 px-8 py-4 text-sm font-medium transition-all duration-500 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.35)]"
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>

            {success && (
              <p className="text-green-400">
                Message sent successfully.
              </p>
            )}
<input
  type="hidden"
  name="source"
  value={source}
/>
          </form>

        </section>

      </main>
    </>
  );
}