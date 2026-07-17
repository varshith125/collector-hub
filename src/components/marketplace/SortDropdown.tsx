import type { ChangeEvent } from "react";

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
] as const;

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
    const handleSortChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        onChange(event.target.value);
    };

    return (
        <div className="w-full sm:max-w-xs">
            <label htmlFor="sort-select" className="sr-only">
                Sort products
            </label>

            <select
                id="sort-select"
                value={value}
                onChange={handleSortChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white dark:focus:ring-white/20 cursor-pointer"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdown;