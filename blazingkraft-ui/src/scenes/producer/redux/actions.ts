import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { ProducerSerializer, RecordMetadata } from 'common/types/producer';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { ProducerConfiguration } from 'kafka/configuration/ProducerConfiguration';
import { GET, POST, POST_FORM, PUT } from 'rest/RestCalls';
import producerTypes from './types';

function produceBlazingRecord(
    topic,
    partition,
    kafkaKey,
    kafkaValue,
    kafkaHeaders,
    kafkaKeySchema,
    kafkaValueSchema,
    keySerializer,
    keySerializerConfiguration,
    valueSerializer,
    valueSerializerConfiguration,
    clusterCode,
) {
    const loadingId = notifyLoading({
        title: 'Record Production',
        message: 'Record Production in progress...',
    });
    return {
        type: producerTypes.PRODUCE_BLAZING_RECORD,
        payload: POST(
            '/producer/blazing-producer',
            {
                topic,
                partition:
                    partition !== null &&
                    partition !== undefined &&
                    partition >= 0
                        ? partition
                        : null,
                key: kafkaKey,
                value: kafkaValue,
                headers: kafkaHeaders,
                keySchema: kafkaKeySchema,
                valueSchema: kafkaValueSchema,
                producerAdditionalConfiguration: {
                    keySerializer,
                    keySerializerConfiguration:
                        keySerializerConfiguration &&
                        Object.fromEntries(keySerializerConfiguration),
                    valueSerializer,
                    valueSerializerConfiguration:
                        valueSerializerConfiguration &&
                        Object.fromEntries(valueSerializerConfiguration),
                },
            },
            { headers: { clusterCode } },
        )
            .then((res: { recordMetadata: RecordMetadata }) => {
                notifyUpdateToSuccess({
                    id: loadingId,
                    title: 'Record Production',
                    message: `Successfully produced record to topic '${topic}' with offset ${res.recordMetadata.offset}`,
                    autoClose: 1000,
                });
                return res;
            })
            .catch(err => {
                notifyUpdateToError({
                    id: loadingId,
                    title: 'Record Production',
                    message: CommonUtils.getRestErrorMessage(err),
                });
                throw err;
            }),
    };
}

function importBlazingRecords(
    jsonFile: any,
    failFast: boolean,
    async: boolean,
    keySchema: string,
    valueSchema: string,
    keySerializer: string,
    keySerializerConfiguration: Map<string, any>,
    valueSerializer: string,
    valueSerializerConfiguration: Map<string, any>,
    clusterCode: string,
) {
    return {
        type: producerTypes.IMPORT_BLAZING_RECORDS,
        payload: POST_FORM(
            `/producer/import`,
            {
                jsonFile,
                failFast,
                async,
                keySchema,
                valueSchema,
                keySerializer,
                keySerializerConfiguration:
                    keySerializerConfiguration &&
                    CommonUtils.mapToString(keySerializerConfiguration),
                valueSerializer,
                valueSerializerConfiguration:
                    valueSerializerConfiguration &&
                    CommonUtils.mapToString(valueSerializerConfiguration),
            },
            { headers: { clusterCode } },
        ),
        meta: { context: 'Records Import', async },
    };
}

function editProducerConfiguration(
    mainConfiguration: Map<string, any>,
    keySerializer: ProducerSerializer,
    keySerializerConfiguration,
    valueSerializer,
    valueSerializerConfiguration,
    clusterCode,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            ProducerConfiguration.configurations,
            mainConfiguration,
        );
    return {
        type: producerTypes.EDIT_PRODUCER_CONFIGURATION,
        payload: PUT(
            '/producer/configuration',
            {
                mainConfiguration: CommonUtils.mapToObject(
                    cleanedConfigurationValues,
                ),
                perRequestKeySerializer: keySerializer === 'PER_REQUEST',
                keySerializer:
                    keySerializer === 'PER_REQUEST' ? null : keySerializer,
                keySerializerConfiguration:
                    keySerializer === 'PER_REQUEST'
                        ? null
                        : CommonUtils.mapToObject(keySerializerConfiguration),
                perRequestValueSerializer: valueSerializer === 'PER_REQUEST',
                valueSerializer:
                    valueSerializer === 'PER_REQUEST' ? null : valueSerializer,
                valueSerializerConfiguration:
                    valueSerializer === 'PER_REQUEST'
                        ? null
                        : CommonUtils.mapToObject(valueSerializerConfiguration),
            },
            { headers: { clusterCode } },
        ),
        meta: { clusterCode, context: 'Producer Configuration' },
    };
}

function getProducerConfiguration(clusterCode) {
    return {
        type: producerTypes.GET_PRODUCER_CONFIGURATION,
        payload: GET(`/producer/configuration`, {
            headers: { clusterCode },
        }),
        meta: { clusterCode, context: 'Producer Configuration' },
    };
}

function getProducerCompleteConfiguration(clusterCode) {
    return {
        type: producerTypes.GET_PRODUCER_COMPLETE_CONFIGURATION,
        payload: GET(`/producer/complete-configuration`, {
            headers: { clusterCode },
        }),
        meta: { clusterCode, context: 'Producer Configuration' },
    };
}

const producerActions = {
    produceBlazingRecord,
    getProducerConfiguration,
    getProducerCompleteConfiguration,
    editProducerConfiguration,
    importBlazingRecords,
};

export default producerActions;
