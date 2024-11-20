import React from 'react';

interface ChipListProps {
    filters: { column: string; operator: string; value: string }[];
    groupBy: string | null;
    sort: { column: string; order: 'ASC' | 'DESC' } | null;
    onRemoveChip: (type: 'filter' | 'groupBy' | 'sort', indexOrColumn: number | string) => void;
}

const ChipList: React.FC<ChipListProps> = ({ filters, groupBy, sort, onRemoveChip }) => {
    return (
        <div className="space-y-2">
            <div>
                <h4 className="font-semibold">Filters</h4>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter, index) => (
                        <div key={index} className="chip">
                            {filter.column} {filter.operator} {filter.value}
                            <button
                                onClick={() => onRemoveChip('filter', index)}
                                className="chip-close"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold">Group By</h4>
                {groupBy && (
                    <div className="chip">
                        {groupBy}
                        <button
                            onClick={() => onRemoveChip('groupBy', groupBy)}
                            className="chip-close"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
            <div>
                <h4 className="font-semibold">Sort</h4>
                {sort && (
                    <div className="chip">
                        {sort.column} ({sort.order})
                        <button
                            onClick={() => onRemoveChip('sort', sort.column)}
                            className="chip-close"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChipList;
