import React, { useEffect, useRef, useState } from 'react';

import { widgetOperatorMap, widgetOperators } from '@/data/chip-widget-data';
import type { WidgetOperator } from '@/types/chip-widget';
import { WidgetOperatorName } from '@/types/chip-widget';

interface OperatorSelectProps {
    onOperatorSelect: (operator: WidgetOperator) => void;
}

const OperatorSelect: React.FC<OperatorSelectProps> = ({ onOperatorSelect }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const [operator, setOperator] = useState<WidgetOperator>(
        widgetOperatorMap[WidgetOperatorName.contains]
    );

    const [showOperatorDropdown, setShowOperatorDropdown] = useState<boolean>(false);

    const handleKeyDown = (event: React.KeyboardEvent, operator: WidgetOperator) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSelect(operator);
        }
    };

    const handleSelect = (operator: WidgetOperator) => {        
        setOperator(operator);
        setShowOperatorDropdown(false);
        onOperatorSelect(operator);
    };

    const operatorClicked = () => {
        setShowOperatorDropdown(!showOperatorDropdown);
    };

    useEffect(() => {
        // This code will run when the component mounts
        const element = divRef.current;
        onOperatorSelect(widgetOperatorMap[WidgetOperatorName.contains]);

        if (element) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setShowOperatorDropdown(false);
                }
                if (event.key === '`') {
                    setShowOperatorDropdown(true);
                }
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    (event.target as HTMLElement)?.nextSibling && ((event.target as HTMLElement)?.nextSibling as HTMLElement)?.focus();
                }
                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    (event.target as HTMLElement)?.previousSibling && ((event.target as HTMLElement)?.previousSibling as HTMLElement)?.focus();
                }
            };

            element.addEventListener('keydown', handleKeyDown);
            return () => {
                // This code will run when the component unmounts
                element.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []); // The empty dependency array ensures this runs only on mount and unmount

    return (
        <div className="relative cursor-pointer" ref={divRef} tabIndex={0}>
            <div 
                className="bg-white px-2 rounded-md operator-selector"
                onClick={() => operatorClicked()}
            >
                {operator.displayString}
            </div>
            {showOperatorDropdown && (
                <div className="absolute z-10 bg-white border rounded mt-1 p-2">
                    <h3 className="font-bold whitespace-nowrap">Select a column</h3>
                    <ul>
                        {widgetOperators.map((operator) => (
                            <li
                                key={operator.name}
                                onClick={() => handleSelect(operator)}
                                onKeyDown={(e) => handleKeyDown(e, operator)}
                                className={"p-2 cursor-pointer hover:bg-gray-100 whitespace-nowrap operator-name-" + operator.name}
                                tabIndex={0}
                            >
                                {operator.displayString}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OperatorSelect;
