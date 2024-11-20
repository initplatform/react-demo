import React, { useEffect, useRef } from 'react';

// export interface Filter {
//     column: string;
//     operator: string;
//     value: string;
// }

interface FilterInputProps {
    columnKind: string;
    // onApplyFilter: (filter: Filter[]) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ columnKind }) => {
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus(); // Set focus when the component mounts
        }
    }, []); // Empty dependency array ensures it runs once after mount

    return (
        <div className="ml-2">
            <input
                ref={inputRef}
                type="text"
                // value={input}
                // onChange={handleInputChange}
                className="inline-block px-1 outline-none w-full"
                placeholder="Text..."
            />
        </div>
    );
};

export default FilterInput;
