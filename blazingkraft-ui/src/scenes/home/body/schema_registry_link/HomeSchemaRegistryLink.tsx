import { ManagementSchemaRegistryPermissions } from 'common/permissions/management/ManagementSchemaRegistryPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import HomeSchemaRegistryLinkComponent from './HomeSchemaRegistryLinkComponent';

const HomeSchemaRegistryLink = () => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedSchemaRegistryFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'MANAGEMENT',
                    permission:
                        ManagementSchemaRegistryPermissions
                            .MANAGEMENT_SCHEMA_REGISTRY_PERMISSIONS
                            .MANAGEMENT_SCHEMA_REGISTRY_FEATURE_ENABLED,
                },
            ],
        });

    if (!isAuthorizedSchemaRegistryFeature) {
        return <></>;
    }

    return <HomeSchemaRegistryLinkComponent />;
};

export default HomeSchemaRegistryLink;
