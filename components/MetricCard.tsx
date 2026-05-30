interface MetricCardProps {
  number: string;
  label: string;
}

export default function MetricCard({
  number,
  label,
}: MetricCardProps) {

  return (

    <div className="group rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:border-cyan-400/20 hover:shadow-[0_20px_80px_rgba(37,99,235,0.18)]">

      <h2 className="text-5xl font-semibold text-white">
        {number}
      </h2>

      <p className="mt-4 text-gray-400">
        {label}
      </p>

    </div>

  );
}