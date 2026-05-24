import Link from "next/link";

import { contactInfo } from "@/content/site-data";

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="mt-10 border-t border-[#2f6a4b]/16 bg-[#f9f4e9]">
      <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-7 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.11em] text-[#2f6a4b]">
            Федерация падела Тверской области
          </p>
          <p className="mt-2 text-sm text-slate-700">Развиваем падел как спорт для детей, взрослых и семейных команд.</p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.11em] text-[#2f6a4b]">Контакты</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>{contactInfo.address}</li>
            <li>{contactInfo.phone}</li>
            <li>{contactInfo.email}</li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.11em] text-[#2f6a4b]">Быстрые ссылки</p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <Link className="rounded-full bg-white px-3 py-1 text-[#2f6a4b]" href="/kalendar-turnirov">
              Турниры
            </Link>
            <Link className="rounded-full bg-white px-3 py-1 text-[#2f6a4b]" href="/rejting">
              Рейтинг
            </Link>
            <Link className="rounded-full bg-white px-3 py-1 text-[#2f6a4b]" href="/ploshadki">
              Площадки
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
