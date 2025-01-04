import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TopicConfiguration } from 'kafka/configuration/TopicConfiguration';
import { useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface CreateTopicBodyComponentProps {
    createTopic: (
        name,
        numPartitions,
        replicationFactor,
        configuration,
    ) => void;
}

function computeInitialMainConfigurationValues() {
    const topicMainDefaultConfig = new Map();
    TopicConfiguration.configurations.forEach(config => {
        topicMainDefaultConfig.set(config.name, config.default);
    });
    return topicMainDefaultConfig;
}

const CreateTopicBodyComponent = ({
    createTopic,
}: CreateTopicBodyComponentProps) => {
    const [topicName, setTopicName] = useState('');
    const [configurationValues, setConfigurationValues] = useState(
        computeInitialMainConfigurationValues(),
    );
    const [numPartitions, setNumPartitions] = useState<number>(1);
    const [replicationFactor, setReplicationFactor] = useState<number>(1);
    const [isRawConfigurationSyntaxValid, setIsRawConfigurationSyntaxValid] =
        useState<boolean>(true);

    const [rawConfiguration, setRawConfiguration] = useState(
        CommonUtils.beautifyJson(CommonUtils.mapToObject(configurationValues)),
    );

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={6} xl={4}>
                        <CommonTextInput
                            required
                            label="Topic Name"
                            placeholder="Topic Name"
                            onChange={value => {
                                setTopicName(value);
                            }}
                            error={!topicName ? true : false}
                            value={topicName}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} xl={2}>
                        <CommonNumberInput
                            required
                            label="Partitions"
                            placeholder="Partitions"
                            onChange={value => {
                                setNumPartitions(value);
                            }}
                            value={numPartitions}
                            min={1}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} xl={2}>
                        <CommonNumberInput
                            required
                            label="Replication Factor"
                            placeholder="Replication Factor"
                            onChange={value => {
                                setReplicationFactor(value);
                            }}
                            value={replicationFactor}
                            min={1}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={6} md={6} xl={3}>
                        <CommonButton
                            onClick={() => {
                                createTopic(
                                    topicName,
                                    numPartitions,
                                    replicationFactor,
                                    configurationValues,
                                );
                            }}
                            disabled={
                                !topicName || !isRawConfigurationSyntaxValid
                            }
                        >
                            Create
                        </CommonButton>
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
                                    configurations={
                                        TopicConfiguration.configurations
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
                    ]}
                />
            </div>
        </>
    );
};

export default CreateTopicBodyComponent;
