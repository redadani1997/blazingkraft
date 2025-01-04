import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKafkaConnectsHeaderComponent from './AllKafkaConnectsHeaderComponent';

interface AllKafkaConnectsHeaderProps {
    refreshPageContent: () => void;
}

const AllKafkaConnectsHeader = ({
    refreshPageContent,
}: AllKafkaConnectsHeaderProps) => {
    // Map State To Props
    const { isGetAllKafkaConnectsPending, kafkaConnects } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllKafkaConnectsPending:
                    store.kafkaConnectReducer.isGetAllKafkaConnectsPending,
                kafkaConnects: store.kafkaConnectReducer.kafkaConnects,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedCreateKafkaConnect } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    ManagementKafkaConnectPermissions
                        .MANAGEMENT_KAFKA_CONNECT_PERMISSIONS
                        .MANAGEMENT_CREATE_KAFKA_CONNECT,
            },
        ],
    });

    return (
        <AllKafkaConnectsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllKafkaConnectsPending}
            kafkaConnectsLength={kafkaConnects.length}
            isAuthorizedCreateKafkaConnect={isAuthorizedCreateKafkaConnect}
        />
    );
};

export default AllKafkaConnectsHeader;
