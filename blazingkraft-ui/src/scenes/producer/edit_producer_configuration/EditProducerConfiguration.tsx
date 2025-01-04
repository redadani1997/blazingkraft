import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import producerActions from 'scenes/producer/redux/actions';
import EditProducerConfigurationComponent from './EditProducerConfigurationComponent';

const EditProducerConfiguration = () => {
    useDocumentTitle('Blazing KRaft - Edit Producer Configuration');

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
        <EditProducerConfigurationComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditProducerConfiguration;
