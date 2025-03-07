import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
    const onPageChange = jest.fn();

    it('should render the pagination component', () => {
        render(
            <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should call onPageChange with the correct page number', () => {
        render(
            <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        fireEvent.click(screen.getByText('5'));
        expect(onPageChange).toHaveBeenCalledWith(5);
    });

    it('should disable the "Previous" button on the first page', () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('Previous')).toBeDisabled();
    });

    it('should disable the "Next" button on the last page', () => {
        render(
            <Pagination
                currentPage={10}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('Next')).toBeDisabled();
    });

    it('should highlight the current page', () => {
        render(
            <Pagination
                currentPage={5}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('5')).toHaveClass('bg-gray-300');
    });

    it('should display the correct page range when in the middle', () => {
        render(
            <Pagination
                currentPage={5}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('should display the correct page range when near the beginning', () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should display the correct page range when near the end', () => {
        render(
            <Pagination
                currentPage={10}
                totalPages={10}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('9')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should handle small total pages correctly', () => {
        render(
            <Pagination
                currentPage={2}
                totalPages={3}
                onPageChange={onPageChange}
            />
        );
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });
});
