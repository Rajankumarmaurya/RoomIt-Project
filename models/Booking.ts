import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    bookedByName: {
      type: String,
      required: true,
    },

    bookedByEmail: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "confirmed",
        "cancelled-refundable",
        "cancelled-non-refundable",
      ],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);