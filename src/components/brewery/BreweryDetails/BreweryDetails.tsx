'use client';

import { useBreweryDetails } from '@/hooks/useBreweryDetails';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import BreweryMap from '../MapComponent';
import Breadcrumbs from '@/components/common/Breadcrumbs';

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
    const { brewery, error, loading } = useBreweryDetails({ id: id as string });

    // display error message if fetching brewery details failed
    if (error) {
        return <p>Error: {error}</p>;
    }

    // display error message if brewery is not found
    if (!brewery) {
        if (loading) {
            return <p>Loading ...</p>;
        } else {
            return <p>Brewery not found</p>;
        }
    }

    return (
        <div className="p-4 text-black">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    {
                        label: 'Brewery',
                        href: `/brewery/${id}`,
                        active: true
                    }
                ]}
            />
            <h1 className="text-2xl font-semibold mb-12">{brewery.name}</h1>
            <div className="bg-white rounded-2xl shadow-md p-4 mb-12">
                <h2 className="text-lg font-semibold mb-2">Details</h2>
                <p>
                    <strong>Type:</strong> {brewery.brewery_type}
                </p>
                <p>
                    <strong>Address:</strong> {brewery.street}, {brewery.city},{' '}
                    {brewery.state}, {brewery.postal_code}, {brewery.country}
                </p>
                <p>
                    <strong>Phone:</strong> {brewery.phone}
                </p>
                <p>
                    <strong>Website: </strong>
                    <a
                        href={brewery.website_url || ''}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {brewery.website_url}
                    </a>
                </p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">Map</h2>
                <Suspense fallback={<p>Loading Map...</p>}>
                    <BreweryMap
                        latitude={brewery.latitude}
                        longitude={brewery.longitude}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default BreweryDetails;
