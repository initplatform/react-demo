import React, { forwardRef, useEffect, useState } from 'react';

import FilterInput from '@/components/chip-widget/filter-input';
import OperatorSelect from '@/components/chip-widget/operator-select';
import CloseButton from '@/components/shared/close-button';
import { widgetOperatorMap } from '@/data/chip-widget-data';
import type {
    WidgetColumn,
    WidgetFilter,
    WidgetFilterInput,
    WidgetOperator,
} from '@/types/chip-widget';
import { WidgetFilterKind, WidgetOperatorKind, WidgetOperatorName } from '@/types/chip-widget';

interface ChipProps {
    id: string;
    column: WidgetColumn;
    onRemove: (id: string) => void;
    onApplyFilter: (filter: WidgetFilter, id: string) => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
    ({ column, id, onRemove, onApplyFilter }, ref) => {
        console.log(id);

        const [operator, setOperator] = useState<WidgetOperator>(
            widgetOperatorMap[WidgetOperatorName.equals]
        );

        const [filterInput, setFilterInput] = useState<WidgetFilterInput>({
            kind: WidgetFilterKind.string,
            value: '',
        });
        const operatorSelect = (operator: WidgetOperator) => {
            setOperator(operator);
        };

        const applyFilterInput = (filterInput: WidgetFilterInput) => {
            setFilterInput(filterInput);
            onApplyFilter(
                {
                    column,
                    operator,
                    input: filterInput,
                },
                id
            );
        };

        useEffect(() => {
            onApplyFilter(
                {
                    column,
                    operator,
                    input: filterInput,
                },
                id
            );

            // if (operator) {
            //     switch (operator.kind) {
            //         case WidgetOperatorKind.filter:
            //             break;

            //         default:
            //             break;
            //     }
            // }
        }, [column, operator, filterInput]);

        const close = () => {
            onRemove(id);
        };

        return (
            <div
                ref={ref}
                tabIndex={0}
                className="flex relative rounded-md items-center bg-green-100 py-1 px-2 mr-2 text-sm text-green-800 transition-all shadow-sm"
            >
                <div className="mr-2">{column.displayString}</div>
                <OperatorSelect
                    onOperatorSelect={(operator: WidgetOperator) => operatorSelect(operator)}
                ></OperatorSelect>
                {operator?.kind === WidgetOperatorKind.filter && (
                    <FilterInput
                        column={column}
                        onApplyFilterInput={applyFilterInput}
                    ></FilterInput>
                )}
                <CloseButton onClick={close}></CloseButton>
            </div>
        );
    }
);

Chip.displayName = 'Chip';

export default Chip;
