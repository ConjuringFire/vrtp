import { Brewery, BreweryMeta } from '@/types/breweries.types';

export const mockBreweries: Brewery[] = [
    {
        id: '1',
        name: 'Test Brewery 1',
        brewery_type: 'micro',
        address_1: '1 Test Street',
        city: 'Test City 1',
        country: 'Test Country 1',
        website_url: 'http://test1.com',
        phone: '123-456-7890',
        street: '1 Test Street'
    },
    {
        id: '2',
        name: 'Test Brewery 2',
        brewery_type: 'regional',
        address_1: '2 Test Street',
        city: 'Test City 2',
        country: 'Test Country 2',
        website_url: 'http://test2.com',
        phone: '987-654-3210',
        street: '2 Test Street'
    }
];

export const mockMetaData: BreweryMeta = {
    total: 50,
    page: 1,
    per_page: 15
};
