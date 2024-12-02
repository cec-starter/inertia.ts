import { ReactNode } from "react";

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => ReactNode;
    className?: string;
}

export interface FilterOption {
    label: string;
    value: string | number;
}

export interface Filter {
    key: string;
    label: string;
    multiple?: boolean;
    options: FilterOption[];
}

export interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}

export interface FilterParams extends Record<string, string | number> {
    search: string;
    sort: string;
    direction: "asc" | "desc";
    limit: number;
    page: number;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface UseDataTableProps<T> {
    fetchUrl: string;
    defaultSort?: SortConfig;
    defaultLimit?: number;
    filters?: Filter[];
    dataPath?: string;
}

export interface UseDataTableReturn<T> {
    data: PaginatedData<T> | null;
    loading: boolean;
    params: FilterParams;
    selectedRows: T[];
    debouncedSearch: (value: string) => void;
    handleSort: (key: string) => void;
    handleSingleFilter: (key: string, value: string) => void;
    handleMultiFilter: (key: string, values: string[]) => void;
    handleClearFilters: () => void;
    handlePageSizeChange: (value: string) => void;
    handlePageChange: (page: number) => void;
    handleSelectAll: (checked: boolean) => T[];
    handleSelectRow: (row: T) => T[];
    isRowSelected: (row: T) => boolean;
    isAllSelected: boolean;
}

export interface TableFiltersProps {
    filters: Filter[];
    params: FilterParams;
    searchPlaceholder?: string;
    onSearch: (value: string) => void;
    onSingleFilter: (key: string, value: string) => void;
    onMultiFilter: (key: string, values: string[]) => void;
    onClearFilters: () => void;
    topContent?: ReactNode;
}

export interface TablePaginationProps<T> {
    data: PaginatedData<T>;
    pageSizeOptions: number[];
    params: {
        limit: number;
    };
    onPageChange: (page: number) => void;
    onPageSizeChange: (value: string) => void;
}

export interface DataTableProps<T extends Record<string, any>> {
    columns: Column<T>[];
    filters?: Filter[];
    fetchUrl: string;
    searchPlaceholder?: string;
    defaultSort?: SortConfig;
    defaultLimit?: number;
    pageSizeOptions?: number[];
    children?: (row: T) => ReactNode;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    topContent?: ReactNode;
    selectable?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
    dataPath?: string;
}
