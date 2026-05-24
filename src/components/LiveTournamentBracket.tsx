"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type TournamentFormat = "ROUND_ROBIN" | "STANDARD_BRACKET";

type ConnectionState = "connecting" | "live" | "offline" | "demo";

interface BracketTeam {
  player_1_id: string | null;
  player_2_id: string | null;
  player_1_name: string;
  player_2_name: string;
}

interface BracketMatch {
  match_id: string | null;
  stage: string;
  team_1: BracketTeam;
  team_2: BracketTeam;
  set_1_score: string | null;
  set_2_score: string | null;
  set_3_score: string | null;
  winner_team: 1 | 2 | null;
  referee: string;
  venue: string;
  rating_points_for_winner: number;
}

interface RoundRobinGroup {
  group_name: string;
  matches: BracketMatch[];
}

interface TournamentBracketResponse {
  tournament_id: string;
  tournament_type: string;
  format: TournamentFormat;
  groups: RoundRobinGroup[];
  rounds: BracketMatch[][];
}

interface MatchScoreUpdatedPayload {
  match_id: string;
  tournament_id: string;
  winner_team: 1 | 2;
  set_1_score: string;
  set_2_score: string | null;
  set_3_score: string | null;
  played_at: string;
}

interface MatchScoreUpdatedEvent {
  type: "MATCH_SCORE_UPDATED";
  payload: MatchScoreUpdatedPayload;
}

interface LiveTournamentBracketProps {
  tournamentId: string;
  apiBaseUrl?: string;
  wsBaseUrl?: string;
  enableRealtime?: boolean;
}

const venueFallback = "ROX Padel & Park";

function matchScore(match: BracketMatch): string {
  const sets = [match.set_1_score, match.set_2_score, match.set_3_score].filter(Boolean);
  return sets.length > 0 ? sets.join(" • ") : "Счет ожидается";
}

function applyScoreEvent(current: TournamentBracketResponse, event: MatchScoreUpdatedPayload): TournamentBracketResponse {
  const patch = (match: BracketMatch): BracketMatch =>
    match.match_id === event.match_id
      ? {
          ...match,
          winner_team: event.winner_team,
          set_1_score: event.set_1_score,
          set_2_score: event.set_2_score,
          set_3_score: event.set_3_score,
        }
      : match;

  return {
    ...current,
    groups: current.groups.map((group) => ({ ...group, matches: group.matches.map(patch) })),
    rounds: current.rounds.map((round) => round.map(patch)),
  };
}

function TeamRow({ label, winner }: { label: string; winner: boolean }): React.JSX.Element {
  return (
    <div
      className={cn(
        "rounded-lg px-3 py-2 text-sm leading-snug",
        winner ? "bg-[#edd3a5]/50 font-semibold text-[#183525]" : "bg-slate-50 text-slate-700",
      )}
    >
      {label}
    </div>
  );
}

