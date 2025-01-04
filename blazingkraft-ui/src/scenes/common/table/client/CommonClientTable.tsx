import { LoadingOverlay, Paper, Table, useMantineTheme } from '@mantine/core';
import classNames from 'classnames';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useEffect, useState } from 'react';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import {
    CommonTableColumn,
    CommonTableData,
    CommonTableFilter,
    CommonTableFilterType,
    CommonTableSortDirection,
} from '..';
import CommonPagination from '../CommonPagination';
import CommonTableBody from '../CommonTableBody';
import CommonTableHeader from '../CommonTableHeader';
import CommonTableTopFilters from '../CommonTableTopFilters';

interface CommonClientTableProps {
    paperClassName?: string;
    tableClassName?: string;
    columns: CommonTableColumn[];
    data: CommonTableData[];
    filterType: CommonTableFilterType;
    withPaging: boolean;
    totalElements: number;
    perPage?: number;
    withTopFilter: boolean;
    isLoading?: boolean;
}

function doFilter(
    data: CommonTableData[],
    columns: CommonTableColumn[],
    filters: CommonTableFilter[],
    topFilterValue: string,
) {
    const eligibleFilters = filters.filter(filter => filter.value);
    let newData = [...data];
    if (eligibleFilters.length > 0) {
        newData = data.filter(row => {
            return eligibleFilters.every(filter => {
                const rowValue = row[filter.id]?.value;
                if (filter.type === 'EQUALS_TO') {
                    return rowValue
                        ? String(rowValue).toLocaleLowerCase() ===
                              String(filter.value).toLocaleLowerCase()
                        : true;
                }
                if (filter.type === 'CONTAINS') {
                    return rowValue
                        ? String(rowValue)
                              .toLocaleLowerCase()
                              .includes(
                                  String(filter.value).toLocaleLowerCase(),
                              )
                        : true;
                }
                if (filter.type === 'STARTS_WITH') {
                    return rowValue
                        ? String(rowValue)
                              .toLocaleLowerCase()
                              .startsWith(
                                  String(filter.value).toLocaleLowerCase(),
                              )
                        : true;
                }
                if (filter.type === 'ENDS_WITH') {
                    return rowValue
                        ? String(rowValue)
                              .toLocaleLowerCase()
                              .endsWith(
                                  String(filter.value).toLocaleLowerCase(),
                              )
                        : true;
                }
            });
        });
    }
    if (CommonValidationUtils.isFalsyString(topFilterValue)) {
        return [...newData];
    }
    return newData.filter(row => {
        return columns.some(
            column =>
                column.filterable &&
                row[column.id]?.value &&
                String(row[column.id]?.value)
                    .toLocaleLowerCase()
                    .includes(topFilterValue.toLocaleLowerCase()),
        );
    });
}
function doSort(data: CommonTableData[], columnId, sortDirection) {
    if (columnId) {
        return [
            ...data.sort((a, b) => {
                const aValue = a[columnId]?.value;
                const bValue = b[columnId]?.value;
                if (sortDirection === 'ASC') {
                    if (aValue < bValue) {
                        return -1;
                    } else if (aValue > bValue) {
                        return 1;
                    }
                    return 0;
                }
                if (aValue > bValue) {
                    return -1;
                } else if (aValue < bValue) {
                    return 1;
                }
                return 0;
            }),
        ];
    }
    return data;
}
function doPaging(data: CommonTableData[], page, perPage) {
    if (!perPage) {
        return data;
    }
    const startIndex = (page - 1) * perPage;
    const endIndex =
        startIndex + perPage > data.length ? data.length : startIndex + perPage;
    return data.slice(startIndex, endIndex);
}

