import { Grid, Input } from '@mantine/core';
import {
    ProducerCompleteConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { AdminConfiguration } from 'kafka/configuration/AdminConfiguration';
import { ProducerConfiguration } from 'kafka/configuration/ProducerConfiguration';
import { useEffect, useMemo, useState } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import BlazingProducerDetailsSerializers from './serializers_configuration/BlazingProducerDetailsSerializers';

interface BlazingProducerDetailsBodyComponentProps {
    producerCompleteConfiguration?: ProducerCompleteConfiguration;
    isGetProducerCompleteConfigurationPending: boolean;
}

function computeInitialCommonConfigurationValues(
    producerCompleteConfiguration: ProducerCompleteConfiguration,
) {
    const configurationValues = new Map<string, string>();
    AdminConfiguration.configurations.forEach(config => {
        const value = producerCompleteConfiguration?.commonConfiguration?.get(
            config.name,
        );
        configurationValues.set(
            config.name,
            value === undefined ? config.default : value,
        );
    });

    producerCompleteConfiguration?.commonConfiguration?.forEach(
        (value, key) => {
            if (!configurationValues.has(key)) {
                configurationValues.set(key, value);
            }
        },
    );

    return configurationValues;
}

function computeInitialMainConfigurationValues(
    producerCompleteConfiguration: ProducerCompleteConfiguration,
) {
    const configurationValues = new Map<string, string>();
    ProducerConfiguration.configurations.forEach(config => {
        const value = producerCompleteConfiguration?.mainConfiguration?.get(
            config.name,
        );
        configurationValues.set(
            config.name,
            value === undefined ? config.default : value,
        );
    });

    producerCompleteConfiguration?.mainConfiguration?.forEach((value, key) => {
        if (!configurationValues.has(key)) {
            configurationValues.set(key, value);
        }
    });

    return configurationValues;
}

const BlazingProducerDetailsBodyComponent = ({
    producerCompleteConfiguration,
    isGetProducerCompleteConfigurationPending,
}: BlazingProducerDetailsBodyComponentProps) => {
    const [selectedTab, setSelectedTab] = useState<string>('mainConfiguration');
    const [mainConfigurationValues, setMainConfigurationValues] = useState<
        Map<string, string>
    >(computeInitialMainConfigurationValues(producerCompleteConfiguration));
    const [keySerializer, setKeySerializer] = useState<
        ProducerSerializer | undefined
    >(undefined);
    const [keySerializerConfiguration, setKeySerializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());
    const [valueSerializer, setValueSerializer] = useState<
        ProducerSerializer | undefined
    >(undefined);
    const [valueSerializerConfiguration, setValueSerializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());

    const [hasSchemaRegistry, setHasSchemaRegistry] = useState<boolean>(true);

    const commonConfigurationValues: Map<string, any> = useMemo(() => {
        return computeInitialCommonConfigurationValues(
            producerCompleteConfiguration,
        );
    }, [producerCompleteConfiguration]);
    const commonConfiguration = useMemo(() => {
        return KafkaConfigurationUtils.disableConfigurations(
            AdminConfiguration.configurations,
            'This configuration is inherited from the cluster configuration',
        );
    }, []);

    const configurations = useMemo(() => {
        return KafkaConfigurationUtils.disableConfigurations(
            ProducerConfiguration.configurations,
        );
    }, []);

    const rawMainConfiguration = useMemo(
        () =>
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(mainConfigurationValues),
            ),
        [mainConfigurationValues],
    );

    const rawCommonConfiguration = useMemo(
        () =>
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(commonConfigurationValues),
            ),
        [commonConfigurationValues],
    );

    useEffect(() => {
        if (producerCompleteConfiguration) {
            setKeySerializer(
                producerCompleteConfiguration.perRequestKeySerializer
                    ? 'PER_REQUEST'
                    : producerCompleteConfiguration.keySerializer,
            );
            setKeySerializerConfiguration(
                producerCompleteConfiguration.keySerializerConfiguration,
            );
            setValueSerializer(
                producerCompleteConfiguration.perRequestValueSerializer
                    ? 'PER_REQUEST'
                    : producerCompleteConfiguration.valueSerializer,
            );
            setValueSerializerConfiguration(
                producerCompleteConfiguration.valueSerializerConfiguration,
            );
            setMainConfigurationValues(
                computeInitialMainConfigurationValues(
                    producerCompleteConfiguration,
                ),
            );
            setHasSchemaRegistry(
                CommonValidationUtils.isTruthy(
                    producerCompleteConfiguration.schemaRegistryCode,
                ),
            );
        }
    }, [producerCompleteConfiguration]);

    useEffect(() => {
        if (
            !ProducerUtils.isSchemaRegistrySerializer(keySerializer) &&
            !ProducerUtils.isSchemaRegistrySerializer(valueSerializer) &&
            selectedTab === 'serializersConfiguration'
        ) {
            setSelectedTab('mainConfiguration');
        }
    }, [keySerializer, valueSerializer]);

    const items = [
        {
            label: 'Main Configuration',
            value: 'mainConfiguration',
            children: (
                <ConfigurationsTabs
                    configurationValues={mainConfigurationValues}
                    configurations={configurations}
                    setConfigurationValues={() => {
                        // no-op
                    }}
                />
            ),
        },
        {
            label: 'Raw Main Configuration',
            value: 'Raw Main Configuration',
            children: (
                <RawConfiguration
                    rawConfiguration={rawMainConfiguration}
                    readOnly
                />
            ),
        },
        {
            label: 'Common Configuration',
            value: 'commonConfiguration',
            children: (
                <ConfigurationsTabs
                    configurationValues={commonConfigurationValues}
                    configurations={commonConfiguration}
                    setConfigurationValues={newValues =>
                        setMainConfigurationValues(newValues)
                    }
                />
            ),
        },
        {
            label: 'Raw Common Configuration',
            value: 'Raw Common Configuration',
            children: (
                <RawConfiguration
                    rawConfiguration={rawCommonConfiguration}
                    readOnly
                />
            ),
        },
    ];

    if (
        ProducerUtils.isSchemaRegistrySerializer(keySerializer) ||
        ProducerUtils.isSchemaRegistrySerializer(valueSerializer)
    ) {
        items.push({
            label: 'Serializers Configuration',
            value: 'serializersConfiguration',
            children: (
                <BlazingProducerDetailsSerializers
                    keySerializer={keySerializer}
                    valueSerializer={valueSerializer}
                    keySerializerConfiguration={keySerializerConfiguration}
                    valueSerializerConfiguration={valueSerializerConfiguration}
                    setKeySerializerConfiguration={
                        setKeySerializerConfiguration
                    }
                    setValueSerializerConfiguration={
                        setValueSerializerConfiguration
                    }
                    producerCompleteConfiguration={
                        producerCompleteConfiguration
                    }
                />
            ),
        });
    }

    const serializerOptions = useMemo(() => {
        if (hasSchemaRegistry) {
            return [
                ProducerUtils.PRODUCER_SERIALIZER_PER_REQUEST_OPTION,
                ...ProducerUtils.PRODUCER_SERIALIZER_COMMON_OPTIONS,
                ...ProducerUtils.PRODUCER_SERIALIZER_SCHEMA_REGISTRY_OPTIONS,
            ];
        } else {
            return [
                ProducerUtils.PRODUCER_SERIALIZER_PER_REQUEST_OPTION,
                ...ProducerUtils.PRODUCER_SERIALIZER_COMMON_OPTIONS,
            ];
        }
    }, [hasSchemaRegistry]);

    return (
        <>
            <div className="flex flex-col h-full w-full">
                <Grid className="pb-3 items-end h-auto">
                    <Grid.Col span={12} md={4} xl={3}>
                        <Input.Wrapper required label="Key Serializer">
                            <CommonSelect
                                data={serializerOptions}
                                placeholder={
                                    keySerializer ||
                                    'Please select a key serializer'
                                }
                                value={keySerializer}
                                onChange={value => {
                                    setKeySerializer(value);
                                }}
                                error={!keySerializer ? true : false}
                                maxDropdownHeight={300}
                                loading={
                                    isGetProducerCompleteConfigurationPending
                                }
                                disabled
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} md={4} xl={3}>
                        <Input.Wrapper required label="Value Serializer">
                            <CommonSelect
                                data={serializerOptions}
                                placeholder={
                                    valueSerializer ||
                                    'Please select a value serializer'
                                }
                                value={valueSerializer}
                                onChange={value => {
                                    setValueSerializer(value);
                                }}
                                error={!valueSerializer ? true : false}
                                maxDropdownHeight={300}
                                loading={
                                    isGetProducerCompleteConfigurationPending
                                }
                                disabled
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                </Grid>

                <CommonTabs
                    container={{
                        variant: 'default',
                        defaultValue: selectedTab,
                        value: selectedTab,
                        onTabChange: setSelectedTab,
                        className: 'h-full',
                    }}
                    items={items}
                />
            </div>
        </>
    );
};

export default BlazingProducerDetailsBodyComponent;
