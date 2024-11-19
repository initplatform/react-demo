import React, { useState } from 'react';

interface ColumnInputProps {
    columns: string[];
    onColumnSelect: (column: string) => void;
}

const ColumnInput: React.FC<ColumnInputProps> = ({ columns, onColumnSelect }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value) {
            setSuggestions(
                columns.filter((col) => col.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (column: string) => {
        onColumnSelect(column);
        setInput('');
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                placeholder="Start typing column name..."
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded w-full mt-1">
                    {suggestions.map((col) => (
                        <li
                            key={col}
                            onClick={() => handleSelect(col)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {col}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ColumnInput;
