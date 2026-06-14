import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Slot from "@/models/Slot";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    await connectDB();

    const params =
      await context.params;

    const booking =
      await Booking.findById(
        params.id
      );

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking not found",
        },
        {
          status: 404,
        }
      );
    }

   booking.status =
  "cancelled-refundable";

    await booking.save();

    await Slot.deleteMany({
      bookingId: booking._id,
    });

    return NextResponse.json({
      success: true,
      message:
        "Booking cancelled",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}