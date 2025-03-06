'use client';

import AutosuggestInput from '@/components/AutosuggestInput';
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
            <table>
                <thead>
                    <tr>
                        <th>Brewery Name</th>
                        <th>Type</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Website</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {breweries.map(brewery => (
                        <tr key={brewery.id}>
                            <td>
                                <a href={`/brewery/${brewery.id}`}>
                                    {brewery.name}
                                </a>
                            </td>
                            <td>{brewery.brewery_type}</td>
                            <td>{brewery.city}</td>
                            <td>{brewery.country}</td>
                            <td>
                                {brewery.website_url && (
                                    <a
                                        href={brewery.website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit
                                    </a>
                                )}
                            </td>
                            <td>{brewery.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
