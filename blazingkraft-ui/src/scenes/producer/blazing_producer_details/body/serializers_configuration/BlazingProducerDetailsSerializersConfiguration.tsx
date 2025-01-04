import { Grid } from '@mantine/core';
import { ProducerSerializer } from 'common/types/producer';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { useMemo } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';

interface BlazingProducerDetailsSerializersConfigurationProps {
    serializer: ProducerSerializer;
    serializerConfiguration: Map<string, string>;
    setSerializerConfiguration: any;
    isKey: boolean;
}

function BlazingProducerDetailsSerializersConfiguration({
    serializerConfiguration,
    serializer,
    isKey,
}: BlazingProducerDetailsSerializersConfigurationProps) {
    const serializerConfigurationDef = useMemo(() => {
        return KafkaConfigurationUtils.disableConfigurations(
            ProducerUtils.schemaRegistrySerializerConfiguration(
                serializer,
                isKey,
                false,
            ),
        );
    }, [serializer]);
    return (
        <Grid>
            <Grid.Col>
                <ConfigurationsTabs
                    configurationValues={serializerConfiguration}
                    configurations={serializerConfigurationDef}
                    setConfigurationValues={() => {
                        // no-op
                    }}
                />
            </Grid.Col>
        </Grid>
    );
}

export default BlazingProducerDetailsSerializersConfiguration;
