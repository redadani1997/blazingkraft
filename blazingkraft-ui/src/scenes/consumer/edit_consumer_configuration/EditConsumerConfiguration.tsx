import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import consumerActions from 'scenes/consumer/redux/actions';
import EditConsumerConfigurationComponent from './EditConsumerConfigurationComponent';

const EditConsumerConfiguration = () => {
    useDocumentTitle('Blazing KRaft - Edit Consumer Configuration');

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
            <EditConsumerConfigurationComponent
                refreshPageContent={refreshPageContent}
            />
        </>
    );
};

export default EditConsumerConfiguration;
