import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import ClusterDashboardBodyComponent from './ClusterDashboardBodyComponent';

interface ClusterDashboardBodyProps {
    jmxEnabled: boolean;
}
const ClusterDashboardBody = ({ jmxEnabled }: ClusterDashboardBodyProps) => {
    // Map State To Props
    const { clusterDetails, isGetClusterDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                clusterDetails: store.clusterReducer.clusterDetails,
                isGetClusterDetailsPending:
                    store.clusterReducer.isGetClusterDetailsPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <>
            {CommonValidationUtils.isTruthy(clusterDetails) && (
                <ClusterDashboardBodyComponent jmxEnabled={jmxEnabled} />
            )}
            <LoadingSpinner isLoading={isGetClusterDetailsPending} />
        </>
    );
};

export default ClusterDashboardBody;
