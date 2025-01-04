import { Text } from '@mantine/core';
import {
    BlazingConsumptionResponse,
    ConsumerDeserializer,
} from 'common/types/consumer';
import CommonModal from 'scenes/common/modal/CommonModal';
import BlazingConsumerRecordPreviewEditors from './BlazingConsumerRecordPreviewEditors';

interface BlazingConsumerRecordPreviewModalProps {
    onClose: () => void;
    isOpen: boolean;
    record: BlazingConsumptionResponse | null;
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    timezone: string;
    timeFormat: string;
}

function BlazingConsumerRecordPreviewModal({
    record,
    keyDeserializer,
    valueDeserializer,
    onClose,
    isOpen,
    timeFormat,
    timezone,
}: BlazingConsumerRecordPreviewModalProps) {
    return (
        <CommonModal
            onClose={onClose}
            isOpen={isOpen}
            modalBody={
                <BlazingConsumerRecordPreviewEditors
                    record={record}
                    keyDeserializer={keyDeserializer}
                    valueDeserializer={valueDeserializer}
                    timezone={timezone}
                    timeFormat={timeFormat}
                />
            }
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Record Preview</Text>
                    <Text color="dimmed" size="xs">
                        {record?.metadata.topic}
                        {record?.value?.succeeded && record?.key?.succeeded
                            ? ' (Success)'
                            : ' (Failed)'}
                    </Text>
                </div>
            }
        />
    );
}

export default BlazingConsumerRecordPreviewModal;
