import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    slotStart: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SlotSchema.index(
  {
    roomId: 1,
    date: 1,
    slotStart: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Slot ||
  mongoose.model("Slot", SlotSchema);