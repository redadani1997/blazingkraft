import { Grid } from '@mantine/core';
import CommonStyles from 'common/styles/CommonStyles';
import {
    BlazingConsumptionResponse,
    ConsumerDeserializer,
} from 'common/types/consumer';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import BlazingConsumerRecordPreviewEditors from './BlazingConsumerRecordPreviewEditors';
import BlazingConsumerRecordPreviewModal from './BlazingConsumerRecordPreviewModal';

interface BlazingConsumerRecordPreviewComponentProps {
    selectedRecord: BlazingConsumptionResponse | null;
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    isPreviewModalOpen: boolean;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    timezone: string;
    timeFormat: string;
}

function BlazingConsumerRecordPreviewComponent({
    selectedRecord,
    keyDeserializer,
    valueDeserializer,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    timezone,
    timeFormat,
}: BlazingConsumerRecordPreviewComponentProps) {
    const isMedium = useCommonMediaQuery({
        query: `(min-width: ${CommonStyles.SMALL_END})`,
    });

    return isMedium ? (
        <Grid.Col span={12} md={6}>
            <BlazingConsumerRecordPreviewEditors
                record={selectedRecord}
                keyDeserializer={keyDeserializer}
                valueDeserializer={valueDeserializer}
                timezone={timezone}
                timeFormat={timeFormat}
            />
        </Grid.Col>
    ) : (
        <BlazingConsumerRecordPreviewModal
            onClose={() => setIsPreviewModalOpen(false)}
            isOpen={isPreviewModalOpen}
            record={selectedRecord}
            keyDeserializer={keyDeserializer}
            valueDeserializer={valueDeserializer}
            timezone={timezone}
            timeFormat={timeFormat}
        />
    );
}

export default BlazingConsumerRecordPreviewComponent;
