import { Alert, Grid, Text } from '@mantine/core';
import { SchemaRegistry } from 'common/types/schema_registry';
import { CommonUtils } from 'common/utils/CommonUtils';
import { AdminConfiguration } from 'kafka/configuration/AdminConfiguration';
import { useEffect, useMemo, useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import { ClusterDetails } from 'scenes/cluster/redux';
import CommonButton from 'scenes/common/button/CommonButton';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface EditClusterBodyComponentProps {
    isTestClusterJmxConnectivityPending: boolean;
    testClusterJmxConnectivity: (jmxUrl, jmxEnvironment) => void;
    testClusterClientConnectivity: Function;
    editCluster: (
        color,
        schemaRegistryCode,
        commonConfiguration: Map<string, any>,
        jmxEnabled,
        jmxUrl,
        jmxEnvironment: string,
    ) => void;
    isTestClusterClientConnectivityPending: boolean;
    isAuthorizedTestClusterConnectivity: boolean;
    schemaRegistries: SchemaRegistry[];
    clusterDetails: ClusterDetails;
}

function computeInitialCommonConfigurationValues(
    clusterDetails: ClusterDetails,
) {
    const configurationValues = new Map<string, string>();
    AdminConfiguration.configurations.forEach(config => {
        if (clusterDetails.commonConfiguration.has(config.name)) {
            configurationValues.set(
                config.name,
                clusterDetails.commonConfiguration.get(config.name),
            );
        } else {
            configurationValues.set(config.name, config.default);
        }
    });

    clusterDetails.commonConfiguration.forEach((value, key) => {
        if (!configurationValues.has(key)) {
            configurationValues.set(key, value);
        }
    });

    return configurationValues;
}

const EditClusterBodyComponent = ({
    isTestClusterClientConnectivityPending,
    testClusterClientConnectivity,
    editCluster,
    isAuthorizedTestClusterConnectivity,
    isTestClusterJmxConnectivityPending,
    schemaRegistries,
    clusterDetails,
    testClusterJmxConnectivity,
}: EditClusterBodyComponentProps) => {
    const [clusterName, setClusterName] = useState('');
    const [clusterCode, setClusterCode] = useState('');
    const [schemaRegistryCode, setSchemaRegistryCode] = useState(null);
    const [clusterColor, setClusterColor] = useState('#ff0000ff');
    const [isRawConfigurationSyntaxValid, setIsRawConfigurationSyntaxValid] =
        useState<boolean>(true);
    const [configurationValues, setConfigurationValues] = useState<
        Map<string, string>
    >(new Map());

    const [rawConfiguration, setRawConfiguration] = useState(
        CommonUtils.beautifyJson({}),
    );

    const [jmxEnabled, setJmxEnabled] = useState(false);
    const [jmxUrl, setJmxUrl] = useState(
        'service:jmx:rmi:///jndi/rmi://broker1:9999/jmxrmi',
    );
    const [jmxEnvironment, setJmxEnvironment] = useState(
        CommonUtils.beautifyJson({
            'jmx.remote.credentials': ['userid', 'password'],
        }),
    );

    useEffect(() => {
        setClusterColor(clusterDetails.color);
        setSchemaRegistryCode(clusterDetails.schemaRegistryCode);
        setClusterName(clusterDetails.name);
        setClusterCode(clusterDetails.code);

        const computedConfigurationValues =
            computeInitialCommonConfigurationValues(clusterDetails);
        setConfigurationValues(computedConfigurationValues);
        setRawConfiguration(
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(computedConfigurationValues),
            ),
        );
        setJmxEnabled(clusterDetails.jmxEnabled);
        setJmxUrl(clusterDetails.jmxUrl);
        setJmxEnvironment(
            CommonUtils.beautifyJson(clusterDetails.jmxEnvironment || {}),
        );
    }, [clusterDetails]);

    const schemaRegistryOptions = useMemo(
        () =>
            schemaRegistries.map(schemaRegistry => ({
                label: schemaRegistry.name,
                value: schemaRegistry.code,
            })),
        [schemaRegistries],
    );

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={6} xl={3}>
                        <CommonTextInput
                            required
                            id="cluster-name-input-wrapper-id"
                            label="Cluster Name"
                            description="Cluster Name"
                            placeholder="Cluster Name"
                            error={!clusterCode ? true : false}
                            value={clusterName}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} xl={3}>
                        <CommonTextInput
                            id="cluster-code-input-wrapper-id"
                            label="Cluster Code"
                            placeholder="Cluster Code"
                            description="Auto Generated Cluster Code"
                            value={clusterCode}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} xl={3}>
                        <CommonColorInput
                            description="Cluster Color"
                            label="Color"
                            value={clusterColor}
                            onChange={value => {
                                setClusterColor(value);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} xl={3}>
                        <div className="flex">
                            <CommonButton
                                onClick={() => {
                                    editCluster(
                                        clusterColor,
                                        schemaRegistryCode,
                                        configurationValues,
                                        jmxEnabled,
                                        jmxUrl,
                                        jmxEnvironment,
                                    );
                                }}
                                disabled={!isRawConfigurationSyntaxValid}
                            >
                                Edit
                            </CommonButton>
                            {isAuthorizedTestClusterConnectivity && (
                                <CommonButton
                                    className="ml-3"
                                    variant="light"
                                    onClick={() => {
                                        if (jmxEnabled) {
                                            testClusterJmxConnectivity(
                                                jmxUrl,
                                                jmxEnvironment,
                                            );
                                        }
                                        testClusterClientConnectivity(
                                            configurationValues,
                                        );
                                    }}
                                    loading={
                                        isTestClusterClientConnectivityPending ||
                                        isTestClusterJmxConnectivityPending
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
                            label: 'Beautified Configuration',
                            value: 'Beautified Configuration',
                            children: (
                                <ConfigurationsTabs
                                    configurationValues={configurationValues}
                                    configurations={
                                        AdminConfiguration.configurations
                                    }
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
                                />
                            ),
                        },
                        {
                            label: 'Schema Registry',
                            value: 'Schema Registry',
                            children: (
                                <div className="flex flex-col">
                                    <Alert
                                        icon={<TbAlertCircle size="1.4rem" />}
                                        title="Info"
                                        color="blue"
                                        className="mb-4"
                                    >
                                        <Text>
                                            Selecting a Schema Registry is not
                                            mandatory, but it will allow you to
                                            connect to your Schema Registry in
                                            the Producer/Consumer.
                                        </Text>
                                    </Alert>
                                    <Grid>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={6}
                                            lg={4}
                                        >
                                            <CommonSelect
                                                label="Schema Registry"
                                                onChange={value => {
                                                    setSchemaRegistryCode(
                                                        value,
                                                    );
                                                }}
                                                placeholder="Select a Schema Registry"
                                                data={schemaRegistryOptions}
                                                value={schemaRegistryCode}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </div>
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
                                            <CommonEditorWrapper>
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
        </>
    );
};

export default EditClusterBodyComponent;
