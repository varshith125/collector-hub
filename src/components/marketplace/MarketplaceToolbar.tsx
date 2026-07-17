import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ConditionFilter from "./ConditionFilter";
import SortDropdown from "./SortDropdown";

interface MarketplaceToolbarProps {
  searchTerm: string;
  selectedCategory: string;
  selectedCondition: string;
  sortOption: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const MarketplaceToolbar = ({
  searchTerm,
  selectedCategory,
  selectedCondition,
  sortOption,
  onSearchChange,
  onCategoryChange,
  onConditionChange,
  onSortChange,
}: MarketplaceToolbarProps) => {
  return (
    <section
      aria-labelledby="marketplace-toolbar-heading"
      className="py-4"
    >
      <h2 id="marketplace-toolbar-heading" className="sr-only">
        Marketplace search and filter options
      </h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="w-full md:flex-1 md:max-w-xs lg:max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>

        <div className="w-full md:w-auto flex flex-col gap-4 sm:flex-row sm:items-center">
          <CategoryFilter
            value={selectedCategory}
            onChange={onCategoryChange}
          />
          <ConditionFilter
            value={selectedCondition}
            onChange={onConditionChange}
          />
          <SortDropdown
            value={sortOption}
            onChange={onSortChange}
          />
        </div>
      </div>
    </section>
  );
};

export default MarketplaceToolbar;