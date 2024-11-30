import { DataTableProps, PaginatedData } from "@/types/table";
import axios from "axios";
import {
    IconArrowDown,
    IconArrowLeft,
    IconArrowRight,
    IconArrowUp,
    IconSearch,
} from "justd-icons";
import lodash from "lodash";
const { debounce } = lodash;
import React, { useCallback } from "react";
import {
    Button,
    Input,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    TableHeader,
} from "./ui";
import { cn } from "@/lib/utils";

export function DataTable<T extends Record<string, any>>({
    columns,
    filters = [],
    fetchUrl,
    searchPlaceholder = "Search...",
    defaultSort,
    defaultLimit = 10,
    pageSizeOptions = [10, 25, 50, 100],
    children, // Action slot
    className,
    headerClassName,
    bodyClassName,
    topContent,
    selectable = false,
    onSelectionChange,
    dataPath,
}: DataTableProps<T>) {
    const [data, setData] = React.useState<PaginatedData<T> | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [showPaginationInput, setShowPaginationInput] = React.useState(false);
    const [paginationInput, setPaginationInput] = React.useState<string>("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [params, setParams] = React.useState({
        search: "",
        sort: defaultSort?.key || "",
        direction: defaultSort?.direction || "desc",
        limit: defaultLimit,
        page: 1,
        ...filters.reduce((acc, filter) => ({ ...acc, [filter.key]: "" }), {}),
    });
    const [selectedRows, setSelectedRows] = React.useState<T[]>([]);

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
            // setLoading(true);
            const response = await axios.get(fetchUrl, { params });
            const responseData = dataPath
                ? response.data[dataPath]
                : response.data;

            setData(responseData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            // setLoading(false);
        }
    };

    React.useEffect(() => {
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

    // Filter handler
    const handleFilter = (key: string, value: string) => {
        setParams((prev) => ({ ...prev, [key]: value, page: 1 }));
    };

    // Page size handler
    const handlePageSizeChange = (value: string) => {
        setParams((prev) => ({ ...prev, limit: Number(value), page: 1 }));
    };

    // Pagination handler
    const handlePageChange = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    // Handler for pagination input
    const handlePaginationInput = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            const page = parseInt(paginationInput);
            if (!isNaN(page) && page >= 1 && page <= data!.last_page) {
                handlePageChange(page);
                setShowPaginationInput(false);
            }
        } else if (e.key === "Escape") {
            setShowPaginationInput(false);
        }
    };

    // Selection handlers
    const handleSelectAll = (checked: boolean) => {
        const allRows = data?.data ?? [];
        setSelectedRows(checked ? allRows : []);
        onSelectionChange?.(checked ? allRows : []);
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
        onSelectionChange?.(newSelectedRows);
    };

    const isRowSelected = (row: T) =>
        selectedRows.some((selectedRow) => selectedRow.id === row.id);
    const isAllSelected =
        data?.data &&
        data.data.length > 0 &&
        selectedRows.length === data.data.length;

    const renderPagination = () => {
        if (!data) return null;

        const { current_page, last_page } = data;
        const maxVisiblePages = 5;
        const pages: (number | "ellipsis")[] = [];

        if (last_page <= maxVisiblePages) {
            // If total pages are less than or equal to maxVisiblePages, show all pages
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate the range of pages to show around current page
            const leftBound = Math.max(2, current_page - 1);
            const rightBound = Math.min(last_page - 1, current_page + 1);

            // Add ellipsis only once based on current page position
            if (current_page <= 3) {
                // We're near the start, show more pages at the beginning
                for (let i = 2; i <= 4; i++) {
                    if (i <= last_page - 1) pages.push(i);
                }
                if (last_page > 5) pages.push("ellipsis");
            } else if (current_page >= last_page - 2) {
                // We're near the end, show more pages at the end
                if (last_page > 5) pages.push("ellipsis");
                for (let i = last_page - 3; i <= last_page - 1; i++) {
                    if (i >= 2) pages.push(i);
                }
            } else {
                // We're in the middle, show ellipsis and pages around current
                pages.push("ellipsis");
                for (let i = leftBound; i <= rightBound; i++) {
                    pages.push(i);
                }
            }

            // Always show last page
            if (last_page > 1) {
                pages.push(last_page);
            }
        }

        return (
            <div className="mt-4">
                <div className="flex flex-col gap-4 justify-between lg:flex-row">
                    {/* Left: Showing results text */}
                    <div className="flex items-center text-sm text-muted-foreground">
                        Showing {(data.current_page - 1) * data.per_page + 1} to{" "}
                        {Math.min(
                            data.current_page * data.per_page,
                            data.total
                        )}{" "}
                        of {data.total} results
                    </div>

                    {/* Right: Pagination controls */}
                    <div className="flex flex-col gap-6 lg:items-center lg:justify-end lg:flex-row">
                        {/* Page Size */}
                        <div className="flex gap-2 items-center">
                            <span className="text-sm whitespace-nowrap text-muted-foreground">
                                Rows per page
                            </span>
                            <Select
                                value={params.limit.toString()}
                                onValueChange={handlePageSizeChange}
                            >
                                <SelectTrigger className="w-16 h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent align="center">
                                    {pageSizeOptions.map((size) => (
                                        <SelectItem
                                            key={size}
                                            value={size.toString()}
                                        >
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Current Page Text */}
                        <div className="flex overflow-hidden overflow-x-auto flex-col gap-3 justify-between items-start md:items-center md:flex-row">
                            <span className="text-sm whitespace-nowrap text-muted-foreground">
                                Page {data.current_page} of {data.last_page}
                            </span>

                            {/* Navigation */}
                            <div className="flex items-end">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handlePageChange(
                                                        current_page - 1
                                                    )
                                                }
                                                disabled={current_page === 1}
                                                className="w-8 h-8 cursor-pointer"
                                            >
                                                <IconArrowLeft className="w-4 h-4" />
                                            </Button>
                                        </PaginationItem>

                                        {/* Page Numbers */}
                                        {pages.map((page, index) => (
                                            <PaginationItem key={index}>
                                                {page === "ellipsis" ? (
                                                    showPaginationInput ? (
                                                        <div className="relative w-12">
                                                            <Input
                                                                ref={inputRef}
                                                                type="number"
                                                                min={1}
                                                                max={
                                                                    data!
                                                                        .last_page
                                                                }
                                                                value={
                                                                    paginationInput
                                                                }
                                                                onChange={(e) =>
                                                                    setPaginationInput(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                onKeyDown={
                                                                    handlePaginationInput
                                                                }
                                                                onBlur={() =>
                                                                    setShowPaginationInput(
                                                                        false
                                                                    )
                                                                }
                                                                className="px-2 w-12 h-8 text-center"
                                                                autoFocus
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            variant="ghost"
                                                            className="p-0 w-8 h-8 cursor-pointer"
                                                            onClick={() => {
                                                                setShowPaginationInput(
                                                                    true
                                                                );
                                                                setPaginationInput(
                                                                    ""
                                                                );
                                                                // Set timeout to allow state update before focusing
                                                                setTimeout(
                                                                    () => {
                                                                        inputRef.current?.focus();
                                                                    },
                                                                    0
                                                                );
                                                            }}
                                                        >
                                                            <PaginationEllipsis />
                                                        </Button>
                                                    )
                                                ) : (
                                                    <PaginationLink
                                                        onClick={() =>
                                                            handlePageChange(
                                                                page
                                                            )
                                                        }
                                                        isActive={
                                                            page ===
                                                            current_page
                                                        }
                                                        className="p-0 h-8 min-w-8"
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handlePageChange(
                                                        current_page + 1
                                                    )
                                                }
                                                disabled={
                                                    current_page === last_page
                                                }
                                                className="w-8 h-8"
                                            >
                                                <IconArrowRight className="w-4 h-4" />
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Filters Section */}
            <div className="flex flex-col gap-4 justify-between md:flex-row">
                {/* Search Input */}
                <div className="flex gap-2 items-center">
                    <div className="relative justify-start w-60">
                        <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    {/* Filters */}
                    {filters.map((filter) => (
                        <div key={filter.key} className="flex items-center">
                            <Select
                                key={filter.key}
                                onValueChange={(value) =>
                                    handleFilter(filter.key, value)
                                }
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder={filter.label} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All {filter.label}s
                                    </SelectItem>
                                    {filter.options.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value.toString()}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}
                </div>

                {/* Top Actions Slot */}
                {topContent && (
                    <div className="flex overflow-hidden gap-2 items-center">
                        {topContent}
                    </div>
                )}
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center items-center h-24">
                    Loading...
                </div>
            ) : data?.data.length === 0 ? (
                <div className="flex justify-center items-center h-24">
                    No results.
                </div>
            ) : (
                <>
                    <Table className="data-table">
                        <TableHeader className={headerClassName}>
                            <TableRow>
                                {selectable && (
                                    <TableHead>
                                        <div className="flex items-center w-6 md:w-auto">
                                            <Checkbox
                                                checked={isAllSelected}
                                                onCheckedChange={
                                                    handleSelectAll
                                                }
                                                aria-label="Select all"
                                            />
                                        </div>
                                    </TableHead>
                                )}
                                {columns.map((column) => (
                                    <TableHead key={column.key.toString()}>
                                        <div
                                            className={cn(
                                                column.className,
                                                "w-40 md:w-auto"
                                            )}
                                        >
                                            {column.sortable ? (
                                                <button
                                                    className="flex gap-1 items-center cursor-pointer hover:text-primary"
                                                    onClick={() =>
                                                        handleSort(
                                                            column.key.toString()
                                                        )
                                                    }
                                                >
                                                    {column.label}
                                                    {column.key ===
                                                        params.sort && (
                                                        <span>
                                                            {params.direction ===
                                                            "asc" ? (
                                                                <IconArrowUp className="size-4" />
                                                            ) : (
                                                                <IconArrowDown className="size-4" />
                                                            )}
                                                        </span>
                                                    )}
                                                </button>
                                            ) : (
                                                column.label
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                                {children && <TableHead>Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody className={bodyClassName}>
                            {data?.data.map((row, index) => (
                                <TableRow key={row.id || index}>
                                    {selectable && (
                                        <TableCell className="px-2">
                                            <div className="flex items-center w-6 md:w-auto">
                                                <Checkbox
                                                    checked={isRowSelected(row)}
                                                    onCheckedChange={() =>
                                                        handleSelectRow(row)
                                                    }
                                                    aria-label={`Select row ${
                                                        index + 1
                                                    }`}
                                                />
                                            </div>
                                        </TableCell>
                                    )}
                                    {columns.map((column) => (
                                        <TableCell key={column.key.toString()}>
                                            {column.render
                                                ? column.render(row)
                                                : row[column.key as keyof T]}
                                        </TableCell>
                                    ))}
                                    {children && (
                                        <TableCell
                                            className="text-center"
                                            data-action-cell="true"
                                        >
                                            {children(row)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {renderPagination()}
                </>
            )}
        </div>
    );
}
