'use client';

import { Suggestion } from '@/types/suggestions.types';
import { useEffect, useRef, useState } from 'react';

interface UseBrewerySuggestionsProps {
    query: string;
    delay?: number;
}

/**
 * custom hook for fetching brewery suggestions with debouncing.
 *
 * @param {AutosuggestInputProps} props the props for the AutosuggestInput component
 * @returns {object} an object containing suggestions and loading state
 */
export const useBrewerySuggestions = (props: UseBrewerySuggestionsProps) => {
    const { query, delay = 300 } = props;

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (query) {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(async () => {
                setLoading(true);

                try {
                    const response = await fetch(
                        `https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${query}`
                    );

                    if (response.ok) {
                        const data: Suggestion[] = await response.json();
                        setSuggestions(data);
                    } else {
                        setSuggestions([]);
                    }
                } catch (error: any) {
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            }, delay);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [query, delay]);

    return { suggestions, loading };
};
