import { ITopicConfiguration } from 'common/types/topic';
import { CommonUtils } from 'common/utils/CommonUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { TopicConfiguration } from 'kafka/configuration/TopicConfiguration';
import { useMemo } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonTabs from 'scenes/common/tabs/CommonTabs';
import TopicDetailsMetadata from './metadata/TopicDetailsMetadata';
import TopicDetailsPartitionsOffset from './partitions_and_offsets/TopicDetailsPartitionsOffset';
import TopicSubjectsDetails from './subjects/TopicSubjectsDetails';

interface TopicDetailsBodyComponentProps {
    topicConfiguration: ITopicConfiguration;
    schemaRegistryCode?: string;
    isAuthorizedDescribeSubjects: boolean;
}

function computeInitialConfigurationValues(
    topicConfiguration: ITopicConfiguration,
    configurations,
) {
    const configurationValues = new Map<string, string>();
    configurations.forEach(config => {
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

const TopicDetailsBodyComponent = ({
    topicConfiguration,
    schemaRegistryCode,
    isAuthorizedDescribeSubjects,
}: TopicDetailsBodyComponentProps) => {
    const configurations = useMemo(
        () =>
            KafkaConfigurationUtils.disableConfigurations(
                TopicConfiguration.configurations,
            ),
        [],
    );

    const configurationValues = useMemo(
        () =>
            computeInitialConfigurationValues(
                topicConfiguration,
                configurations,
            ),
        [topicConfiguration, configurations],
    );

    const rawConfiguration = useMemo(
        () =>
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(configurationValues),
            ),
        [configurationValues],
    );

    const items = [
        {
            label: 'Partitions & Offsets',
            value: 'PartitionsOffsets',
            children: <TopicDetailsPartitionsOffset />,
        },
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
    ];

    if (schemaRegistryCode && isAuthorizedDescribeSubjects) {
        items.push({
            label: 'Schemas',
            value: 'Schemas',
            children: <TopicSubjectsDetails />,
        });
    }

    return (
        <div className="flex flex-col w-full h-full">
            <TopicDetailsMetadata />
            <CommonTabs
                container={{
                    variant: 'outline',
                    defaultValue: 'PartitionsOffsets',
                    className: 'h-full',
                }}
                items={items}
            />
        </div>
    );
};

export default TopicDetailsBodyComponent;
