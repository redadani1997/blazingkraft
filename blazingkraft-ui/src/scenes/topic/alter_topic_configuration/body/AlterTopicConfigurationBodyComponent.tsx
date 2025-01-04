import { Grid } from '@mantine/core';
import { ITopicConfiguration } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TopicConfiguration } from 'kafka/configuration/TopicConfiguration';
import { useEffect, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface AlterTopicConfigurationBodyComponentProps {
    alterTopicConfiguration: (configuration) => void;
    topicConfiguration: ITopicConfiguration;
}

function computeInitialConfigurationValues(
    topicConfiguration: ITopicConfiguration,
) {
    const configurationValues = new Map<string, string>();
    TopicConfiguration.configurations.forEach(config => {
        if (topicConfiguration.topicConfiguration.has(config.name)) {
            configurationValues.set(
                config.name,
                topicConfiguration.topicConfiguration.get(config.name),
            );
        } else {
            configurationValues.set(config.name, config.default);
        }
    });

    topicConfiguration.topicConfiguration.forEach((value, key) => {
        if (!configurationValues.has(key)) {
            configurationValues.set(key, value);
        }
    });

    return configurationValues;
}

const AlterTopicConfigurationBodyComponent = ({
    alterTopicConfiguration,
    topicConfiguration,
}: AlterTopicConfigurationBodyComponentProps) => {
    const [configurationValues, setConfigurationValues] = useState(
        computeInitialConfigurationValues(topicConfiguration),
    );
    const [isRawConfigurationSyntaxValid, setIsRawConfigurationSyntaxValid] =
        useState<boolean>(true);

    const [rawConfiguration, setRawConfiguration] = useState(
        CommonUtils.beautifyJson(CommonUtils.mapToObject(configurationValues)),
    );

    useEffect(() => {
        const computedConfigurationValues =
            computeInitialConfigurationValues(topicConfiguration);
        setConfigurationValues(computedConfigurationValues);
        setRawConfiguration(
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(computedConfigurationValues),
            ),
        );
    }, [topicConfiguration]);

    return (
        <>
            <div className="h-full w-full flex flex-col">
                <Grid className="items-end pb-4 h-auto">
                    <Grid.Col span={12} sm={6} md={6} xl={3}>
                        <CommonButton
                            onClick={() => {
                                alterTopicConfiguration(configurationValues);
                            }}
                            disabled={!isRawConfigurationSyntaxValid}
                        >
                            Alter Configuration
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

export default AlterTopicConfigurationBodyComponent;
