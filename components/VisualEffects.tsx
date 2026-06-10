"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: (i % 4) + 2,
  left: (i * 13) % 100,
  duration: 12 + (i % 6),
  delay: i * 0.3,
}));

export default function VisualEffects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Mouse Glow */}

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[1] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]"
      />

      {/* Background Effects */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/3 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-[140px]"
        />
      </div>

      {/* Particles */}

      {particles.map((particle) => (
  <motion.div
    key={particle.id}
    initial={{ opacity: 0, y: 0 }}
    animate={{
      opacity: [0, 0.6, 0],
      y: [-120, -420],
    }}
    transition={{
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease: "linear",
    }}
    className="absolute rounded-full bg-blue-400/40 blur-[2px]"
    style={{
      width: particle.size,
      height: particle.size,
      left: `${particle.left}%`,
      bottom: "-40px",
    }}
  />
))}
    </>
  );
}