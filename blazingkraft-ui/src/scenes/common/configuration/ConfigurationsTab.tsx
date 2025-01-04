import { SimpleGrid } from '@mantine/core';
import { KafkaConfiguration } from 'kafka/index';
import React, { useState } from 'react';
import ConfigurationModal from './ConfigurationModal';
import ConfigurationWrapper from './ConfigurationWrapper';

interface ConfigurationsTabProps {
    configurations: KafkaConfiguration[];
    configurationValues: Map<string, any>;
    setConfigurationValue: (name, value) => void;
}

const ConfigurationsTab = ({
    configurations,
    configurationValues,
    setConfigurationValue,
}: ConfigurationsTabProps) => {
    const [isConfigurationModalOpened, setIsConfigurationModalOpened] =
        useState(false);
    const [displayedConfiguration, setDisplayedConfiguration] =
        useState<any>(undefined);

    return (
        <>
            <SimpleGrid
                cols={3}
                spacing="lg"
                breakpoints={[
                    { maxWidth: 980, cols: 2, spacing: 'md' },
                    { maxWidth: 755, cols: 1, spacing: 'sm' },
                ]}
            >
                {configurations.map(configuration => (
                    <ConfigurationWrapper
                        configuration={configuration}
                        key={configuration.name}
                        setDisplayedConfiguration={config => {
                            setIsConfigurationModalOpened(true);
                            setDisplayedConfiguration(config);
                        }}
                        configurationValue={configurationValues.get(
                            configuration.name,
                        )}
                        setConfigurationValue={setConfigurationValue}
                    />
                ))}
            </SimpleGrid>

            <ConfigurationModal
                opened={isConfigurationModalOpened}
                setOpened={setIsConfigurationModalOpened}
                configuration={displayedConfiguration}
            />
        </>
    );
};

export default React.memo(ConfigurationsTab);
