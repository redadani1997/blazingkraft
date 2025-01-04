import { Popover, Text } from '@mantine/core';
import { BlazingConsumptionResponse } from 'common/types/consumer';
import { useEffect, useMemo, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTransition from 'scenes/common/transition/CommonTransition';

interface BlazingConsumerRecordsPagingProps {
    allRecords: BlazingConsumptionResponse[];
    setDisplayedRecords: (
        displayedRecords: BlazingConsumptionResponse[],
    ) => void;
}

const CONSUMER_RECORDS_PAGING_SIZE = 50;

function BlazingConsumerRecordsPaging({
    allRecords,
    setDisplayedRecords,
}: BlazingConsumerRecordsPagingProps) {
    const [page, setPage] = useState(0);

    const lastPage = useMemo(() => {
        return Math.ceil(allRecords.length / CONSUMER_RECORDS_PAGING_SIZE);
    }, [allRecords]);

    const options = useMemo(() => {
        const options = [];

        for (let i = 1; i <= lastPage; i++) {
            options.push({
                label: String(i),
                value: i,
            });
        }

        return options;
    }, [lastPage]);

    useEffect(() => {
        if (allRecords.length === 0) {
            setDisplayedRecords([]);
            setPage(0);
        } else if (allRecords.length <= CONSUMER_RECORDS_PAGING_SIZE) {
            setDisplayedRecords(allRecords);
        } else {
            setDisplayedRecords(
                allRecords.slice(
                    page * CONSUMER_RECORDS_PAGING_SIZE,
                    (page + 1) * CONSUMER_RECORDS_PAGING_SIZE,
                ),
            );
        }
    }, [allRecords]);

    if (allRecords.length <= CONSUMER_RECORDS_PAGING_SIZE) {
        return <></>;
    }

    return (
        <CommonTransition key={page + allRecords[0].id}>
            <div className="flex mb-1">
                <div className="w-1/3 mr-2">
                    <CommonButton
                        color="blue"
                        variant="outline"
                        disabled={page === 0}
                        onClick={() => {
                            const newPage = page - 1;
                            const from = page - 1;
                            const to = page;

                            setDisplayedRecords(
                                allRecords.slice(
                                    from * CONSUMER_RECORDS_PAGING_SIZE,
                                    to * CONSUMER_RECORDS_PAGING_SIZE,
                                ),
                            );
                            setPage(newPage);
                        }}
                    >
                        Previous Page
                    </CommonButton>
                </div>
                <Popover
                    position="top"
                    withArrow
                    shadow="md"
                    styles={{ dropdown: { maxWidth: '13rem' } }}
                >
                    <Popover.Target>
                        <div className="w-1/3">
                            <CommonButton
                                className="w-1/3"
                                color="blue"
                                variant="light"
                            >
                                Page {page + 1} of {lastPage}
                            </CommonButton>
                        </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <div className="flex flex-col">
                            <Text color="dimmed" className="mb-2 underline">
                                Select a page:
                            </Text>
                            <CommonSelect
                                data={options}
                                value={page + 1}
                                clearable={false}
                                creatable={false}
                                searchable={true}
                                onChange={value => {
                                    const newPage = value - 1;
                                    const from = value - 1;
                                    const to = value;

                                    setDisplayedRecords(
                                        allRecords.slice(
                                            from * CONSUMER_RECORDS_PAGING_SIZE,
                                            to * CONSUMER_RECORDS_PAGING_SIZE,
                                        ),
                                    );
                                    setPage(newPage);
                                }}
                            />
                        </div>
                    </Popover.Dropdown>
                </Popover>

                <div className="w-1/3 ml-2">
                    <CommonButton
                        color="blue"
                        variant="outline"
                        disabled={page + 1 === lastPage}
                        onClick={() => {
                            const newPage = page + 1;
                            const from = page + 1;
                            const to = page + 2;

                            setDisplayedRecords(
                                allRecords.slice(
                                    from * CONSUMER_RECORDS_PAGING_SIZE,
                                    to * CONSUMER_RECORDS_PAGING_SIZE,
                                ),
                            );
                            setPage(newPage);
                        }}
                    >
                        Next Page
                    </CommonButton>
                </div>
            </div>
        </CommonTransition>
    );
}

export default BlazingConsumerRecordsPaging;
