import { TableProps } from '@/types/table.types';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const Table = <T extends object>({ data, columns, classes }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table
                className={`min-w-full divide-y divide-gray-200 w-full ${classes}`}
            >
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
                                            className="text-blue-600 hover:underline active:bg-blue-100 flex items-center"
                                        >
                                            {row[column.accessor]?.toString()}
                                            <ArrowRightIcon className="w-4 h-4 ml-1 block md:hidden" />
                                        </Link>
                                    ) : column.accessor === 'website_url' &&
                                      row[column.accessor] ? (
                                        <a
                                            href={row[
                                                column.accessor
                                            ]?.toString()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline active:bg-blue-100 flex items-center"
                                        >
                                            {row[column.accessor]?.toString()}
                                            <ArrowRightIcon className="w-4 h-4 ml-1 block md:hidden" />
                                        </a>
                                    ) : (
                                        <span className="flex items-center">
                                            {row[column.accessor]?.toString()}
                                        </span>
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
