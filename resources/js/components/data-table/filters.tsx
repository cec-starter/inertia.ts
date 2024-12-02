import { IconSearch, IconChevronDown, IconChevronUp } from "justd-icons";
import { useState } from "react";
import {
    Button,
    Input,
    MultiSelect,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui";
import { TableFiltersProps } from "@/types/table";

export function TableFilters({
    filters,
    params,
    searchPlaceholder = "Search...",
    onSearch,
    onSingleFilter,
    onMultiFilter,
    onClearFilters,
    topContent,
}: TableFiltersProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {filters.length > 0 && (
                <>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-medium">Filters</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsVisible(!isVisible)}
                                className="px-2 h-8"
                            >
                                {isVisible ? (
                                    <IconChevronUp className="transition-transform duration-200 size-4" />
                                ) : (
                                    <IconChevronDown className="transition-transform duration-200 size-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div
                        className={`grid gap-4 transition-all duration-300 ease-in-out ${
                            isVisible
                                ? "opacity-100 grid-rows-[1fr]"
                                : "opacity-0 grid-rows-[0fr]"
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {filters.map((filter) => (
                                    <div
                                        key={filter.key}
                                        className="flex items-center w-full"
                                    >
                                        {filter.multiple ? (
                                            <MultiSelect
                                                options={filter.options.map(
                                                    (option) => ({
                                                        label: option.label,
                                                        value: option.value.toString(),
                                                    })
                                                )}
                                                placeholder={`Select ${filter.label}`}
                                                onValueChange={(values) =>
                                                    onMultiFilter(
                                                        filter.key,
                                                        values
                                                    )
                                                }
                                                className="w-full"
                                            />
                                        ) : (
                                            <Select
                                                onValueChange={(value) =>
                                                    onSingleFilter(
                                                        filter.key,
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            filter.label
                                                        }
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All {filter.label}
                                                    </SelectItem>
                                                    {filter.options.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={option.value.toString()}
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="py-3">
                                <Button
                                    variant="outline"
                                    onClick={onClearFilters}
                                    className="h-10"
                                    disabled={
                                        !filters.some(
                                            (filter) => params[filter.key]
                                        )
                                    }
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-col gap-4 justify-between md:flex-row">
                {/* Search Input */}
                <div className="flex overflow-hidden flex-col gap-2 justify-between items-left lg:items-center lg:flex-row">
                    <div className="relative justify-start w-60">
                        <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            onChange={(e) => onSearch(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>

                {/* Top Actions Slot */}
                {topContent && (
                    <div className="flex overflow-hidden gap-2 items-center">
                        {topContent}
                    </div>
                )}
            </div>
        </div>
    );
}
