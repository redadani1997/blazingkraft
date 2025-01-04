import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ksqlDbEcosystemActions from '../redux/actions';
import AllKsqlDbQueriesComponent from './AllKsqlDbQueriesComponent';

const AllKsqlDbQueries = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Queries');

    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const refreshPageContent = () =>
        dispatch(ksqlDbEcosystemActions.getAllKsqlDbQueries(ksqlDbCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllKsqlDbQueriesComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllKsqlDbQueries;
