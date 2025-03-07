import BreweryDetails from '@/components/BreweryDetails';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brewery'
};

export default function BreweryDetailPage() {
    return <BreweryDetails />;
}
