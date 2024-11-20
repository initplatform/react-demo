import React, { useEffect, useRef, useState } from 'react';

import Chip from '@/components/chip-widget/chip';
import ColumnInput from '@/components/chip-widget/column-input';
import type { WidgetColumn, WidgetFilter } from '@/types/chip-widget';

interface ChipWidgetProps {
    columns: WidgetColumn[];
    onSetFilters: (filter: (WidgetFilter | null)[]) => void;
}

const ChipWidget: React.FC<ChipWidgetProps> = ({ columns, onSetFilters }) => {
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [filters, setFilters] = useState<(WidgetFilter | null)[]>([]);
    // const [groupBy, setGroupBy] = useState<string | null>(null);
    // const [sort, setSort] = useState<{ column: string; order: 'ASC' | 'DESC' } | null>(null);

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
    }, [filters]);

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
