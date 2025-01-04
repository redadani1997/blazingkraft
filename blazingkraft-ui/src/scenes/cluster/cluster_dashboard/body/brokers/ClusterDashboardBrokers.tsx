import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ClusterDashboardBrokersComponent from './ClusterDashboardBrokersComponent';

const ClusterDashboardBrokers = () => {
    // Map State To Props
    const { clusterBrokersDetails, isGetClusterBrokersDetailsPending } =
        useSelector((store: ReduxStore) => {
            return {
                clusterBrokersDetails:
                    store.clusterReducer.clusterBrokersDetails,
                isGetClusterBrokersDetailsPending:
                    store.clusterReducer.isGetClusterBrokersDetailsPending,
            };
        }, shallowEqual);
    // Map Dispatch To Props

    return (
        <ClusterDashboardBrokersComponent
            clusterBrokersDetails={clusterBrokersDetails}
            isGetClusterBrokersDetailsPending={
                isGetClusterBrokersDetailsPending
            }
        />
    );
};

export default ClusterDashboardBrokers;
