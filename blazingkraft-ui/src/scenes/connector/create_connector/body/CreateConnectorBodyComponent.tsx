import { Grid, Loader } from '@mantine/core';
import {
    ConnectPlugin,
    ConnectPluginType,
    ConnectPluginValidationResponse,
} from 'common/types/connect_plugin';
import { CommonUtils } from 'common/utils/CommonUtils';
import { KafkaConfiguration } from 'kafka/index';
import { useEffect, useMemo, useState } from 'react';
import { TbCheck, TbInfoCircle, TbX } from 'react-icons/tb';
import CommonButton from 'scenes/common/button/CommonButton';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import CreateConnectorValidationPreview from './validation_preview/CreateConnectorValidationPreview';

interface CreateConnectorBodyComponentProps {
    getConnectPluginConfigKeys: (
        pluginName: string,
        pluginType: ConnectPluginType,
    ) => void;
    isListConnectorConnectPluginsPending: boolean;
    connectPluginValidationResponse: ConnectPluginValidationResponse;
    isValidateConfigurationsPending: boolean;
    createConnector: (
        name: string,
        config: any,
        connectPluginConfigKeys: KafkaConfiguration[],
    ) => void;
    connectorConnectPlugins: ConnectPlugin[];
    validateConfiguration: (
        name: string,
        config: any,
        connectPluginConfigKeys: KafkaConfiguration[],
    ) => Promise<any>;
    isGetConnectPluginConfigKeysPending: boolean;
    connectPluginConfigKeys: KafkaConfiguration[];
    isAuthorizedValidateConfiguration: boolean;
}
function computeConfigurationValues(
    pluginName,
    configurations: KafkaConfiguration[],
) {
    const configurationValues = new Map<string, string>();
    configurationValues.set('name', '');
    configurationValues.set('connector.class', pluginName);
    // configurationValues.set('tasks.max', "1");
    configurations.forEach(config => {
        if (config.name === 'connector.class' || config.name === 'name') {
            return;
        }
        configurationValues.set(config.name, config.default);
    });
    return configurationValues;
}

function renderCreateButton(
    createConnector,
    configurationValues,
    isRawConfigurationSyntaxValid,
    hasConfigurationError,
    connectPluginConfigKeys,
) {
    const action = () =>
        createConnector(
            configurationValues.get('name'),
            configurationValues,
            connectPluginConfigKeys,
        );

    if (hasConfigurationError) {
        return (
            <CommonTooltip label="Invalid Configuration">
                <CommonButton
                    color="yellow"
                    onClick={action}
                    leftIcon={<TbInfoCircle size="1.2rem" />}
                >
                    Create
                </CommonButton>
            </CommonTooltip>
        );
    }
    if (!isRawConfigurationSyntaxValid) {
        return (
            <CommonTooltip label="Invalid Raw Configuration Syntax">
                <CommonButton
                    color="red"
                    onClick={action}
                    leftIcon={<TbInfoCircle size="1.2rem" />}
                >
                    Create
                </CommonButton>
            </CommonTooltip>
        );
    }
    return (
        <CommonButton color="blue" onClick={action}>
            Create
        </CommonButton>
    );
}

