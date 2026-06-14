This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# RoomIt - Meeting Room Booking System

## Overview

RoomIt is a Meeting Room Booking System built using Next.js, TypeScript, MongoDB, and Tailwind CSS.

The application allows users to:

* View available meeting rooms
* Check room availability
* Create bookings
* Prevent double bookings
* View their bookings
* Cancel bookings
* Manage room schedules efficiently

---

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* MongoDB Atlas
* Mongoose

---

## Features

### Room Listing

Display all available meeting rooms with:

* Room Name
* Floor / Location
* Capacity

### Room Availability

Users can:

* Select a room
* Select a date
* View available and booked slots

### Slot-Based Booking

Bookings are managed using 30-minute slots.

### Double Booking Prevention

A dedicated Slot collection is used to prevent overlapping bookings.

### My Bookings

Users can:

* Search bookings using email
* View booking details
* Cancel bookings

### Cancellation Support

Users can cancel confirmed bookings.

### Buffer Time Support

Additional slots can be reserved automatically after meetings to avoid scheduling conflicts.

---

## Database Collections

### Rooms

```json
{
  "name": "Conference Room A",
  "floor": "2nd Floor",
  "capacity": 10,
  "bufferMinutes": 10
}
```

### Bookings

```json
{
  "roomId": "...",
  "date": "2026-06-20",
  "startTime": "10:00",
  "endTime": "11:00",
  "bookedByName": "Rajan",
  "bookedByEmail": "rajan@gmail.com",
  "status": "confirmed"
}
```

### Slots

```json
{
  "roomId": "...",
  "date": "2026-06-20",
  "slotStart": "10:00"
}
```

---

## API Endpoints

### Get Rooms

```http
GET /api/rooms
```

Returns all rooms.

---

### Get Availability

```http
GET /api/room/:id/availability?date=YYYY-MM-DD
```

Returns booked slots for a room.

---

### Create Booking

```http
POST /api/bookings
```

Creates a booking and reserves slots.

---

### Get User Bookings

```http
GET /api/bookings?email=user@email.com
```

Returns bookings associated with an email.

---

### Cancel Booking

```http
PATCH /api/bookings/:id/cancel
```

Cancels a booking and releases reserved slots.

---

## Double Booking Prevention

The system uses a Slot collection with a unique slot reservation strategy.

When a booking is created:

1. Time range is converted into 30-minute slots.
2. Slots are stored in the Slot collection.
3. If another booking attempts to reserve the same slot, MongoDB rejects the request.
4. The API returns an error message.

This ensures booking consistency and prevents overlapping reservations.

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd roomit
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create:

```env
.env.local
```

Add:

```env
MONGODB_URI=your_mongodb_connection_string
```

### Run Application

```bash
npm run dev
```

Application:

```txt
http://localhost:3000
```

---

## Project Structure

```txt
app
├── api
│   ├── bookings
│   ├── room
│   └── rooms
│
├── booking
│   └── page.tsx
│
├── room
│   └── [id]
│       └── page.tsx
│
└── page.tsx

models
├── Booking.ts
├── Room.ts
└── Slot.ts

lib
├── mongodb.ts
└── slotGenerator.ts
```





