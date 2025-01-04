import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllTopicsBodyComponent from './AllTopicsBodyComponent';

const AllTopicsBody = () => {
    const { clusterCode } = useParams();

    // Map State To Props
    const { isGetAllTopicsDescriptionsPending, topicsDescriptions } =
        useSelector((store: ReduxStore) => {
            return {
                topicsDescriptions:
                    store.topicReducer.topicsDescriptionsByCluster.get(
                        clusterCode,
                    ),
                isGetAllTopicsDescriptionsPending:
                    store.topicReducer.isGetAllTopicsDescriptionsPendingByCluster.get(
                        clusterCode,
                    ),
            };
        }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedProduce } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: ProducerPermissions.PRODUCER_PERMISSIONS.PRODUCE,
            },
        ],
    });
    const { isAuthorized: isAuthorizedConsume } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: ConsumerPermissions.CONSUMER_PERMISSIONS.CONSUME,
            },
        ],
    });

    return (
        <AllTopicsBodyComponent
            isGetAllTopicsDescriptionsPending={
                isGetAllTopicsDescriptionsPending || false
            }
            topicsDescriptions={topicsDescriptions || []}
            isAuthorizedConsume={isAuthorizedConsume}
            isAuthorizedProduce={isAuthorizedProduce}
        />
    );
};

export default AllTopicsBody;
