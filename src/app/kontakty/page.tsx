"use client";

import { motion } from "framer-motion";

import { contactInfo, inputImages } from "@/content/site-data";
import { PageHero } from "@/components/visual/PageHero";
import { RubricCards } from "@/components/visual/RubricCards";
import { AnimatedImageCard } from "@/components/visual/AnimatedImageCard";

const cards = [
  {
    title: "Запись на консультацию",
    text: "Поможем выбрать формат занятий, уровень группы и удобное время.",
    image: inputImages.courtInterior,
  },
  {
    title: "Вопросы по турнирам",
    text: "Подскажем по заявкам, категориям и условиям участия в стартах.",
    image: inputImages.liveMatch,
  },
  {
    title: "Сотрудничество",
    text: "Открыты к партнерствам, детским программам и спортивным инициативам.",
    image: inputImages.architecture,
  },
];

export default function ContactsPage(): React.JSX.Element {
  return (
    <main className="space-y-6 md:space-y-8">
      <PageHero
        title="Контакты"
        description="Свяжитесь с федерацией, чтобы записаться на занятия, уточнить календарь турниров или обсудить совместные проекты."
        imageSrc={inputImages.architecture}
        imageAlt="Контакты федерации падела"
        badge="Мы на связи"
      />

      <section className="panel-surface rounded-3xl p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div className="card-surface space-y-3 rounded-2xl p-4 text-sm text-slate-700">
            <p><span className="font-bold text-[#275a43]">Адрес:</span> {contactInfo.address}</p>
            <p><span className="font-bold text-[#275a43]">Телефон:</span> {contactInfo.phone}</p>
            <p><span className="font-bold text-[#275a43]">Почта:</span> {contactInfo.email}</p>
            <p><span className="font-bold text-[#275a43]">Время работы:</span> ежедневно с 09:00 до 22:00</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
          >
            <AnimatedImageCard src={inputImages.architecture} alt="Контакты и расположение" className="h-full min-h-[260px]" />
          </motion.div>
        </div>
      </section>

      <RubricCards title="Чем можем помочь" items={cards} />
    </main>
  );
}
