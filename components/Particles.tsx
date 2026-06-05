"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 24 });

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((_, index) => {

        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 12 + 10;
        const delay = Math.random() * 5;

        return (

          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-120, -420],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-blue-400/40 blur-[2px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-40px",
            }}
          />

        );

      })}

    </div>
  );
}