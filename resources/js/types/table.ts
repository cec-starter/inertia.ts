import { ReactNode } from "react";

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => ReactNode;
    className?: string;
}

export interface Filter {
    key: string;
    label: string;
    options: {
        label: string;
        value: string | number;
    }[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    filters?: Filter[];
    fetchUrl: string;
    searchPlaceholder?: string;
    defaultSort?: {
        key: string;
        direction: "asc" | "desc";
    };
    defaultLimit?: number;
    pageSizeOptions?: number[];
    children?: (row: T) => ReactNode;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    topContent?: ReactNode;
    allowManualPagination?: boolean;
    maxVisiblePages?: number;
    selectable?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
    dataPath?: string;
}
