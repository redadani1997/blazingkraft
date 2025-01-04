import { Card, Text, useMantineColorScheme } from '@mantine/core';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import React, { useCallback, useMemo } from 'react';
import { TbInfoCircle } from 'react-icons/tb';
import CommonTransition from 'scenes/common/transition/CommonTransition';
import { PublishedRecord } from '../../BlazingProducerBodyComponent';

interface BlazingProducerRecordsItemProps {
    record: PublishedRecord;
    setSelectedRecordId: (index: number) => void;
    setSelectedRecord: (record: PublishedRecord) => void;
    selectedRecordId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    timeFormat: string;
    partitionSelected: boolean;
    offsetSelected: boolean;
    timestampSelected: boolean;
    keySelected: boolean;
    valueSelected: boolean;
    colsNumber: number;
}

function BlazingProducerRecordsItem({
    record,
    setSelectedRecord,
    setSelectedRecordId,
    selectedRecordId,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
    partitionSelected,
    offsetSelected,
    timestampSelected,
    keySelected,
    valueSelected,
    colsNumber,
}: BlazingProducerRecordsItemProps) {
    const memoizedRecord = useMemo(() => record, [record]);
    const isSelected = selectedRecordId === record.id;
    const memoizedSetSelectedRecord = useCallback(
        record => setSelectedRecord(record),
        [],
    );
    const memoizedSetSelectedRecordIndex = useCallback(
        index => setSelectedRecordId(index),
        [setSelectedRecordId],
    );
    const memoizedSetIsPreviewModalOpen = useCallback(
        bool => setIsPreviewModalOpen(bool),
        [setIsPreviewModalOpen],
    );
    return (
        <BlazingProducerRecordsItemInnerMemo
            record={memoizedRecord}
            setSelectedRecord={memoizedSetSelectedRecord}
            setSelectedRecordId={memoizedSetSelectedRecordIndex}
            isSelected={isSelected}
            setIsPreviewModalOpen={memoizedSetIsPreviewModalOpen}
            timezone={timezone}
            timeFormat={timeFormat}
            partitionSelected={partitionSelected}
            offsetSelected={offsetSelected}
            timestampSelected={timestampSelected}
            keySelected={keySelected}
            valueSelected={valueSelected}
            colsNumber={colsNumber}
        />
    );
}

function BlazingProducerRecordsItemInner({
    record,
    setSelectedRecord,
    setSelectedRecordId,
    isSelected,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
    partitionSelected,
    offsetSelected,
    timestampSelected,
    keySelected,
    valueSelected,
    colsNumber,
}: {
    record: PublishedRecord;
    [x: string]: any;
}) {
    const { colorScheme } = useMantineColorScheme();
    const textColor = colorScheme === 'dark' ? 'darkcyan' : 'lightgreen';
    const errorColor = colorScheme === 'dark' ? '#e59999' : '#83775e';

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
                    background: !isSelected ? undefined : textColor,
                }}
            >
                {record.succeeded ? (
                    <div
                        className="grid gap-2 w-full items-center"
                        style={{
                            gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
                        }}
                    >
                        {partitionSelected && (
                            <span className="grid-col-span-1">
                                <Text
                                    size="sm"
                                    className="italic font-semibold common-elipsis w-full"
                                >
                                    {
                                        record.recordMetadata.topicPartition
                                            .partition
                                    }
                                </Text>
                            </span>
                        )}
                        {offsetSelected && (
                            <span className="grid-col-span-1">
                                <Text
                                    size="sm"
                                    className="italic font-semibold common-elipsis"
                                >
                                    {record.recordMetadata.offset}
                                </Text>
                            </span>
                        )}
                        {keySelected && (
                            <span className="grid-col-span-2">
                                <Text
                                    size="sm"
                                    className="italic font-semibold common-elipsis"
                                >
                                    {record.key}
                                </Text>
                            </span>
                        )}
                        {valueSelected && (
                            <span className="grid-col-span-2">
                                <Text
                                    size="sm"
                                    className="italic font-semibold common-elipsis"
                                >
                                    {record.value}
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
                                        record.recordMetadata.timestamp,
                                        timezone,
                                        timeFormat,
                                    )}
                                </Text>
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-row w-full items-center">
                        <div>
                            <TbInfoCircle size="24px" color={errorColor} />
                        </div>
                        <Text
                            color={errorColor}
                            size="sm"
                            className="italic pl-3 font-semibold"
                        >
                            {record.errorMessage}
                        </Text>
                    </div>
                )}
            </Card>
        </CommonTransition>
    );
}
const BlazingProducerRecordsItemInnerMemo = React.memo(
    BlazingProducerRecordsItemInner,
);

export default BlazingProducerRecordsItem;
