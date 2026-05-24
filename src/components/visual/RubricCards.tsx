"use client";

import { motion } from "framer-motion";

import { AnimatedImageCard } from "@/components/visual/AnimatedImageCard";

interface RubricCardItem {
  title: string;
  text: string;
  image: string;
}

interface RubricCardsProps {
  title: string;
  items: RubricCardItem[];
}

export function RubricCards({ title, items }: RubricCardsProps): React.JSX.Element {
  return (
    <section className="panel-surface rounded-3xl p-4 md:p-6">
      <h2 className="font-display text-2xl font-bold text-[#245640] md:text-3xl">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.46, delay: index * 0.05 }}
            className="card-surface rounded-2xl p-3"
          >
            <AnimatedImageCard src={item.image} alt={item.title} className="mb-3 h-40" />
            <h3 className="font-display text-lg font-semibold text-[#275f46]">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
