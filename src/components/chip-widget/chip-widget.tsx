import React, { useEffect, useRef, useState } from 'react';

import ActionSelector from '@/components/chip-widget/action-selector';
import Chip from '@/components/chip-widget/chip';
import ChipList from '@/components/chip-widget/chip-list';
import ColumnInput from '@/components/chip-widget/column-input';
import type { WidgetColumn, WidgetFilter, WidgetFilterInput } from '@/types/chip-widget';

interface ChipWidgetProps {
    columns: WidgetColumn[];
    onSetFilters: (filter: (WidgetFilter | null)[]) => void;
}

const ChipWidget: React.FC<ChipWidgetProps> = ({ columns, onSetFilters }) => {
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [filters, setFilters] = useState<(WidgetFilter | null)[]>([]);
    const [groupBy, setGroupBy] = useState<string | null>(null);
    const [sort, setSort] = useState<{ column: string; order: 'ASC' | 'DESC' } | null>(null);

    const [selectedColumns, setSelectedColumns] = useState<WidgetColumn[]>([]);

    const columnSelect = (column: WidgetColumn) => {
        setSelectedColumns([...selectedColumns, column]);
    };

    const applyFilter = (newFilter: WidgetFilter, index: number) => {
        setFilters((prevFilters) => {
            const newFilters = [...prevFilters];
            newFilters[index] = newFilter; // Update the filter at the given index
            return newFilters;
        });
    };

    useEffect(() => {
        onSetFilters(filters);
    }, [onSetFilters, filters]);

    // const addGroupBy = (column: string) => {
    //     setGroupBy(column);
    // };

    // const addSort = (newSort: { column: string; order: 'ASC' | 'DESC' }) => {
    //     setSort(newSort);
    // };

    // const removeChip = (type: 'filter' | 'groupBy' | 'sort', indexOrColumn: number | string) => {
    //     if (type === 'filter') {
    //         setFilters(filters.filter((_, i) => i !== indexOrColumn));
    //     } else if (type === 'groupBy') {
    //         setGroupBy(null);
    //     } else if (type === 'sort') {
    //         setSort(null);
    //     }
    // };

    const removeColumn = (index: number) => {
        setSelectedColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            newColumns.splice(index, 1); // Remove the column at the given index
            return newColumns;
        });
        setFilters((prevFilters) => {
            const newFilters = [...prevFilters];
            newFilters.splice(index, 1); // Remove the filter at the given index
            return newFilters;
        });
        onSetFilters(filters);
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
                        onApplyFilter={(filter: WidgetFilter, index: number) =>
                            applyFilter(filter, index)
                        }
                    ></Chip>
                ))}
                <ColumnInput columns={columns} onColumnSelect={columnSelect} />
            </div>
        </div>
    );
};

export default ChipWidget;
