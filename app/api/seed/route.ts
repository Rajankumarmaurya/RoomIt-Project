import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";

export async function GET() {
  try {
    await connectDB();

    await Room.deleteMany({});

    const rooms = await Room.insertMany([
      {
        name: "Conference Room A",
        floor: "2nd Floor",
        capacity: 10,
        bufferMinutes: 10,
      },
      {
        name: "Conference Room B",
        floor: "3rd Floor",
        capacity: 20,
        bufferMinutes: 10,
      },
      {
        name: "Meeting Room C",
        floor: "1st Floor",
        capacity: 8,
        bufferMinutes: 10,
      },
      {
        name: "Board Room D",
        floor: "4th Floor",
        capacity: 15,
        bufferMinutes: 15,
      },
    ]);

    return NextResponse.json({
      success: true,
      count: rooms.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}