import React, { forwardRef, useEffect, useState } from 'react';

import FilterInput from '@/components/chip-widget/filter-input';
import OperatorSelect from '@/components/chip-widget/operator-select';
import CloseButton from '@/components/shared/close-button';
import { type WidgetColumn, type WidgetOperator, WidgetOperatorKind } from '@/types/chip-widget';

interface ChipProps {
    column: WidgetColumn;
    index: number;
    onRemove: (index: number) => void;
    // onOperatorSelect: (operator: WidgetOperator) => void;
    // filters: { column: string; operator: string; value: string }[];
    // groupBy: string | null;
    // sort: { column: string; order: 'ASC' | 'DESC' } | null;
    // onRemoveChip: (type: 'filter' | 'groupBy' | 'sort', indexOrColumn: number | string) => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(({ column, index, onRemove }, ref) => {
    const [operator, setOperator] = useState<WidgetOperator | null>(null);

    // const operatorSelect = (operator: WidgetOperator) => {
    //     setOperator(operator);
    // };

    useEffect(() => {
        if (operator) {
            switch (operator.kind) {
                case WidgetOperatorKind.filter:
                    console.log('filter');

                    break;

                default:
                    break;
            }
        }
    }, [operator]);

    const close = () => {
        onRemove(index);
    };

    return (
        <div
            ref={ref}
            tabIndex={0}
            className="flex relative rounded-md items-center bg-green-100 py-1 px-2 mr-2 text-sm text-green-800 transition-all shadow-sm"
        >
            <div className="mr-2">{column.displayString}</div>
            <OperatorSelect onOperatorSelect={setOperator}></OperatorSelect>
            {operator?.kind === WidgetOperatorKind.filter && (
                <FilterInput columnKind="asd"></FilterInput>
            )}
            <CloseButton onClick={close}></CloseButton>
        </div>
    );
});

Chip.displayName = 'Chip';

export default Chip;
