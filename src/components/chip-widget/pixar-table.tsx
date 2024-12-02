import React from 'react';

import type { PixarCharacter } from '@/types/chip-widget';

interface PixarTableProps {
    pixarCharacters: PixarCharacter[];
}

const PixarTable: React.FC<PixarTableProps> = ({ pixarCharacters }) => {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Movie</th>
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2">Age</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Birthday</th>
                    </tr>
                </thead>
                <tbody className="pixar-table-body">
                    {pixarCharacters.map((character, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 px-4 py-2 cell-movie">{character.movie}</td>
                            <td className="border border-gray-300 px-4 py-2 cell-first-name">
                                {character.firstName}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 cell-last-name">
                                {character.lastName}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 cell-age">{character.age}</td>
                            <td className="border border-gray-300 px-4 py-2 cell-role">{character.role}</td>
                            <td className="border border-gray-300 px-4 py-2 cell-birthday">
                                {character.birthday}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PixarTable;
