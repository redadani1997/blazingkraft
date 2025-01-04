import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import producerActions from 'scenes/producer/redux/actions';
import BlazingProducerDetailsComponent from './BlazingProducerDetailsComponent';

const BlazingProducerDetails = () => {
    useDocumentTitle('Blazing KRaft - Producer Details');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const getProducerCompleteConfiguration = () =>
        dispatch(producerActions.getProducerCompleteConfiguration(clusterCode));

    const refreshPageContent = () => getProducerCompleteConfiguration();

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <BlazingProducerDetailsComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default BlazingProducerDetails;
