import { ActionIcon, Text, useMantineTheme } from '@mantine/core';
import {
    TbArrowsSort,
    TbSortAscending,
    TbSortDescending,
} from 'react-icons/tb';
import {
    CommonTableColumn,
    CommonTableFilter,
    CommonTableSortDirection,
} from '.';
import CommonTableFilterComponent from './CommonTableFilterComponent';

interface CommonTableHeaderProps {
    columns: CommonTableColumn[];
    handleSort: Function;
    handleFilter: Function;
    sortDirection: CommonTableSortDirection | undefined;
    sortedColumnId: number | undefined;
    filters: CommonTableFilter[];
}

function getSortIcon(
    columnId,
    sortedColumnId,
    sortDirection: CommonTableSortDirection | undefined,
    sortable,
    loading,
    handleSort,
) {
    if (!sortable) {
        return <></>;
    } else if (!sortedColumnId || columnId !== sortedColumnId) {
        return (
            <ActionIcon
                className="ml-5"
                variant="outline"
                onClick={() => {
                    handleSort(columnId, 'ASC');
                }}
                disabled={loading}
            >
                <TbArrowsSort size={18} />
            </ActionIcon>
        );
    }
    if (sortable && columnId === sortedColumnId) {
        return sortDirection === 'ASC' ? (
            <ActionIcon
                className="ml-5"
                variant="filled"
                color={'blue'}
                onClick={() => {
                    handleSort(columnId, 'DESC');
                }}
                disabled={loading}
            >
                <TbSortAscending size={18} />
            </ActionIcon>
        ) : (
            <ActionIcon
                className="ml-5"
                variant="filled"
                color={'blue'}
                disabled={loading}
            >
                <TbSortDescending
                    size={18}
                    onClick={() => {
                        handleSort(undefined, undefined);
                    }}
                />
            </ActionIcon>
        );
    }
    return <></>;
}

function Th({
    column,
    index,
    columnsLength,
    sortedColumnId,
    sortDirection,
    handleSort,
    filters,
    handleFilter,
}: {
    column: CommonTableColumn;
    index: number;
    columnsLength: number;
    sortedColumnId: any;
    sortDirection: any;
    handleSort: Function;
    filters: CommonTableFilter[];
    handleFilter: Function;
}) {
    const theme = useMantineTheme();
    return (
        <th
            style={{
                borderLeft: index === 0 ? '0px' : '1px',
                borderRight: index === columnsLength - 1 ? '0px' : '1px',
                borderTop: '0px',
                borderBottom: '1px',
                borderStyle: 'solid',
                borderColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[3]
                        : theme.colors.gray[4],
                width: column.width,
                minWidth: column.minWidth,
            }}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <Text
                        weight={'bold'}
                        size="md"
                        className="whitespace-nowrap"
                    >
                        {column.label}
                    </Text>
                    {getSortIcon(
                        column.id,
                        sortedColumnId,
                        sortDirection,
                        column.sortable,
                        column.loading,
                        handleSort,
                    )}
                </div>
                <CommonTableFilterComponent
                    column={column}
                    filters={filters}
                    handleFilter={handleFilter}
                />
            </div>
        </th>
    );
}

const CommonTableHeader = ({
    columns,
    handleSort,
    handleFilter,
    sortedColumnId,
    sortDirection,
    filters,
}: CommonTableHeaderProps) => {
    const theme = useMantineTheme();
    return (
        <thead
            style={{
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[2],
            }}
        >
            <tr>
                {columns.map((column, index) => (
                    <Th
                        key={column.id}
                        column={column}
                        index={index}
                        columnsLength={columns.length}
                        sortDirection={sortDirection}
                        sortedColumnId={sortedColumnId}
                        handleSort={handleSort}
                        filters={filters}
                        handleFilter={handleFilter}
                    />
                ))}
            </tr>
        </thead>
    );
};

export default CommonTableHeader;
