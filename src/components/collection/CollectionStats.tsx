import { formatCurrency } from "../../utils/formatCurrency";

interface CollectionStatsProps {
  totalItems: number;
  totalValue: number;
}

const CollectionStats = ({
  totalItems,
  totalValue,
}: CollectionStatsProps) => {
  const stats = [
    {
      label: "Total Items",
      value: totalItems.toLocaleString(),
    },
    {
      label: "Collection Value",
      value: formatCurrency(totalValue),
    },
  ] as const;

  return (
    <section aria-labelledby="collection-stats-heading" className="w-full">
      <h2 id="collection-stats-heading" className="sr-only">
        Collection statistics
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {stat.label}
            </span>

            <span className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionStats;