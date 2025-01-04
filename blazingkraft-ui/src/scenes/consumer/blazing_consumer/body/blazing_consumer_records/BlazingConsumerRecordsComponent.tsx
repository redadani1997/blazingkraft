import { Grid } from '@mantine/core';
import {
    BlazingConsumptionResponse,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { useEffect, useState } from 'react';
import BlazingConsumerRecordsList from './list/BlazingConsumerRecordsList';
import BlazingConsumerRecordPreview from './preview/BlazingConsumerRecordPreview';

interface BlazingConsumerRecordsComponentProps {
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    timezone: string;
    setTimezone: (timezone: string) => void;
    multiTopics: boolean;
    resultsSize: number;
    setResultsSize: (resultsSize: number) => void;
    timeFormat: string;
    setTimeFormat: (timeFormat: string) => void;
    clearRecords: () => void;
    allRecords: BlazingConsumptionResponse[];
    isAllTransitionning: boolean;
    isConsuming: boolean;
    setDisplayedFields: (
        displayedFields: BlazingConsumerDisplayField[],
    ) => void;
    displayedFields: BlazingConsumerDisplayField[];
}

export type BlazingConsumerDisplayField =
    | 'key'
    | 'value'
    | 'topic'
    | 'partition'
    | 'offset'
    | 'timestamp';

function BlazingConsumerRecordsComponent({
    keyDeserializer,
    valueDeserializer,
    timezone,
    setTimezone,
    multiTopics,
    resultsSize,
    setResultsSize,
    timeFormat,
    setTimeFormat,
    allRecords,
    clearRecords,
    isAllTransitionning,
    isConsuming,
    displayedFields,
    setDisplayedFields,
}: BlazingConsumerRecordsComponentProps) {
    const [selectedRecord, setSelectedRecord] =
        useState<BlazingConsumptionResponse | null>(null);
    const [selectedRecordId, setSelectedRecordId] = useState<number>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    useEffect(() => {
        if (allRecords && allRecords.length === 0) {
            setSelectedRecord(null);
            setSelectedRecordId(null);
        } else if (
            selectedRecordId === null &&
            selectedRecord === null &&
            allRecords &&
            allRecords.length > 0
        ) {
            setSelectedRecord(allRecords[0]);
            setSelectedRecordId(allRecords[0].id);
        }
    }, [allRecords]);

    return (
        <Grid
            className="pt-3 flex flex-1"
            style={{
                minHeight: '30rem',
            }}
        >
            <Grid.Col span={12} md={6}>
                <BlazingConsumerRecordsList
                    setSelectedRecord={setSelectedRecord}
                    selectedRecordId={selectedRecordId}
                    setSelectedRecordId={setSelectedRecordId}
                    setIsPreviewModalOpen={setIsPreviewModalOpen}
                    timezone={timezone}
                    setTimezone={setTimezone}
                    multiTopics={multiTopics}
                    timeFormat={timeFormat}
                    setTimeFormat={setTimeFormat}
                    displayedFields={displayedFields}
                    setDisplayedFields={setDisplayedFields}
                    resultsSize={resultsSize}
                    setResultsSize={setResultsSize}
                    allRecords={allRecords}
                    clearRecords={clearRecords}
                    isAllTransitionning={isAllTransitionning}
                    isConsuming={isConsuming}
                />
            </Grid.Col>
            <BlazingConsumerRecordPreview
                selectedRecord={selectedRecord}
                keyDeserializer={keyDeserializer}
                valueDeserializer={valueDeserializer}
                isPreviewModalOpen={isPreviewModalOpen}
                setIsPreviewModalOpen={setIsPreviewModalOpen}
                timezone={timezone}
                timeFormat={timeFormat}
            />
        </Grid>
    );
}

export default BlazingConsumerRecordsComponent;
