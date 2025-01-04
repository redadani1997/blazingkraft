import { ProducerSerializer } from 'common/types/producer';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';

interface BlazingProducerSerializerConfigurationProps {
    perRequestSerializer: boolean;
    serializer: ProducerSerializer;
    serializerConfiguration: Map<string, string>;
    setSerializerConfiguration: any;
    isKey: boolean;
}

function BlazingProducerSerializerConfiguration({
    perRequestSerializer,
    serializerConfiguration,
    setSerializerConfiguration,
    serializer,
    isKey,
}: BlazingProducerSerializerConfigurationProps) {
    return (
        <>
            <ConfigurationsTabs
                configurationValues={serializerConfiguration}
                configurations={ProducerUtils.schemaRegistrySerializerConfiguration(
                    serializer,
                    isKey,
                    !perRequestSerializer,
                )}
                setConfigurationValues={newValues => {
                    setSerializerConfiguration(newValues);
                }}
            />
        </>
    );
}

export default BlazingProducerSerializerConfiguration;
