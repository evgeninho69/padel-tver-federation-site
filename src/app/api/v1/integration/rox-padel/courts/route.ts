import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET(_request: NextRequest): Promise<NextResponse> {
  const date = "2026-05-25";

  return NextResponse.json({
    source: "mock-roxpadel",
    date,
    payload: {
      padel_courts: [
        {
          id: "court-1",
          court_name: "Court 1",
          start_time: "09:00",
          end_time: "10:00",
          price_per_hour: 2200,
          is_available: true,
        },
        {
          id: "court-2",
          court_name: "Court 2",
          start_time: "10:00",
          end_time: "11:00",
          price_per_hour: 2200,
          is_available: false,
        },
      ],
      open_air_cinema: [
        {
          id: "cinema-1",
          title: "Летний киносеанс: Спорт и характер",
          start_time: "21:00",
          ticket_price: 650,
          available_seats: 84,
        },
        {
          id: "cinema-2",
          title: "Документальный вечер: Padel Stories",
          start_time: "22:30",
          ticket_price: 550,
          available_seats: 56,
        },
      ],
    },
  });
}
