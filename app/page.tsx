"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Booking } from "../components/BookingForm";

export default function HomePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bookings");
      setBookings(raw ? JSON.parse(raw) : []);
    } catch {}
  }, []);

  return (
    <div className="space-y-6">
      <section className="mt-2 rounded-2xl p-5 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <h1 className="text-2xl font-bold">Book time with top creators</h1>
        <p className="mt-1 text-white/90">One-on-one sessions for coaching, critiques, and strategy.</p>
        <Link href="/creators" className="mt-4 inline-block bg-white text-brand-700 px-4 py-2 rounded-xl font-semibold">Browse creators</Link>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Upcoming bookings</h2>
        {bookings.length === 0 ? (
          <div className="text-sm text-gray-600">No bookings yet. Find someone to book.</div>
        ) : (
          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b.id} className="p-3 border border-gray-200 dark:border-gray-800 rounded-xl">
                <div className="font-medium">{b.creatorName}</div>
                <div className="text-sm text-gray-600">{new Date(b.startAt).toLocaleString()} ? {b.durationMin} min ? ${b.priceUsd}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
