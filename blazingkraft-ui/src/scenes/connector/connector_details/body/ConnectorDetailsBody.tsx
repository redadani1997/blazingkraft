import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ConnectorDetailsBodyComponent from './ConnectorDetailsBodyComponent';

interface ConnectorDetailsBodyProps {
    setTaskToRestart: (taskToRestart: number | null) => void;
    setIsRestartTaskModalOpen: (isRestartTaskModalOpen: boolean) => void;
    jmxEnabled: boolean;
}

const ConnectorDetailsBody = (props: ConnectorDetailsBodyProps) => {
    // Map State To Props
    const {
        connectPluginConfigKeys,
        isGetConnectPluginConfigKeysPending,
        connectorConfig,
        connectorStateInfo,
        isGetConnectorConfigPending,
        isGetConnectorStateInfoPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetConnectPluginConfigKeysPending:
                store.connectPluginReducer.isGetConnectPluginConfigKeysPending,
            connectPluginConfigKeys:
                store.connectPluginReducer.connectPluginConfigKeys,
            connectorStateInfo: store.connectorReducer.connectorStateInfo,
            isGetConnectorStateInfoPending:
                store.connectorReducer.isGetConnectorStateInfoPending,
            connectorConfig: store.connectorReducer.connectorConfig,
            isGetConnectorConfigPending:
                store.connectorReducer.isGetConnectorConfigPending,
        };
    }, shallowEqual);
    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    return (
        <ConnectorDetailsBodyComponent
            {...props}
            connectPluginConfigKeys={connectPluginConfigKeys}
            isGetConnectPluginConfigKeysPending={
                isGetConnectPluginConfigKeysPending
            }
            connectorConfig={connectorConfig}
            connectorStateInfo={connectorStateInfo}
            isGetConnectorConfigPending={isGetConnectorConfigPending}
            isGetConnectorStateInfoPending={isGetConnectorStateInfoPending}
        />
    );
};

export default ConnectorDetailsBody;
