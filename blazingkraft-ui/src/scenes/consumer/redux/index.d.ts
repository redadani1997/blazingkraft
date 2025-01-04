import {
    BlazingConsumptionResponse,
    ConsumerCompleteConfiguration,
    ConsumerConfiguration,
} from 'common/types/consumer';

export interface IConsumerRecords {
    records: BlazingConsumptionResponse[];
}

export type ConsumerReducerState = {
    consumerConfiguration?: ConsumerConfiguration;
    consumerCompleteConfiguration?: ConsumerCompleteConfiguration;
    isGetConsumerConfigurationPending: boolean;
    isGetConsumerCompleteConfigurationPending: boolean;
    isEditConsumerConfigurationPending: boolean;
    isExportConsumerRecordsPending: boolean;
};
