import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import connectPluginActions from 'scenes/connect_plugin/redux/actions';
import CreateConnectorComponent from './CreateConnectorComponent';

const CreateConnector = () => {
    useDocumentTitle('Blazing KRaft - Create Connector');

    const dispatch = useDispatch<any>();
    const { kafkaConnectCode } = useParams();

    const refreshPageContent = () =>
        dispatch(
            connectPluginActions.listConnectorConnectPlugins(kafkaConnectCode),
        );

    const clearConnectPluginConfigKeys = () =>
        dispatch(connectPluginActions.clearConnectPluginConfigKeys());

    useEffect(() => {
        clearConnectPluginConfigKeys();
        refreshPageContent();
    }, []);

    return <CreateConnectorComponent refreshPageContent={refreshPageContent} />;
};

export default CreateConnector;
