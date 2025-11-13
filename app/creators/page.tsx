import CreatorCard from "../../components/CreatorCard";
import { creators } from "../../data/creators";

export default function CreatorsPage() {
  return (
    <div className="space-y-4">
      {creators.map(c => (
        <CreatorCard key={c.id} creator={c} />
      ))}
    </div>
  );
}
