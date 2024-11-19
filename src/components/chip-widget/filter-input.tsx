import React, { useState } from 'react';

interface FilterInputProps {
    onApply: (operator: string, value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ onApply }) => {
    const [operator, setOperator] = useState<string>('');
    const [value, setValue] = useState<string>('');

    const operators = ['equals', 'not equals', 'greater than', 'less than'];

    const handleApply = () => {
        if (operator && value) {
            onApply(operator, value);
            setOperator('');
            setValue('');
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex space-x-2">
                <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="border rounded p-2 flex-1"
                >
                    <option value="" disabled>
                        Select Operator
                    </option>
                    {operators.map((op) => (
                        <option key={op} value={op}>
                            {op}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Value"
                    className="border rounded p-2 flex-1"
                />
            </div>
            <button onClick={handleApply} className="btn">
                Apply
            </button>
        </div>
    );
};

export default FilterInput;
