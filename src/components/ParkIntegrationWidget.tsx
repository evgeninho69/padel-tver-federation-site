"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PadelCourtSlot {
  id: string;
  courtName: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  isAvailable: boolean;
}

interface CinemaSlot {
  id: string;
  title: string;
  startTime: string;
  ticketPrice: number;
  availableSeats: number;
}

interface CourtsPayload {
  padelCourts: PadelCourtSlot[];
  openAirCinema: CinemaSlot[];
}

interface ParkIntegrationWidgetProps {
  userId: string;
  apiBaseUrl?: string;
}

type WidgetTab = "padel" | "cinema";

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizePayload(raw: unknown): CourtsPayload {
  if (!raw || typeof raw !== "object") {
    return { padelCourts: [], openAirCinema: [] };
  }

  const payload = raw as Record<string, unknown>;
  const padelSource = Array.isArray(payload.padel_courts) ? payload.padel_courts : [];
  const cinemaSource = Array.isArray(payload.open_air_cinema) ? payload.open_air_cinema : [];

  const padelCourts: PadelCourtSlot[] = padelSource.map((item, index) => {
    const record = item as Record<string, unknown>;
    return {
      id: String(record.id ?? `court-${index}`),
      courtName: String(record.court_name ?? `Court ${index + 1}`),
      startTime: String(record.start_time ?? "09:00"),
      endTime: String(record.end_time ?? "10:00"),
      pricePerHour: Number(record.price_per_hour ?? 2200),
      isAvailable: Boolean(record.is_available ?? true),
    };
  });

  const openAirCinema: CinemaSlot[] = cinemaSource.map((item, index) => {
    const record = item as Record<string, unknown>;
    return {
      id: String(record.id ?? `cinema-${index}`),
      title: String(record.title ?? "Open-air session"),
      startTime: String(record.start_time ?? "21:00"),
      ticketPrice: Number(record.ticket_price ?? 650),
      availableSeats: Number(record.available_seats ?? 100),
    };
  });

  return { padelCourts, openAirCinema };
}

