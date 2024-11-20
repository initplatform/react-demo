import React from 'react';

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <button
            onClick={onClick}
            onKeyDown={(e) => handleKeyDown(e)}
            aria-label="Close"
            className="group flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ml-3"
        >
            <span className="relative block w-2.5 h-2.5">
                <span className="absolute inset-0 w-full h-0.5 top-1 bg-gray-800 rotate-45 transition group-hover:bg-sky-200"></span>
                <span className="absolute inset-0 w-full h-0.5 top-1 bg-gray-800 -rotate-45 transition group-hover:bg-sky-200"></span>
            </span>
        </button>
    );
};

export default CloseButton;
