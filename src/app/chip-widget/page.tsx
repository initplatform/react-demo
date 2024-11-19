'use client';

import React from 'react';

import ChipWidget from '@/components/chip-widget/chip-widget';
import PixarTable from '@/components/chip-widget/pixar-table';
import { pixarCharacters } from '@/data/chip-widget-test.data';

const ChipWidgetPage: React.FC = () => {
    const columns = ['a', 'b', 'c'];
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full m-20 p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Chip Widget</h1>
                <ChipWidget columns={columns}></ChipWidget>
                <PixarTable pixarCharacters={pixarCharacters}></PixarTable>
            </div>
        </div>
    );
};

export default ChipWidgetPage;
