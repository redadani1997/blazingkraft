import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import ksqlDbEcosystemActions from '../redux/actions';
import AllKsqlDbTopicsComponent from './AllKsqlDbTopicsComponent';

const AllKsqlDbTopics = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Topics');

    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const refreshPageContent = () =>
        dispatch(ksqlDbEcosystemActions.getAllKsqlDbTopics(ksqlDbCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllKsqlDbTopicsComponent refreshPageContent={refreshPageContent} />;
};

export default AllKsqlDbTopics;
