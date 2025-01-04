import { ActionIcon, Divider, Menu, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { TbCheck, TbFilter, TbFilterOff, TbX } from 'react-icons/tb';
import { CommonTableColumn, CommonTableFilter } from '.';
import CommonSelect from '../select/CommonSelect';

function getFilterTypes(column: CommonTableColumn) {
    if (column.customOptions) {
        return [
            { value: 'EQUALS_TO', label: 'Equals To' },
            { value: 'CONTAINS', label: 'Contains' },
            { value: 'STARTS_WITH', label: 'Starts With' },
            { value: 'ENDS_WITH', label: 'Ends With' },
        ];
    }
    return [
        { value: 'CONTAINS', label: 'Contains' },
        { value: 'STARTS_WITH', label: 'Starts With' },
        { value: 'ENDS_WITH', label: 'Ends With' },
    ];
}

const CommonTableFilterComponent = ({
    column,
    filters,
    handleFilter,
}: {
    column: CommonTableColumn;
    filters: CommonTableFilter[];
    handleFilter: Function;
}) => {
    const currFilter = filters.find(filter => filter.id === column.id);
    const [filterType, setFilterType] = useState(
        currFilter
            ? currFilter.type
            : column.customOptions
            ? 'EQUALS_TO'
            : 'CONTAINS',
    );
    const [filterValue, setFilterValue] = useState<any>(
        currFilter ? currFilter.value : undefined,
    );
    useEffect(() => {
        if (!currFilter || !currFilter.value) {
            setFilterValue(undefined);
        }
    }, [currFilter]);
    const [isOpened, setIsOpened] = useState<any>(false);
    return (
        <div className="flex">
            {currFilter && currFilter.value && (
                <ActionIcon
                    variant={filterValue ? 'filled' : 'outline'}
                    className="ml-5"
                    onClick={() => {
                        const newFilters = [
                            ...filters.filter(
                                filter => filter.id !== column.id,
                            ),
                        ];
                        setFilterValue(null);
                        handleFilter(newFilters);
                    }}
                >
                    <TbFilterOff size={20} />
                </ActionIcon>
            )}
            {column.filterable && (
                <Menu
                    opened={isOpened}
                    closeOnClickOutside
                    onClose={() => {
                        setIsOpened(false);
                        if (currFilter && currFilter.value) {
                            setFilterType(currFilter.type);
                            setFilterValue(currFilter.value);
                        } else {
                            setFilterType(
                                column.customOptions ? 'EQUALS_TO' : 'CONTAINS',
                            );
                            setFilterValue(undefined);
                        }
                    }}
                >
                    <Menu.Target>
                        <ActionIcon
                            variant={filterValue ? 'filled' : 'outline'}
                            className="ml-2"
                            onClick={() => setIsOpened(true)}
                            disabled={column.loading}
                        >
                            <TbFilter size={20} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter Type</Menu.Label>
                        <CommonSelect
                            placeholder="Pick a Type"
                            defaultValue="CONTAINS"
                            data={getFilterTypes(column)}
                            onChange={(value: any) => setFilterType(value)}
                            value={filterType}
                        />

                        {/* <Divider className="mt-4" /> */}

                        <Menu.Label>Filter Value</Menu.Label>
                        {filterType === 'EQUALS_TO' ? (
                            <CommonSelect
                                placeholder="Pick a Value"
                                data={column.customOptions ?? []}
                                onChange={value => setFilterValue(value)}
                                value={filterValue}
                            />
                        ) : (
                            <TextInput
                                placeholder="Provide a Value"
                                onChange={event => {
                                    const value =
                                        event.target.value !== ''
                                            ? event.target.value
                                            : undefined;

                                    setFilterValue(value);
                                }}
                                value={filterValue}
                            />
                        )}

                        <Divider className="my-3" />
                        <div className="flex justify-between">
                            <ActionIcon
                                variant="filled"
                                color={'red'}
                                onClick={() => {
                                    setIsOpened(false);
                                    if (currFilter && currFilter.value) {
                                        setFilterType(currFilter.type);
                                        setFilterValue(currFilter.value);
                                    } else {
                                        setFilterType('CONTAINS');
                                        setFilterValue(undefined);
                                    }
                                }}
                            >
                                <TbX size={18} />
                            </ActionIcon>
                            <ActionIcon
                                variant="filled"
                                onClick={() => {
                                    const newFilters = [
                                        ...filters.filter(
                                            filter => filter.id !== column.id,
                                        ),
                                        {
                                            id: column.id,
                                            type: filterType,
                                            value: filterValue,
                                        },
                                    ];
                                    setIsOpened(false);
                                    handleFilter(newFilters);
                                }}
                                disabled={!filterValue}
                            >
                                <TbCheck size={18} />
                            </ActionIcon>
                        </div>
                    </Menu.Dropdown>
                </Menu>
            )}
        </div>
    );
};

export default CommonTableFilterComponent;
