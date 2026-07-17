const MarketplaceHeader = () => {
  return (
    <header className="w-full border-b border-slate-200 bg-white py-8 sm:py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Marketplace
          </h1>

          <p className="max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-400">
            Discover unique collectibles from passionate collectors. Browse,
            buy, and grow your collection.
          </p>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;