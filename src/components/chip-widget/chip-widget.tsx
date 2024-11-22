import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Chip from '@/components/chip-widget/chip';
import ColumnInput from '@/components/chip-widget/column-input';
import type { WidgetColumn, WidgetColumnSelected, WidgetOperator } from '@/types/chip-widget';

interface ChipWidgetProps {
    columns: WidgetColumn[];
    onSetColumns: (columns: (WidgetColumnSelected | null)[]) => void;
}

const ChipWidget: React.FC<ChipWidgetProps> = ({ columns, onSetColumns }) => {
    const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
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

    const applyOperator = (newOperator: WidgetOperator, id: string) => {
        setSelectedColumns((prevColumns) => {
            const newColumns = [...prevColumns];
            const columnIndex = newColumns.findIndex((column) => column.id === id);
            newColumns[columnIndex].operator = newOperator; // Update the filter at the given index
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
    };

    useEffect(() => {
        // if (selectedColumns.length > 0) {
        //     const lastIndex = selectedColumns.length - 1;
        //     chipRefs.current[lastIndex]?.focus();
        // }
        onSetColumns(selectedColumns);
    }, [selectedColumns]);

    return (
        <div className="p-4 bg-gray-50 rounded shadow-md space-y-4 mx-auto">
            <div className="flex bg-white rounded pb-2 px-2 flex-wrap">
                {selectedColumns.map((column, index) => (
                    <Chip
                        key={column.id}
                        id={column.id}
                        column={column}
                        ref={(el) => {
                            chipRefs.current[index] = el;
                        }}
                        onRemove={removeColumn}
                        onApplyOperator={(operator: WidgetOperator, id: string) =>
                            applyOperator(operator, column.id)
                        }
                    ></Chip>
                ))}
                <ColumnInput columns={columns} onColumnSelect={columnSelect} />
            </div>
        </div>
    );
};

export default ChipWidget;
