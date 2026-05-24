"use client";

import { motion } from "framer-motion";

import { AnimatedImageCard } from "@/components/visual/AnimatedImageCard";

interface PageHeroProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
}

export function PageHero({ title, description, imageSrc, imageAlt, badge }: PageHeroProps): React.JSX.Element {
  return (
    <section className="panel-surface rounded-3xl p-4 md:p-6">
      <div className="grid gap-4 md:grid-cols-[1.05fr_1fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {badge ? (
            <p className="mb-3 inline-flex rounded-full border border-[#2f6a4b]/20 bg-[#f2dfbf]/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.11em] text-[#2b6549]">
              {badge}
            </p>
          ) : null}
          <h1 className="font-display text-3xl font-bold leading-tight text-[#1f4a36] md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">{description}</p>
        </motion.div>

        <AnimatedImageCard src={imageSrc} alt={imageAlt} priority />
      </div>
    </section>
  );
}
