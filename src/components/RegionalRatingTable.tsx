"use client";

import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RegionalPlayer {
  id: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  uniNumber: string;
  regionalRatingPoints: number;
  activeTournaments: number;
}

interface RegionalRatingTableProps {
  players: RegionalPlayer[];
  onBindTempProfile?: (playerId: string) => Promise<void> | void;
}

type ActiveTab = "men" | "women";

function sortedByPoints(players: RegionalPlayer[]): RegionalPlayer[] {
  return [...players].sort((a, b) => b.regionalRatingPoints - a.regionalRatingPoints);
}

function RatingRows({
  players,
  onBindTempProfile,
}: {
  players: RegionalPlayer[];
  onBindTempProfile?: (playerId: string) => Promise<void> | void;
}): React.JSX.Element {
  if (players.length === 0) {
    return <p className="text-sm text-slate-500">Нет данных по выбранной категории.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[790px] text-left text-sm">
        <thead className="bg-[#2f6a4b]/5 text-[#275a43]">
          <tr>
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wide">Место</th>
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wide">Игрок</th>
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wide">Очки</th>
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wide">Активные турниры</th>
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wide">UNI</th>
            <th className="px-3 py-2 text-xs font-bold uppercase tracking-wide">Статус</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const isTemp = player.uniNumber.startsWith("TEMP-");

            return (
              <tr key={player.id} className={cn("border-t border-slate-100", isTemp ? "bg-[#edd3a5]/16" : "")}> 
                <td className="px-3 py-2 font-bold text-[#2f6a4b]">#{index + 1}</td>
                <td className="px-3 py-2 font-semibold text-slate-800">
                  {player.lastName} {player.firstName}
                </td>
                <td className="px-3 py-2 text-base font-bold text-[#275a43]">{player.regionalRatingPoints}</td>
                <td className="px-3 py-2 text-slate-700">{player.activeTournaments}</td>
                <td className="px-3 py-2 font-medium">{player.uniNumber}</td>
                <td className="px-3 py-2">
                  {isTemp ? (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-100 text-amber-800">TEMP</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#2f6a4b]/35 text-[#2f6a4b]"
                        onClick={() => void onBindTempProfile?.(player.id)}
                      >
                        Привязать профиль
                      </Button>
                    </div>
                  ) : (
                    <Badge className="bg-emerald-100 text-emerald-800">Постоянный UNI</Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function RegionalRatingTable({ players, onBindTempProfile }: RegionalRatingTableProps): React.JSX.Element {
  const [tab, setTab] = React.useState<ActiveTab>("men");

  const men = React.useMemo(() => sortedByPoints(players.filter((player) => player.gender === "MALE")), [players]);
  const women = React.useMemo(() => sortedByPoints(players.filter((player) => player.gender === "FEMALE")), [players]);
  const shown = tab === "men" ? men : women;
  const temporaryCount = shown.filter((player) => player.uniNumber.startsWith("TEMP-")).length;

  return (
    <Card className="border-[#2f6a4b]/20 bg-[#fffdf8]/90 shadow-sm backdrop-blur-sm">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-black text-[#275f46] md:text-2xl">Рейтинг игроков региона</CardTitle>
            <p className="mt-1 text-sm text-slate-600">Рейтинг игроков Тверского региона по категориям.</p>
          </div>

          <div className="inline-flex rounded-full border border-[#2f6a4b]/20 bg-white p-1">
            <button
              type="button"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition",
                tab === "men" ? "bg-[#2f6a4b] text-white" : "text-[#2f6a4b] hover:bg-[#2f6a4b]/8",
              )}
              onClick={() => setTab("men")}
            >
              Мужчины
            </button>
            <button
              type="button"
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition",
                tab === "women" ? "bg-[#2f6a4b] text-white" : "text-[#2f6a4b] hover:bg-[#2f6a4b]/8",
              )}
              onClick={() => setTab("women")}
            >
              Женщины
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#2f6a4b]/15 bg-[#2f6a4b]/7 p-3">
            <p className="text-xs uppercase tracking-wide text-[#2f6a4b]">Игроков в выборке</p>
            <p className="text-xl font-black text-[#275f46]">{shown.length}</p>
          </div>
          <div className="rounded-xl border border-[#2f6a4b]/15 bg-[#2f6a4b]/7 p-3">
            <p className="text-xs uppercase tracking-wide text-[#2f6a4b]">TEMP-профилей</p>
            <p className="text-xl font-black text-[#275f46]">{temporaryCount}</p>
          </div>
          <div className="rounded-xl border border-[#2f6a4b]/15 bg-[#2f6a4b]/7 p-3">
            <p className="text-xs uppercase tracking-wide text-[#2f6a4b]">Лидер категории</p>
            <p className="truncate text-xl font-black text-[#275f46]">
              {shown[0] ? `${shown[0].lastName} ${shown[0].firstName}` : "-"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <RatingRows players={shown} onBindTempProfile={onBindTempProfile} />
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
