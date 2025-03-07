import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import BreweriesTable from './BreweriesTable';
import { mockBreweries } from '@/fixtures/breweries.fixtures';
import { Brewery } from '@/types/breweries.types';
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

// mock the Table component to isolate BreweriesTable
jest.mock('@/components/common/Table', () => ({
    __esModule: true,
    default: ({
        data,
        columns
    }: {
        data: Brewery[];
        columns: ColumnProps<Brewery>[];
    }) => (
        <div data-testid="mock-table">
            {data.length > 0 &&
                data.map((item, index) => (
                    <div key={index} data-testid={`brewery-${index}`}>
                        {columns.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                data-testid={`brewery-${index}-${column.accessor}`}
                            >
                                {column.isLink && column.linkAccessor ? (
                                    <a
                                        data-testid={`link-/brewery/${item[column.linkAccessor]}`}
                                    >
                                        {item[column.accessor]}
                                    </a>
                                ) : column.accessor === 'website_url' &&
                                  item[column.accessor] ? (
                                    <a
                                        href={item[column.accessor]?.toString()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item[column.accessor]}
                                    </a>
                                ) : (
                                    item[column.accessor]
                                )}
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    )
}));

const setup = (breweries: Brewery[]) => {
    render(<BreweriesTable breweries={breweries} />);
};

describe('BreweriesTable', () => {
    it('should render the BreweriesTable with brewery data', () => {
        // render the BreweriesTable component with sample data
        setup(mockBreweries);

        // check that the mock table is loaded
        expect(screen.getByTestId('mock-table')).toBeInTheDocument();

        // check that the brewery data is rendered within the mock Table
        mockBreweries.forEach((brewery, index) => {
            expect(
                screen.getByTestId(`brewery-${index}-name`)
            ).toHaveTextContent(brewery.name);
            expect(
                screen.getByTestId(`brewery-${index}-brewery_type`)
            ).toHaveTextContent(brewery.brewery_type);
            expect(
                screen.getByTestId(`brewery-${index}-city`)
            ).toHaveTextContent(brewery.city);
            expect(
                screen.getByTestId(`brewery-${index}-country`)
            ).toHaveTextContent(brewery.country);
            expect(
                screen.getByTestId(`brewery-${index}-website_url`)
            ).toHaveTextContent(brewery.website_url || 'http://test1.com');
            expect(
                screen.getByTestId(`brewery-${index}-phone`)
            ).toHaveTextContent(brewery.phone || '123-456-7890');
            expect(
                screen.getByTestId(`link-/brewery/${brewery.id}`)
            ).toBeInTheDocument();
        });
    });

    it('should render an empty table when no breweries are provided', () => {
        // render the BreweriesTable component with an empty array
        setup([]);

        // check that the mock Table component is rendered
        expect(screen.getByTestId('mock-table')).toBeInTheDocument();

        // check that no brewery data is rendered
        expect(screen.queryByTestId('brewery-0')).not.toBeInTheDocument();
    });
});
