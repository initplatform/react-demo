import db from 'just-debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
    type WidgetColumn,
    type WidgetOperatorInput,
    WidgetOperatorName,
    WidgetSortDirection,
} from '@/types/chip-widget';

interface OperatorInputProps {
    column: WidgetColumn;
    operatorName: WidgetOperatorName;
    onApplyOperatorInput: (input: WidgetOperatorInput) => void;
}

const OperatorInput: React.FC<OperatorInputProps> = ({ onApplyOperatorInput, operatorName }) => {
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element

    const [stringInput, setStringInput] = useState<string | null>(null);
    const [sortInput, setSortInput] = useState<WidgetSortDirection>(WidgetSortDirection.asc);

    const handleStringInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStringInput(value || '');
        applyOperatorInput(value);
    };

    const handleSortInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as WidgetSortDirection; // TODO: Add assertion for type safety
        setSortInput(value);
        applyOperatorInput(value);
    };

    // INFO: useCallback complains dependencies unknown error
    const applyOperatorInput = useMemo(
        () =>
            db((value: string) => {
                onApplyOperatorInput(value);
            }, 300),
        []
    );

    useEffect(() => {
            if (operatorName !== WidgetOperatorName.sort) {
                if (stringInput === null) {
                    onApplyOperatorInput('');
                }
            }
            if (operatorName === WidgetOperatorName.sort) {
                onApplyOperatorInput(WidgetSortDirection.asc);
            }
    }, [operatorName]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Set focus when the component mounts
        }

        const element = inputRef.current;
        if (element) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setStringInput('');
                }
            };

            element.addEventListener('keydown', handleKeyDown);
            return () => {
                // This code will run when the component unmounts
                element.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []); // Empty dependency array ensures it runs once after mount

    return (
        <div className="ml-2">
            {operatorName !== WidgetOperatorName.sort && (
                <input
                    ref={inputRef}
                    type="text"
                    value={stringInput || ''}
                    onChange={handleStringInputChange}
                    className="inline-block px-1 outline-none w-full operator-input"
                    placeholder="Text..."
                />
            )}
            {operatorName === WidgetOperatorName.sort && (
                <select
                    value={sortInput}
                    onChange={handleSortInputChange}
                    className="border rounded px-2 py-1 operator-input-select"
                >
                    <option value={WidgetSortDirection.asc}>Asc</option>
                    <option value={WidgetSortDirection.desc}>Desc</option>
                </select>
            )}
        </div>
    );
};

export default OperatorInput;
