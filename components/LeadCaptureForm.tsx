"use client";

import { useState } from "react";

export default function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">

      <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
        Start a Project
      </p>

      <h2 className="mt-4 text-4xl font-semibold">
        Build with Chidakara
      </h2>

      <p className="mt-4 text-gray-400">
        Tell us about your AI, automation, analytics, or software project.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
          Project request submitted successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            placeholder="Name"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 outline-none"
          />

          <input
            placeholder="Email"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 outline-none"
          />

          <input
            placeholder="Company"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 outline-none"
          />

          <textarea
            rows={5}
            placeholder="Describe your project..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 outline-none"
          />

          <button
            type="submit"
            className="rounded-full bg-blue-600 px-8 py-4 transition hover:bg-blue-500"
          >
            Submit Project
          </button>

        </form>
      )}

    </section>
  );
}