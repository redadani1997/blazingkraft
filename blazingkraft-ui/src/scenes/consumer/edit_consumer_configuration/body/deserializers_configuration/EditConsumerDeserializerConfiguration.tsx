import { Grid } from '@mantine/core';
import { ConsumerDeserializer } from 'common/types/consumer';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import { useMemo } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';

interface EditConsumerDeserializerConfigurationProps {
    serializer: ConsumerDeserializer;
    deserializerConfiguration: Map<string, string>;
    setDeserializerConfiguration: any;
    isKey: boolean;
}

function EditConsumerDeserializerConfiguration({
    deserializerConfiguration,
    setDeserializerConfiguration,
    serializer,
    isKey,
}: EditConsumerDeserializerConfigurationProps) {
    const deserializerConfigurationDef = useMemo(() => {
        return ConsumerUtils.schemaRegistryDeserializerConfiguration(
            serializer,
            isKey,
            false,
        );
    }, [serializer]);

    return (
        <Grid>
            <Grid.Col>
                <ConfigurationsTabs
                    configurationValues={deserializerConfiguration}
                    configurations={deserializerConfigurationDef}
                    setConfigurationValues={newValues => {
                        setDeserializerConfiguration(newValues);
                    }}
                />
            </Grid.Col>
        </Grid>
    );
}

export default EditConsumerDeserializerConfiguration;
