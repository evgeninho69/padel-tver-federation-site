"use client";

import * as React from "react";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

import { heroFacts, inputImages, navSections } from "@/content/site-data";
import { RubricGrid } from "@/components/visual/RubricGrid";

const highlights = [
  {
    title: "Турниры для всех уровней",
    text: "От первых стартов для новичков до рейтинговых региональных соревнований.",
  },
  {
    title: "Тренировки и сборы",
    text: "Индивидуальные и групповые занятия для детей, взрослых и семейных команд.",
  },
  {
    title: "Единое спортивное сообщество",
    text: "Федерация объединяет игроков, тренеров, судей и любителей активного отдыха.",
  },
] as const;

export default function HomePage(): React.JSX.Element {
  const heroRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -30]), {
    stiffness: 95,
    damping: 24,
    mass: 0.4,
  });
  const backgroundScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.06]), {
    stiffness: 90,
    damping: 24,
    mass: 0.42,
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.46, 0.62]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.22, 0.4]);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -10]), {
    stiffness: 110,
    damping: 26,
    mass: 0.3,
  });

  return (
    <main className="space-y-6 md:space-y-8">
      <section
        ref={heroRef}
        className="relative min-h-[72svh] overflow-hidden rounded-3xl border border-[#2f6a4b]/20 shadow-[0_24px_64px_-42px_rgba(15,40,29,0.72)]"
      >
        <motion.div style={{ y: backgroundY, scale: backgroundScale }} className="absolute inset-0 will-change-transform">
          <Image
            src={inputImages.neonMainCourtBackground}
            alt="Неоновый корт падела"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1240px"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(120deg, rgba(8, 26, 17, 0.8) 0%, rgba(8, 26, 17, 0.46) 48%, rgba(8, 26, 17, 0.76) 100%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: glowOpacity,
            background: "radial-gradient(circle at 50% 72%, rgba(90, 172, 127, 0.7) 0%, rgba(14, 35, 24, 0) 58%)",
          }}
        />

        <div className="relative z-10 flex min-h-[72svh] items-end p-5 md:p-8">
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: "easeOut" }}
            className="max-w-3xl rounded-2xl border border-white/30 bg-[#0f2217]/58 p-5 text-white shadow-xl backdrop-blur-[2px] md:p-7"
          >
            <p className="inline-flex rounded-full border border-[#f2dfbf]/65 bg-[#f2dfbf]/24 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#fff1d5]">
              Официальный региональный портал
            </p>
            <h1 className="font-display mt-3 text-3xl font-bold leading-tight !text-[#f6f7f3] [text-shadow:0_2px_8px_rgba(7,18,12,0.5)] md:text-5xl">
              Федерация падела Тверской области
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed !text-[#dfebe4] md:text-base">
              Турниры, рейтинг, сборная и новости падела в регионе. Здесь собрана главная информация для игроков, тренеров
              и семей, которые выбирают активный и честный спорт.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="panel-surface rounded-3xl p-4 md:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {heroFacts.map((fact, index) => (
            <motion.article
              key={fact.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-[#25573f]/26 bg-[#2a684d] px-4 py-5"
            >
              <p className="font-display text-3xl font-bold !text-[#fff7e8] [text-shadow:0_1px_2px_rgba(10,28,19,0.35)]">
                {fact.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.11em] !text-[#f0f8f2]">{fact.label}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <RubricGrid items={navSections} />

      <section className="panel-surface rounded-3xl p-4 md:p-6">
        <h2 className="font-display text-2xl font-bold text-[#245640] md:text-3xl">Почему падел растет в регионе</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <motion.article
              key={highlight.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="card-surface rounded-2xl p-4"
            >
              <h3 className="font-display text-lg font-semibold text-[#275f46]">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{highlight.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
