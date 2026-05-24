"use client";

import * as React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface AnimatedImageCardProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function AnimatedImageCard({ src, alt, priority = false, className = "" }: AnimatedImageCardProps): React.JSX.Element {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`relative overflow-hidden rounded-2xl border border-[#2f6a4b]/20 bg-[#e8f1ea] shadow-[0_20px_42px_-26px_rgba(22,56,40,0.55)] ${className}`}
      whileHover={{ scale: 1.02, rotate: -0.35 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
    >
      <motion.div
        animate={{ y: [0, -7, 0], rotate: [0, 0.7, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} width={1600} height={900} priority={priority} className="h-full w-full object-cover" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(0,0,0,0.26)_100%)]" />
    </motion.div>
  );
}
