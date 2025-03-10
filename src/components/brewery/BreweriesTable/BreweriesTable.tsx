import Table from '@/components/common/Table';
import { useFetchBreweries } from '@/hooks/useFetchBreweries';
import { Brewery } from '@/types/breweries.types';
import { ColumnProps } from '@/types/table.types';
import { useState } from 'react';
import BreweryFilter from '@/components/brewery/BreweryFilter';
import Pagination from '@/components/common/Pagination';
import BreweriesTableSkeleton from '@/components/brewery/Skeleton/BreweriesTableSkeleton';

/**
 * BreweriesTable component renders a table of breweries
 * @param {Object} props the component props
 * @param {Brewery} props.breweries an array of brewery objects to display in the table
 */
const BreweriesTable = () => {
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

    if (loading) {
        return <BreweriesTableSkeleton />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // define the columns for the table
    const columns: ColumnProps<Brewery>[] = [
        {
            header: 'Brewer Name',
            accessor: 'name',
            isLink: true,
            linkAccessor: 'id'
        },
        { header: 'Type', accessor: 'brewery_type' },
        { header: 'City', accessor: 'city' },
        { header: 'Country', accessor: 'country' },
        { header: 'Website', accessor: 'website_url' },
        { header: 'Phone', accessor: 'phone' }
    ];

    // render the Table component with brewery data and columns
    return (
        <div>
            <div className="max-w-screen-lg mx-auto p-4 md:p-0 w-full text-black">
                <BreweryFilter onFilter={handleFilter} />
            </div>
            <div className="max-w-screen-lg mx-auto p-4 md:p-0 w-full text-black">
                <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200 max-w-screen-lg mx-auto w-full">
                    <Table data={breweries} columns={columns} />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default BreweriesTable;
