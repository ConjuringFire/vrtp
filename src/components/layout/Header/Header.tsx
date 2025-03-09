import { leagueSpartan } from '@/app/fonts';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-white p-4 drop-shadow-md">
            <h1
                className={`${leagueSpartan.className} text-3xl font-bold text-black`}
            >
                <Link href={`/`}>The Ale Trail</Link>
            </h1>
        </header>
    );
};

export default Header;
