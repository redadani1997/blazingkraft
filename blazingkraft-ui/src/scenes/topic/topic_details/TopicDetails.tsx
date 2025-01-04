import { useDocumentTitle } from '@mantine/hooks';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import topicActions from '../redux/actions';
import TopicDetailsComponent from './TopicDetailsComponent';

const TopicDetails = () => {
    useDocumentTitle('Blazing KRaft - Topic Details');

    // Map State To Props
    const { clusterFeatures } = useSelector((store: ReduxStore) => {
        return {
            clusterFeatures: store.settingsReducer.features.clusterFeatures,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, topic } = useParams();

    const schemaRegistryCode = clusterFeatures?.find(
        feature => feature.code === clusterCode,
    )?.schemaRegistryCode;

    const { isAuthorized: isAuthorizedDescribeSubjects } = useAuthorization({
        customCode: schemaRegistryCode,
        requiredPermissions: [
            {
                authorizationType: 'SCHEMA_REGISTRY',
                permission:
                    SubjectPermissions.SUBJECT_PERMISSIONS.DESCRIBE_SUBJECTS,
            },
        ],
    });

    const refreshPageContent = () => {
        dispatch(topicActions.getTopicDetails(topic, clusterCode));
        dispatch(topicActions.getTopicConfiguration(topic, clusterCode));
        if (schemaRegistryCode) {
            dispatch(
                schemaRegistryActions.getTopicSubjectDetails(
                    topic,
                    schemaRegistryCode,
                ),
            );
        }
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <TopicDetailsComponent
            refreshPageContent={refreshPageContent}
            isAuthorizedDescribeSubjects={isAuthorizedDescribeSubjects}
            schemaRegistryCode={schemaRegistryCode}
        />
    );
};

export default TopicDetails;
