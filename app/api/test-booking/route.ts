import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "http://localhost:3000/api/bookings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId:
          "6a2c329608e66d838c5bc2e8",
        date: "2026-06-20",
        startTime: "10:00",
        endTime: "11:00",
        title: "Team Meeting",
        bookedByName: "Rajan",
        bookedByEmail:
          "rajan@gmail.com",
      }),
    }
  );

  const data =
    await response.json();

  return NextResponse.json(data);
}