"use client";
import { useEffect, useMemo, useState } from "react";

export type Booking = {
  id: string;
  creatorId: string;
  creatorName: string;
  userName: string;
  userEmail: string;
  startAt: string; // ISO
  durationMin: number;
  notes?: string;
  priceUsd: number;
};

function loadBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("bookings");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

export default function BookingForm({
  creatorId,
  creatorName,
  pricePerHourUsd
}: {
  creatorId: string;
  creatorName: string;
  pricePerHourUsd: number;
}) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [startAt, setStartAt] = useState("");
  const [durationMin, setDurationMin] = useState(60);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const priceUsd = useMemo(() => Math.round((pricePerHourUsd * (durationMin / 60)) * 100) / 100, [pricePerHourUsd, durationMin]);

  useEffect(() => {
    // Prefill email/name from previous booking
    const prev = loadBookings()[0];
    if (prev) {
      setUserName(prev.userName);
      setUserEmail(prev.userEmail);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userName || !userEmail || !startAt) return;
    setSubmitting(true);
    try {
      const newBooking: Booking = {
        id: crypto.randomUUID(),
        creatorId,
        creatorName,
        userName,
        userEmail,
        startAt: new Date(startAt).toISOString(),
        durationMin,
        notes: notes || undefined,
        priceUsd
      };
      const all = [newBooking, ...loadBookings()];
      saveBookings(all);
      setSuccessId(newBooking.id);
    } finally {
      setSubmitting(false);
    }
  }

  if (successId) {
    return (
      <div className="p-4 border border-green-200 bg-green-50 text-green-900 rounded-xl">
        <div className="font-semibold mb-1">Booking confirmed</div>
        <div className="text-sm">We sent a confirmation to {userEmail}. See it in <a className="underline" href="/bookings">Bookings</a>.</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Your name</label>
        <input value={userName} onChange={e => setUserName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Alex Doe" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="alex@email.com" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Date & time</label>
        <input type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Duration</label>
        <select value={durationMin} onChange={e => setDurationMin(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          {[30, 45, 60, 90, 120].map(min => (
            <option key={min} value={min}>{min} minutes</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" rows={3} placeholder="What do you want to focus on?" />
      </div>
      <button disabled={submitting} className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold disabled:opacity-60">
        {submitting ? "Booking..." : `Book for $${priceUsd}`}
      </button>
      <p className="text-xs text-gray-500">Payment is simulated for demo; no charge will occur.</p>
    </form>
  );
}
