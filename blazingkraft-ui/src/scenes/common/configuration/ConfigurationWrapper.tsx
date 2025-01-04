import { ActionIcon, Badge, Input } from '@mantine/core';
import { KafkaConfiguration } from 'kafka/index';
import React from 'react';
import { TbQuestionMark } from 'react-icons/tb';
import CommonTooltip from '../tooltip/CommonTooltip';
import ConfigurationInput from './ConfigurationInput';

interface ConfigurationWrapperProps {
    configuration: KafkaConfiguration;
    setDisplayedConfiguration: Function;
    configurationValue: any;
    setConfigurationValue: Function;
}

function InnerConfigurationWrapper({
    configuration,
    setDisplayedConfiguration,
    configurationValue,
    setConfigurationValue,
}: ConfigurationWrapperProps) {
    return (
        <>
            <Input.Wrapper
                id={configuration.name}
                label={
                    <div className="flex justify-between items-center w-full pb-1">
                        <Badge
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan' }}
                            classNames={{
                                root: 'normal-case text-xs mr-1',
                            }}
                        >
                            {configuration.name}
                        </Badge>
                        <CommonTooltip
                            label={`Click to learn more about '${configuration.name}'`}
                        >
                            <ActionIcon
                                variant="outline"
                                size="xs"
                                color="blue"
                                onClick={() =>
                                    setDisplayedConfiguration(configuration)
                                }
                            >
                                <TbQuestionMark />
                            </ActionIcon>
                        </CommonTooltip>
                    </div>
                }
                labelProps={{ style: { width: '100%' } }}
                error={undefined}
            >
                <ConfigurationInput
                    configuration={configuration}
                    configurationValue={configurationValue}
                    setConfigurationValue={setConfigurationValue}
                />
            </Input.Wrapper>
        </>
    );
}

const ConfigurationWrapper = ({
    configuration,
    setDisplayedConfiguration,
    configurationValue,
    setConfigurationValue,
}: ConfigurationWrapperProps) => {
    const memoizedConfiguration = React.useMemo(() => configuration, []);
    const memoizedSetDisplayedConfiguration = React.useCallback(
        value => setDisplayedConfiguration(value),
        [],
    );
    const memoizedConfigurationValue = React.useMemo(
        () =>
            configurationValue === undefined
                ? configuration.default
                : configurationValue,
        [configurationValue],
    );
    const memoizedSetConfigurationValue = React.useCallback(
        (name, value) => setConfigurationValue(name, value),
        [],
    );

    return (
        <MemoizedInnerConfigurationWrapper
            configuration={memoizedConfiguration}
            setDisplayedConfiguration={memoizedSetDisplayedConfiguration}
            configurationValue={memoizedConfigurationValue}
            setConfigurationValue={memoizedSetConfigurationValue}
        />
    );
};

const MemoizedInnerConfigurationWrapper = React.memo(InnerConfigurationWrapper);

export default React.memo(ConfigurationWrapper);
