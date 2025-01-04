import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import consumerGroupActions from '../redux/actions';
import AllConsumerGroupsComponent from './AllConsumerGroupsComponent';

const AllConsumerGroups = () => {
    useDocumentTitle('Blazing KRaft - Consumer Groups');

    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const refreshPageContent = () =>
        dispatch(consumerGroupActions.listAllConsumerGroups(clusterCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllConsumerGroupsComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllConsumerGroups;
