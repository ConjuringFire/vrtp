import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Header from './Header';

const setup = () => {
    render(<Header />);
};

describe('Header', () => {
    it('should render the header with title', () => {
        setup();

        expect(screen.getByText('The Ale Trail')).toBeInTheDocument();
    });
});
