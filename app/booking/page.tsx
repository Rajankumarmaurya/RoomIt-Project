"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);

  const searchBookings = async () => {
    const res = await fetch(
      `/api/bookings?email=${email}`
    );

    const data = await res.json();

    setBookings(data.bookings || []);
  };

  const cancelBooking = async (
    bookingId: string
  ) => {
    const res = await fetch(
      `/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    alert(data.message);

    searchBookings();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-black mb-6">
          My Bookings
        </h1>
  <Link
    href="/"
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
  >
    Home
  </Link>
        <div className="bg-white p-6 rounded-xl shadow mt-6 ">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="flex-1 border p-3 rounded text-black"
            />

            <button
              onClick={searchBookings}
              className="bg-blue-600 text-white px-6 rounded cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-2xl font-bold text-black">
                {booking.title}
              </h2>

              <p className="mt-2 text-gray-700">
                Date: {booking.date}
              </p>

              <p className="text-gray-700">
                Time: {booking.startTime} - {booking.endTime}
              </p>

              <p className="text-gray-700">
                Name: {booking.bookedByName}
              </p>

              <p className="text-gray-700">
                Email: {booking.bookedByEmail}
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                Status: {booking.status}
              </p>

              {booking.status ===
                "confirmed" && (
                <button
                  onClick={() =>
                    cancelBooking(
                      booking._id
                    )
                  }
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded "
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}