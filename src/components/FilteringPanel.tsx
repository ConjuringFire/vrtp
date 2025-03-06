'use client';

import { useState } from 'react';

interface FilteringPanelProps {
    onFilter: (name: string, city: string) => void;
}

/**
 * A component for filtering breweries by name and city
 *
 * @param {FilteringPanelProps} props the props for the FilteringPanel component
 * @returns {JSX.Element} the rendered FilteringPanel component
 */
const FilteringPanel: React.FC<FilteringPanelProps> = ({ onFilter }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    // handles the click event and calls the onFilter callback with the current filter values.
    const handleGoClick = () => {
        onFilter(nameFilter, cityFilter);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by Name"
                value={nameFilter}
                onChange={e => setNameFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by City"
                value={cityFilter}
                onChange={e => setCityFilter(e.target.value)}
            />
            <button onClick={handleGoClick}>Go</button>
        </div>
    );
};

export default FilteringPanel;
