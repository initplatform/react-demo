import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Chip from '@/components/chip-widget/chip';
import ColumnInput from '@/components/chip-widget/column-input';
import type { WidgetColumn, WidgetColumnSelected, WidgetFilter } from '@/types/chip-widget';

interface ChipWidgetProps {
    columns: WidgetColumn[];
    onSetFilters: (filter: (WidgetFilter | null)[]) => void;
}

const ChipWidget: React.FC<ChipWidgetProps> = ({ columns, onSetFilters }) => {
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [filters, setFilters] = useState<(WidgetFilter | null)[]>([]);
    // const [groupBy, setGroupBy] = useState<string | null>(null);
    // const [sort, setSort] = useState<{ column: string; order: 'ASC' | 'DESC' } | null>(null);

    const [selectedColumns, setSelectedColumns] = useState<WidgetColumnSelected[]>([]);

    const columnSelect = (column: WidgetColumn) => {
        setSelectedColumns([
            ...selectedColumns,
            {
                ...column,
                id: uuid(),
            },
        ]);
    };

    const applyFilter = (newFilter: WidgetFilter, id: string) => {
        setSelectedColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            const columnIndex = newColumns.findIndex((column) => column.id === id);
            newColumns[columnIndex].filter = newFilter; // Update the filter at the given index
            return newColumns;
        });
    };

    const removeColumn = (id: string) => {
        setSelectedColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            const columnIndex = newColumns.findIndex((column) => column.id === id);
            newColumns.splice(columnIndex, 1); // Remove the column at the given index
            return newColumns;
        });
        onSetFilters(filters);
    };

    useEffect(() => {
        // if (selectedColumns.length > 0) {
        //     const lastIndex = selectedColumns.length - 1;
        //     chipRefs.current[lastIndex]?.focus();
        // }

        onSetFilters(selectedColumns.map((selectedColumn) => selectedColumn.filter || null));
    }, [selectedColumns]);

    return (
        <div className="p-4 bg-gray-50 rounded shadow-md space-y-4 mx-auto">
            <div className="flex bg-white rounded p-2">
                {selectedColumns.map((column, index) => (
                    <Chip
                        key={column.id}
                        id={column.id}
                        column={column}
                        ref={(el) => {
                            chipRefs.current[index] = el;
                        }}
                        onRemove={removeColumn}
                        onApplyFilter={(filter: WidgetFilter, id: string) =>
                            applyFilter(filter, column.id)
                        }
                    ></Chip>
                ))}
                <ColumnInput columns={columns} onColumnSelect={columnSelect} />
            </div>
        </div>
    );
};

export default ChipWidget;
