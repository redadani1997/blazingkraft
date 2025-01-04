import { RecordMetadata } from 'common/types/consumer';
import {
    ProducerCompleteConfiguration,
    ProducerConfiguration,
} from 'common/types/producer';

export interface IPublishedRecordOrError {
    errorMessage: string | null;
    recordMetadata?: RecordMetadata | null;
    recordData?: {
        key: string;
        value: string;
        headers: string;
    };
    succeeded: boolean;
}

export type ProducerReducerState = {
    producerConfiguration?: ProducerConfiguration;
    producerCompleteConfiguration?: ProducerCompleteConfiguration;
    isProduceBlazingRecordPending: boolean;
    isImportBlazingRecordsPending: boolean;
    isGetProducerConfigurationPending: boolean;
    isGetProducerCompleteConfigurationPending: boolean;
    isEditProducerConfigurationPending: boolean;
};
