import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import delegationTokenActions from '../redux/actions';
import AllDelegationTokensComponent from './AllDelegationTokensComponent';

const AllDelegationTokens = () => {
    useDocumentTitle('Blazing KRaft - Delegation Tokens');

    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const refreshPageContent = () =>
        dispatch(delegationTokenActions.describeDelegationTokens(clusterCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AllDelegationTokensComponent refreshPageContent={refreshPageContent} />
    );
};

export default AllDelegationTokens;
