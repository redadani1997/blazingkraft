import { ManagementKsqlDbPermissions } from 'common/permissions/management/ManagementKsqlDbPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import HomeKsqldbLinkComponent from './HomeKsqldbLinkComponent';

const HomeKsqldbLink = () => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKsqldbFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKsqlDbPermissions.MANAGEMENT_KSQLDB_PERMISSIONS
                        .MANAGEMENT_KSQLDB_FEATURE_ENABLED,
            },
        ],
    });

    if (!isAuthorizedKsqldbFeature) {
        return <></>;
    }

    return <HomeKsqldbLinkComponent />;
};

export default HomeKsqldbLink;
