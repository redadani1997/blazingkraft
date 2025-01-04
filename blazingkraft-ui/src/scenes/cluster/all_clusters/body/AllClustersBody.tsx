import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllClustersBodyComponent from './AllClustersBodyComponent';

interface AllClustersBodyProps {
    setClusterToDelete: (cluster: string) => void;
    setIsDeleteClusterModalOpen: (isModalOpen: boolean) => void;
}

const AllClustersBody = (props: AllClustersBodyProps) => {
    // Map State To Props
    const {
        clusters,
        isGetAllClustersPending,
        clustersDescriptions,
        isGetClustersDescriptionsPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetAllClustersPending:
                store.clusterReducer.isGetAllClustersPending,
            clusters: store.clusterReducer.clusters,
            clustersDescriptions: store.clusterReducer.clustersDescriptions,
            isGetClustersDescriptionsPending:
                store.clusterReducer.isGetClustersDescriptionsPending,
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

    return (
        <AllClustersBodyComponent
            {...props}
            isGetClustersDescriptionsPending={isGetClustersDescriptionsPending}
            clustersDescriptions={clustersDescriptions}
            isGetAllClustersPending={isGetAllClustersPending}
            clusters={clusters}
            isAuthorizedDeleteCluster={isAuthorizedDeleteCluster}
            isAuthorizedEditCluster={isAuthorizedEditCluster}
        />
    );
};

export default AllClustersBody;
