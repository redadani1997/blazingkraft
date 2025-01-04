import { Card, Text, useMantineColorScheme } from '@mantine/core';
import { BlazingConsumptionResponse } from 'common/types/consumer';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import React, { useCallback, useMemo } from 'react';
import CommonTransition from 'scenes/common/transition/CommonTransition';

interface BlazingConsumerRecordsItemProps {
    record: BlazingConsumptionResponse;
    setSelectedRecordId: (index: number) => void;
    setSelectedRecord: (record: BlazingConsumptionResponse) => void;
    selectedRecordId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    timeFormat: string;
    multiTopics: boolean;
    topicSelected: boolean;
    partitionSelected: boolean;
    offsetSelected: boolean;
    timestampSelected: boolean;
    keySelected: boolean;
    valueSelected: boolean;
    colsNumber: number;
}

function BlazingConsumerRecordsItem({
    record,
    setSelectedRecord,
    setSelectedRecordId,
    selectedRecordId,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
    multiTopics,
    topicSelected,
    partitionSelected,
    offsetSelected,
    timestampSelected,
    keySelected,
    valueSelected,
    colsNumber,
}: BlazingConsumerRecordsItemProps) {
    const memoizedRecord = useMemo(() => record, [record]);
    const isSelected = selectedRecordId === record.id;
    const memoizedSetSelectedRecord = useCallback(
        record => setSelectedRecord(record),
        [],
    );
    const memoizedSetSelectedRecordIndex = useCallback(
        index => setSelectedRecordId(index),
        [],
    );
    const memoizedSetIsPreviewModalOpen = useCallback(
        bool => setIsPreviewModalOpen(bool),
        [],
    );

    return (
        <BlazingConsumerRecordsItemInnerMemo
            record={memoizedRecord}
            setSelectedRecord={memoizedSetSelectedRecord}
            setSelectedRecordId={memoizedSetSelectedRecordIndex}
            isSelected={isSelected}
            setIsPreviewModalOpen={memoizedSetIsPreviewModalOpen}
            multiTopics={multiTopics}
            timezone={timezone}
            timeFormat={timeFormat}
            topicSelected={topicSelected}
            partitionSelected={partitionSelected}
            offsetSelected={offsetSelected}
            timestampSelected={timestampSelected}
            keySelected={keySelected}
            valueSelected={valueSelected}
            colsNumber={colsNumber}
        />
    );
}

function BlazingConsumerRecordsItemInner({
    record,
    setSelectedRecord,
    setSelectedRecordId,
    isSelected,
    setIsPreviewModalOpen,
    multiTopics,
    timezone,
    timeFormat,
    topicSelected,
    partitionSelected,
    offsetSelected,
    timestampSelected,
    keySelected,
    valueSelected,
    colsNumber,
}: {
    record: BlazingConsumptionResponse;
    [x: string]: any;
}) {
    const { colorScheme } = useMantineColorScheme();
    const bgColor = colorScheme === 'dark' ? 'darkcyan' : 'lightgreen';
    // const errorColor = colorScheme === 'dark' ? '#e59999' : '#83775e';
    const errorColor = colorScheme === 'dark' ? 'red' : 'red';
    const key = useMemo(() => {
        return record.key.succeeded
            ? record.key.payload
            : record.key.errorMessage;
    }, [record]);
    const value = useMemo(() => {
        return record.value.succeeded
            ? record.value.payload
            : record.value.errorMessage;
    }, [record]);

    return (
        <CommonTransition key={record.id}>
            <Card
                className="cursor-pointer py-3 my-1"
                onClick={() => {
                    setSelectedRecord(record);
                    setSelectedRecordId(record.id);
                    setIsPreviewModalOpen(true);
                }}
                style={{
                    background: !isSelected ? undefined : bgColor,
                }}
            >
                <div
                    className="grid gap-2 w-full items-center"
                    style={{
                        color:
                            !record.key.succeeded || !record.value.succeeded
                                ? errorColor
                                : undefined,
                        gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
                    }}
                >
                    {multiTopics && topicSelected && (
                        <span className="grid-col-span-2">
                            <Text
                                size="sm"
                                className="italic font-semibold common-elipsis"
                            >
                                {record.metadata.topic}
                            </Text>
                        </span>
                    )}
                    {partitionSelected && (
                        <span className="grid-col-span-1">
                            <Text
                                size="sm"
                                className="italic font-semibold common-elipsis w-full"
                            >
                                {record.metadata.partition}
                            </Text>
                        </span>
                    )}
                    {offsetSelected && (
                        <span className="grid-col-span-1">
                            <Text
                                size="sm"
                                className="italic font-semibold common-elipsis"
                            >
                                {record.metadata.offset}
                            </Text>
                        </span>
                    )}
                    {keySelected && (
                        <span className="grid-col-span-2">
                            <Text
                                size="sm"
                                className="italic font-semibold common-elipsis"
                            >
                                {key}
                            </Text>
                        </span>
                    )}
                    {valueSelected && (
                        <span className="grid-col-span-2">
                            <Text
                                size="sm"
                                className="italic font-semibold common-elipsis"
                            >
                                {value}
                            </Text>
                        </span>
                    )}
                    {timestampSelected && (
                        <span className="grid-col-span-3">
                            <Text
                                size="sm"
                                className="italic pl-1 font-semibold break-words w-full"
                                component="span"
                            >
                                {CommonTimeUtils.timestampToFormattedDate(
                                    record.metadata.timestamp,
                                    timezone,
                                    timeFormat,
                                )}
                            </Text>
                        </span>
                    )}
                </div>
            </Card>
        </CommonTransition>
    );
}
const BlazingConsumerRecordsItemInnerMemo = React.memo(
    BlazingConsumerRecordsItemInner,
);

export default BlazingConsumerRecordsItem;
