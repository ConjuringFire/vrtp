'use client';

import { useBreweryDetails } from '@/hooks/useBreweryDetails';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import BreweryMap from './BreweryMap';

/**
 * a brewery details component for displaying deails about a specific brewery
 *
 * @returns {JSX.Element} the rendered BreweryDetails component
 */
const BreweryDetails = () => {
    // get brewery ID from route parameters
    const { id } = useParams();

    return (
        <Suspense fallback={<p>Loading brewery details...</p>}>
            <BreweryDetailsContent id={id as string} />
        </Suspense>
    );
};

const BreweryDetailsContent = ({ id }: { id: string }) => {
    const { brewery, error } = useBreweryDetails({ id: id as string });

    // display error message if fetching brewery details failed
    if (error) {
        return <p>Error: {error}</p>;
    }

    // display error message if brewery is not found
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
            <Suspense fallback={<p>Loading Map...</p>}>
                <BreweryMap
                    latitude={brewery.latitude}
                    longitude={brewery.longitude}
                />
            </Suspense>
        </div>
    );
};

export default BreweryDetails;