export function ParkIntegrationWidget({ userId, apiBaseUrl = "" }: ParkIntegrationWidgetProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<WidgetTab>("padel");
  const [selectedDate, setSelectedDate] = React.useState<string>(toDateInputValue(new Date()));
  const [selectedTime, setSelectedTime] = React.useState<string>("20:00");
  const [selectedCinemaSlot, setSelectedCinemaSlot] = React.useState<string>("");
  const [tickets, setTickets] = React.useState<number>(2);
  const [durationMinutes, setDurationMinutes] = React.useState<number>(60);
  const [payload, setPayload] = React.useState<CourtsPayload>({ padelCourts: [], openAirCinema: [] });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [bookingMessage, setBookingMessage] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;

    const load = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(
          `${apiBaseUrl}/api/v1/integration/rox-padel/courts?date=${encodeURIComponent(selectedDate)}`,
          { method: "GET", cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Failed to load ROX schedule");
        }

        const json = (await response.json()) as { payload?: unknown };
        if (!cancelled) {
          setPayload(normalizePayload(json.payload));
        }
      } catch {
        if (!cancelled) {
          setPayload({ padelCourts: [], openAirCinema: [] });
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
  }, [apiBaseUrl, selectedDate]);

  const selectedCinema = React.useMemo(
    () => payload.openAirCinema.find((slot) => slot.id === selectedCinemaSlot) ?? null,
    [payload.openAirCinema, selectedCinemaSlot],
  );

  const selectedAvailableCourt = React.useMemo(
    () => payload.padelCourts.find((slot) => slot.isAvailable) ?? null,
    [payload.padelCourts],
  );

  const calculatedPrice = React.useMemo(() => {
    if (activeTab === "cinema") {
      return (selectedCinema?.ticketPrice ?? 650) * tickets;
    }

    if (!selectedAvailableCourt) {
      return 0;
    }
    return Math.round((selectedAvailableCourt.pricePerHour * durationMinutes) / 60);
  }, [activeTab, durationMinutes, selectedCinema, selectedAvailableCourt, tickets]);

  const bookCinema = React.useCallback(async () => {
    if (!selectedCinema) {
      setBookingMessage("Выберите киносеанс для бронирования.");
      return;
    }

    const response = await fetch(`${apiBaseUrl}/api/v1/integration/rox-padel/book-activity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        activity_type: "OPEN_AIR_CINEMA",
        booked_at_date: selectedDate,
        booked_time_slot: selectedCinema.startTime || selectedTime,
        price: selectedCinema.ticketPrice * tickets,
      }),
    });

    if (!response.ok) {
      setBookingMessage("Бронирование отклонено. Повторите позже.");
      return;
    }

    setBookingMessage("Бронирование подтверждено.");
  }, [apiBaseUrl, selectedCinema, selectedDate, selectedTime, tickets, userId]);

  return (
    <Card className="border-[#2f6a4b]/20 bg-[#fffdf8]/90 shadow-sm backdrop-blur-sm">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-black text-[#275f46] md:text-2xl">Площадка ROX Padel & Park</CardTitle>
            <p className="mt-1 text-sm text-slate-600">Корт, кино и расчет стоимости в одной панели.</p>
          </div>
          <Badge className="bg-[#2f6a4b]/10 text-[#2f6a4b]">Актуальное расписание</Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#2f6a4b]">Дата</label>
            <Input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#2f6a4b]">Время</label>
            <Input type="time" value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)} />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#2f6a4b]">Длительность, мин</label>
            <Input
              type="number"
              min={30}
              step={30}
              value={durationMinutes}
              onChange={(event) => setDurationMinutes(Math.max(30, Number(event.target.value) || 60))}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-[#2f6a4b]">Билеты (кино)</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={tickets}
              onChange={(event) => setTickets(Math.max(1, Number(event.target.value) || 1))}
            />
          </div>
        </div>

        <div className="inline-flex rounded-full border border-[#2f6a4b]/20 bg-white p-1">
          <button
            type="button"
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition",
              activeTab === "padel" ? "bg-[#2f6a4b] text-white" : "text-[#2f6a4b] hover:bg-[#2f6a4b]/8",
            )}
            onClick={() => setActiveTab("padel")}
          >
            Падел-корты
          </button>

          <button
            type="button"
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition",
              activeTab === "cinema" ? "bg-[#2f6a4b] text-white" : "text-[#2f6a4b] hover:bg-[#2f6a4b]/8",
            )}
            onClick={() => setActiveTab("cinema")}
          >
            Кино под открытым небом
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeTab === "padel" ? (
          <div className="space-y-3">
            {loading ? <p className="text-sm text-slate-500">Загрузка расписания...</p> : null}

            {payload.padelCourts.map((slot) => (
              <div key={slot.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-3">
                <div>
                  <p className="font-semibold text-slate-800">{slot.courtName}</p>
                  <p className="text-sm text-slate-500">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={slot.isAvailable ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}>
                    {slot.isAvailable ? "Свободно" : "Занято"}
                  </Badge>
                  <span className="font-bold text-[#275f46]">{slot.pricePerHour} ₽/ч</span>
                </div>
              </div>
            ))}

            {!loading && payload.padelCourts.length === 0 ? (
              <p className="text-sm text-slate-500">На выбранную дату слоты не найдены.</p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-3">
            {payload.openAirCinema.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedCinemaSlot(slot.id)}
                className={cn(
                  "w-full rounded-xl border p-3 text-left transition",
                  selectedCinemaSlot === slot.id
                    ? "border-[#2f6a4b] bg-[#2f6a4b]/7"
                    : "border-slate-200 bg-white hover:border-[#2f6a4b]/35",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-800">{slot.title}</p>
                  <Badge className="bg-[#2f6a4b]/10 text-[#2f6a4b]">{slot.ticketPrice} ₽</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-600">Начало: {slot.startTime}</p>
                <p className="text-sm text-slate-600">Свободных мест: {slot.availableSeats}</p>
              </button>
            ))}

            {payload.openAirCinema.length === 0 ? (
              <p className="text-sm text-slate-500">Сеансы не найдены.</p>
            ) : null}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#2f6a4b]/20 bg-[#edd3a5]/25 p-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-600">Итоговая стоимость</p>
            <p className="text-2xl font-black text-[#275a43]">{calculatedPrice} ₽</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-[#2f6a4b]/35 text-[#2f6a4b]"
              disabled={activeTab !== "padel"}
              title="Бронирование падел-кортов скоро будет доступно"
            >
              Бронь корта (скоро)
            </Button>

            <Button
              type="button"
              className="bg-[#2f6a4b] text-white hover:bg-[#244f38]"
              onClick={() => void bookCinema()}
              disabled={activeTab !== "cinema"}
            >
              Забронировать кино
            </Button>
          </div>
        </div>

        {bookingMessage ? <p className="text-sm font-medium text-[#275f46]">{bookingMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
