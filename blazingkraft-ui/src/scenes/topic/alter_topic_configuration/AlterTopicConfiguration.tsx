import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import topicActions from '../redux/actions';
import AlterTopicConfigurationComponent from './AlterTopicConfigurationComponent';

const AlterTopicConfiguration = () => {
    useDocumentTitle('Blazing KRaft - Alter Topic Configuration');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, topic } = useParams();

    const refreshPageContent = () => {
        dispatch(topicActions.getTopicConfiguration(topic, clusterCode));
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <AlterTopicConfigurationComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default AlterTopicConfiguration;
