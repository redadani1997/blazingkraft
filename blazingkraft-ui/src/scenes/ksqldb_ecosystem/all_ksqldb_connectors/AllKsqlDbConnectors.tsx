import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ksqlDbEcosystemActions from '../redux/actions';
import AllKsqlDbConnectorsComponent from './AllKsqlDbConnectorsComponent';

const AllKsqlDbConnectors = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Connectors');

    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const refreshPageContent = () =>
        dispatch(ksqlDbEcosystemActions.getAllKsqlDbConnectors(ksqlDbCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllKsqlDbConnectorsComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllKsqlDbConnectors;
