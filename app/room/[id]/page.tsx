"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [date, setDate] =
    useState("2026-06-20");

  const [slots, setSlots] =
    useState<any[]>([]);

  useEffect(() => {
    fetch(
      `/api/room/${id}/availability?date=${date}`
    )
      .then((res) => res.json())
      .then((data) =>
        setSlots(data.bookedSlots)
      );
  }, [date, id]);

  const createBooking = async () => {
    const res = await fetch(
      "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          roomId: id,
          date,
          startTime,
          endTime,
          title: "Meeting",
          bookedByName: name,
          bookedByEmail: email,
        }),
      }
    );

    const data =
      await res.json();

    alert(data.message);

    if (data.success) {
      window.location.reload();
    }
  };

  const allSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold">
            Room Availability
          </h1>

          <p className="text-gray-400 mt-2">
            Select an available slot
          </p>
        </div>

        <Link
          href="/booking"
          className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg"
        >
          My Bookings
        </Link>
      </div>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        className="border p-3 rounded mb-8"
      />

      <div className="grid md:grid-cols-4 gap-5">
        {allSlots.map((slot) => {
          const booked =
            slots.some(
              (s) =>
                s.slotStart === slot
            );

          return (
            <button
              key={slot}
              disabled={booked}
              onClick={() => {
                setStartTime(slot);

                const index =
                  allSlots.indexOf(
                    slot
                  );

                if (
                  index >= 0 &&
                  index <
                    allSlots.length -
                      1
                ) {
                  setEndTime(
                    allSlots[
                      index + 1
                    ]
                  );
                }
              }}
              className={`p-5 rounded-xl text-center text-white font-semibold transition ${
                booked
                  ? "bg-red-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {startTime && (
        <div className="mt-8 bg-blue-600 p-4 rounded-xl">
          <h3 className="font-bold">
            Selected Slot
          </h3>

          <p>
            Start: {startTime}
          </p>

          <p>
            End: {endTime}
          </p>
        </div>
      )}

      <div className="mt-10 border border-gray-700 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-5">
          Create Booking
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="bg-white text-black p-3 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="bg-white text-black p-3 rounded"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            value={startTime}
            readOnly
            placeholder="Start Time"
            className="bg-gray-200 text-black p-3 rounded"
          />

          <input
            value={endTime}
            readOnly
            placeholder="End Time"
            className="bg-gray-200 text-black p-3 rounded"
          />
        </div>

        <button
          onClick={createBooking}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
        >
          Book Now
        </button>
      </div>
    </main>
  );
}