import { Grid } from '@mantine/core';
import { ConsumerDeserializer } from 'common/types/consumer';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import KafkaConfigurationUtils from 'common/utils/KafkaConfigurationUtils';
import { useMemo } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';

interface BlazingConsumerDetailsDeserializerConfigurationProps {
    serializer: ConsumerDeserializer;
    deserializerConfiguration: Map<string, string>;
    setDeserializerConfiguration: any;
    isKey: boolean;
}

function BlazingConsumerDetailsDeserializerConfiguration({
    deserializerConfiguration,
    serializer,
    isKey,
}: BlazingConsumerDetailsDeserializerConfigurationProps) {
    const deserializerConfigurationDef = useMemo(() => {
        return KafkaConfigurationUtils.disableConfigurations(
            ConsumerUtils.schemaRegistryDeserializerConfiguration(
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
                    configurationValues={deserializerConfiguration}
                    configurations={deserializerConfigurationDef}
                    setConfigurationValues={() => {
                        // no-op
                    }}
                />
            </Grid.Col>
        </Grid>
    );
}

export default BlazingConsumerDetailsDeserializerConfiguration;
