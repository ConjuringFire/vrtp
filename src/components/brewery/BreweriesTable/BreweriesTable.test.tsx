import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BreweriesTable from './BreweriesTable';
import { useFetchBreweries } from '@/hooks/useFetchBreweries';
import { mockBreweries } from '@/fixtures/breweries.fixtures';

// mock the useFetchBreweries hook
jest.mock('@/hooks/useFetchBreweries');

// mock the BreweryFilter and Pagination components
jest.mock('@/components/brewery/BreweryFilter', () => ({
    __esModule: true,
    default: ({ onFilter }: any) => (
        <div data-testid="brewery-filter">
            <input
                type="text"
                data-testid="name-filter"
                onChange={e => onFilter(e.target.value, '')}
            />
            <input
                type="text"
                data-testid="city-filter"
                onChange={e => onFilter('', e.target.value)}
            />
        </div>
    )
}));

jest.mock('@/components/common/Pagination', () => ({
    __esModule: true,
    default: ({ currentPage, totalPages, onPageChange }: any) => (
        <div data-testid="pagination">
            <button
                data-testid="prev-page"
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>
            <span>{currentPage}</span>
            <button
                data-testid="next-page"
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
            <span>Total Pages: {totalPages}</span>
        </div>
    )
}));

describe('BreweriesTable', () => {
    it('renders loading state', () => {
        (useFetchBreweries as jest.Mock).mockReturnValue({
            breweries: [],
            loading: true,
            error: null,
            totalPages: 1
        });

        render(<BreweriesTable />);
        expect(
            screen.getByTestId('BreweriesTableSkeleton')
        ).toBeInTheDocument();
    });

    it('renders error state', () => {
        (useFetchBreweries as jest.Mock).mockReturnValue({
            breweries: [],
            loading: false,
            error: 'Failed to fetch breweries',
            totalPages: 1
        });

        render(<BreweriesTable />);
        expect(
            screen.getByText('Error: Failed to fetch breweries')
        ).toBeInTheDocument();
    });

    it('renders breweries table', () => {
        (useFetchBreweries as jest.Mock).mockReturnValue({
            breweries: mockBreweries,
            loading: false,
            error: null,
            totalPages: 2
        });

        render(<BreweriesTable />);
        expect(screen.getByText('Test Brewery 1')).toBeInTheDocument();
        expect(screen.getByText('Test Brewery 2')).toBeInTheDocument();
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
        expect(screen.getByTestId('brewery-filter')).toBeInTheDocument();
    });

    it('filters breweries by name', async () => {
        (useFetchBreweries as jest.Mock).mockReturnValue({
            breweries: mockBreweries,
            loading: false,
            error: null,
            totalPages: 2
        });

        render(<BreweriesTable />);
        fireEvent.change(screen.getByTestId('name-filter'), {
            target: { value: 'Test Brewery 1' }
        });

        await waitFor(() => {
            expect(
                (useFetchBreweries as jest.Mock).mock.calls[1][0].nameFilter
            ).toBe('Test Brewery 1');
        });
    });

    it('filters breweries by city', async () => {
        (useFetchBreweries as jest.Mock).mockReturnValue({
            breweries: mockBreweries,
            loading: false,
            error: null,
            totalPages: 2
        });

        render(<BreweriesTable />);
        fireEvent.change(screen.getByTestId('city-filter'), {
            target: { value: 'Test City 2' }
        });

        await waitFor(() => {
            expect(
                (useFetchBreweries as jest.Mock).mock.calls[1][0].cityFilter
            ).toBe('Test City 2');
        });
    });

    it('handles page change', () => {
        (useFetchBreweries as jest.Mock).mockReturnValue({
            breweries: mockBreweries,
            loading: false,
            error: null,
            totalPages: 2
        });

        render(<BreweriesTable />);
        fireEvent.click(screen.getByTestId('next-page'));
        expect((useFetchBreweries as jest.Mock).mock.calls[1][0].page).toBe(2);
    });
});
