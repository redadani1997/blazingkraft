import { Checkbox, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { KafkaConfiguration } from 'kafka/index';
import FilesManagementButton from 'scenes/files/button/FilesManagementButton';
import CommonNumberInput from '../input/CommonNumberInput';
import CommonTextarea from '../input/CommonTextarea';
import CommonSelect from '../select/CommonSelect';
import CommonTooltip from '../tooltip/CommonTooltip';

function WithTooltip({
    children,
    configuration,
}: {
    children: any;
    configuration: KafkaConfiguration;
}) {
    return !configuration.disabledMessage ? (
        children
    ) : (
        <CommonTooltip label={configuration.disabledMessage}>
            {children}
        </CommonTooltip>
    );
}

function formatNumericConfigurationValue(
    value: any,
    configuration: KafkaConfiguration,
) {
    if (configuration.numericUnit === 'BYTES') {
        return (
            <Text size="sm" color="dimmed">
                {CommonUtils.beautifyBytes(value)}
            </Text>
        );
    }
    if (configuration.numericUnit === 'MILLISECONDS') {
        return (
            <Text size="sm" color="dimmed">
                {CommonUtils.beautifyMilliseconds(value)}
            </Text>
        );
    }
    if (configuration.numericUnit === 'SECONDS') {
        return (
            <Text size="sm" color="dimmed">
                {CommonUtils.beautifySeconds(value)}
            </Text>
        );
    }
    return undefined;
}

const ConfigurationInput = ({
    configuration,
    configurationValue,
    setConfigurationValue,
}: {
    configuration: KafkaConfiguration;
    configurationValue: any;
    setConfigurationValue: Function;
}) => {
    const commonProps = {
        id: configuration.name,
        placeholder: configuration.name,
        value: configurationValue === null ? '' : configurationValue,
        onChange: event => {
            setConfigurationValue(
                configuration.name,
                event.target?.value ?? event,
            );
        },
        disabled: configuration.disabledForever || configuration.disabled,
    };
    if (configuration.isFileConfig) {
        return (
            <WithTooltip configuration={configuration}>
                <FilesManagementButton
                    value={configurationValue}
                    setValue={(value: string) =>
                        setConfigurationValue(configuration.name, value)
                    }
                    disabled={
                        configuration.disabledForever || configuration.disabled
                    }
                />
            </WithTooltip>
        );
    }
    if (configuration.isSelectable) {
        return (
            <WithTooltip configuration={configuration}>
                <CommonSelect
                    {...commonProps}
                    data={configuration.options}
                    creatable
                    clearable={false}
                />
            </WithTooltip>
        );
    }
    if (configuration.type === 'BOOLEAN') {
        const booleanValue =
            configurationValue === true || configurationValue === 'true';
        return (
            <WithTooltip configuration={configuration}>
                <Checkbox
                    disabled={
                        configuration.disabledForever || configuration.disabled
                    }
                    className="pt-2"
                    checked={booleanValue}
                    onChange={() =>
                        setConfigurationValue(configuration.name, !booleanValue)
                    }
                />
            </WithTooltip>
        );
    }
    if (
        configuration.type === 'INT' ||
        configuration.type === 'DOUBLE' ||
        configuration.type === 'SHORT' ||
        configuration.type === 'LONG'
    ) {
        return (
            <WithTooltip configuration={configuration}>
                <CommonNumberInput
                    {...commonProps}
                    value={Number(configurationValue)}
                    onChange={value =>
                        setConfigurationValue(configuration.name, value)
                    }
                    rightSectionWidth="auto"
                    rightSectionProps={{
                        style: {
                            paddingRight: configuration.numericUnit
                                ? '10px'
                                : undefined,
                        },
                    }}
                    rightSection={formatNumericConfigurationValue(
                        configurationValue,
                        configuration,
                    )}
                />
            </WithTooltip>
        );
    }
    return (
        <WithTooltip configuration={configuration}>
            <CommonTextarea {...commonProps} />
        </WithTooltip>
    );
};

export default ConfigurationInput;
