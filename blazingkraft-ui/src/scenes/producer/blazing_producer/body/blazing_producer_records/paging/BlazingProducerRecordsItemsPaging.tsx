import { useState } from 'react';
import { PublishedRecord } from '../../BlazingProducerBodyComponent';
import BlazingProducerRecordsItem from '../item/BlazingProducerRecordsItem';
import BlazingProducerRecordsPaging from './BlazingProducerRecordsPaging';

interface BlazingProducerRecordsItemsPagingProps {
    records: PublishedRecord[];
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

function BlazingProducerRecordsItemsPaging({
    records,
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
}: BlazingProducerRecordsItemsPagingProps) {
    const [displayedRecords, setDisplayedRecords] =
        useState<PublishedRecord[]>(records);

    return (
        <>
            {displayedRecords.map((record: PublishedRecord) => {
                return (
                    <BlazingProducerRecordsItem
                        key={record.id}
                        record={record}
                        setSelectedRecord={setSelectedRecord}
                        setSelectedRecordId={setSelectedRecordId}
                        selectedRecordId={selectedRecordId}
                        setIsPreviewModalOpen={setIsPreviewModalOpen}
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
            })}
            <BlazingProducerRecordsPaging
                setDisplayedRecords={setDisplayedRecords}
                allRecords={records}
            />
        </>
    );
}

export default BlazingProducerRecordsItemsPaging;
