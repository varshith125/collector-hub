import type { ChangeEvent } from "react";

const conditions = [
  "All",
  "New",
  "Like New",
  "Good",
  "Fair",
] as const;

interface ConditionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const ConditionFilter = ({ value, onChange }: ConditionFilterProps) => {
  const handleConditionChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full sm:max-w-xs">
      <label htmlFor="condition-select" className="sr-only">
        Filter by condition
      </label>

      <select
        id="condition-select"
        value={value}
        onChange={handleConditionChange}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-white dark:focus:ring-white/20 cursor-pointer"
      >
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConditionFilter;