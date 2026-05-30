interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {

  return (

    <div className="max-w-4xl">

      <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-400">
        {label}
      </p>

      <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>

      {description && (

        <p className="mt-8 max-w-2xl leading-relaxed text-gray-400">
          {description}
        </p>

      )}

    </div>

  );
}