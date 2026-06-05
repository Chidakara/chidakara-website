import { caseStudies } from "@/lib/caseStudies";
import { notFound } from "next/navigation";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const study = caseStudies.find(
    (item) => item.slug === slug
  );

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold">
        {study.company}
      </h1>

      <p className="mt-6 text-gray-400">
        {study.description}
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">
          Challenge
        </h2>

        <p className="mt-4 text-gray-400">
          {study.challenge}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">
          Solution
        </h2>

        <p className="mt-4 text-gray-400">
          {study.solution}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">
          Impact
        </h2>

        <p className="mt-4 text-gray-400">
          {study.impact}
        </p>
      </div>
    </main>
  );
}