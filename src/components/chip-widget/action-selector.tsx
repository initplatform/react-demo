import React, { useState } from 'react';

import FilterInput from '@/components/chip-widget/filter-input';
import SortInput from '@/components/chip-widget/sort-input';

interface ActionSelectorProps {
    column: string;
    groupByEnabled: boolean;
    onAddFilter: (filter: { column: string; operator: string; value: string }) => void;
    onAddGroupBy: (column: string) => void;
    onAddSort: (sort: { column: string; order: 'ASC' | 'DESC' }) => void;
}

const ActionSelector: React.FC<ActionSelectorProps> = ({
    column,
    groupByEnabled,
    onAddFilter,
    onAddGroupBy,
    onAddSort,
}) => {
    const [action, setAction] = useState<'filter' | 'groupBy' | 'sort' | null>(null);

    const handleAddFilter = (operator: string, value: string) => {
        onAddFilter({ column, operator, value });
        setAction(null);
    };

    const handleAddSort = (order: 'ASC' | 'DESC') => {
        onAddSort({ column, order });
        setAction(null);
    };

    return (
        <div className="space-y-2">
            {!action && (
                <div className="flex space-x-2">
                    <button onClick={() => setAction('filter')} className="btn">
                        Filter
                    </button>
                    {groupByEnabled && (
                        <button onClick={() => onAddGroupBy(column)} className="btn">
                            Group By
                        </button>
                    )}
                    <button onClick={() => setAction('sort')} className="btn">
                        Sort
                    </button>
                </div>
            )}
            {action === 'filter' && <FilterInput onApply={handleAddFilter} />}
            {action === 'sort' && <SortInput onApply={handleAddSort} />}
        </div>
    );
};

export default ActionSelector;
