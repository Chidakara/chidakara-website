"use client";

import CountUp from "react-countup";

export default function AnimatedCounter({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">

      <h3 className="text-4xl font-semibold text-white">

        <CountUp
          end={end}
          duration={2.5}
          enableScrollSpy
          scrollSpyOnce
        />

        {suffix}

      </h3>

      <p className="mt-3 text-gray-400">

        {label}

      </p>

    </div>
  );
}