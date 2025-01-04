import { Grid, Input, TextInput } from '@mantine/core';
import { SchemaRegistryDetails } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { SchemaRegistryConfiguration } from 'kafka/configuration/SchemaRegistryConfiguration';
import maxSchemasPerSubjectConfiguration from 'kafka/configuration/schema_registry/max.schemas.per.subject';
import schemaRegistryUrlsConfiguration from 'kafka/configuration/schema_registry/schema.registry.url';
import { useMemo, useState } from 'react';
import ConfigurationModal from 'scenes/common/configuration/ConfigurationModal';
import ConfigurationWrapper from 'scenes/common/configuration/ConfigurationWrapper';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface SchemaRegistryDashboardDetailsComponentProps {
    schemaRegistryDetails: SchemaRegistryDetails;
}

function computeInitialCommonConfigurationValues(
    configurations,
    schemaRegistryDetails: SchemaRegistryDetails,
) {
    const configurationValues = new Map<string, string>();
    configurations.forEach(config => {
        if (schemaRegistryDetails.mainConfiguration.has(config.name)) {
            configurationValues.set(
                config.name,
                schemaRegistryDetails.mainConfiguration.get(config.name),
            );
        } else {
            configurationValues.set(config.name, config.default);
        }
    });

    schemaRegistryDetails.mainConfiguration.forEach((value, key) => {
        if (!configurationValues.has(key)) {
            configurationValues.set(key, value);
        }
    });

    return configurationValues;
}

const SchemaRegistryDashboardDetailsComponent = ({
    schemaRegistryDetails,
}: SchemaRegistryDashboardDetailsComponentProps) => {
    const [displayedConfiguration, setDisplayedConfiguration] =
        useState(undefined);
    const [isConfigurationModalOpened, setIsConfigurationModalOpened] =
        useState(false);

    const computedSchemaConfiguration = useMemo(
        () =>
            KafkaConfigurationUtils.disableConfigurations(
                SchemaRegistryConfiguration.configurations.filter(
                    config =>
                        config.name !== schemaRegistryUrlsConfiguration.name &&
                        config.name !== maxSchemasPerSubjectConfiguration.name,
                ),
            ),
        [],
    );

    const configurationValues = useMemo(
        () =>
            computeInitialCommonConfigurationValues(
                computedSchemaConfiguration,
                schemaRegistryDetails,
            ),
        [schemaRegistryDetails, computedSchemaConfiguration],
    );

    const rawConfiguration = useMemo(
        () =>
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(configurationValues),
            ),
        [configurationValues],
    );

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <Input.Wrapper
                            id="schema-registry-name-input-wrapper-id"
                            required
                            label="Schema Registry Name"
                            description="Schema Registry Name"
                        >
                            <TextInput
                                id="schema-registry-name-input-id"
                                placeholder="Schema Registry Name"
                                value={schemaRegistryDetails.name}
                                disabled
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <Input.Wrapper
                            id="schema-registry-code-input-wrapper-id"
                            required
                            label="Schema Registry Code"
                            description="Auto Generated Schema Registry Code"
                        >
                            <TextInput
                                id="schema-registry-code-input-id"
                                placeholder="Schema Registry Code"
                                disabled
                                value={schemaRegistryDetails.code}
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <CommonColorInput
                            description="Schema Registry Color"
                            label="Schema Registry Color"
                            value={schemaRegistryDetails.color}
                            disabled
                        />
                    </Grid.Col>
                </Grid>
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <ConfigurationWrapper
                            configuration={KafkaConfigurationUtils.disableConfiguration(
                                schemaRegistryUrlsConfiguration,
                            )}
                            key={schemaRegistryUrlsConfiguration.name}
                            setDisplayedConfiguration={config => {
                                setIsConfigurationModalOpened(true);
                                setDisplayedConfiguration(config);
                            }}
                            configurationValue={
                                schemaRegistryDetails.schemaRegistryUrls
                            }
                            setConfigurationValue={() => {
                                // no-op
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <ConfigurationWrapper
                            configuration={KafkaConfigurationUtils.disableConfiguration(
                                maxSchemasPerSubjectConfiguration,
                            )}
                            key={maxSchemasPerSubjectConfiguration.name}
                            setDisplayedConfiguration={config => {
                                setIsConfigurationModalOpened(true);
                                setDisplayedConfiguration(config);
                            }}
                            configurationValue={
                                schemaRegistryDetails.schemasCacheSize
                            }
                            setConfigurationValue={() => {
                                // no-op
                            }}
                        />
                    </Grid.Col>
                </Grid>

                <CommonTabs
                    container={{
                        variant: 'default',
                        defaultValue: 'Beautified Configuration',
                        className: 'h-full',
                    }}
                    items={[
                        {
                            value: 'Beautified Configuration',
                            label: 'Beautified Configuration',
                            children: (
                                <ConfigurationsTabs
                                    configurationValues={configurationValues}
                                    configurations={computedSchemaConfiguration}
                                    setConfigurationValues={() => {
                                        // no-op
                                    }}
                                />
                            ),
                        },
                        {
                            label: 'Raw Configuration',
                            value: 'Raw Configuration',
                            children: (
                                <RawConfiguration
                                    rawConfiguration={rawConfiguration}
                                    readOnly
                                    minHeight="17rem"
                                />
                            ),
                        },
                        {
                            label: 'Monitoring',
                            value: 'Monitoring',
                            children: (
                                <div className="h-full w-full flex flex-col">
                                    <Grid className="flex-1">
                                        <Grid.Col span={12} md={6}>
                                            <Grid>
                                                <Grid.Col span={12}>
                                                    <CommonCheckbox
                                                        label="JMX Enabled"
                                                        disabled
                                                        checked={
                                                            schemaRegistryDetails.jmxEnabled
                                                        }
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <CommonTextInput
                                                        label="JMX full Url"
                                                        value={
                                                            schemaRegistryDetails.jmxUrl
                                                        }
                                                        placeholder="Select a JMX Url"
                                                        disabled
                                                    />
                                                </Grid.Col>
                                            </Grid>
                                        </Grid.Col>
                                        <Grid.Col
                                            span={12}
                                            md={6}
                                            className="pt-4"
                                        >
                                            <CommonEditorWrapper minHeight="15rem">
                                                <CommonEditor
                                                    content={CommonUtils.beautifyJson(
                                                        schemaRegistryDetails.jmxEnvironment ||
                                                            {},
                                                    )}
                                                    defaultValue={CommonUtils.beautifyJson(
                                                        schemaRegistryDetails.jmxEnvironment ||
                                                            {},
                                                    )}
                                                    readOnly
                                                    language="json"
                                                />
                                            </CommonEditorWrapper>
                                        </Grid.Col>
                                    </Grid>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>

            <ConfigurationModal
                opened={isConfigurationModalOpened}
                setOpened={setIsConfigurationModalOpened}
                configuration={displayedConfiguration}
            />
        </>
    );
};

export default SchemaRegistryDashboardDetailsComponent;
