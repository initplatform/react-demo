import db from 'just-debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { WidgetColumn, WidgetOperator, WidgetOperatorInput } from '@/types/chip-widget';

interface OperatorInputProps {
    column: WidgetColumn;
    operator: WidgetOperator;
    onApplyOperatorInput: (input: WidgetOperatorInput) => void;
}

const OperatorInput: React.FC<OperatorInputProps> = ({ column, onApplyOperatorInput }) => {
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element

    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value || '');
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
        if (inputRef.current) {
            inputRef.current.focus(); // Set focus when the component mounts
        }
        const element = inputRef.current;
        if (element) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setInput('');
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
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="inline-block px-1 outline-none w-full"
                placeholder="Text..."
            />
        </div>
    );
};

export default OperatorInput;
