import type { ChangeEvent } from "react";
import { MARKETPLACE_SORT_OPTIONS } from "../../constants/marketplace";

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
                className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white dark:focus:ring-white/20 cursor-pointer"
            >
                {MARKETPLACE_SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdown;