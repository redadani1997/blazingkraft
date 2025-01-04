import { KafkaConfiguration } from 'kafka/index';
import { CommonUtils } from './CommonUtils';

function disableConfigurations(
    configurations: KafkaConfiguration[],
    reason?: string,
): KafkaConfiguration[] {
    return configurations.map(configuration =>
        disableConfiguration(configuration, reason),
    );
}

function disableConfiguration(
    configuration: KafkaConfiguration,
    reason?: string,
): KafkaConfiguration {
    return {
        ...configuration,
        disabled: true,
        disabledMessage: reason || 'This configuration is read only',
    };
}

function cleanDefaultConfigurationValues(
    configurations: KafkaConfiguration[],
    configurationValues: Map<string, any>,
): Map<string, any> {
    const cleanedConfigurationValues = new Map<string, any>();
    configurations.forEach(configuration => {
        const defaultValue = configuration.default;
        const value = configurationValues.get(configuration.name);

        if (configuration.overriddenDefault || defaultValue != value) {
            cleanedConfigurationValues.set(configuration.name, value);
        }
    });

    CommonUtils.mapToArray(configurationValues).forEach(({ key, value }) => {
        const hasConfiguration = configurations.some(
            configuration => configuration.name === key,
        );

        if (!hasConfiguration) {
            cleanedConfigurationValues.set(key, value);
        }
    });

    return cleanedConfigurationValues;
}

const KafkaConfigurationUtils = {
    disableConfigurations,
    disableConfiguration,
    cleanDefaultConfigurationValues,
};

export default KafkaConfigurationUtils;
