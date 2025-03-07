'use client';

import AutosuggestInput from '@/components/AutosuggestInput';
import BreweriesTable from '@/components/brewery/BreweriesTable';
import FilteringPanel from '@/components/FilteringPanel';
import { useFetchBreweries } from '@/hooks/useFetchBreweries';
import { useState } from 'react';

export default function Home() {
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [page, setPage] = useState<number>(1);

    const { breweries, error, loading, totalPages } = useFetchBreweries({
        cityFilter,
        nameFilter,
        page
    });

    const handleFilter = (name: string, city: string) => {
        setNameFilter(name);
        setCityFilter(city);
        setPage(1);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    if (loading) {
        return <p>Loading ...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Breweries</h1>
            <AutosuggestInput />
            <FilteringPanel onFilter={handleFilter} />
            <BreweriesTable breweries={breweries} />
            <div>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={breweries.length < 15}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