function MatchInfoPopover({ match }: { match: BracketMatch }): React.JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-[#2f6a4b]/25 px-2 py-1 text-xs font-semibold text-[#2f6a4b] transition hover:bg-[#2f6a4b]/6"
        >
          Детали
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 border-[#2f6a4b]/20 bg-white">
        <div className="space-y-1.5 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-[#2b6549]">Судья:</span> {match.referee || "TBD"}
          </p>
          <p>
            <span className="font-semibold text-[#2b6549]">Площадка:</span> {match.venue || venueFallback}
          </p>
          <p>
            <span className="font-semibold text-[#2b6549]">Очки победителю:</span> {match.rating_points_for_winner}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MatchCard({ match }: { match: BracketMatch }): React.JSX.Element {
  return (
    <Card className="border-[#2f6a4b]/15 bg-[#fffdf9]/95 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wide text-[#2f6a4b]">{match.stage}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <TeamRow winner={match.winner_team === 1} label={`${match.team_1.player_1_name} / ${match.team_1.player_2_name}`} />
        <TeamRow winner={match.winner_team === 2} label={`${match.team_2.player_1_name} / ${match.team_2.player_2_name}`} />
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="bg-[#2f6a4b]/10 text-[#2f6a4b]">
            {matchScore(match)}
          </Badge>
          <MatchInfoPopover match={match} />
        </div>
      </CardContent>
    </Card>
  );
}

function RoundRobinView({ groups }: { groups: RoundRobinGroup[] }): React.JSX.Element {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {groups.map((group) => (
        <Card key={group.group_name} className="border-[#2f6a4b]/20 bg-[#fffdf9]/95">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-[#275f46]">{group.group_name}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#2f6a4b]/15 text-xs uppercase tracking-wide text-[#2f6a4b]">
                  <th className="px-2 py-2">Матч</th>
                  <th className="px-2 py-2">Пара 1</th>
                  <th className="px-2 py-2">Пара 2</th>
                  <th className="px-2 py-2">Счет</th>
                  <th className="px-2 py-2 text-right">Инфо</th>
                </tr>
              </thead>
              <tbody>
                {group.matches.map((match, index) => (
                  <tr key={match.match_id ?? `${group.group_name}-${index}`} className="border-b border-slate-100">
                    <td className="px-2 py-2 text-slate-500">#{index + 1}</td>
                    <td className="px-2 py-2">{match.team_1.player_1_name} / {match.team_1.player_2_name}</td>
                    <td className="px-2 py-2">{match.team_2.player_1_name} / {match.team_2.player_2_name}</td>
                    <td className="px-2 py-2 font-medium text-[#2b6549]">{matchScore(match)}</td>
                    <td className="px-2 py-2 text-right">
                      <MatchInfoPopover match={match} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StandardBracketView({ rounds }: { rounds: BracketMatch[][] }): React.JSX.Element {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="relative flex min-w-max gap-4 md:gap-6">
        {rounds.map((round, roundIndex) => (
          <section key={`round-${roundIndex}`} className="w-[304px] shrink-0 space-y-4 md:w-[320px]">
            <h3 className="rounded-xl border border-[#2f6a4b]/20 bg-white px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-[#2f6a4b]">
              Раунд {roundIndex + 1}
            </h3>

            <div className="space-y-4">
              {round.map((match, matchIndex) => (
                <div key={match.match_id ?? `r${roundIndex}-m${matchIndex}`} className="relative">
                  <MatchCard match={match} />
                  {roundIndex < rounds.length - 1 ? (
                    <svg
                      className="pointer-events-none absolute -right-6 top-1/2 hidden h-10 w-6 -translate-y-1/2 md:block"
                      viewBox="0 0 24 40"
                      fill="none"
                    >
                      <path d="M0 20H8C13 20 13 6 19 6H24" stroke="#2f6a4b" strokeOpacity="0.45" strokeWidth="2" />
                      <path d="M0 20H8C13 20 13 34 19 34H24" stroke="#2f6a4b" strokeOpacity="0.45" strokeWidth="2" />
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function connectionLabel(state: ConnectionState): string {
  if (state === "live") return "Статус: онлайн";
  if (state === "connecting") return "Статус: обновление";
  if (state === "demo") return "Статус: пример сетки";
  return "Статус: вне сети";
}

function connectionClass(state: ConnectionState): string {
  if (state === "live") return "bg-[#2f6a4b] text-white";
  if (state === "connecting") return "bg-[#edd3a5] text-[#275f46]";
  if (state === "demo") return "bg-[#2f6a4b]/12 text-[#2f6a4b]";
  return "bg-slate-200 text-slate-700";
}

export function LiveTournamentBracket({
  tournamentId,
  apiBaseUrl = "",
  wsBaseUrl,
  enableRealtime = true,
}: LiveTournamentBracketProps): React.JSX.Element {
  const [data, setData] = React.useState<TournamentBracketResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [connectionState, setConnectionState] = React.useState<ConnectionState>(enableRealtime ? "connecting" : "demo");

  React.useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiBaseUrl}/api/v1/tournaments/${tournamentId}/bracket`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки сетки (${response.status})`);
        }

        const payload = (await response.json()) as TournamentBracketResponse;
        if (!cancelled) {
          setData(payload);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Не удалось загрузить сетку");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, tournamentId]);

  React.useEffect(() => {
    if (!enableRealtime) {
      setConnectionState("demo");
      return;
    }

    if (!tournamentId) {
      return;
    }

    const url = (() => {
      if (wsBaseUrl) {
        return `${wsBaseUrl.replace(/\/$/, "")}/api/v1/ws/tournaments/${tournamentId}`;
      }

      if (typeof window === "undefined") {
        return "";
      }

      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      return `${protocol}://${window.location.host}/api/v1/ws/tournaments/${tournamentId}`;
    })();

    if (!url) {
      setConnectionState("offline");
      return;
    }

    const socket = new WebSocket(url);
    setConnectionState("connecting");

    socket.onopen = () => {
      setConnectionState("live");
    };

    socket.onerror = () => {
      setConnectionState("offline");
    };

    socket.onclose = () => {
      setConnectionState("offline");
    };

    socket.onmessage = (event) => {
      try {
        const incoming = JSON.parse(event.data) as MatchScoreUpdatedEvent;
        if (incoming.type !== "MATCH_SCORE_UPDATED") {
          return;
        }
        setData((current) => (current ? applyScoreEvent(current, incoming.payload) : current));
      } catch {
        setConnectionState("offline");
      }
    };

    const pingTimer = window.setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send("ping");
      }
    }, 20000);

    return () => {
      window.clearInterval(pingTimer);
      socket.close();
    };
  }, [enableRealtime, tournamentId, wsBaseUrl]);

  return (
    <section className="rounded-3xl border border-[#2f6a4b]/20 bg-[#fffdf8]/90 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#275f46] md:text-2xl">Турнирная сетка</h2>
          <p className="mt-1 text-sm text-slate-600">Матчи, результаты и статусы пар в едином окне.</p>
        </div>
        <Badge className={connectionClass(connectionState)}>{connectionLabel(connectionState)}</Badge>
      </header>

      {loading ? <p className="text-sm text-slate-500">Загрузка турнирной сетки...</p> : null}
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

      {!loading && !error && data ? (
        data.format === "ROUND_ROBIN" ? (
          <RoundRobinView groups={data.groups} />
        ) : (
          <StandardBracketView rounds={data.rounds} />
        )
      ) : null}
    </section>
  );
}
