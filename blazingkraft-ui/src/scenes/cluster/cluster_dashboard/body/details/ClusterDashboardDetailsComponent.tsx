import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { AdminConfiguration } from 'kafka/configuration/AdminConfiguration';
import { useMemo } from 'react';
import { ClusterDetails } from 'scenes/cluster/redux';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonColorInput from 'scenes/common/input/CommonColorInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface ClusterDashboardDetailsComponentProps {
    clusterDetails: ClusterDetails;
}

function computeInitialCommonConfigurationValues(
    clusterDetails: ClusterDetails,
    configurations,
) {
    const configurationValues = new Map<string, string>();
    configurations.forEach(config => {
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

const ClusterDashboardDetailsComponent = ({
    clusterDetails,
}: ClusterDashboardDetailsComponentProps) => {
    const configurations = useMemo(
        () =>
            KafkaConfigurationUtils.disableConfigurations(
                AdminConfiguration.configurations,
            ),
        [],
    );

    const configurationValues = useMemo(
        () =>
            computeInitialCommonConfigurationValues(
                clusterDetails,
                configurations,
            ),
        [clusterDetails, configurations],
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
                        <CommonTextInput
                            required
                            id="cluster-name-input-wrapper-id"
                            label="Cluster Name"
                            description="Cluster Name"
                            placeholder="Cluster Name"
                            value={clusterDetails.name}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <CommonTextInput
                            id="cluster-code-input-wrapper-id"
                            label="Cluster Code"
                            placeholder="Cluster Code"
                            description="Auto Generated Cluster Code"
                            value={clusterDetails.code}
                            disabled
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} lg={4}>
                        <CommonColorInput
                            description="Cluster Color"
                            label="Color"
                            value={clusterDetails.color}
                            disabled
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
                            label: 'Beautified Configuration',
                            value: 'Beautified Configuration',
                            children: (
                                <ConfigurationsTabs
                                    configurationValues={configurationValues}
                                    configurations={configurations}
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
                                />
                            ),
                        },
                        {
                            label: 'Schema Registry',
                            value: 'Schema Registry',
                            children: (
                                <div className="flex flex-col">
                                    <Grid>
                                        <Grid.Col
                                            span={12}
                                            sm={6}
                                            md={6}
                                            lg={4}
                                        >
                                            <CommonSelect
                                                label="Schema Registry"
                                                placeholder="No Schema Registry"
                                                data={[]}
                                                value={
                                                    clusterDetails.schemaRegistryCode
                                                }
                                                disabled
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
                                                        disabled
                                                        checked={
                                                            clusterDetails.jmxEnabled
                                                        }
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={12}>
                                                    <CommonTextInput
                                                        label="JMX full Url"
                                                        value={
                                                            clusterDetails.jmxUrl
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
                                            <CommonEditorWrapper minHeight="20rem">
                                                <CommonEditor
                                                    content={CommonUtils.beautifyJson(
                                                        clusterDetails.jmxEnvironment ||
                                                            {},
                                                    )}
                                                    defaultValue={CommonUtils.beautifyJson(
                                                        clusterDetails.jmxEnvironment ||
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
        </>
    );
};

export default ClusterDashboardDetailsComponent;