const CommonClientTable = ({
    columns,
    data,
    withPaging,
    withTopFilter,
    perPage,
    isLoading,
    paperClassName,
    tableClassName,
}: CommonClientTableProps) => {
    const theme = useMantineTheme();
    const [topFilterValue, setTopFilterValue] = useState<string>('');
    const [sortedColumnId, setSortedColumnId] = useState<number | null>(null);
    const [sortDirection, setSortDirection] =
        useState<CommonTableSortDirection | null>(null);
    const [filters, setFilters] = useState<CommonTableFilter[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [computedData, setComputedData] = useState<CommonTableData[]>([]);

    useEffect(() => {
        setComputedData(doPaging([...data], 1, perPage));
        setTopFilterValue('');
        setSortedColumnId(null);
        setSortDirection(null);
        setFilters([]);
        setCurrentPage(1);
    }, [data]);

    function handleSort(columnId, sortDirection) {
        if (columnId) {
            setSortDirection(sortDirection);
            setSortedColumnId(columnId);
            const filteredData = doFilter(
                data,
                columns,
                filters,
                topFilterValue,
            );
            const sortedData = doSort(filteredData, columnId, sortDirection);
            const pagedData = doPaging(sortedData, currentPage, perPage);
            setComputedData(pagedData);
        } else {
            setSortDirection(sortDirection);
            setSortedColumnId(columnId);
            const filteredData = doFilter(
                data,
                columns,
                filters,
                topFilterValue,
            );
            const pagedData = doPaging(filteredData, currentPage, perPage);
            setComputedData(pagedData);
        }
    }

    function handleFilter(newFilters: CommonTableFilter[]) {
        setCurrentPage(1);
        setFilters(newFilters);
        const filteredData = doFilter(
            data,
            columns,
            newFilters,
            topFilterValue,
        );
        const sortedData = doSort(filteredData, sortedColumnId, sortDirection);
        const pagedData = doPaging(sortedData, 1, perPage);
        setComputedData(pagedData);
    }

    function handleClearAll() {
        setCurrentPage(1);
        setFilters([]);
        setTopFilterValue('');
        const filteredData = doFilter(data, columns, [], '');
        const sortedData = doSort(filteredData, sortedColumnId, sortDirection);
        const pagedData = doPaging(sortedData, 1, perPage);
        setComputedData(pagedData);
    }

    function handleTopFilter(value) {
        setTopFilterValue(value);
        setCurrentPage(1);
        const filteredData = doFilter(data, columns, filters, value);
        const sortedData = doSort(filteredData, sortedColumnId, sortDirection);

        const pagedData = doPaging(sortedData, 1, perPage);
        setComputedData(pagedData);
    }

    function handlePageChange(newPage) {
        setCurrentPage(newPage);

        const filteredData = doFilter(data, columns, filters, topFilterValue);
        const sortedData = doSort(filteredData, sortedColumnId, sortDirection);
        const pagedData = doPaging(sortedData, newPage, perPage);

        setComputedData(pagedData);
    }

    const fitleredDataLength = doFilter(
        data,
        columns,
        filters,
        topFilterValue,
    ).length;

    return (
        <div className={classNames('relative', paperClassName)}>
            <Paper
                style={{
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[2],
                    border: '1px',
                    borderStyle: 'solid',
                    borderColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[3]
                            : theme.colors.gray[4],
                    // borderRadius: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    minHeight: '20rem',
                }}
                className="w-full h-full"
            >
                <LoadingOverlay visible={isLoading} className="rounded-xl" />
                {withTopFilter && (
                    <div className="w-full">
                        <CommonTableTopFilters
                            handleFilter={handleFilter}
                            filters={filters}
                            setTopFilterValue={setTopFilterValue}
                            topFilterValue={topFilterValue}
                            handleClearAll={handleClearAll}
                            handleTopFilter={handleTopFilter}
                            itemsLength={fitleredDataLength}
                        />
                    </div>
                )}
                <CommonScrollArea
                    style={{
                        backgroundColor:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[4]
                                : theme.colors.gray[0],
                    }}
                    className="w-full h-full"
                >
                    <Table
                        horizontalSpacing="md"
                        verticalSpacing="md"
                        highlightOnHover
                        className={tableClassName}
                    >
                        <CommonTableHeader
                            columns={columns}
                            handleSort={handleSort}
                            handleFilter={handleFilter}
                            sortDirection={sortDirection}
                            sortedColumnId={sortedColumnId}
                            filters={filters}
                        />
                        <CommonTableBody
                            columns={columns}
                            data={computedData}
                        />
                    </Table>
                </CommonScrollArea>
                {withPaging && (
                    <div className="w-full">
                        <CommonPagination
                            data={computedData}
                            totalElements={fitleredDataLength}
                            perPage={perPage}
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default CommonClientTable;
