'use client';

import React, { useMemo, useState } from 'react';

import ChipWidget from '@/components/chip-widget/chip-widget';
import PixarTable from '@/components/chip-widget/pixar-table';
import { widgetColumns } from '@/data/chip-widget-data';
import { pixarCharacters } from '@/data/chip-widget-test.data';
import type { PixarCharacter, WidgetColumnSelected } from '@/types/chip-widget';
import { WidgetOperatorName } from '@/types/chip-widget';

const ChipWidgetPage: React.FC = () => {
    const [columns, setColumns] = useState<(WidgetColumnSelected | null)[]>([]);

    const filteredData = useMemo(() => {
        let data = [...pixarCharacters];

        // Apply operators
        columns.forEach((column) => {
            if (!column?.operator) {
                return;
            }
            if (!column?.operator?.input) {
                return;
            }
            const { name, input } = column.operator;
            data = data.filter((row) => {
                const cellValue = row[column.name as keyof PixarCharacter];
                switch (name) {
                    case WidgetOperatorName.contains:
                        return cellValue
                            .toString()
                            .toLowerCase()
                            .includes((input as string).toLowerCase());
                    case WidgetOperatorName.equals:
                        return cellValue == (input as string);
                    case WidgetOperatorName.notEquals:
                        return cellValue != (input as string);
                    case WidgetOperatorName.greaterThan:
                        return Number(cellValue) > Number(input as string);
                    case WidgetOperatorName.lessThan:
                        return Number(cellValue) < Number(input as string);
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
    }, [columns]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full m-20 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Chip Widget</h1>
                <ChipWidget columns={widgetColumns} onSetColumns={setColumns}></ChipWidget>
                <PixarTable pixarCharacters={filteredData}></PixarTable>
            </div>
        </div>
    );
};

export default ChipWidgetPage;
