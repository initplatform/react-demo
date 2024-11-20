import React, { useState } from 'react';

import ActionSelector from '@/components/chip-widget/action-selector';
import ChipList from '@/components/chip-widget/chip-list';

import ColumnInput from './column-input';

const ChipWidgetOld: React.FC<{ columns: string[] }> = ({ columns }) => {
    const [filters, setFilters] = useState<{ column: string; operator: string; value: string }[]>(
        []
    );
    const [groupBy, setGroupBy] = useState<string | null>(null);
    const [sort, setSort] = useState<{ column: string; order: 'ASC' | 'DESC' } | null>(null);

    const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

    const addFilter = (newFilter: { column: string; operator: string; value: string }) => {
        setFilters([...filters, newFilter]);
    };

    const addGroupBy = (column: string) => {
        setGroupBy(column);
    };

    const addSort = (newSort: { column: string; order: 'ASC' | 'DESC' }) => {
        setSort(newSort);
    };

    const removeChip = (type: 'filter' | 'groupBy' | 'sort', indexOrColumn: number | string) => {
        if (type === 'filter') {
            setFilters(filters.filter((_, i) => i !== indexOrColumn));
        } else if (type === 'groupBy') {
            setGroupBy(null);
        } else if (type === 'sort') {
            setSort(null);
        }
    };

    return (
        <div className="p-4 bg-gray-50 rounded shadow-md space-y-4 max-w-lg mx-auto">
            <ColumnInput columns={columns} onColumnSelect={setSelectedColumn} />
            {selectedColumn && (
                <ActionSelector
                    column={selectedColumn}
                    groupByEnabled={!groupBy}
                    onAddFilter={addFilter}
                    onAddGroupBy={addGroupBy}
                    onAddSort={addSort}
                />
            )}
            <ChipList filters={filters} groupBy={groupBy} sort={sort} onRemoveChip={removeChip} />
        </div>
    );
};

export default ChipWidgetOld;
