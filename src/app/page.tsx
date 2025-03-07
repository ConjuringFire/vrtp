'use client';

import AutosuggestInput from '@/components/brewery/AutosuggestInput';
import BreweriesTable from '@/components/brewery/BreweriesTable';
import Pagination from '@/components/common/Pagination/Pagination';
import FilteringPanel from '@/components/FilteringPanel';
import { useFetchBreweries } from '@/hooks/useFetchBreweries';
import { useState } from 'react';

export default function Home() {
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [page, setPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

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
        <div className="bg-linear-to-bl from-[#FF3A63] to-[#D72389]">
            <div className="max-w-screen-lg mx-auto p-8 md:p-24 w-full drop-shadow-xl text-black">
                <h1
                    className={`text-6xl font-bold text-center hidden md:block`}
                >
                    Welcome to Ale Trail
                </h1>
                <h2 className={`text-3xl font-bold text-center mb-4 md:mb-24`}>
                    Search for Breweries
                </h2>
                <AutosuggestInput />
            </div>
            <FilteringPanel onFilter={handleFilter} />
            <div className="max-w-screen-lg mx-auto p-4 w-full drop-shadow-xl">
                <BreweriesTable breweries={breweries} />
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
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
        </div>
    );
}
