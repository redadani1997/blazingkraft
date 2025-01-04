import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import connectPluginActions from '../redux/actions';
import ConnectPluginDetailsComponent from './ConnectPluginDetailsComponent';

const ConnectPluginDetails = () => {
    useDocumentTitle('Blazing KRaft - Plugin Details');

    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, pluginName } = useParams();

    const refreshPageContent = () =>
        dispatch(
            connectPluginActions.getConnectPluginConfigKeys(
                pluginName,
                null,
                kafkaConnectCode,
            ),
        );

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <ConnectPluginDetailsComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default ConnectPluginDetails;
