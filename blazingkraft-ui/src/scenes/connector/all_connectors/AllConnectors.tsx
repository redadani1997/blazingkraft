import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import connectorActions from '../redux/actions';
import AllConnectorsComponent from './AllConnectorsComponent';

const AllConnectors = () => {
    useDocumentTitle('Blazing KRaft - Connectors');

    const dispatch = useDispatch<any>();
    const { kafkaConnectCode } = useParams();

    const refreshPageContent = reload =>
        dispatch(
            connectorActions.listConnectorsWithExpandedInfoAndStatus(
                reload,
                kafkaConnectCode,
            ),
        );

    useEffect(() => {
        refreshPageContent(false);
    }, []);

    return (
        <AllConnectorsComponent
            refreshPageContent={() => refreshPageContent(true)}
        />
    );
};

export default AllConnectors;
