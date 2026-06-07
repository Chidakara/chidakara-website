"use client";

const pipeline = [
  {
    step: "Lead Submitted",
    description:
      "A new prospect submits an inquiry through the Chidakara contact form.",
  },
  {
    step: "AI Qualification",
    description:
      "AI analyzes project requirements, urgency, budget, and business challenges.",
  },
  {
    step: "CRM Updated",
    description:
      "Lead information is automatically stored and categorized.",
  },
  {
    step: "Email Sent",
    description:
      "Confirmation emails and internal notifications are generated.",
  },
  {
    step: "Dashboard Updated",
    description:
      "Business dashboards instantly reflect new lead activity.",
  },
];

export default function AutomationDemoPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-28 text-white">

      {/* HEADER */}

      <div className="mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          AI AUTOMATION PIPELINE
        </p>

        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          Intelligent Workflow Infrastructure
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Chidakara automation systems orchestrate AI workflows,
          analytics pipelines, operational intelligence,
          and enterprise infrastructure in real-time.
        </p>

      </div>

      {/* PIPELINE */}

      <div className="mx-auto mt-28 max-w-6xl">

        <div className="relative grid gap-10 md:grid-cols-5">

          {/* CONNECTOR LINE */}

          <div className="absolute left-0 top-1/2 hidden h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 md:block" />

          {pipeline.map((item, index) => (

            <div
              key={index}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
            >

              {/* STEP NUMBER */}

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-xl font-bold text-blue-400">

                {index + 1}

              </div>

              <h2 className="text-2xl font-semibold">
                {item.step}
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* BOTTOM PANEL */}

      <div className="mx-auto mt-28 max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">

        <div className="grid gap-10 lg:grid-cols-2">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
              ENTERPRISE AUTOMATION
            </p>

            <h2 className="mt-6 text-4xl font-bold">
              Lead Management Automation
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              This workflow demonstrates how businesses can automate lead intake, qualification, notifications, CRM updates, and reporting using intelligent systems.
            </p>

          </div>

          {/* STATUS GRID */}

          <div className="grid gap-6 sm:grid-cols-2">

            {[
 ["342", "Qualified Leads"],
 ["87%", "Automation Rate"],
 ["4.2 Min", "Response Time"],
 ["₹18.4L", "Pipeline Value"],
].map(([value, label], index) => (

              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/40 p-6"
              >

                <h3 className="text-3xl font-bold text-blue-500">
                  {value}
                </h3>

                <p className="mt-3 text-gray-400">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}