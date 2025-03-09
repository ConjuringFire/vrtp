'use client';

import { Brewery } from '@/types/breweries.types';
import { useEffect, useState } from 'react';

interface UseBreweryDetailsProps {
    id: string;
}

export const useBreweryDetails = (props: UseBreweryDetailsProps) => {
    const { id } = props;

    const [brewery, setBrewery] = useState<Brewery | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBreweryDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.openbrewerydb.org/v1/breweries/${id}`
                );

                if (response.ok) {
                    const data: Brewery = await response.json();
                    setBrewery(data);
                } else {
                    throw new Error('Failed to fetch brewery details');
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBreweryDetails();
        } else {
            setLoading(false);
            setError('Brewery ID is missing');
        }
    }, [id]);

    return { brewery, error, loading };
};
