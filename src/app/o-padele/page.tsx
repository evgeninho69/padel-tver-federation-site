"use client";

import { motion } from "framer-motion";

import { inputImages } from "@/content/site-data";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";

const basics = [
  "Падел играется парами на корте с ограждениями, которые участвуют в розыгрыше.",
  "Подача выполняется снизу после отскока мяча от покрытия.",
  "Побеждает пара, которая стабильнее держит темп и лучше работает в связке.",
  "Игра подходит и новичкам, и опытным теннисистам благодаря динамике и командности.",
];

const cards = [
  {
    title: "Быстрый вход в игру",
    text: "Базовые удары и тактика осваиваются уже на первых тренировках.",
    image: inputImages.liveMatch,
  },
  {
    title: "Командная стратегия",
    text: "Победа зависит от взаимодействия, выбора позиций и игрового ритма.",
    image: inputImages.duoAction,
  },
  {
    title: "Эмоции и энергия",
    text: "Каждый розыгрыш держит в напряжении и дарит азарт до последнего мяча.",
    image: inputImages.courtInterior,
  },
];

export default function AboutPadelPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="О паделе"
        description="Падел сочетает динамику, тактику и удовольствие от командной игры. Это формат, который быстро увлекает и помогает прогрессировать от тренировки к тренировке."
        imageSrc={inputImages.liveMatch}
        imageAlt="Что такое падел"
        badge="Игра для любого возраста"
      />

      <section className="panel-surface rounded-3xl p-4 md:p-6">
        <h2 className="font-display text-2xl font-bold text-[#245640] md:text-3xl">Падел простыми словами</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {basics.map((item, index) => (
            <motion.p
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.04 }}
              className="card-surface rounded-xl p-4 text-sm leading-relaxed text-slate-700"
            >
              {item}
            </motion.p>
          ))}
        </div>
      </section>

      <RubricCards title="Что особенно нравится игрокам" items={cards} />
    </main>
  );
}
