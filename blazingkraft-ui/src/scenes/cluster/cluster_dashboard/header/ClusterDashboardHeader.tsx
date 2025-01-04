import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import ClusterDashboardHeaderComponent from './ClusterDashboardHeaderComponent';

interface ClusterDashboardHeaderProps {
    refreshPageContent: () => void;
}

const ClusterDashboardHeader = ({
    refreshPageContent,
}: ClusterDashboardHeaderProps) => {
    // Map State To Props
    const { isGetClusterDetailsPending } = useSelector((store: ReduxStore) => {
        return {
            isGetClusterDetailsPending:
                store.clusterReducer.isGetClusterDetailsPending,
            groupDetails: store.groupReducer.groupDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDeleteCluster } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_DELETE_CLUSTER,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditCluster } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_EDIT_CLUSTER,
            },
        ],
    });
    const { isAuthorized: isAuthorizedExportCluster } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_EXPORT_CLUSTER,
            },
        ],
    });

    return (
        <ClusterDashboardHeaderComponent
            isRefreshPageContentPending={isGetClusterDetailsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedDeleteCluster={isAuthorizedDeleteCluster}
            isAuthorizedEditCluster={isAuthorizedEditCluster}
            isAuthorizedExportCluster={isAuthorizedExportCluster}
        />
    );
};

export default ClusterDashboardHeader;
