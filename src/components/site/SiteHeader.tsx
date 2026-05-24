"use client";

import * as React from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { inputImages, navSections } from "@/content/site-data";

export function SiteHeader(): React.JSX.Element {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [{ href: "/", title: "Главная" }, ...navSections.map(({ href, title }) => ({ href, title }))];

  return (
    <header className="sticky top-0 z-40 border-b border-[#2f6a4b]/16 bg-[#fff9ef]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/" className="group inline-flex items-center gap-2">
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#2f6a4b]/38 bg-[#08140f] shadow-sm"
          >
            <Image
              src={inputImages.federationLogoMark}
              alt="Логотип Федерации падела Твери"
              fill
              priority
              className="object-cover object-center scale-[1.28]"
              sizes="40px"
            />
          </motion.span>
          <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-[#24513b] sm:text-base">
            Федерация падела Тверской области
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-md border border-[#2f6a4b]/30 px-3 py-1.5 text-sm font-semibold text-[#2f6a4b] md:hidden"
        >
          Разделы
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-semibold transition",
                  active ? "bg-[#2f6a4b] text-white" : "text-[#2f6a4b] hover:bg-[#2f6a4b]/8",
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#2f6a4b]/12 bg-[#fff8ec] px-4 py-3 md:hidden">
          <nav className="grid gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    active ? "bg-[#2f6a4b] text-white" : "text-[#2f6a4b] hover:bg-[#2f6a4b]/8",
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
