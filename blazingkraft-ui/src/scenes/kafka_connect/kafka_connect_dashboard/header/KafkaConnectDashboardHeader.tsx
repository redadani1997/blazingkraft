import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import KafkaConnectDashboardHeaderComponent from './KafkaConnectDashboardHeaderComponent';

interface KafkaConnectDashboardHeaderProps {
    refreshPageContent: () => void;
}

const KafkaConnectDashboardHeader = ({
    refreshPageContent,
}: KafkaConnectDashboardHeaderProps) => {
    // Map State To Props
    const { isGetKafkaConnectDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetKafkaConnectDetailsPending:
                    store.kafkaConnectReducer.isGetKafkaConnectDetailsPending,
            };
        },
        shallowEqual,
    );

    // Authorization
    const { isAuthorized: isAuthorizedDeleteKafkaConnect } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKafkaConnectPermissions
                        .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                        .MANAGEMENT_DELETE_KAFKA_CONNECT,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditKafkaConnect } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKafkaConnectPermissions
                        .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                        .MANAGEMENT_EDIT_KAFKA_CONNECT,
            },
        ],
    });

    return (
        <KafkaConnectDashboardHeaderComponent
            isRefreshPageContentPending={isGetKafkaConnectDetailsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedDeleteKafkaConnect={isAuthorizedDeleteKafkaConnect}
            isAuthorizedEditKafkaConnect={isAuthorizedEditKafkaConnect}
        />
    );
};

export default KafkaConnectDashboardHeader;
