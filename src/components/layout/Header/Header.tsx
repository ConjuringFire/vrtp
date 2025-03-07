import { leagueSpartan } from '@/app/fonts';

const Header: React.FC = () => {
    return (
        <header className="bg-white p-4 drop-shadow-md">
            <h1
                className={`${leagueSpartan.className} text-3xl font-bold text-black`}
            >
                Ale Trail
            </h1>
        </header>
    );
};

export default Header;
