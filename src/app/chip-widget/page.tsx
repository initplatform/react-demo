'use client';

import React, { useMemo, useState } from 'react';

import ChipWidget from '@/components/chip-widget/chip-widget';
import type { Filter } from '@/components/chip-widget/filter-input';
import FilterInput from '@/components/chip-widget/filter-input';
import PixarTable from '@/components/chip-widget/pixar-table';
import { widgetColumns } from '@/data/chip-widget-data';
import { pixarCharacters } from '@/data/chip-widget-test.data';
import type { PixarCharacter } from '@/types/chip-widget';

const ChipWidgetPage: React.FC = () => {
    const [filters, setFilters] = useState<Filter[]>([]);
    // const [sortOption, setSortOption] = useState<SortOption | null>(null);
    // const [groupByColumn, setGroupByColumn] = useState<string | null>(null);

    const filteredData = useMemo(() => {
        let data = [...pixarCharacters];

        console.log(filters);

        // Apply filters
        filters.forEach((filter) => {
            console.log(filter);

            const { column, operator, value } = filter;
            data = data.filter((row) => {
                const cellValue = row[column as keyof PixarCharacter];
                switch (operator) {
                    case '=':
                        return cellValue == value;
                    case '!=':
                        return cellValue != value;
                    case '>':
                        return Number(cellValue) > Number(value);
                    case '<':
                        return Number(cellValue) < Number(value);
                    case 'contains':
                        return String(cellValue).includes(String(value));
                    default:
                        return true;
                }
            });
        });

        // // Apply sorting
        // if (sortOption) {
        //     const { column, direction } = sortOption;
        //     data.sort((a, b) => {
        //         const aValue = a[column as keyof Character];
        //         const bValue = b[column as keyof Character];
        //         if (direction === 'asc') {
        //             return String(aValue).localeCompare(String(bValue));
        //         }
        //         return String(bValue).localeCompare(String(aValue));
        //     });
        // }

        // // Apply grouping
        // if (groupByColumn) {
        //     const groupedData: Character[] = [];
        //     const groupMap: Record<string, Character[]> = {};

        //     data.forEach((row) => {
        //         const key = row[groupByColumn as keyof Character];
        //         if (!groupMap[key]) groupMap[key] = [];
        //         groupMap[key].push(row);
        //     });

        //     Object.entries(groupMap).forEach(([key, rows]) => {
        //         groupedData.push({ movie: key, firstName: '-', lastName: '-', age: 0, role: '-' });
        //         groupedData.push(...rows);
        //     });

        //     return groupedData;
        // }

        return data;
    }, [filters]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full m-20 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Chip Widget</h1>
                <ChipWidget columns={widgetColumns}></ChipWidget>
                {/* <FilterInput onApplyFilter={setFilters}></FilterInput> */}
                <PixarTable pixarCharacters={filteredData}></PixarTable>
            </div>
        </div>
    );
};

export default ChipWidgetPage;
