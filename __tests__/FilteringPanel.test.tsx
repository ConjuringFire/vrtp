import '@testing-library/jest-dom';
import FilteringPanel from '@/components/FilteringPanel';
import { fireEvent, render } from '@testing-library/react';

const onFilterFunction = jest.fn();

describe('FilteringPanel', () => {
    it('should render input fields and button', () => {
        const { getByPlaceholderText, getByRole } = render(
            <FilteringPanel onFilter={onFilterFunction} />
        );

        expect(getByPlaceholderText('Filter by Name')).toBeInTheDocument();
        expect(getByPlaceholderText('Filter by City')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Go' })).toBeInTheDocument();
    });

    it('should call onFilter with correct values when button is clicked', () => {
        const onFilterMock = jest.fn();
        const { getByPlaceholderText, getByRole } = render(
            <FilteringPanel onFilter={onFilterMock} />
        );

        const nameInput = getByPlaceholderText('Filter by Name');
        const cityInput = getByPlaceholderText('Filter by City');
        const goButton = getByRole('button', { name: 'Go' });

        fireEvent.change(nameInput, { target: { value: 'Test Name' } });
        fireEvent.change(cityInput, { target: { value: 'Test City' } });
        fireEvent.click(goButton);

        expect(onFilterMock).toHaveBeenCalledWith('Test Name', 'Test City');
    });

    it('should update input values when changed', () => {
        const { getByPlaceholderText } = render(
            <FilteringPanel onFilter={jest.fn()} />
        );

        const nameInput = getByPlaceholderText('Filter by Name');
        const cityInput = getByPlaceholderText('Filter by City');

        fireEvent.change(nameInput, { target: { value: 'New Name' } });
        fireEvent.change(cityInput, { target: { value: 'New City' } });

        expect(nameInput).toHaveValue('New Name');
        expect(cityInput).toHaveValue('New City');
    });
});
