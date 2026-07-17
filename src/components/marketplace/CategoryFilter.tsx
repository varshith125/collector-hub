import type { ChangeEvent } from "react";

const categories = [
  "All",
  "Trading Cards",
  "Funko Pop",
  "Coins",
  "Comics",
  "Action Figures",
  "Lego",
] as const;

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
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white dark:focus:ring-white/20 cursor-pointer"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;