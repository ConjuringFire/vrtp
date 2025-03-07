import { Brewery } from '@/types/breweries.types';
import { ColumnProps } from '@/types/table.types';

export const mockBreweryColumns: ColumnProps<Brewery>[] = [
    {
        header: 'Brewery Name',
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
