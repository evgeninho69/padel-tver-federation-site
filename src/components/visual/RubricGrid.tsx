"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { NavSection } from "@/content/site-data";
import { AnimatedImageCard } from "@/components/visual/AnimatedImageCard";

interface RubricGridProps {
  items: NavSection[];
}

export function RubricGrid({ items }: RubricGridProps): React.JSX.Element {
  return (
    <section className="panel-surface rounded-3xl p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#245640] md:text-3xl">Разделы федерации</h2>
          <p className="mt-1 text-sm text-slate-600">Выберите нужный раздел и перейдите к материалам.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="card-surface rounded-2xl p-3"
          >
            <Link href={item.href} className="block">
              <AnimatedImageCard src={item.rubricImage} alt={item.title} className="mb-3 h-44" />
              <h3 className="font-display text-lg font-semibold text-[#2b6549]">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.subtitle}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
