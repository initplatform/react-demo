import React, { useEffect, useRef, useState } from 'react';

import ActionSelector from '@/components/chip-widget/action-selector';
import Chip from '@/components/chip-widget/chip';
import ChipList from '@/components/chip-widget/chip-list';
import type { WidgetColumn } from '@/types/chip-widget';

import ColumnInput from './column-input';

const ChipWidget: React.FC<{ columns: WidgetColumn[] }> = ({ columns }) => {
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [filters, setFilters] = useState<{ column: string; operator: string; value: string }[]>(
        []
    );
    const [groupBy, setGroupBy] = useState<string | null>(null);
    const [sort, setSort] = useState<{ column: string; order: 'ASC' | 'DESC' } | null>(null);

    const [selectedColumns, setSelectedColumns] = useState<WidgetColumn[]>([]);

    const columnSelect = (column: WidgetColumn) => {
        setSelectedColumns([...selectedColumns, column]);
    };

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

    const removeColumn = (index: number) => {
        setSelectedColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            newColumns.splice(index, 1); // Remove the column at the given index
            return newColumns;
        });
    };

    useEffect(() => {
        if (selectedColumns.length > 0) {
            const lastIndex = selectedColumns.length - 1;
            chipRefs.current[lastIndex]?.focus();
        }
    }, [selectedColumns]);

    return (
        <div className="p-4 bg-gray-50 rounded shadow-md space-y-4 mx-auto">
            <div className="flex bg-white rounded p-2">
                {selectedColumns.map((column, index) => (
                    <Chip
                        key={index}
                        index={index}
                        column={column}
                        ref={(el) => {
                            chipRefs.current[index] = el;
                        }}
                        onRemove={removeColumn}
                    ></Chip>
                ))}
                {/* <div contentEditable="true" className="inline bg-white"></div> */}
                <ColumnInput columns={columns} onColumnSelect={columnSelect} />
            </div>
            {/* <ColumnInput columns={columns} onColumnSelect={setSelectedColumn} />
            {selectedColumn && (
                <ActionSelector
                    column={selectedColumn}
                    groupByEnabled={!groupBy}
                    onAddFilter={addFilter}
                    onAddGroupBy={addGroupBy}
                    onAddSort={addSort}
                />
            )}
            <ChipList filters={filters} groupBy={groupBy} sort={sort} onRemoveChip={removeChip} /> */}
        </div>
    );
};

export default ChipWidget;
