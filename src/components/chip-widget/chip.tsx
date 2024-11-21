import React, { forwardRef, useEffect, useState } from 'react';

import OperatorInput from '@/components/chip-widget/operator-input';
import OperatorSelect from '@/components/chip-widget/operator-select';
import CloseButton from '@/components/shared/close-button';
import { widgetOperatorMap } from '@/data/chip-widget-data';
import type { WidgetColumn, WidgetOperator, WidgetOperatorInput } from '@/types/chip-widget';
import { WidgetOperatorName } from '@/types/chip-widget';

interface ChipProps {
    id: string;
    column: WidgetColumn;
    onRemove: (id: string) => void;
    onApplyOperator: (operator: WidgetOperator, id: string) => void;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(
    ({ column, id, onRemove, onApplyOperator }, ref) => {
        const [operator, setOperator] = useState<WidgetOperator>(
            widgetOperatorMap[WidgetOperatorName.equals]
        );

        const operatorSelect = (operator: WidgetOperator) => {
            setOperator(operator);
        };

        const applyOperatorInput = (input: WidgetOperatorInput) => {
            setOperator((prevOperator) => {
                return {
                    // Spread only works if object is 1 level deep.
                    // Pull in just-clone if this object gets deeper
                    ...prevOperator,
                    input,
                };
            });
        };

        useEffect(() => {
            onApplyOperator(operator, id);
        }, [column, operator]);

        const close = () => {
            onRemove(id);
        };

        return (
            <div
                ref={ref}
                tabIndex={0}
                className="flex relative rounded-md items-center bg-green-100 py-1 px-2 mr-2 text-sm text-green-800 transition-all shadow-sm mt-2"
            >
                <div className="mr-2">{column.displayString}</div>
                <OperatorSelect
                    onOperatorSelect={(operator: WidgetOperator) => operatorSelect(operator)}
                ></OperatorSelect>
                <OperatorInput
                    column={column}
                    operator={operator}
                    onApplyOperatorInput={applyOperatorInput}
                ></OperatorInput>
                <CloseButton onClick={close}></CloseButton>
            </div>
        );
    }
);

Chip.displayName = 'Chip';

export default Chip;
