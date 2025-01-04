import {
    ProducerCompleteConfiguration,
    ProducerSerializer,
} from 'common/types/producer';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { useEffect, useState } from 'react';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import EditProducerSerializerConfiguration from './EditProducerSerializerConfiguration';

interface EditProducerSerializersComponentProps {
    keySerializer: ProducerSerializer;
    valueSerializer: ProducerSerializer;
    keySerializerConfiguration: Map<string, any>;
    valueSerializerConfiguration: Map<string, any>;
    setKeySerializerConfiguration: (
        keySerializerConfiguration: Map<string, any>,
    ) => void;
    setValueSerializerConfiguration: (
        valueSerializerConfiguration: Map<string, any>,
    ) => void;
    producerCompleteConfiguration?: ProducerCompleteConfiguration;
}

function EditProducerSerializersComponent({
    keySerializer,
    valueSerializer,
    keySerializerConfiguration,
    valueSerializerConfiguration,
    setKeySerializerConfiguration,
    setValueSerializerConfiguration,
    producerCompleteConfiguration,
}: EditProducerSerializersComponentProps) {
    const [serializerTab, setSerializerTab] = useState<string>(
        ProducerUtils.isSchemaRegistrySerializer(keySerializer)
            ? 'Key Props'
            : 'Value Props',
    );
    useEffect(() => {
        if (ProducerUtils.isSchemaRegistrySerializer(keySerializer)) {
            setSerializerTab('Key Props');
        } else {
            setSerializerTab('Value Props');
        }
    }, [keySerializer]);
    useEffect(() => {
        if (ProducerUtils.isSchemaRegistrySerializer(valueSerializer)) {
            setSerializerTab('Value Props');
        } else {
            setSerializerTab('Key Props');
        }
    }, [valueSerializer]);
    useEffect(() => {
        if (keySerializer === producerCompleteConfiguration?.keySerializer) {
            setValueSerializerConfiguration(
                producerCompleteConfiguration.valueSerializerConfiguration,
            );
        } else if (ProducerUtils.isSchemaRegistrySerializer(valueSerializer)) {
            const initialValueSerializerConfiguration =
                ProducerUtils.computeInitialSerializerConfiguration(
                    valueSerializer,
                    false,
                    false,
                );
            setValueSerializerConfiguration(
                initialValueSerializerConfiguration,
            );
        }
    }, [valueSerializer]);
    useEffect(() => {
        if (
            valueSerializer === producerCompleteConfiguration?.valueSerializer
        ) {
            setKeySerializerConfiguration(
                producerCompleteConfiguration.keySerializerConfiguration,
            );
        } else if (ProducerUtils.isSchemaRegistrySerializer(keySerializer)) {
            const initialKeySerializerConfiguration =
                ProducerUtils.computeInitialSerializerConfiguration(
                    keySerializer,
                    true,
                    false,
                );
            setKeySerializerConfiguration(initialKeySerializerConfiguration);
        }
    }, [keySerializer]);

    const items: CommonTabsItemProps[] = [];
    if (ProducerUtils.isSchemaRegistrySerializer(keySerializer)) {
        items.push({
            value: 'Key Props',
            label: 'Key Props',
            children: (
                <EditProducerSerializerConfiguration
                    serializerConfiguration={keySerializerConfiguration}
                    setSerializerConfiguration={setKeySerializerConfiguration}
                    serializer={keySerializer}
                    isKey={true}
                />
            ),
        });
    }
    if (ProducerUtils.isSchemaRegistrySerializer(valueSerializer)) {
        items.push({
            value: 'Value Props',
            label: 'Value Props',
            children: (
                <EditProducerSerializerConfiguration
                    serializerConfiguration={valueSerializerConfiguration}
                    setSerializerConfiguration={setValueSerializerConfiguration}
                    serializer={valueSerializer}
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
                onTabChange: setSerializerTab,
                className: 'mt-2',
            }}
            items={items}
        />
    );
}

export default EditProducerSerializersComponent;
