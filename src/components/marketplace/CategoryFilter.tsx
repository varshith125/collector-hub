import type { ChangeEvent } from "react";
import { MARKETPLACE_CATEGORIES } from "../../constants/marketplace";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryFilter = ({ value, onChange }: CategoryFilterProps) => {
  const handleCategoryChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full sm:max-w-xs">
      <label htmlFor="category-select" className="sr-only">
        Filter by category
      </label>

      <select
        id="category-select"
        value={value}
        onChange={handleCategoryChange}
        className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white dark:focus:ring-white/20 cursor-pointer"
      >
        {MARKETPLACE_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;