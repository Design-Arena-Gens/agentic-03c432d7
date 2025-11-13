"use client";
import { useEffect, useState } from "react";
import type { Booking } from "../../components/BookingForm";

function loadBookings(): Booking[] {
  try {
    const raw = localStorage.getItem("bookings");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => setBookings(loadBookings()), []);

  function cancel(id: string) {
    const next = bookings.filter(b => b.id !== id);
    setBookings(next);
    saveBookings(next);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Your bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-sm text-gray-600">You have no bookings yet.</div>
      ) : (
        bookings.map(b => (
          <div key={b.id} className="p-3 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="font-medium">{b.creatorName}</div>
            <div className="text-sm text-gray-600">{new Date(b.startAt).toLocaleString()} ? {b.durationMin} min ? ${b.priceUsd}</div>
            <div className="text-sm text-gray-600 truncate">{b.userName} ? {b.userEmail}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => cancel(b.id)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700">Cancel</button>
              <a href={`/creators/${b.creatorId}`} className="px-3 py-1.5 rounded-lg bg-brand-600 text-white">Rebook</a>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
