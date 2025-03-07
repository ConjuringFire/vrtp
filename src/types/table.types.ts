export interface TableProps<T> {
    data: T[];
    columns: ColumnProps<T>[];
    classes?: string;
}

export interface ColumnProps<T> {
    header: string;
    accessor: keyof T;
    isLink?: boolean;
    linkAccessor?: keyof T;
}
