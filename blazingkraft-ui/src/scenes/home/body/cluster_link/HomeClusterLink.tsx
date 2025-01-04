import { ManagementClusterPermissions } from 'common/permissions/management/ManagementClusterPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import HomeClusterLinkComponent from './HomeClusterLinkComponent';

const HomeClusterLink = () => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedClusterFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementClusterPermissions.MANAGEMENT_CLUSTER_PERMISSIONS
                        .MANAGEMENT_CLUSTER_FEATURE_ENABLED,
            },
        ],
    });

    if (!isAuthorizedClusterFeature) {
        return <></>;
    }

    return <HomeClusterLinkComponent />;
};

export default HomeClusterLink;
