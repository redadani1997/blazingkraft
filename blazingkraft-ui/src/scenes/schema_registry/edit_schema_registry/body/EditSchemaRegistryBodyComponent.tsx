import { Grid, Input, TextInput } from '@mantine/core';
import { SchemaRegistryDetails } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { SchemaRegistryConfiguration } from 'kafka/configuration/SchemaRegistryConfiguration';
import maxSchemasPerSubjectConfiguration from 'kafka/configuration/schema_registry/max.schemas.per.subject';
import schemaRegistryUrlsConfiguration from 'kafka/configuration/schema_registry/schema.registry.url';
import { KafkaConfiguration } from 'kafka/index';
import camelCase from 'lodash.camelcase';
import { useEffect, useMemo, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
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

interface EditSchemaRegistryBodyComponentProps {
    isTestSchemaRegistryJmxConnectivityPending: boolean;
    testSchemaRegistryJmxConnectivity: (jmxUrl, jmxEnvironment) => void;
    testSchemaRegistryClientConnectivity: Function;
    isTestSchemaRegistryClientConnectivityPending: boolean;
    isAuthorizedTestSchemaRegistryConnectivity: boolean;
    editSchemaRegistry: (
        schemaRegistryColor,
        mainConfiguration: Map<string, any>,
        schemaRegistryUrls,
        schemasCacheSize,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment: string,
    ) => Promise<void>;
    schemaRegistryDetails: SchemaRegistryDetails;
}

function computeInitialMainConfigurationValues(
    computedSchemaConfiguration: KafkaConfiguration[],
    schemaRegistryDetails: SchemaRegistryDetails,
) {
    const configurationValues = new Map<string, any>();
    computedSchemaConfiguration.forEach((config: KafkaConfiguration) => {
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

const EditSchemaRegistryBodyComponent = ({
    isTestSchemaRegistryClientConnectivityPending,
    testSchemaRegistryClientConnectivity,
    editSchemaRegistry,
    isAuthorizedTestSchemaRegistryConnectivity,
    schemaRegistryDetails,
    isTestSchemaRegistryJmxConnectivityPending,
    testSchemaRegistryJmxConnectivity,
}: EditSchemaRegistryBodyComponentProps) => {
    const [schemaRegistryName, setSchemaRegistryName] = useState('');
    const [schemaRegistryCode, setSchemaRegistryCode] = useState('');
    const [schemaRegistryColor, setSchemaRegistryColor] = useState('#ff0000ff');
    const [isRawConfigurationSyntaxValid, setIsRawConfigurationSyntaxValid] =
        useState<boolean>(true);
    const [schemaRegistryUrls, setSchemaRegistryUrls] = useState(
        schemaRegistryUrlsConfiguration.default,
    );
    const [schemasCacheSize, setSchemasCacheSize] = useState(
        maxSchemasPerSubjectConfiguration.default,
    );
    const [displayedConfiguration, setDisplayedConfiguration] =
        useState(undefined);
    const [isConfigurationModalOpened, setIsConfigurationModalOpened] =
        useState(false);

    const [jmxEnabled, setJmxEnabled] = useState(false);
    const [jmxUrl, setJmxUrl] = useState(
        'service:jmx:rmi:///jndi/rmi://schema-registry:9996/jmxrmi',
    );
    const [jmxEnvironment, setJmxEnvironment] = useState(
        CommonUtils.beautifyJson({
            'jmx.remote.credentials': ['userid', 'password'],
        }),
    );

    const [rawConfiguration, setRawConfiguration] = useState(
        CommonUtils.beautifyJson({}),
    );

    const computedSchemaConfiguration = useMemo(
        () =>
            SchemaRegistryConfiguration.configurations.filter(
                config =>
                    config.name !== schemaRegistryUrlsConfiguration.name &&
                    config.name !== maxSchemasPerSubjectConfiguration.name,
            ),
        [],
    );
    const [configurationValues, setConfigurationValues] = useState(new Map());

    useEffect(() => {
        setSchemaRegistryName(schemaRegistryDetails.name);
        setSchemaRegistryCode(schemaRegistryDetails.code);
        setSchemaRegistryColor(schemaRegistryDetails.color);
        setSchemaRegistryUrls(schemaRegistryDetails.schemaRegistryUrls);
        setSchemasCacheSize(schemaRegistryDetails.schemasCacheSize);

        const computedConfigurationValues =
            computeInitialMainConfigurationValues(
                computedSchemaConfiguration,
                schemaRegistryDetails,
            );
        setConfigurationValues(computedConfigurationValues);
        setRawConfiguration(
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(computedConfigurationValues),
            ),
        );
        setJmxEnabled(schemaRegistryDetails.jmxEnabled);
        setJmxUrl(schemaRegistryDetails.jmxUrl);
        setJmxEnvironment(
            CommonUtils.beautifyJson(
                schemaRegistryDetails.jmxEnvironment || {},
            ),
        );
    }, [schemaRegistryDetails]);

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
                                onChange={e => {
                                    const name = e.target.value;
                                    setSchemaRegistryName(name);
                                    setSchemaRegistryCode(camelCase(name));
                                }}
                                error={!schemaRegistryCode ? true : false}
                                value={schemaRegistryName}
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
                                value={schemaRegistryCode}
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <CommonColorInput
                            description="Schema Registry Color"
                            label="Schema Registry Color"
                            value={schemaRegistryColor}
                            onChange={value => {
                                setSchemaRegistryColor(value);
                            }}
                        />
                    </Grid.Col>
                </Grid>
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <ConfigurationWrapper
                            configuration={schemaRegistryUrlsConfiguration}
                            key={schemaRegistryUrlsConfiguration.name}
                            setDisplayedConfiguration={config => {
                                setIsConfigurationModalOpened(true);
                                setDisplayedConfiguration(config);
                            }}
                            configurationValue={schemaRegistryUrls}
                            setConfigurationValue={(name, newValue) => {
                                setSchemaRegistryUrls(newValue);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <ConfigurationWrapper
                            configuration={maxSchemasPerSubjectConfiguration}
                            key={maxSchemasPerSubjectConfiguration.name}
                            setDisplayedConfiguration={config => {
                                setIsConfigurationModalOpened(true);
                                setDisplayedConfiguration(config);
                            }}
                            configurationValue={schemasCacheSize}
                            setConfigurationValue={(name, newValue) => {
                                setSchemasCacheSize(newValue);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <div className="flex">
                            <CommonButton
                                onClick={() => {
                                    editSchemaRegistry(
                                        schemaRegistryColor,
                                        configurationValues,
                                        schemaRegistryUrls,
                                        schemasCacheSize,
                                        jmxEnabled,
                                        jmxUrl,
                                        jmxEnvironment,
                                    );
                                }}
                                disabled={
                                    !schemaRegistryCode ||
                                    !schemaRegistryName ||
                                    !isRawConfigurationSyntaxValid
                                }
                            >
                                Edit
                            </CommonButton>
                            {isAuthorizedTestSchemaRegistryConnectivity && (
                                <CommonButton
                                    className="ml-3"
                                    variant="light"
                                    onClick={() => {
                                        if (jmxEnabled) {
                                            testSchemaRegistryJmxConnectivity(
                                                jmxUrl,
                                                jmxEnvironment,
                                            );
                                        }
                                        testSchemaRegistryClientConnectivity(
                                            configurationValues,
                                            schemaRegistryUrls,
                                            schemasCacheSize,
                                        );
                                    }}
                                    loading={
                                        isTestSchemaRegistryClientConnectivityPending ||
                                        isTestSchemaRegistryJmxConnectivityPending
                                    }
                                >
                                    Test Connectivity
                                </CommonButton>
                            )}
                        </div>
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
                                    setConfigurationValues={newValues => {
                                        setConfigurationValues(newValues);
                                        const object =
                                            CommonUtils.mapToObject(newValues);
                                        setRawConfiguration(
                                            CommonUtils.beautifyJson(object),
                                        );
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
                                    setRawConfiguration={setRawConfiguration}
                                    setConfigurationValues={
                                        setConfigurationValues
                                    }
                                    setIsRawConfigurationSyntaxValid={
                                        setIsRawConfigurationSyntaxValid
                                    }
                                    minHeight="20rem"
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
                                                        onChange={() => {
                                                            setJmxEnabled(
                                                                !jmxEnabled,
                                                            );
                                                        }}
                                                        checked={jmxEnabled}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <CommonTextInput
                                                        label="JMX full Url"
                                                        onChange={setJmxUrl}
                                                        value={jmxUrl}
                                                        disabled={!jmxEnabled}
                                                        placeholder="Select a JMX Url"
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
                                                    content={jmxEnvironment}
                                                    defaultValue={
                                                        jmxEnvironment
                                                    }
                                                    onContentChange={
                                                        setJmxEnvironment
                                                    }
                                                    readOnly={!jmxEnabled}
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

export default EditSchemaRegistryBodyComponent;
