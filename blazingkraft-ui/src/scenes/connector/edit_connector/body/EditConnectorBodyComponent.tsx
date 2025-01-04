import { Grid, Loader } from '@mantine/core';
import {
    ConnectPlugin,
    ConnectPluginType,
    ConnectPluginValidationResponse,
} from 'common/types/connect_plugin';
import { ConnectorInfo } from 'common/types/connector';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { KafkaConfiguration } from 'kafka/index';
import { useEffect, useMemo, useState } from 'react';
import { TbCheck, TbInfoCircle, TbX } from 'react-icons/tb';
import { useParams } from 'react-router';
import CommonButton from 'scenes/common/button/CommonButton';
import ConfigurationsTabs from 'scenes/common/configuration/ConfigurationsTabs';
import RawConfiguration from 'scenes/common/raw_configuration/RawConfiguration';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';
import EditConnectorValidationPreview from './validation_preview/EditConnectorValidationPreview';

interface EditConnectorBodyComponentProps {
    getConnectPluginConfigKeys: (
        pluginName: string,
        pluginType: ConnectPluginType,
    ) => void;
    isListConnectorConnectPluginsPending: boolean;
    connectPluginValidationResponse: ConnectPluginValidationResponse | null;
    isValidateConfigurationsPending: boolean;
    editConnectorConfig: (
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
    connectorInfo: ConnectorInfo | null;
    isAuthorizedValidateConfiguration: boolean;
}

function renderEditButton(
    editConnectorConfig,
    configurationValues,
    isRawConfigurationSyntaxValid,
    hasConfigurationError,
    connectPluginConfigKeys: KafkaConfiguration[],
) {
    const action = () =>
        editConnectorConfig(configurationValues, connectPluginConfigKeys);

    if (hasConfigurationError) {
        return (
            <CommonTooltip label="Invalid Configuration">
                <CommonButton
                    color="yellow"
                    onClick={action}
                    leftIcon={<TbInfoCircle size="1.2rem" />}
                >
                    Edit
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
                    Edit
                </CommonButton>
            </CommonTooltip>
        );
    }
    return (
        <CommonButton color="blue" onClick={action}>
            Edit
        </CommonButton>
    );
}

function computeConfigurationValues(
    pluginName,
    configurations: KafkaConfiguration[],
    connectorInfo: ConnectorInfo | null,
    connector: string,
) {
    const existingPluginName = CommonValidationUtils.isTruthy(connectorInfo)
        ? connectorInfo.config['connector.class']
        : null;

    if (
        CommonValidationUtils.isTruthy(connectorInfo) &&
        CommonValidationUtils.isTruthy(pluginName) &&
        CommonValidationUtils.isTruthy(existingPluginName) &&
        pluginName === existingPluginName
    ) {
        const configurationValues: Map<string, any> = CommonUtils.objectToMap(
            connectorInfo.config,
        );
        configurations.forEach(config => {
            if (!configurationValues.has(config.name)) {
                configurationValues.set(config.name, config.default);
            }
        });
        return configurationValues;
    } else {
        const configurationValues: Map<string, any> = new Map<string, string>();
        configurationValues.set('name', connector);
        configurationValues.set('connector.class', pluginName);
        configurations.forEach(config => {
            if (config.name === 'connector.class' || config.name === 'name') {
                return;
            }
            configurationValues.set(config.name, config.default);
        });
        return configurationValues;
    }
}

const EditConnectorBodyComponent = ({
    connectPluginValidationResponse,
    editConnectorConfig,
    connectorConnectPlugins,
    validateConfiguration,
    getConnectPluginConfigKeys,
    isListConnectorConnectPluginsPending,
    isValidateConfigurationsPending,
    connectPluginConfigKeys,
    connectorInfo,
    isAuthorizedValidateConfiguration,
    isGetConnectPluginConfigKeysPending,
}: EditConnectorBodyComponentProps) => {
    const { connector } = useParams();

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
            connectorInfo,
            connector,
        );
        setConfigurationValues(computedConfigurationValues);
        setRawConfiguration(
            CommonUtils.beautifyJson(
                CommonUtils.mapToObject(computedConfigurationValues),
            ),
        );
    }, [connectPluginConfigKeys, connectorConnectPlugins, connectorInfo]);

    useEffect(() => {
        if (CommonValidationUtils.isTruthy(connectorInfo)) {
            setPluginName(connectorInfo.config['connector.class']);
        }
    }, [connectorInfo]);

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
                <EditConnectorValidationPreview
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
                                setHasConfigurationError(false);
                                setServerErrorMessage(null);
                            }}
                            creatable
                            searchable
                            loading={isListConnectorConnectPluginsPending}
                            clearable={false}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={3} xl={2}>
                        {renderEditButton(
                            editConnectorConfig,
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

export default EditConnectorBodyComponent;
