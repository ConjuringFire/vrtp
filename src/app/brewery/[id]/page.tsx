import BreweryDetails from '@/components/brewery/BreweryDetails/BreweryDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brewery'
};

export default function BreweryDetailPage() {
    return (
        <div className="bg-linear-to-bl from-[#FF3A63] to-[#D72389]">
            <div className="max-w-screen-lg mx-auto w-full drop-shadow-xl">
                <BreweryDetails />
            </div>
        </div>
    );
}
