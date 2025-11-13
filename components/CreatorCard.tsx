"use client";
import Link from "next/link";
import type { Creator } from "../data/creators";

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/creators/${creator.id}`} className="flex gap-4 p-3 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition">
      <img src={creator.avatarUrl} alt={creator.name} className="size-16 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{creator.name} <span className="text-gray-500 font-normal">{creator.username}</span></div>
          <div className="text-sm text-gray-600 dark:text-gray-300">${creator.pricePerHourUsd}/hr</div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">{creator.bio}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {creator.categories.map(cat => (
            <span key={cat} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full">{cat}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
