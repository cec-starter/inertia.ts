import { DataTableProps } from "@/types/table";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Checkbox,
} from "./ui";
import { TableFilters } from "./data-table/filters";
import { TablePagination } from "./data-table/pagination";
import { IconArrowDown, IconArrowUp } from "justd-icons";
import { useDataTable } from "@/hooks/use-datatable";

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
    const {
        data,
        loading,
        params,
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
    } = useDataTable<T>({
        fetchUrl,
        defaultSort,
        defaultLimit,
        filters,
        dataPath,
    });

    return (
        <div className={cn("space-y-4", className)}>
            {/* Filters Section */}
            <TableFilters
                filters={filters}
                params={params}
                searchPlaceholder={searchPlaceholder}
                onSearch={debouncedSearch}
                onSingleFilter={handleSingleFilter}
                onMultiFilter={handleMultiFilter}
                onClearFilters={handleClearFilters}
                topContent={topContent}
            />

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
                                                onCheckedChange={(
                                                    checked: boolean
                                                ) => {
                                                    const newSelection =
                                                        handleSelectAll(
                                                            checked
                                                        );
                                                    onSelectionChange?.(
                                                        newSelection
                                                    );
                                                }}
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
                                                    onCheckedChange={(
                                                        checked: boolean
                                                    ) => {
                                                        const newSelection =
                                                            handleSelectRow(
                                                                row
                                                            );
                                                        onSelectionChange?.(
                                                            newSelection
                                                        );
                                                    }}
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
                    {data && (
                        <TablePagination
                            data={data}
                            pageSizeOptions={pageSizeOptions}
                            params={params}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}
