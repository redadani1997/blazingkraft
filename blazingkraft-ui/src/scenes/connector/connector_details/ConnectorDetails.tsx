import { useDocumentTitle } from '@mantine/hooks';
import { ConnectorStateInfo } from 'common/types/connector';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectPluginActions from 'scenes/connect_plugin/redux/actions';
import connectorActions from '../redux/actions';
import ConnectorDetailsComponent from './ConnectorDetailsComponent';

const ConnectorDetails = () => {
    useDocumentTitle('Blazing KRaft - Connector Details');

    // Map State To Props
    const { kafkaConnectFeatures } = useSelector((store: ReduxStore) => {
        return {
            kafkaConnectFeatures:
                store.settingsReducer.features.kafkaConnectFeatures,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const jmxEnabled = kafkaConnectFeatures.find(
        feature => feature.code === kafkaConnectCode,
    )?.jmxEnabled;

    const getConnectorStatus = () =>
        dispatch(
            connectorActions.getConnectorStatus(connector, kafkaConnectCode),
        );

    const getConnectorConfig = () =>
        dispatch(
            connectorActions.getConnectorConfig(connector, kafkaConnectCode),
        );

    const getConnectPluginConfigKeys = (
        pluginName,
        connectorStateInfo: ConnectorStateInfo,
    ) =>
        dispatch(
            connectPluginActions.getConnectPluginConfigKeys(
                pluginName,
                connectorStateInfo.type,
                kafkaConnectCode,
            ),
        );

    const monitorConnectorTasks = (connectorStateInfo: ConnectorStateInfo) => {
        const tasks: number[] = connectorStateInfo.tasks.map(task => task.id);
        return dispatch(
            connectorActions.monitorConnectorTasks(
                connector,
                connectorStateInfo.type,
                tasks,
                kafkaConnectCode,
            ),
        );
    };

    const refreshPageContent = () =>
        getConnectorStatus().then(response => {
            const connectorStateInfo: ConnectorStateInfo = response.value;
            if (jmxEnabled) {
                monitorConnectorTasks(connectorStateInfo);
            }
            return getConnectorConfig().then(response => {
                const pluginName = response.value?.['connector.class'];
                return getConnectPluginConfigKeys(
                    pluginName,
                    connectorStateInfo,
                );
            });
        });

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <ConnectorDetailsComponent
            refreshPageContent={refreshPageContent}
            jmxEnabled={jmxEnabled}
        />
    );
};

export default ConnectorDetails;