const CreateConnectorBodyComponent = ({
    connectPluginValidationResponse,
    createConnector,
    connectorConnectPlugins,
    validateConfiguration,
    getConnectPluginConfigKeys,
    isListConnectorConnectPluginsPending,
    isValidateConfigurationsPending,
    connectPluginConfigKeys,
    isAuthorizedValidateConfiguration,
    isGetConnectPluginConfigKeysPending,
}: CreateConnectorBodyComponentProps) => {
    const [pluginName, setPluginName] = useState(null);
    const [configurationValues, setConfigurationValues] = useState(new Map());
    const [isRawConfigurationSyntaxValid, setIsRawConfigurationSyntaxValid] =
        useState(true);
    const [activeTab, setActiveTab] = useState('Raw Config');
    const [serverErrorMessage, setServerErrorMessage] = useState(null);
    const [hasConfigurationError, setHasConfigurationError] = useState(false);
    const [rawConfiguration, setRawConfiguration] = useState(
        CommonUtils.beautifyJson({}),
    );

    useEffect(() => {
        const computedConfigurationValues = computeConfigurationValues(
            pluginName,
            connectPluginConfigKeys,
        );
        setConfigurationValues(computedConfigurationValues);
        setRawConfiguration(
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(computedConfigurationValues),
            ),
        );
    }, [connectPluginConfigKeys, connectorConnectPlugins]);

    const pluginOptions = useMemo(
        () =>
            connectorConnectPlugins.map(plugin => ({
                label: plugin.class,
                value: plugin.class,
            })),
        [connectorConnectPlugins],
    );

    const doValidateConfig = () => {
        validateConfiguration(
            pluginName,
            configurationValues,
            connectPluginConfigKeys,
        ).catch(err => {
            setServerErrorMessage(CommonUtils.getRestErrorMessage(err));
            setActiveTab('Validation');
        });
    };

    const items: CommonTabsItemProps[] = [
        {
            label: 'Beautified Config',
            value: 'Beautified Config',
            children: (
                <ConfigurationsTabs
                    configurationValues={configurationValues}
                    configurations={connectPluginConfigKeys}
                    setConfigurationValues={newValues => {
                        setConfigurationValues(newValues);
                        const object = CommonUtils.mapToObject(newValues);
                        setRawConfiguration(CommonUtils.beautifyJson(object));
                    }}
                    isLoading={isGetConnectPluginConfigKeysPending}
                />
            ),
        },
        {
            label: 'Raw Config',
            value: 'Raw Config',
            children: (
                <RawConfiguration
                    rawConfiguration={rawConfiguration}
                    setRawConfiguration={setRawConfiguration}
                    setConfigurationValues={setConfigurationValues}
                    setIsRawConfigurationSyntaxValid={
                        setIsRawConfigurationSyntaxValid
                    }
                />
            ),
        },
    ];

    if (isAuthorizedValidateConfiguration) {
        items.push({
            label: (
                <div className="flex items-center">
                    <span className="pr-3">Validation Preview</span>
                    {isValidateConfigurationsPending ? (
                        <Loader size="1.2rem" />
                    ) : hasConfigurationError ? (
                        <>
                            <TbX color="red" size="1.2rem" />
                        </>
                    ) : (
                        <TbCheck color="green" size="1.2rem" />
                    )}
                </div>
            ),
            value: 'Validation',
            children: (
                <CreateConnectorValidationPreview
                    connectPluginValidationResponse={
                        connectPluginValidationResponse
                    }
                    setHasConfigurationError={setHasConfigurationError}
                    serverErrorMessage={serverErrorMessage}
                    setActiveTab={setActiveTab}
                />
            ),
        });
    }

    return (
        <>
            <div className="flex flex-col h-full w-full">
                <Grid className="pb-4 flex items-end h-auto">
                    <Grid.Col span={12} sm={6} xl={6}>
                        <CommonSelect
                            placeholder="Select a plugin"
                            label="Plugin"
                            data={pluginOptions}
                            value={pluginName}
                            onChange={value => {
                                setPluginName(value);
                                const plugin = connectorConnectPlugins.find(
                                    plugin => plugin.class === value,
                                );
                                getConnectPluginConfigKeys(value, plugin?.type);
                                setServerErrorMessage(null);
                            }}
                            creatable
                            searchable
                            loading={isListConnectorConnectPluginsPending}
                            clearable={false}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={3} xl={2}>
                        {renderCreateButton(
                            createConnector,
                            configurationValues,
                            isRawConfigurationSyntaxValid,
                            hasConfigurationError,
                            connectPluginConfigKeys,
                        )}
                    </Grid.Col>
                    {isAuthorizedValidateConfiguration && (
                        <Grid.Col span={12} sm={3} xl={2}>
                            <CommonButton
                                variant="light"
                                onClick={doValidateConfig}
                                disabled={isValidateConfigurationsPending}
                                loading={isValidateConfigurationsPending}
                            >
                                Validate Config
                            </CommonButton>
                        </Grid.Col>
                    )}
                </Grid>
                <CommonTabs
                    container={{
                        variant: 'default',
                        defaultValue: activeTab,
                        value: activeTab,
                        onTabChange: value => setActiveTab(value),
                        className: 'h-full',
                    }}
                    items={items}
                />
            </div>
        </>
    );
};

export default CreateConnectorBodyComponent;
