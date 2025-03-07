import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Table from './Table';
import { Brewery } from '@/types/breweries.types';
import { mockBreweries } from '@/fixtures/breweries.fixtures';
import { mockBreweryColumns } from '@/fixtures/table.fixtures';
import { ColumnProps } from '@/types/table.types';

// mock next/link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({
        children,
        href
    }: {
        children: React.ReactNode;
        href: string;
    }) => (
        <a data-testid={`link-${href}`} href={href}>
            {children}
        </a>
    )
}));

const setup = (data: Brewery[], columns: ColumnProps<Brewery>[]) => {
    render(<Table data={data} columns={columns} />);
};

describe('Table', () => {
    it('should render the table with data and columns', () => {
        setup(mockBreweries, mockBreweryColumns);

        // check that the brewery data is rendered within the mock Table for the first brewery
        expect(screen.getByText('Test Brewery 1')).toBeInTheDocument();
        expect(screen.getByText('micro')).toBeInTheDocument();
        expect(screen.getByText('Test City 1')).toBeInTheDocument();
        expect(screen.getByText('Test Country 1')).toBeInTheDocument();
        expect(screen.getByText('http://test1.com')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();

        // check that the brewery data is rendered within the mock Table for the second brewery
        expect(screen.getByText('Test Brewery 2')).toBeInTheDocument();
        expect(screen.getByText('regional')).toBeInTheDocument();
        expect(screen.getByText('Test City 2')).toBeInTheDocument();
        expect(screen.getByText('Test Country 2')).toBeInTheDocument();
        expect(screen.getByText('http://test2.com')).toBeInTheDocument();
        expect(screen.getByText('987-654-3210')).toBeInTheDocument();

        // check that all the column names are displayed
        expect(screen.getByText('Brewery Name')).toBeInTheDocument();
        expect(screen.getByText('Type')).toBeInTheDocument();
        expect(screen.getByText('City')).toBeInTheDocument();
        expect(screen.getByText('Country')).toBeInTheDocument();
        expect(screen.getByText('Website')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();

        // check that links are rendering correctly
        expect(screen.getByTestId('link-/brewery/1')).toBeInTheDocument();
        expect(screen.getByTestId('link-/brewery/2')).toBeInTheDocument();
    });

    it('should render empty table when data is empty', () => {
        setup([], mockBreweryColumns);

        expect(screen.queryByText('Brewery 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Brewery Name')).toBeInTheDocument();
    });
});
