import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import quotaActions from '../redux/actions';
import AllQuotasComponent from './AllQuotasComponent';

const AllQuotas = () => {
    useDocumentTitle('Blazing KRaft - Quotas');

    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const refreshPageContent = () =>
        dispatch(quotaActions.describeQuotas(clusterCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllQuotasComponent refreshPageContent={refreshPageContent} />;
};

export default AllQuotas;
