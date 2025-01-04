import {
    ConsumerCompleteConfiguration,
    ConsumerDeserializer,
} from 'common/types/consumer';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import { useEffect, useState } from 'react';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import EditConsumerDeserializerConfiguration from './EditConsumerDeserializerConfiguration';

interface EditConsumerDeserializersComponentProps {
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    keyDeserializerConfiguration: Map<string, any>;
    valueDeserializerConfiguration: Map<string, any>;
    setKeyDeserializerConfiguration: (
        keyDeserializerConfiguration: Map<string, any>,
    ) => void;
    setValueDeserializerConfiguration: (
        valueDeserializerConfiguration: Map<string, any>,
    ) => void;
    consumerCompleteConfiguration?: ConsumerCompleteConfiguration;
}

function EditConsumerDeserializersComponent({
    keyDeserializer,
    valueDeserializer,
    keyDeserializerConfiguration,
    valueDeserializerConfiguration,
    setKeyDeserializerConfiguration,
    setValueDeserializerConfiguration,
    consumerCompleteConfiguration,
}: EditConsumerDeserializersComponentProps) {
    const [serializerTab, setDeserializerTab] = useState<string>(
        ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)
            ? 'Key Props'
            : 'Value Props',
    );
    useEffect(() => {
        if (ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)) {
            setDeserializerTab('Key Props');
        } else {
            setDeserializerTab('Value Props');
        }
    }, [keyDeserializer]);
    useEffect(() => {
        if (ConsumerUtils.isSchemaRegistryDeserializer(valueDeserializer)) {
            setDeserializerTab('Value Props');
        } else {
            setDeserializerTab('Key Props');
        }
    }, [valueDeserializer]);
    useEffect(() => {
        if (
            valueDeserializer ===
                consumerCompleteConfiguration?.valueDeserializer &&
            consumerCompleteConfiguration?.valueDeserializerConfiguration
        ) {
            setValueDeserializerConfiguration(
                consumerCompleteConfiguration.valueDeserializerConfiguration,
            );
        } else if (
            ConsumerUtils.isSchemaRegistryDeserializer(valueDeserializer)
        ) {
            const initialValueDeserializerConfiguration =
                ConsumerUtils.computeInitialDeserializerConfiguration(
                    valueDeserializer,
                    false,
                    false,
                );
            setValueDeserializerConfiguration(
                initialValueDeserializerConfiguration,
            );
        }
    }, [valueDeserializer]);
    useEffect(() => {
        if (
            keyDeserializer ===
                consumerCompleteConfiguration?.keyDeserializer &&
            consumerCompleteConfiguration?.keyDeserializerConfiguration
        ) {
            setKeyDeserializerConfiguration(
                consumerCompleteConfiguration.keyDeserializerConfiguration,
            );
        } else if (
            ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)
        ) {
            const initialKeyDeserializerConfiguration =
                ConsumerUtils.computeInitialDeserializerConfiguration(
                    keyDeserializer,
                    true,
                    false,
                );
            setKeyDeserializerConfiguration(
                initialKeyDeserializerConfiguration,
            );
        }
    }, [keyDeserializer]);

    const items: CommonTabsItemProps[] = [];
    if (ConsumerUtils.isSchemaRegistryDeserializer(keyDeserializer)) {
        items.push({
            value: 'Key Props',
            label: 'Key Props',
            children: (
                <EditConsumerDeserializerConfiguration
                    deserializerConfiguration={keyDeserializerConfiguration}
                    setDeserializerConfiguration={
                        setKeyDeserializerConfiguration
                    }
                    serializer={keyDeserializer}
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
                <EditConsumerDeserializerConfiguration
                    deserializerConfiguration={valueDeserializerConfiguration}
                    setDeserializerConfiguration={
                        setValueDeserializerConfiguration
                    }
                    serializer={valueDeserializer}
                    isKey={false}
                />
            ),
        });
    }
    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: serializerTab,
                value: serializerTab,
                onTabChange: setDeserializerTab,
                className: 'mt-2',
            }}
            items={items}
        />
    );
}

export default EditConsumerDeserializersComponent;
