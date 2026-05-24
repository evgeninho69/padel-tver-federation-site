"use client";

import { motion } from "framer-motion";

import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";
import { inputImages } from "@/content/site-data";

const candidates = [
  "Смирнов Иван — категория B",
  "Козлова Екатерина — категория B",
  "Васильев Алексей — категория C",
  "Петрова Анна — категория C",
  "Морозов Дмитрий — категория B",
  "Сергеева Ольга — категория C",
];

const cards = [
  {
    title: "Критерии отбора",
    text: "Учитываются результаты турниров, дисциплина и готовность к командным стартам.",
    image: inputImages.duoAction,
  },
  {
    title: "Тренировочный цикл",
    text: "Сборная проводит регулярные совместные занятия и контрольные матчи.",
    image: inputImages.liveMatch,
  },
  {
    title: "Представление региона",
    text: "Игроки сборной защищают честь области на крупных выездных соревнованиях.",
    image: inputImages.architecture,
  },
];

export default function TeamPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Сборная Тверской области"
        description="Здесь публикуются кандидаты и информация о подготовке команды, которая представляет регион на межрегиональных стартах."
        imageSrc={inputImages.duoAction}
        imageAlt="Сборная команды Тверской области"
        badge="Команда региона"
      />

      <section className="panel-surface rounded-3xl p-4 md:p-6">
        <h2 className="font-display text-2xl font-bold text-[#245640] md:text-3xl">Кандидаты в расширенный состав</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="card-surface rounded-xl p-3 text-sm font-medium text-slate-700"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </section>

      <RubricCards title="Подготовка команды" items={cards} />
    </main>
  );
}
