import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { STATUS_LABEL, PROJECT_STATUS } from '../utils/constants';

interface FilterBarProps {
  onStatusChange: (status: string | null) => void;
  onSearch: (query: string) => void;
  onSort: (field: 'deadline' | 'created') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onStatusChange,
  onSearch,
  onSort,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    onStatusChange(status);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleClearFilters = () => {
    setSelectedStatus(null);
    setSearchQuery('');
    onStatusChange(null);
    onSearch('');
  };

  const statuses = Object.values(PROJECT_STATUS);
  const hasActiveFilters = selectedStatus || searchQuery;

  return (
    <div className="uiverse-panel p-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by client name or project title..."
          value={searchQuery}
          onChange={handleSearch}
          className="input-field pl-10 uiverse-input"
        />
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="uiverse-outline-btn flex items-center gap-2 px-4 py-2"
        >
          <Filter size={18} className="text-[#cbd3c8]" />
          <span className="text-sm font-medium text-[#e5eae3]">Filters</span>
        </button>

        {/* Status Filters */}
        {showFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleStatusChange(null)}
              className={`uiverse-chip-btn ${!selectedStatus ? 'active' : ''}`}
            >
              All
            </button>
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`uiverse-chip-btn ${selectedStatus === status ? 'active' : ''}`}
              >
                {STATUS_LABEL[status as keyof typeof STATUS_LABEL]}
              </button>
            ))}
          </div>
        )}

        {/* Sorting */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => onSort('deadline')}
            className="uiverse-outline-btn px-4 py-2 text-sm font-medium text-[#e5eae3]"
          >
            Sort by Deadline
          </button>
          <button
            onClick={() => onSort('created')}
            className="uiverse-outline-btn px-4 py-2 text-sm font-medium text-[#e5eae3]"
          >
            Newest First
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="uiverse-danger-soft flex items-center gap-2 px-4 py-2"
          >
            <X size={18} />
            <span className="text-sm font-medium">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};
