import { useFetchBreweries } from '@/hooks/useFetchBreweries';
import { renderHook, waitFor } from '@testing-library/react';
import {
    mockBreweries,
    mockMetaData
} from '../src/fixtures/breweries.fixtures';

// mock the global fetch function
global.fetch = jest.fn();

describe('useFetchBreweries', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should fetch breweries successfully', async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockBreweries
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockMetaData
            });

        const { result } = renderHook(() => useFetchBreweries({ page: 1 }));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.breweries).toEqual(mockBreweries);
        expect(result.current.totalPages).toBe(3);
        expect(result.current.error).toBeNull();
    });

    it('should handle brewery fetch errors', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        });

        const { result } = renderHook(() => useFetchBreweries({ page: 1 }));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe('Failed to fetch breweries');
    });

    it('should handle meta fetch errors', async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: '1' }]
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            });

        const { result } = renderHook(() => useFetchBreweries({ page: 1 }));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe('Failed to fetch brewery metadata');
    });

    it('should set loading state correctly', async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [{ id: '1' }]
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ total_pages: 1 })
            });

        const { result } = renderHook(() => useFetchBreweries({ page: 1 }));

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it('should apply name filter', async () => {
        const nameFilter = 'Test';
        const filteredBreweries = mockBreweries.filter(brewery =>
            brewery.name.includes(nameFilter)
        );

        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => filteredBreweries
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ total_pages: 1 })
            });

        const { result } = renderHook(() =>
            useFetchBreweries({ page: 1, nameFilter })
        );

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.breweries).toEqual(filteredBreweries);
    });

    it('should apply city filter', async () => {
        const cityFilter = 'Test City 2';
        const filteredBreweries = mockBreweries.filter(
            brewery => brewery.city === cityFilter
        );

        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => filteredBreweries
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ total_pages: 1 })
            });

        const { result } = renderHook(() =>
            useFetchBreweries({ page: 1, cityFilter })
        );

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.breweries).toEqual(filteredBreweries);
    });

    it('should apply name and city filter', async () => {
        const nameFilter = 'Test Brewery 2';
        const cityFilter = 'Test City 2';
        const filteredBreweries = mockBreweries.filter(
            brewery =>
                brewery.name === nameFilter && brewery.city === cityFilter
        );

        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => filteredBreweries
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ total_pages: 1 })
            });

        const { result } = renderHook(() =>
            useFetchBreweries({ page: 1, nameFilter, cityFilter })
        );

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.breweries).toEqual(filteredBreweries);
    });
});
