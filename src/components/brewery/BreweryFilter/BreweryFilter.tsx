'use client';

import { useState } from 'react';

interface BreweryFilterProps {
    onFilter: (name: string, city: string) => void;
}

/**
 * A component for filtering breweries by name and city
 *
 * @param {BreweryFilterProps} props the props for the FilteringPanel component
 * @returns {JSX.Element} the rendered FilteringPanel component
 */
const BreweryFilter: React.FC<BreweryFilterProps> = ({ onFilter }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    // handles the click event and calls the onFilter callback with the current filter values.
    const handleGoClick = () => {
        onFilter(nameFilter, cityFilter);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filter Breweries</h2>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={nameFilter}
                        onChange={e => setNameFilter(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>

                <div className="flex-1">
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                    >
                        City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        value={cityFilter}
                        onChange={e => setCityFilter(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>

                <button
                    onClick={handleGoClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 px-4 rounded-md self-center sm:self-end"
                >
                    Go
                </button>
            </div>
        </div>
    );
};

export default BreweryFilter;
