// src/components/Filters.tsx
import React from 'react';
import { Filter } from '@/types/filter';

interface FiltersProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
        All
      </button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>
        Completed
      </button>
      <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>
        Pending
      </button>
    </div>
  );
};

export default Filters;
