import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import { KafkaConfiguration } from 'kafka/index';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import connectPluginActions from 'scenes/connect_plugin/redux/actions';
import connectorActions from 'scenes/connector/redux/actions';
import EditConnectorBodyComponent from './EditConnectorBodyComponent';

const EditConnectorBody = () => {
    // Map State To Props
    const {
        connectorConnectPlugins,
        isEditConnectorConfigPending,
        connectPluginValidationResponse,
        isValidateConfigurationsPending,
        isListConnectorConnectPluginsPending,
        isGetConnectPluginConfigKeysPending,
        connectPluginConfigKeys,
        connectorInfo,
        isGetConnectorInfoPending,
    } = useSelector((store: ReduxStore) => {
        return {
            connectorConnectPlugins:
                store.connectPluginReducer.connectorConnectPlugins,
            isListConnectorConnectPluginsPending:
                store.connectPluginReducer.isListConnectorConnectPluginsPending,
            isGetConnectPluginConfigKeysPending:
                store.connectPluginReducer.isGetConnectPluginConfigKeysPending,
            isEditConnectorConfigPending:
                store.connectorReducer.isEditConnectorConfigPending,
            isGetConnectorInfoPending:
                store.connectorReducer.isGetConnectorInfoPending,
            isValidateConfigurationsPending:
                store.connectPluginReducer.isValidateConfigurationsPending,
            connectPluginValidationResponse:
                store.connectPluginReducer.connectPluginValidationResponse,
            connectorInfo: store.connectorReducer.connectorInfo,
            connectPluginConfigKeys:
                store.connectPluginReducer.connectPluginConfigKeys,
        };
    }, shallowEqual);
    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const getConnectPluginConfigKeys = (pluginName, pluginType) =>
        dispatch(
            connectPluginActions.getConnectPluginConfigKeys(
                pluginName,
                pluginType,
                kafkaConnectCode,
            ),
        );

    const validateConfiguration = (
        name,
        config,
        connectPluginConfigKeys: KafkaConfiguration[],
    ) =>
        dispatch(
            connectPluginActions.validateConfiguration(
                name,
                config,
                connectPluginConfigKeys,
                kafkaConnectCode,
            ),
        );

    const editConnectorConfig = (
        config,
        connectPluginConfigKeys: KafkaConfiguration[],
    ) =>
        dispatch(
            connectorActions.editConnectorConfig(
                connector,
                config,
                connectPluginConfigKeys,
                kafkaConnectCode,
            ),
        ).then(() =>
            navigate(
                `/kafka_connects/${kafkaConnectCode}/connectors/${connector}/details`,
            ),
        );

    // Authorization
    const { isAuthorized: isAuthorizedValidateConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'KAFKA_CONNECT',
                    permission:
                        PluginPermissions.PLUGIN_PERMISSIONS
                            .VALIDATE_PLUGIN_CONFIG,
                },
            ],
        });

    return (
        <>
            <LoadingSpinner
                isLoading={
                    isEditConnectorConfigPending ||
                    isGetConnectPluginConfigKeysPending ||
                    isGetConnectorInfoPending
                }
            />
            <EditConnectorBodyComponent
                getConnectPluginConfigKeys={getConnectPluginConfigKeys}
                isListConnectorConnectPluginsPending={
                    isListConnectorConnectPluginsPending
                }
                connectPluginValidationResponse={
                    connectPluginValidationResponse
                }
                isValidateConfigurationsPending={
                    isValidateConfigurationsPending
                }
                editConnectorConfig={editConnectorConfig}
                connectorConnectPlugins={connectorConnectPlugins}
                validateConfiguration={validateConfiguration}
                isGetConnectPluginConfigKeysPending={
                    isGetConnectPluginConfigKeysPending
                }
                connectPluginConfigKeys={connectPluginConfigKeys}
                connectorInfo={connectorInfo}
                isAuthorizedValidateConfiguration={
                    isAuthorizedValidateConfiguration
                }
            />
        </>
    );
};

export default EditConnectorBody;
