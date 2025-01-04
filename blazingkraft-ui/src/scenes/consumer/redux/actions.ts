import {
    BlazingConsumptionResponse,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { ConsumerConfiguration } from 'kafka/configuration/ConsumerConfiguration';
import { DOWNLOAD_POST, GET, PUT } from 'rest/RestCalls';
import consumerTypes from './types';

function editConsumerConfiguration(
    mainConfiguration: Map<string, any>,
    keyDeserializer: ConsumerDeserializer,
    keyDeserializerConfiguration,
    valueDeserializer,
    valueDeserializerConfiguration,
    pollTimeoutMs,
    clusterCode,
) {
    const cleanedConfigurationValues =
        KafkaConfigurationUtils.cleanDefaultConfigurationValues(
            ConsumerConfiguration.configurations,
            mainConfiguration,
        );
    return {
        type: consumerTypes.EDIT_CONSUMER_CONFIGURATION,
        payload: PUT(
            '/consumer/configuration',
            {
                mainConfiguration: CommonUtils.mapToObject(
                    cleanedConfigurationValues,
                ),
                perRequestKeyDeserializer: keyDeserializer === 'PER_REQUEST',
                keyDeserializer:
                    keyDeserializer === 'PER_REQUEST' ? null : keyDeserializer,
                keyDeserializerConfiguration:
                    keyDeserializer === 'PER_REQUEST'
                        ? null
                        : CommonUtils.mapToObject(keyDeserializerConfiguration),
                perRequestValueDeserializer:
                    valueDeserializer === 'PER_REQUEST',
                valueDeserializer:
                    valueDeserializer === 'PER_REQUEST'
                        ? null
                        : valueDeserializer,
                valueDeserializerConfiguration:
                    valueDeserializer === 'PER_REQUEST'
                        ? null
                        : CommonUtils.mapToObject(
                              valueDeserializerConfiguration,
                          ),
                pollTimeoutMs,
            },
            { headers: { clusterCode } },
        ),
        meta: { clusterCode, context: 'Consumer Configuration' },
    };
}

function getConsumerConfiguration(clusterCode) {
    return {
        type: consumerTypes.GET_CONSUMER_CONFIGURATION,
        payload: GET(`/consumer/configuration`, {
            headers: { clusterCode },
        }),
        meta: { clusterCode, context: 'Consumer Configuration' },
    };
}

function getConsumerCompleteConfiguration(clusterCode) {
    return {
        type: consumerTypes.GET_CONSUMER_COMPLETE_CONFIGURATION,
        payload: GET(`/consumer/complete-configuration`, {
            headers: { clusterCode },
        }),
        meta: { clusterCode, context: 'Consumer Configuration' },
    };
}

function exportConsumerRecords(
    records: BlazingConsumptionResponse[],
    exportType: 'CSV' | 'JSON',
    clusterCode,
) {
    return {
        type: consumerTypes.EXPORT_CONSUMER_RECORDS,
        payload: DOWNLOAD_POST(
            '/consumer/export',
            {
                records,
                exportType,
            },
            { headers: { clusterCode } },
        ),
        meta: { clusterCode, context: 'Export Consumer Records' },
    };
}

const consumerActions = {
    getConsumerConfiguration,
    getConsumerCompleteConfiguration,
    editConsumerConfiguration,
    exportConsumerRecords,
};

export default consumerActions;
