import { Grid, Input } from '@mantine/core';
import {
    ConsumerCompleteConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { AdminConfiguration } from 'kafka/configuration/AdminConfiguration';
import { ConsumerConfiguration } from 'kafka/configuration/ConsumerConfiguration';
import { useEffect, useMemo, useState } from 'react';
import ConfigurationInput from 'scenes/common/configuration/ConfigurationInput';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import BlazingConsumerDetailsDeserializers from './deserializers_configuration/BlazingConsumerDetailsDeserializers';

interface BlazingConsumerDetailsBodyComponentProps {
    consumerCompleteConfiguration?: ConsumerCompleteConfiguration;
    isGetConsumerCompleteConfigurationPending: boolean;
}

function computeInitialCommonConfigurationValues(
    consumerCompleteConfiguration: ConsumerCompleteConfiguration,
) {
    const configurationValues = new Map<string, string>();
    AdminConfiguration.configurations.forEach(config => {
        const value = consumerCompleteConfiguration?.commonConfiguration?.get(
            config.name,
        );
        configurationValues.set(
            config.name,
            value === undefined ? config.default : value,
        );
    });

    consumerCompleteConfiguration?.commonConfiguration?.forEach(
        (value, key) => {
            if (!configurationValues.has(key)) {
                configurationValues.set(key, value);
            }
        },
    );

    return configurationValues;
}

function computeInitialMainConfigurationValues(
    consumerCompleteConfiguration: ConsumerCompleteConfiguration,
) {
    const configurationValues = new Map<string, string>();
    ConsumerConfiguration.configurations.forEach(config => {
        const value = consumerCompleteConfiguration?.mainConfiguration?.get(
            config.name,
        );
        configurationValues.set(
            config.name,
            value === undefined ? config.default : value,
        );
    });

    consumerCompleteConfiguration?.mainConfiguration?.forEach((value, key) => {
        if (!configurationValues.has(key)) {
            configurationValues.set(key, value);
        }
    });

    return configurationValues;
}

const BlazingConsumerDetailsBodyComponent = ({
    consumerCompleteConfiguration,
    isGetConsumerCompleteConfigurationPending,
}: BlazingConsumerDetailsBodyComponentProps) => {
    const [selectedTab, setSelectedTab] = useState<string>('mainConfiguration');
    const [mainConfigurationValues, setMainConfigurationValues] = useState<
        Map<string, string>
    >(computeInitialMainConfigurationValues(consumerCompleteConfiguration));

    const [keyDeserializer, setKeyDeserializer] = useState<
        ConsumerDeserializer | undefined
    >(undefined);
    const [keyDeserializerConfiguration, setKeyDeserializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());
    const [valueDeserializer, setValueDeserializer] = useState<
        ConsumerDeserializer | undefined
    >(undefined);
    const [valueDeserializerConfiguration, setValueDeserializerConfiguration] =
        useState<Map<string, any> | undefined>(new Map<string, any>());

    const [pollTimeoutMs, setPollTimeoutMs] = useState<number>(1000);

    const commonConfigurationValues: Map<string, any> = useMemo(() => {
        return computeInitialCommonConfigurationValues(
            consumerCompleteConfiguration,
        );
    }, [consumerCompleteConfiguration]);
    const [hasSchemaRegistry, setHasSchemaRegistry] = useState<boolean>(true);

    const commonConfiguration = useMemo(() => {
        return KafkaConfigurationUtils.disableConfigurations(
            AdminConfiguration.configurations,
            'This configuration is inherited from the cluster configuration',
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
        if (consumerCompleteConfiguration) {
            setKeyDeserializer(
                consumerCompleteConfiguration.perRequestKeyDeserializer
                    ? 'PER_REQUEST'
                    : consumerCompleteConfiguration.keyDeserializer,
            );
            setKeyDeserializerConfiguration(
                consumerCompleteConfiguration.keyDeserializerConfiguration,
            );
            setValueDeserializer(
                consumerCompleteConfiguration.perRequestValueDeserializer
                    ? 'PER_REQUEST'
                    : consumerCompleteConfiguration.valueDeserializer,
            );
            setValueDeserializerConfiguration(
                consumerCompleteConfiguration.valueDeserializerConfiguration,
            );
            setMainConfigurationValues(
                computeInitialMainConfigurationValues(
                    consumerCompleteConfiguration,
                ),
            );
            setHasSchemaRegistry(
                CommonValidationUtils.isTruthy(
                    consumerCompleteConfiguration.schemaRegistryCode,
                ),
            );
            setPollTimeoutMs(consumerCompleteConfiguration.pollTimeoutMs);
        }
    }, [consumerCompleteConfiguration]);

    useEffect(() => {
        if (
            !ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer) &&
            !ConsumerUtils.isSchemaRegistryDeserializer(valueDeserializer) &&
            selectedTab === 'serializersConfiguration'
        ) {
            setSelectedTab('mainConfiguration');
        }
    }, [keyDeserializer, valueDeserializer]);

    const configurations = useMemo(() => {
        return KafkaConfigurationUtils.disableConfigurations(
            ConsumerConfiguration.configurations,
        );
    }, []);

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
                    setConfigurationValues={() => {
                        // no-op
                    }}
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
        ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer) ||
        ConsumerUtils.isSchemaRegistryDeserializer(valueDeserializer)
    ) {
        items.push({
            label: 'Deserializers Configuration',
            value: 'serializersConfiguration',
            children: (
                <BlazingConsumerDetailsDeserializers
                    keyDeserializer={keyDeserializer}
                    valueDeserializer={valueDeserializer}
                    keyDeserializerConfiguration={keyDeserializerConfiguration}
                    valueDeserializerConfiguration={
                        valueDeserializerConfiguration
                    }
                    setKeyDeserializerConfiguration={
                        setKeyDeserializerConfiguration
                    }
                    setValueDeserializerConfiguration={
                        setValueDeserializerConfiguration
                    }
                    consumerCompleteConfiguration={
                        consumerCompleteConfiguration
                    }
                />
            ),
        });
    }

    const deserializerOptions = useMemo(() => {
        if (hasSchemaRegistry) {
            return [
                ConsumerUtils.CONSUMER_DESERIALIZER_PER_REQUEST_OPTION,
                ...ConsumerUtils.CONSUMER_DESERIALIZER_COMMON_OPTIONS,
                ...ConsumerUtils.CONSUMER_DESERIALIZER_SCHEMA_REGISTRY_OPTIONS,
            ];
        } else {
            return [
                ConsumerUtils.CONSUMER_DESERIALIZER_PER_REQUEST_OPTION,
                ...ConsumerUtils.CONSUMER_DESERIALIZER_COMMON_OPTIONS,
            ];
        }
    }, [hasSchemaRegistry]);

    return (
        <>
            <div className="flex flex-col">
                <Grid className="pb-5 items-end">
                    <Grid.Col span={12} md={4} xl={3}>
                        <Input.Wrapper required label="Key Deserializer">
                            <CommonSelect
                                data={deserializerOptions}
                                placeholder={
                                    keyDeserializer ||
                                    'Please select a key serializer'
                                }
                                value={keyDeserializer}
                                onChange={value => {
                                    setKeyDeserializer(value);
                                }}
                                error={!keyDeserializer ? true : false}
                                maxDropdownHeight={300}
                                loading={
                                    isGetConsumerCompleteConfigurationPending
                                }
                                disabled
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} md={4} xl={3}>
                        <Input.Wrapper required label="Value Deserializer">
                            <CommonSelect
                                data={deserializerOptions}
                                placeholder={
                                    valueDeserializer ||
                                    'Please select a value serializer'
                                }
                                value={valueDeserializer}
                                onChange={value => {
                                    setValueDeserializer(value);
                                }}
                                error={!valueDeserializer ? true : false}
                                maxDropdownHeight={300}
                                loading={
                                    isGetConsumerCompleteConfigurationPending
                                }
                                disabled
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} md={3} xl={2}>
                        <Input.Wrapper required label="Poll Timeout (ms)">
                            <ConfigurationInput
                                configuration={{
                                    ...ConsumerUtils.POLL_TIMEOUT_MS_CONFIGURATION,
                                    disabled: true,
                                }}
                                configurationValue={pollTimeoutMs}
                                setConfigurationValue={(name, value) =>
                                    setPollTimeoutMs(value)
                                }
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
                    }}
                    items={items}
                />
            </div>
        </>
    );
};

export default BlazingConsumerDetailsBodyComponent;
