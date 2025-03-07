import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import BreweryFilter from './BreweryFilter';

describe('BreweryFilter', () => {
    const onFilter = jest.fn();

    it('should render the filter component', () => {
        render(<BreweryFilter onFilter={onFilter} />);
        expect(screen.getByText('Filter Breweries')).toBeInTheDocument();
        expect(screen.getByLabelText('Name:')).toBeInTheDocument();
        expect(screen.getByLabelText('City:')).toBeInTheDocument();
        expect(screen.getByText('Go')).toBeInTheDocument();
    });

    it('should call onFilter with the correct values when "Go" is clicked', () => {
        render(<BreweryFilter onFilter={onFilter} />);

        fireEvent.change(screen.getByLabelText('Name:'), {
            target: { value: 'Test Name' }
        });
        fireEvent.change(screen.getByLabelText('City:'), {
            target: { value: 'Test City' }
        });
        fireEvent.click(screen.getByText('Go'));

        expect(onFilter).toHaveBeenCalledWith('Test Name', 'Test City');
    });

    it('should handle empty filter values', () => {
        render(<BreweryFilter onFilter={onFilter} />);

        fireEvent.click(screen.getByText('Go'));

        expect(onFilter).toHaveBeenCalledWith('', '');
    });
});
