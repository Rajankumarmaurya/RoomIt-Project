import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    floor: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    bufferMinutes: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Room =
  mongoose.models.Room ||
  mongoose.model("Room", RoomSchema);

export default Room;