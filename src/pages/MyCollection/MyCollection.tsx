import { useMemo } from "react";
import CollectionHeader from "../../components/collection/CollectionHeader";
import CollectionStats from "../../components/collection/CollectionStats";
import CollectionGrid from "../../components/collection/CollectionGrid";
import { useApp } from "../../context/AppContext";

const MyCollection = () => {
  const {
    collection,
    collectionLoading,
    collectionError,
    collectionSearch,
    setCollectionSearch,
    collectionCategory,
    setCollectionCategory,
    collectionSort,
    setCollectionSort,
    collectionTab,
    setCollectionTab,
    removeItemFromCollection,
    moveItemCollection,
  } = useApp();

  const tabItems = useMemo(() => {
    return collection.filter((item) => {
      // Default to "Owned" if collectionType is missing
      const type = item.collectionType || "Owned";
      return type === collectionTab;
    });
  }, [collection, collectionTab]);

  const filteredAndSortedItems = useMemo(() => {
    const filtered = tabItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(collectionSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(collectionSearch.toLowerCase());

      const matchesCategory =
        collectionCategory === "All" || item.category === collectionCategory;

      return matchesSearch && matchesCategory;
    });

    switch (collectionSort) {
      case "value-high-low":
        return [...filtered].sort((a, b) => b.estimatedValue - a.estimatedValue);
      case "value-low-high":
        return [...filtered].sort((a, b) => a.estimatedValue - b.estimatedValue);
      default:
        return filtered;
    }
  }, [tabItems, collectionSearch, collectionCategory, collectionSort]);

  const { totalItems, totalValue } = useMemo(() => {
    return {
      totalItems: tabItems.length,
      totalValue: tabItems.reduce((sum, item) => sum + item.estimatedValue, 0),
    };
  }, [tabItems]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <CollectionHeader />

      {collectionLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-white" />
        </div>
      ) : collectionError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-400">Failed to load collection</h3>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{collectionError}</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
            {(["Owned", "Wishlist", "Selling"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCollectionTab(tab)}
                className={`min-h-[44px] flex-1 sm:flex-initial px-4 sm:px-6 py-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  collectionTab === tab
                    ? "border-slate-950 text-slate-950 dark:border-white dark:text-white"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search in your collection..."
                value={collectionSearch}
                onChange={(e) => setCollectionSearch(e.target.value)}
                className="w-full min-h-[44px] rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-950/5 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={collectionCategory}
                onChange={(e) => setCollectionCategory(e.target.value)}
                className="w-full sm:w-auto min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="All">All Categories</option>
                <option value="Trading Cards">Trading Cards</option>
                <option value="Comics">Comics</option>
                <option value="Lego">Lego</option>
                <option value="Coins">Coins</option>
                <option value="Hot Wheels">Hot Wheels</option>
                <option value="Funko Pop">Funko Pop</option>
                <option value="Action Figures">Action Figures</option>
                <option value="Video Games">Video Games</option>
              </select>

              <select
                value={collectionSort}
                onChange={(e) => setCollectionSort(e.target.value)}
                className="w-full sm:w-auto min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <option value="newest">Newest Added</option>
                <option value="value-high-low">Value: High to Low</option>
                <option value="value-low-high">Value: Low to High</option>
              </select>
            </div>
          </div>

          <CollectionStats
            totalItems={totalItems}
            totalValue={totalValue}
          />

          <CollectionGrid
            items={filteredAndSortedItems}
            onRemove={removeItemFromCollection}
            onMove={moveItemCollection}
          />
        </>
      )}
    </main>
  );
};

export default MyCollection;