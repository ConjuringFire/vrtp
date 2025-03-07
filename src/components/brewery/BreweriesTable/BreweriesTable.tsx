import Table from '@/components/common/Table';
import { Brewery } from '@/types/breweries.types';
import { ColumnProps } from '@/types/table.types';

/**
 * BreweriesTable component renders a table of breweries
 * @param {Object} props the component props
 * @param {Brewery} props.breweries an array of brewery objects to display in the table
 */
const BreweriesTable = ({ breweries }: { breweries: Brewery[] }) => {
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
        <Table
            data={breweries}
            columns={columns}
            classes="border-collapse border outline outline-1 outline-gray-400 overflow-hidden text-center rounded-lg shadow-sm"
        />
    );
};

export default BreweriesTable;
