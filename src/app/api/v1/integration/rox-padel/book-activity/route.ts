import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as Record<string, unknown>;

  if (!body.user_id || !body.activity_type || !body.booked_at_date || !body.booked_time_slot) {
    return NextResponse.json({ detail: "Invalid payload" }, { status: 422 });
  }

  return NextResponse.json(
    {
      booking: {
        id: crypto.randomUUID(),
        user_id: String(body.user_id),
        activity_type: String(body.activity_type),
        booked_at_date: String(body.booked_at_date),
        booked_time_slot: String(body.booked_time_slot),
        price: Number(body.price ?? 0),
        status: "CONFIRMED",
      },
      rox_payload: {
        status: "CONFIRMED",
        provider: "mock-roxpadel",
      },
    },
    { status: 201 },
  );
}
