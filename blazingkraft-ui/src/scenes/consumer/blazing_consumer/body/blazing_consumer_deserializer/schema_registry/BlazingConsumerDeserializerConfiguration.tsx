import { ConsumerDeserializer } from 'common/types/consumer';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';

interface BlazingConsumerDeserializerConfigurationProps {
    perRequestDeserializer: boolean;
    deserializer: ConsumerDeserializer;
    deserializerConfiguration: Map<string, string>;
    setDeserializerConfiguration: any;
    isKey: boolean;
}

function BlazingConsumerDeserializerConfiguration({
    perRequestDeserializer,
    deserializerConfiguration,
    setDeserializerConfiguration,
    deserializer,
    isKey,
}: BlazingConsumerDeserializerConfigurationProps) {
    return (
        <>
            <ConfigurationsTabs
                configurationValues={deserializerConfiguration}
                configurations={ConsumerUtils.schemaRegistryDeserializerConfiguration(
                    deserializer,
                    isKey,
                    !perRequestDeserializer,
                )}
                setConfigurationValues={newValues => {
                    setDeserializerConfiguration(newValues);
                }}
            />
        </>
    );
}

export default BlazingConsumerDeserializerConfiguration;
