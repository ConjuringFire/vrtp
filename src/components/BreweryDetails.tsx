'use client';

import { useBreweryDetails } from '@/hooks/useBreweryDetails';
import { useParams } from 'next/navigation';

const BreweryDetails = () => {
    const { id } = useParams();
    const { brewery, error, loading } = useBreweryDetails({ id: id as string });

    if (loading) {
        return <p>Loading brewery details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!brewery) {
        return <p>Brewery not found</p>;
    }

    return (
        <div>
            <h1>{brewery.name}</h1>
            <p>Type: {brewery.brewery_type}</p>
            <p>
                Address: {brewery.street}, {brewery.city}, {brewery.state},{' '}
                {brewery.postal_code}, {brewery.country}
            </p>
            <p>Phone: {brewery.phone}</p>
            <p>
                Website:{' '}
                <a
                    href={brewery.website_url || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {brewery.website_url}
                </a>
            </p>
        </div>
    );
};

export default BreweryDetails;
