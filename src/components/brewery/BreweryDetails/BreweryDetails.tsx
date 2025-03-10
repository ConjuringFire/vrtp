'use client';

import { useBreweryDetails } from '@/hooks/useBreweryDetails';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import BreweryMap from '../MapComponent';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import BreweryDetailsSkeleton from '@/components/brewery/Skeleton/BreweryDetailsSkeleton';

/**
 * a brewery details component for displaying deails about a specific brewery
 *
 * @returns {JSX.Element} the rendered BreweryDetails component
 */
const BreweryDetails = () => {
    const { id } = useParams();
    const { brewery, error, loading } = useBreweryDetails({ id: id as string });

    // display error message if fetching brewery details failed
    if (error) {
        return <p>Error: {error}</p>;
    }

    // display error message if brewery is not found
    if (!brewery) {
        if (loading) {
            return <BreweryDetailsSkeleton />;
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
                <p className="py-2">
                    <strong>Type:</strong>{' '}
                    <span className="flex md:inline">
                        {brewery.brewery_type}
                    </span>
                </p>
                <p className="py-2">
                    <strong>Address:</strong>{' '}
                    <span className="flex md:inline">
                        {brewery.street}, {brewery.city}, {brewery.state},{' '}
                        {brewery.postal_code}, {brewery.country}
                    </span>
                </p>
                <p className="py-2">
                    <strong>Phone:</strong>{' '}
                    <span className="flex md:inline">{brewery.phone}</span>
                </p>
                <p className="py-2">
                    <strong>Website: </strong>
                    <a
                        href={brewery.website_url || ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline active:bg-blue-100"
                    >
                        <span className="flex md:inline items-center">
                            {brewery.website_url}
                            <ArrowRightIcon className="w-4 h-4 ml-1 block md:hidden" />
                        </span>
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
