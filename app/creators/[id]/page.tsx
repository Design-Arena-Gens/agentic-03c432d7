import { notFound } from "next/navigation";
import { getCreatorById } from "../../../data/creators";
import BookingForm from "../../../components/BookingForm";

type Props = { params: { id: string } };

export default function CreatorDetailPage({ params }: Props) {
  const creator = getCreatorById(params.id);
  if (!creator) return notFound();
  return (
    <div className="space-y-5">
      <div className="flex gap-4">
        <img src={creator.avatarUrl} alt={creator.name} className="size-20 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-xl">{creator.name}</div>
          <div className="text-gray-500">{creator.username}</div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{creator.bio}</div>
          <div className="mt-2 text-sm text-gray-600">Rate: ${creator.pricePerHourUsd}/hr ? ? {creator.rating}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {creator.categories.map(cat => (
          <span key={cat} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full">{cat}</span>
        ))}
      </div>
      <div className="pt-2">
        <h2 className="font-semibold mb-3">Book a session</h2>
        <BookingForm creatorId={creator.id} creatorName={creator.name} pricePerHourUsd={creator.pricePerHourUsd} />
      </div>
    </div>
  );
}
