import React from 'react';

interface SortInputProps {
    onApply: (order: 'ASC' | 'DESC') => void;
}

const SortInput: React.FC<SortInputProps> = ({ onApply }) => {
    return (
        <div className="flex space-x-2">
            <button onClick={() => onApply('ASC')} className="btn">
                Ascending
            </button>
            <button onClick={() => onApply('DESC')} className="btn">
                Descending
            </button>
        </div>
    );
};

export default SortInput;
