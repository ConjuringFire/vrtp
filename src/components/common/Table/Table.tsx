import { TableProps } from '@/types/table.types';
import Link from 'next/link';

const Table = <T extends {}>({ data, columns }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 w-full">
                <thead>
                    <tr className="hidden sm:table-row">
                        {columns.map(column => (
                            <th
                                key={column.header}
                                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-50 block sm:table-row"
                        >
                            {columns.map(column => (
                                <td
                                    key={`${index}-${column.accessor.toString()}`}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block sm:table-cell"
                                >
                                    <span className="font-semibold sm:hidden">
                                        {column.header}:
                                    </span>
                                    {column.isLink && column.linkAccessor ? (
                                        <Link
                                            href={`/brewery/${row[column.linkAccessor]}`}
                                        >
                                            {row[column.accessor]?.toString()}
                                        </Link>
                                    ) : column.accessor === 'website_url' &&
                                      row[column.accessor] ? (
                                        <a
                                            href={row[
                                                column.accessor
                                            ]?.toString()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {row[column.accessor]?.toString()}
                                        </a>
                                    ) : (
                                        row[column.accessor]?.toString()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
