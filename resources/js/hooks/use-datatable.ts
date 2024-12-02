import {
    FilterParams,
    PaginatedData,
    UseDataTableProps,
    UseDataTableReturn,
} from "@/types/table";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import lodash from "lodash";
import { router } from "@inertiajs/react";
const { debounce } = lodash;

export function useDataTable<T extends Record<string, any>>({
    fetchUrl,
    defaultSort,
    defaultLimit = 10,
    filters = [],
    dataPath,
}: UseDataTableProps<T>): UseDataTableReturn<T> {
    const [data, setData] = useState<PaginatedData<T> | null>(null);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState<FilterParams>({
        search: "",
        sort: defaultSort?.key || "",
        direction: defaultSort?.direction || "desc",
        limit: defaultLimit,
        page: 1,
        ...filters.reduce((acc, filter) => ({ ...acc, [filter.key]: "" }), {}),
    });
    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setParams((prev) => ({ ...prev, search: value, page: 1 }));
        }, 300),
        []
    );

    // Fetch data
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(fetchUrl, { params });
            const responseData = dataPath
                ? response.data[dataPath]
                : response.data;
            setData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    // Sort handler
    const handleSort = (key: string) => {
        setParams((prev) => ({
            ...prev,
            sort: key,
            direction:
                prev.sort === key && prev.direction === "asc" ? "desc" : "asc",
            page: 1,
        }));
    };

    // Filter handlers
    const handleSingleFilter = (key: string, value: string) => {
        setParams((prev) => ({
            ...prev,
            [key]: value === "all" ? "" : value,
            page: 1,
        }));
    };

    const handleMultiFilter = (key: string, values: string[]) => {
        setParams((prev) => ({ ...prev, [key]: values.join(","), page: 1 }));
    };

    const handleClearFilters = useCallback(() => {
        setParams((prev) => ({
            ...prev,
            ...filters.reduce(
                (acc, filter) => ({ ...acc, [filter.key]: "" }),
                {}
            ),
            page: 1,
        }));
    }, [filters]);

    // Pagination handlers
    const handlePageSizeChange = (value: string) => {
        setParams((prev) => ({ ...prev, limit: Number(value), page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    // Selection handlers
    const handleSelectAll = (checked: boolean) => {
        const allRows = data?.data ?? [];
        setSelectedRows(checked ? allRows : []);
        return checked ? allRows : [];
    };

    const handleSelectRow = (row: T) => {
        const isSelected = selectedRows.some(
            (selectedRow) => selectedRow.id === row.id
        );
        let newSelectedRows: T[];

        if (isSelected) {
            newSelectedRows = selectedRows.filter(
                (selectedRow) => selectedRow.id !== row.id
            );
        } else {
            newSelectedRows = [...selectedRows, row];
        }

        setSelectedRows(newSelectedRows);
        return newSelectedRows;
    };

    const isRowSelected = (row: T) =>
        selectedRows.some((selectedRow) => selectedRow.id === row.id);
    const isAllSelected = Boolean(
        data?.data &&
            data.data.length > 0 &&
            selectedRows.length === data.data.length
    );

    return {
        data,
        loading,
        params,
        selectedRows,
        debouncedSearch,
        handleSort,
        handleSingleFilter,
        handleMultiFilter,
        handleClearFilters,
        handlePageSizeChange,
        handlePageChange,
        handleSelectAll,
        handleSelectRow,
        isRowSelected,
        isAllSelected,
    };
}
