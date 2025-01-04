import { TopicPermissions } from 'common/permissions/cluster/TopicPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllTopicsHeaderComponent from './AllTopicsHeaderComponent';

interface AllTopicsComponentProps {
    refreshPageContent: () => void;
}
const AllTopicsHeader = ({ refreshPageContent }: AllTopicsComponentProps) => {
    const { clusterCode } = useParams();

    // Map State To Props
    const { isGetAllTopicsDescriptionsPending, topicsDescriptions } =
        useSelector((store: ReduxStore) => {
            return {
                isGetAllTopicsDescriptionsPending:
                    store.topicReducer.isGetAllTopicsDescriptionsPendingByCluster.get(
                        clusterCode,
                    ),
                topicsDescriptions:
                    store.topicReducer.topicsDescriptionsByCluster.get(
                        clusterCode,
                    ),
            };
        }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateTopic } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: TopicPermissions.TOPIC_PERMISSIONS.CREATE_TOPIC,
            },
        ],
    });

    return (
        <AllTopicsHeaderComponent
            isRefreshPageContentPending={
                isGetAllTopicsDescriptionsPending || false
            }
            refreshPageContent={refreshPageContent}
            topicsLength={topicsDescriptions?.length || 0}
            isAuthorizedCreateTopic={isAuthorizedCreateTopic}
        />
    );
};

export default AllTopicsHeader;
