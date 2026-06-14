import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Booking from "@/models/Booking";
import Slot from "@/models/Slot";

export async function PATCH(
  req: Request,
  { params }: any
) {
  await connectDB();

  const booking =
    await Booking.findById(
      params.id
    );

  if (!booking) {
    return NextResponse.json(
      {
        message:
          "Booking not found",
      },
      { status: 404 }
    );
  }

  const bookingDateTime =
    new Date(
      `${booking.date}T${booking.startTime}`
    );

  const now = new Date();

  const diffHours =
    (bookingDateTime.getTime() -
      now.getTime()) /
    (1000 * 60 * 60);

  booking.status =
    diffHours >= 2
      ? "cancelled-refundable"
      : "cancelled-non-refundable";

  await booking.save();

  await Slot.deleteMany({
    bookingId: booking._id,
  });

  return NextResponse.json({
    success: true,
    status: booking.status,
  });
}