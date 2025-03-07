import { Column } from '@/components/common/Table/Table';
import { Brewery } from '@/types/breweries.types';

export const mockBreweryColumns: Column<Brewery>[] = [
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
