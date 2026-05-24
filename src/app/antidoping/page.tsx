"use client";

import { motion } from "framer-motion";

import { antiDopingPrinciples, inputImages } from "@/content/site-data";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";

const cards = [
  {
    title: "Ответственность спортсмена",
    text: "Каждый игрок проверяет препараты и добавки до начала соревнований.",
    image: inputImages.racketCloseup,
  },
  {
    title: "Профилактика",
    text: "Федерация проводит разъяснительную работу для игроков и родителей.",
    image: inputImages.architecture,
  },
  {
    title: "Честный результат",
    text: "Чистый спорт защищает репутацию команды и доверие к турнирам.",
    image: inputImages.duoAction,
  },
];

export default function AntiDopingPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Антидопинг"
        description="Мы поддерживаем ценности честной игры. В этом разделе собраны основные принципы и рекомендации для спортсменов и тренеров."
        imageSrc={inputImages.courtInterior}
        imageAlt="Антидопинг и честная игра"
        badge="Чистый спорт"
      />

      <section className="panel-surface rounded-3xl p-4 md:p-6">
        <h2 className="font-display text-2xl font-bold text-[#245640] md:text-3xl">Базовые принципы</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {antiDopingPrinciples.map((item, index) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.05 }}
              className="card-surface rounded-xl p-4 text-sm text-slate-700"
            >
              {item}
            </motion.article>
          ))}
        </div>
      </section>

      <RubricCards title="Культура честной игры" items={cards} />
    </main>
  );
}
