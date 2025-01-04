import {
    ConsumerConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import BlazingConsumerDeserializerConfiguration from './BlazingConsumerDeserializerConfiguration';

interface BlazingConsumerDeserializerConfigurationTabsProps {
    consumerConfiguration: ConsumerConfiguration;
    setKeyDeserializerConfiguration: any;

    setValueDeserializerConfiguration: any;

    valueDeserializer: ConsumerDeserializer;

    keyDeserializer: ConsumerDeserializer;

    keyDeserializerConfiguration: Map<string, any>;
    valueDeserializerConfiguration: Map<string, any>;

    deserializerTab: string;
    setDeserializerTab: (deserializerTab: string) => void;
}

function BlazingConsumerDeserializerConfigurationTabs({
    keyDeserializer,
    valueDeserializer,
    keyDeserializerConfiguration,
    valueDeserializerConfiguration,
    setKeyDeserializerConfiguration,
    setValueDeserializerConfiguration,
    consumerConfiguration,
    deserializerTab,
    setDeserializerTab,
}: BlazingConsumerDeserializerConfigurationTabsProps) {
    const items: CommonTabsItemProps[] = [];
    if (ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)) {
        items.push({
            value: 'Key Props',
            label: 'Key Props',
            children: (
                <BlazingConsumerDeserializerConfiguration
                    perRequestDeserializer={
                        consumerConfiguration.perRequestKeyDeserializer
                    }
                    deserializerConfiguration={keyDeserializerConfiguration}
                    setDeserializerConfiguration={
                        setKeyDeserializerConfiguration
                    }
                    deserializer={keyDeserializer}
                    isKey={true}
                />
            ),
        });
    }
    if (ConsumerUtils.isSchemaRegistryDeserializer(valueDeserializer)) {
        items.push({
            value: 'Value Props',
            label: 'Value Props',
            children: (
                <BlazingConsumerDeserializerConfiguration
                    perRequestDeserializer={
                        consumerConfiguration.perRequestValueDeserializer
                    }
                    deserializerConfiguration={valueDeserializerConfiguration}
                    setDeserializerConfiguration={
                        setValueDeserializerConfiguration
                    }
                    deserializer={valueDeserializer}
                    isKey={false}
                />
            ),
        });
    }
    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: deserializerTab,
                value: deserializerTab,
                onTabChange: setDeserializerTab,
                className: 'mt-4',
            }}
            items={items}
        />
    );
}

export default BlazingConsumerDeserializerConfigurationTabs;
