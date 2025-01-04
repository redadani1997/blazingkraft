import { useDocumentTitle } from '@mantine/hooks';
import { ConnectorInfo } from 'common/types/connector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import connectPluginActions from 'scenes/connect_plugin/redux/actions';
import connectorActions from '../redux/actions';
import EditConnectorComponent from './EditConnectorComponent';

const EditConnector = () => {
    useDocumentTitle('Blazing KRaft - Edit Connector');

    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const refreshPageContent = () => {
        dispatch(
            connectPluginActions.listConnectorConnectPlugins(kafkaConnectCode),
        );
        return dispatch(
            connectorActions.getConnectorInfo(connector, kafkaConnectCode),
        ).then(({ value }: { value: ConnectorInfo | null }) => {
            if (value) {
                const { config, type } = value;
                const pluginName = config['connector.class'];
                return dispatch(
                    connectPluginActions.getConnectPluginConfigKeys(
                        pluginName,
                        type,
                        kafkaConnectCode,
                    ),
                );
            }
        });
    };

    const clearConnectPluginConfigKeys = () =>
        dispatch(connectPluginActions.clearConnectPluginConfigKeys());

    useEffect(() => {
        clearConnectPluginConfigKeys();
        refreshPageContent();
    }, []);

    return <EditConnectorComponent refreshPageContent={refreshPageContent} />;
};

export default EditConnector;
