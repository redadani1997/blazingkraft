import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import clusterActions from '../redux/actions';
import BrokerDetailsComponent from './BrokerDetailsComponent';

const BrokerDetails = () => {
    useDocumentTitle('Blazing KRaft - Brokers');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, brokerId } = useParams();

    const refreshPageContent = () => {
        dispatch(
            clusterActions.getClusterBrokerConfiguration(brokerId, clusterCode),
        );
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <BrokerDetailsComponent refreshPageContent={refreshPageContent} />;
};

export default BrokerDetails;
