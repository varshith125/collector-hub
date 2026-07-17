import type { CollectionItem, CollectionType } from "../../types/collection";
import { formatCurrency } from "../../utils/formatCurrency";

interface CollectionCardProps {
  item: CollectionItem;
  onRemove?: () => void;
  onMove?: (newType: CollectionType) => void;
}

const CollectionCard = ({ item, onRemove, onMove }: CollectionCardProps) => {
  const details = [
    {
      label: "Condition",
      value: item.condition,
    },
    {
      label: "Estimated Value",
      value: formatCurrency(item.estimatedValue),
      valueClassName: "font-bold text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Acquired Date",
      value: item.acquiredDate,
    },
    {
      label: "Storage Location",
      value: item.location,
      truncate: true,
    },
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Product Image */}
      <div className="aspect-[5/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={item.image || fallbackImage}
          alt={item.title}
          loading="lazy"
          width={500}
          height={320}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title & Category */}
      <div className="border-b border-slate-100 p-4 sm:p-5 dark:border-slate-800">
        <span className="mb-2 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {item.category}
        </span>

        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {item.title}
        </h3>
      </div>

      {/* Item Details & Actions */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          {details.map((detail) => (
            <div key={detail.label}>
              <span className="block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {detail.label}
              </span>

              <span
                className={`mt-1 block ${detail.valueClassName ?? "text-slate-700 dark:text-slate-300"
                  } ${detail.truncate ? "truncate" : ""}`}
                title={detail.truncate ? detail.value : undefined}
              >
                {detail.value}
              </span>
            </div>
          ))}
        </div>

        {/* Card Actions */}
        {(onRemove || onMove) && (
          <div className="mt-5 border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-2 dark:border-slate-800">
            {onMove && (
              <div className="flex items-center gap-1.5 min-h-[44px]">
                <span className="text-xs text-slate-400 font-medium">Move:</span>
                <select
                  value={item.collectionType || "Owned"}
                  onChange={(e) => onMove(e.target.value as CollectionType)}
                  className="min-h-[44px] rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600 outline-none focus:border-slate-400 cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option value="Owned">Owned</option>
                  <option value="Wishlist">Wishlist</option>
                  <option value="Selling">Selling</option>
                </select>
              </div>
            )}

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded transition-colors cursor-pointer dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                aria-label={`Remove ${item.title} from collection`}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default CollectionCard;