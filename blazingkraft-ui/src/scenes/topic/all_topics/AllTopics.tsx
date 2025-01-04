import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import topicActions from '../redux/actions';
import AllTopicsComponent from './AllTopicsComponent';

const AllTopics = () => {
    useDocumentTitle('Blazing KRaft - Topics');

    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const getAllTopicsDescriptions = reload =>
        dispatch(topicActions.getAllTopicsDescriptions(reload, clusterCode));

    const refreshPageContent = () => {
        getAllTopicsDescriptions(true);
    };

    useEffect(() => {
        getAllTopicsDescriptions(false);
    }, []);

    return <AllTopicsComponent refreshPageContent={refreshPageContent} />;
};

export default AllTopics;
