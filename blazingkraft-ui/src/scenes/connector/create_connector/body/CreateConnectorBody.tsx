import { PluginPermissions } from 'common/permissions/kafka_connect/PluginPermissions';
import { KafkaConfiguration } from 'kafka/index';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import connectPluginActions from 'scenes/connect_plugin/redux/actions';
import connectorActions from 'scenes/connector/redux/actions';
import CreateConnectorBodyComponent from './CreateConnectorBodyComponent';

const CreateConnectorBody = () => {
    // Map State To Props
    const {
        connectorConnectPlugins,
        isCreateConnectorPending,
        connectPluginValidationResponse,
        isValidateConfigurationsPending,
        isListConnectorConnectPluginsPending,
        isGetConnectPluginConfigKeysPending,
        connectPluginConfigKeys,
    } = useSelector((store: ReduxStore) => {
        return {
            connectorConnectPlugins:
                store.connectPluginReducer.connectorConnectPlugins,
            isListConnectorConnectPluginsPending:
                store.connectPluginReducer.isListConnectorConnectPluginsPending,
            isGetConnectPluginConfigKeysPending:
                store.connectPluginReducer.isGetConnectPluginConfigKeysPending,
            isCreateConnectorPending:
                store.connectorReducer.isCreateConnectorPending,
            isValidateConfigurationsPending:
                store.connectPluginReducer.isValidateConfigurationsPending,
            connectPluginValidationResponse:
                store.connectPluginReducer.connectPluginValidationResponse,
            connectPluginConfigKeys:
                store.connectPluginReducer.connectPluginConfigKeys,
        };
    }, shallowEqual);
    // Map Dispatch To Props
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode } = useParams();

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

    const createConnector = (
        name,
        config,
        connectPluginConfigKeys: KafkaConfiguration[],
    ) =>
        dispatch(
            connectorActions.createConnector(
                name,
                config,
                connectPluginConfigKeys,
                kafkaConnectCode,
            ),
        ).then(() =>
            navigate(`/kafka_connects/${kafkaConnectCode}/connectors`),
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
                    isCreateConnectorPending ||
                    isGetConnectPluginConfigKeysPending
                }
            />
            <CreateConnectorBodyComponent
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
                createConnector={createConnector}
                connectorConnectPlugins={connectorConnectPlugins}
                validateConfiguration={validateConfiguration}
                isGetConnectPluginConfigKeysPending={
                    isGetConnectPluginConfigKeysPending
                }
                connectPluginConfigKeys={connectPluginConfigKeys}
                isAuthorizedValidateConfiguration={
                    isAuthorizedValidateConfiguration
                }
            />
        </>
    );
};

export default CreateConnectorBody;
