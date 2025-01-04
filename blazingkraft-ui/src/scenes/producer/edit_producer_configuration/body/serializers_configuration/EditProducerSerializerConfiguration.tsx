import { Grid } from '@mantine/core';
import { ProducerSerializer } from 'common/types/producer';
import { ProducerUtils } from 'common/utils/ProducerUtils';
import { useMemo } from 'react';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';

interface EditProducerSerializerConfigurationProps {
    serializer: ProducerSerializer;
    serializerConfiguration: Map<string, string>;
    setSerializerConfiguration: any;
    isKey: boolean;
}

function EditProducerSerializerConfiguration({
    serializerConfiguration,
    setSerializerConfiguration,
    serializer,
    isKey,
}: EditProducerSerializerConfigurationProps) {
    const serializerConfigurationDef = useMemo(() => {
        return ProducerUtils.schemaRegistrySerializerConfiguration(
            serializer,
            isKey,
            false,
        );
    }, [serializer]);
    return (
        <Grid>
            <Grid.Col>
                <ConfigurationsTabs
                    configurationValues={serializerConfiguration}
                    configurations={serializerConfigurationDef}
                    setConfigurationValues={newValues => {
                        setSerializerConfiguration(newValues);
                    }}
                />
            </Grid.Col>
        </Grid>
    );
}

export default EditProducerSerializerConfiguration;
