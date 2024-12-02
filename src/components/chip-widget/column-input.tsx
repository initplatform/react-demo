import React, { useEffect, useRef, useState } from 'react';

import type { WidgetColumn } from '@/types/chip-widget';

interface ColumnInputProps {
    columns: WidgetColumn[];
    onColumnSelect: (column: WidgetColumn) => void;
}

const ColumnInput: React.FC<ColumnInputProps> = ({ columns, onColumnSelect }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<WidgetColumn[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value || '');

        if (value) {
            setSuggestions(
                columns.filter((col) => col.name.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent, column: WidgetColumn) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSelect(column);
        }
    };

    const handleSelect = (column: WidgetColumn) => {
        setInput('');
        setSuggestions([]);
        onColumnSelect(column);
    };

    useEffect(() => {
        const element = divRef.current;
        if (element) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setInput('');
                    setSuggestions([]);
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                // This code will run when the component unmounts
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []); // The empty dependency array ensures this runs only on mount and unmount

    return (
        <div className="inline-flex relative grow mt-2" ref={divRef}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="inline-block px-1 outline-none w-full"
                placeholder="Column name..."
                data-testid="columnNameInput"
            />
            {suggestions.length > 0 && (
                <div className="absolute z-10 bg-white border rounded mt-1 p-2 top-8">
                    <h3 className="font-bold">Select a column</h3>
                    <ul>
                        {suggestions.map((col) => (
                            <li
                                key={col.name}
                                onClick={() => handleSelect(col)}
                                onKeyDown={(e) => handleKeyDown(e, col)}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                tabIndex={0}
                            >
                                {col.displayString}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ColumnInput;
