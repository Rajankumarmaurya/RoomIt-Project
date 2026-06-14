import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";

export async function GET() {
  try {
    await connectDB();

    const rooms = await Room.find();

    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}