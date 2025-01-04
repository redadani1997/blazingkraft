import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ksqlDbEcosystemActions from '../redux/actions';
import AllKsqlDbTablesComponent from './AllKsqlDbTablesComponent';

const AllKsqlDbTables = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Tables');

    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const refreshPageContent = () =>
        dispatch(ksqlDbEcosystemActions.getAllKsqlDbTables(ksqlDbCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllKsqlDbTablesComponent refreshPageContent={refreshPageContent} />;
};

export default AllKsqlDbTables;
