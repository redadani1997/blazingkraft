import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllClustersHeaderComponent from './AllClustersHeaderComponent';

interface AllClustersHeaderProps {
    refreshPageContent: () => void;
}

const AllClustersHeader = ({ refreshPageContent }: AllClustersHeaderProps) => {
    // Map State To Props
    const { isGetAllClustersPending, clusters } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllClustersPending:
                    store.clusterReducer.isGetAllClustersPending,
                clusters: store.clusterReducer.clusters,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    const { isAuthorized: isAuthorizedCreateCluster } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_CREATE_CLUSTER,
            },
        ],
    });
    const { isAuthorized: isAuthorizedImportCluster } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_IMPORT_CLUSTER,
            },
        ],
    });

    return (
        <AllClustersHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllClustersPending}
            clustersLength={clusters.length}
            isAuthorizedCreateCluster={isAuthorizedCreateCluster}
            isAuthorizedImportCluster={isAuthorizedImportCluster}
        />
    );
};

export default AllClustersHeader;
