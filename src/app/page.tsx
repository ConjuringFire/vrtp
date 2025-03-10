'use client';

import AutosuggestInput from '@/components/brewery/AutosuggestInput';
import BreweriesTable from '@/components/brewery/BreweriesTable';
import { Suspense } from 'react';

export default function Home() {
    return (
        <div className="bg-linear-to-bl from-[#FF3A63] to-[#D72389]">
            <div className="max-w-screen-lg mx-auto p-8 md:p-24 w-full drop-shadow-xl text-black">
                <h1
                    className={`text-6xl font-bold text-center hidden md:block`}
                >
                    Welcome to the Ale Trail
                </h1>
                <h2 className={`text-3xl font-bold text-center mb-4 md:mb-24`}>
                    Search for local Breweries
                </h2>
                <AutosuggestInput />
            </div>
            <Suspense>
                <BreweriesTable />
            </Suspense>
        </div>
    );
}
