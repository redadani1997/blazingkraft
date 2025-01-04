import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import connectPluginActions from '../redux/actions';
import AllConnectPluginsComponent from './AllConnectPluginsComponent';

const AllConnectPlugins = () => {
    useDocumentTitle('Blazing KRaft - Plugins');

    const dispatch = useDispatch<any>();
    const { kafkaConnectCode } = useParams();

    const refreshPageContent = () =>
        dispatch(connectPluginActions.listAllConnectPlugins(kafkaConnectCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllConnectPluginsComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllConnectPlugins;
