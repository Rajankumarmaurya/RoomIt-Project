"use client";

import Link from "next/link";

export default function Home() {
  const rooms = [
    {
      _id: "6a2c329608e66d838c5bc2e8",
      name: "Conference Room A",
      floor: "2nd Floor",
      capacity: 10,
    },
    {
      _id: "6a2c329608e66d838c5bc2e9",
      name: "Conference Room B",
      floor: "3rd Floor",
      capacity: 20,
    },
    {
      _id: "6a2c329608e66d838c5bc2ea",
      name: "Meeting Room C",
      floor: "1st Floor",
      capacity: 6,
    },
    {
      _id: "6a2c329608e66d838c5bc2eb",
      name: "Board Room",
      floor: "4th Floor",
      capacity: 15,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold">
            RoomIt
          </h1>

          <p className="mt-3 text-lg">
            Meeting Room Booking System
          </p>

          <Link
            href="/booking"
            className="inline-block mt-6 bg-green-600 px-6 py-3 rounded-lg"
          >
            My Bookings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-black mb-6">
          Available Rooms
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-black mb-3">
                {room.name}
              </h3>

              <p className="text-gray-600 mb-2">
                📍 {room.floor}
              </p>

              <p className="text-gray-600 mb-4">
                👥 Capacity: {room.capacity}
              </p>

              <Link
                href={`/room/${room._id}`}
                className="block text-center bg-blue-600 text-white py-3 rounded-lg"
              >
                Book Room
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}