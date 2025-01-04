import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import HomeKafkaConnectLinkComponent from './HomeKafkaConnectLinkComponent';

const HomeKafkaConnectLink = () => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedKafkaConnectFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKafkaConnectPermissions
                        .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                        .MANAGEMENT_KAFKA_CONNECT_FEATURE_ENABLED,
            },
        ],
    });

    if (!isAuthorizedKafkaConnectFeature) {
        return <></>;
    }

    return <HomeKafkaConnectLinkComponent />;
};

export default HomeKafkaConnectLink;
