import React from 'react';
import { Search, X } from 'lucide-react';
import Card from './Card';
import Input from './Input';
import Select from './Select';

const SearchFilterBar = ({
  searchQuery,
  onSearchChange,
  placeholder = 'Search...',
  filters = [],
  className = '',
  rightAction,
}) => {
  return (
    <Card padding="p-4" className={className}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input with clear button */}
        <div className="flex-1 relative">
          <Input
            icon={Search}
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic Filters */}
        {filters.map((filter, idx) => (
          <div key={filter.id || idx} className="w-full sm:w-48 shrink-0">
            <Select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              options={filter.options}
            />
          </div>
        ))}

        {rightAction && <div className="shrink-0">{rightAction}</div>}
      </div>
    </Card>
  );
};

export default React.memo(SearchFilterBar);
