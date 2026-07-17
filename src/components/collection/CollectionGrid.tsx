import type { CollectionItem, CollectionType } from "../../types/collection";
import CollectionCard from "./CollectionCard";
import EmptyState from "../common/EmptyState";

interface CollectionGridProps {
  items: CollectionItem[];
  onRemove?: (id: string) => void;
  onMove?: (id: string, newType: CollectionType) => void;
}

const CollectionGrid = ({ items, onRemove, onMove }: CollectionGridProps) => {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No items in your collection"
        description="Start adding collectibles to build your personal collection."
      />
    );
  }

  return (
    <section aria-labelledby="collection-grid-heading" className="w-full">
      <h2 id="collection-grid-heading" className="sr-only">
        Collection Items
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <CollectionCard
            key={item.id}
            item={item}
            onRemove={onRemove ? () => onRemove(item.id) : undefined}
            onMove={onMove ? (newType) => onMove(item.id, newType) : undefined}
          />
        ))}
      </div>
    </section>
  );
};


export default CollectionGrid;
