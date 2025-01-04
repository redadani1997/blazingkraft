import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import consumerActions from 'scenes/consumer/redux/actions';
import BlazingConsumerDetailsComponent from './BlazingConsumerDetailsComponent';

const BlazingConsumerDetails = () => {
    useDocumentTitle('Blazing KRaft - Consumer Details');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const refreshPageContent = () =>
        dispatch(consumerActions.getConsumerCompleteConfiguration(clusterCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <>
            <BlazingConsumerDetailsComponent
                refreshPageContent={refreshPageContent}
            />
        </>
    );
};

export default BlazingConsumerDetails;
