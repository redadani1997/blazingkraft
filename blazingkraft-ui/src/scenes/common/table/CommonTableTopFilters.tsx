import {
    Button,
    Text,
    TextInput,
    Tooltip,
    useMantineTheme,
} from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useRef } from 'react';
import { TbFilterOff, TbSearch } from 'react-icons/tb';
import { CommonTableFilter } from '.';

interface CommonTableTopFiltersProps {
    handleFilter: Function;
    filters: CommonTableFilter[];
    topFilterValue: string | undefined;
    setTopFilterValue: Function;
    handleClearAll: Function;
    handleTopFilter: Function;
    itemsLength: number;
}

const CommonTableTopFilters = ({
    filters,
    topFilterValue,
    handleTopFilter,
    handleClearAll,
    itemsLength,
}: CommonTableTopFiltersProps) => {
    const topFilterInputRef = useRef<HTMLInputElement>(null);

    const theme = useMantineTheme();

    useEffect(() => {
        topFilterInputRef.current?.focus();
    }, []);

    return (
        <div
            className="p-4 flex items-center justify-between"
            style={{
                borderLeft: '0px',
                borderRight: '0px',
                borderTop: '0px',
                borderBottom: '1px',
                borderStyle: 'solid',
                borderColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[3]
                        : theme.colors.gray[4],
            }}
        >
            <div className="w-1/2 flex items-center">
                <TextInput
                    ref={topFilterInputRef}
                    placeholder="Search by any field"
                    icon={<TbSearch size={20} />}
                    onChange={event => {
                        handleTopFilter(event.target.value);
                    }}
                    className="w-full"
                    value={topFilterValue}
                    styles={{
                        input: {
                            backgroundColor:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[7]
                                    : theme.white,
                        },
                    }}
                />

                <Tooltip label="Number of Filtered Items">
                    <div className="flex font-semibold items-center">
                        <Text className="pl-2" color="dimmed" size="md">
                            ({CommonUtils.beautifyNumber(itemsLength)})
                        </Text>
                    </div>
                </Tooltip>
            </div>
            <Button
                variant="outline"
                leftIcon={<TbFilterOff size={20} />}
                onClick={() => {
                    handleClearAll();
                }}
                disabled={
                    !topFilterValue &&
                    (filters.length === 0 ||
                        filters.every(filter => filter.value === undefined))
                }
            >
                Clear All
            </Button>
        </div>
    );
};

export default CommonTableTopFilters;
