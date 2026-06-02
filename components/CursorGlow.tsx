"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 30,
    stiffness: 200,
  });

  const smoothY = useSpring(mouseY, {
    damping: 30,
    stiffness: 200,
  });

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () =>
      window.removeEventListener("mousemove", handleMouseMove);

  }, [mouseX, mouseY]);

  return (

    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-[120px]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />

  );
}