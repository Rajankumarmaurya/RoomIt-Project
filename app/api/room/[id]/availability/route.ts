import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Slot from "@/models/Slot";

export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    await connectDB();

    const params = await context.params;

    const roomId = params.id;

    const date =
      req.nextUrl.searchParams.get(
        "date"
      );

    console.log("ROOM ID =>", roomId);
    console.log("DATE =>", date);

    const bookedSlots =
      await Slot.find({
        roomId:
          new mongoose.Types.ObjectId(
            roomId
          ),
        date,
      });

    console.log(
      "BOOKED SLOTS =>",
      bookedSlots
    );

    return NextResponse.json({
      success: true,
      bookedSlots,
    });
  } catch (error: any) {
    console.log(error);

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