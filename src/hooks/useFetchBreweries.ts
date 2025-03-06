'use client';

import { Brewery } from '@/types/breweries.types';
import { useState, useEffect } from 'react';

const PAGE_SIZE = 15;

interface UseFetchBreweriesProps {
    page: number;
}

/**
 * custom hook to fetch paginated brewery data from the Open Brewery DB API
 *
 * @param props
 * @returns object an object containing breweries, error, loading state and total pages.
 */

export const useFetchBreweries = (props: UseFetchBreweriesProps) => {
    const { page } = props;

    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        async function fetchBreweries() {
            setLoading(true);
            setError(null);

            try {
                // construct URLs for brewery data and metadata
                const baseUrl = 'https://api.openbrewerydb.org/v1/breweries';
                const metaUrl = new URL(`${baseUrl}/meta`);

                // set query paramrters used for pagination
                const url = new URL(baseUrl);
                url.searchParams.set('page', page.toString());
                url.searchParams.set('per_page', PAGE_SIZE.toString());

                // use Promise.all to fetch brewery data and metadata concurrently
                const [breweryResponse, metaResponse] = await Promise.all([
                    fetch(url.toString()),
                    fetch(metaUrl.toString())
                ]);

                // check if brewery data fetch was successful
                if (!breweryResponse.ok) {
                    throw new Error('Failed to fetch breweries');
                }

                // check if metadata fetch was successful
                if (!metaResponse.ok) {
                    throw new Error('Failed to fetch brewery metadata');
                }

                // parse brewery data and metadata from the response
                const breweryData: Brewery[] = await breweryResponse.json();
                const metaData = await metaResponse.json();

                // calculate the total number of pages
                const totalPages = Math.round(metaData.total / PAGE_SIZE);

                // update state with fetched data
                setBreweries(breweryData);
                setTotalPages(totalPages);
            } catch (err: any) {
                // handle any errors during the fetch process
                setError(err.message);
            } finally {
                // set loading to false after fetch is complete
                setLoading(false);
            }
        }

        // fetch breweries when the page number changes
        fetchBreweries();
    }, [page]);

    // return the fetched data and state variables
    return { breweries, error, loading, totalPages };
};
