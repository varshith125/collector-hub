import * as React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full">
      <label htmlFor="search-collectibles" className="sr-only">
        Search collectibles
      </label>

      <input
        id="search-collectibles"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search collectibles..."
        className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-450 dark:focus:border-white dark:focus:ring-white/20"
      />
    </form>
  );
};

export default SearchBar;