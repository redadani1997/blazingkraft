import { BlazingConsumptionResponse } from 'common/types/consumer';
import { useState } from 'react';
import BlazingConsumerRecordsItem from '../item/BlazingConsumerRecordsItem';
import BlazingConsumerRecordsPaging from './BlazingConsumerRecordsPaging';

interface BlazingConsumerRecordsItemsPagingProps {
    setSelectedRecordId: (index: number) => void;
    setSelectedRecord: (record: BlazingConsumptionResponse) => void;
    selectedRecordId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    multiTopics: boolean;
    timezone: string;
    timeFormat: string;
    allRecords: BlazingConsumptionResponse[];
    topicSelected: boolean;
    partitionSelected: boolean;
    offsetSelected: boolean;
    timestampSelected: boolean;
    keySelected: boolean;
    valueSelected: boolean;
    colsNumber: number;
}

function BlazingConsumerRecordsItemsPaging({
    setSelectedRecord,
    setSelectedRecordId,
    selectedRecordId,
    setIsPreviewModalOpen,
    timezone,
    multiTopics,
    timeFormat,
    allRecords,
    topicSelected,
    partitionSelected,
    offsetSelected,
    timestampSelected,
    keySelected,
    valueSelected,
    colsNumber,
}: BlazingConsumerRecordsItemsPagingProps) {
    const [displayedRecords, setDisplayedRecords] =
        useState<BlazingConsumptionResponse[]>(allRecords);

    return (
        <>
            {displayedRecords.map((record: BlazingConsumptionResponse) => {
                return (
                    <BlazingConsumerRecordsItem
                        key={record.id}
                        record={record}
                        setSelectedRecord={setSelectedRecord}
                        setSelectedRecordId={setSelectedRecordId}
                        selectedRecordId={selectedRecordId}
                        setIsPreviewModalOpen={setIsPreviewModalOpen}
                        timezone={timezone}
                        timeFormat={timeFormat}
                        multiTopics={multiTopics}
                        topicSelected={topicSelected}
                        partitionSelected={partitionSelected}
                        offsetSelected={offsetSelected}
                        timestampSelected={timestampSelected}
                        keySelected={keySelected}
                        valueSelected={valueSelected}
                        colsNumber={colsNumber}
                    />
                );
            })}
            <BlazingConsumerRecordsPaging
                allRecords={allRecords}
                setDisplayedRecords={setDisplayedRecords}
            />
        </>
    );
}

export default BlazingConsumerRecordsItemsPaging;
