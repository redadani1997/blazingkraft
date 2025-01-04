import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ClusterDashboardDetailsComponent from './ClusterDashboardDetailsComponent';

const ClusterDashboardDetails = () => {
    // Map State To Props
    const { clusterDetails } = useSelector((store: ReduxStore) => {
        return {
            clusterDetails: store.clusterReducer.clusterDetails,
            isGetClusterDetailsPending:
                store.clusterReducer.isGetClusterDetailsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <ClusterDashboardDetailsComponent clusterDetails={clusterDetails} />
        </>
    );
};

export default ClusterDashboardDetails;
