import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Slot from "@/models/Slot";
import { generateSlots } from "@/lib/slotGenerator";

// GET /api/bookings?email=test@gmail.com
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const email =
      req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({
      bookedByEmail: email,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/bookings
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      roomId,
      date,
      startTime,
      endTime,
      title,
      bookedByName,
      bookedByEmail,
    } = body;

    if (
      !roomId ||
      !date ||
      !startTime ||
      !endTime ||
      !bookedByName ||
      !bookedByEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      roomId,
      date,
      startTime,
      endTime,
      title,
      bookedByName,
      bookedByEmail,
      status: "confirmed",
    });

    const slots = generateSlots(
      startTime,
      endTime
    );

    const slotDocs = slots.map(
      (slot) => ({
        roomId,
        bookingId: booking._id,
        date,
        slotStart: slot,
      })
    );

    await Slot.insertMany(slotDocs);

    return NextResponse.json({
      success: true,
      message:
        "Booking created successfully",
      booking,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slot already booked",
        },
        {
          status: 409,
        }
      );
    }

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