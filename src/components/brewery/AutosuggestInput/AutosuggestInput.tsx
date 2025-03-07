'use client';

import { useBrewerySuggestions } from '@/hooks/useBrewerySuggestions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Suggestion {
    id: string;
    name: string;
}

/**
 * an autosuggest input component for searching breweries
 *
 * @returns {JSX.Element} The rendered AutosuggestInput component
 */
const AutosuggestInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const router = useRouter();

    const { suggestions, loading } = useBrewerySuggestions({
        query: inputValue
    });

    /**
     * handles changes to the input value
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e the input change event
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setShowSuggestions(true);
    };

    /**
     * handles clicks on a suggestion
     *
     * @param {{ id: string; name: string }} suggestion the selected suggestion
     */
    const handleSuggestionClick = (suggestion: Suggestion) => {
        setInputValue(suggestion.name);
        setShowSuggestions(false);
        router.push(`/brewery/${suggestion.id}`);
    };

    return (
        <div className="max-w-screen-lg mx-auto bg-white p-2 rounded-2xl shadow-sm w-full text-black">
            <input
                type="text"
                placeholder="Search breweries..."
                value={inputValue}
                onChange={handleInputChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200 border-none"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="mt-2 bg-white rounded-2xl shadow-md">
                    {suggestions.map(suggestion => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-3 hover:bg-gray-100 cursor-pointer rounded-2xl"
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
            {loading && showSuggestions && <p>Loading...</p>}
        </div>
    );
};

export default AutosuggestInput;
