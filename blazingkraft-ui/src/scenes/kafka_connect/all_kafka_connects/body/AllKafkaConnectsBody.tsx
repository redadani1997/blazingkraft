import { ManagementKafkaConnectPermissions } from 'common/permissions/management/ManagementKafkaConnectPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKafkaConnectsBodyComponent from './AllKafkaConnectsBodyComponent';

interface AllKafkaConnectsBodyProps {
    setIsDeleteKafkaConnectModalOpen: (isModalOpen: boolean) => void;
    setKafkaConnectToDelete: (kafkaConnectToDelete: string | null) => void;
}

const AllKafkaConnectsBody = (props: AllKafkaConnectsBodyProps) => {
    // Map State To Props
    const {
        isGetAllKafkaConnectsPending,
        kafkaConnects,
        isGetKafkaConnectsDescriptionsPending,
        kafkaConnectsDescriptions,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetAllKafkaConnectsPending:
                store.kafkaConnectReducer.isGetAllKafkaConnectsPending,
            kafkaConnects: store.kafkaConnectReducer.kafkaConnects,
            isGetKafkaConnectsDescriptionsPending:
                store.kafkaConnectReducer.isGetKafkaConnectsDescriptionsPending,
            kafkaConnectsDescriptions:
                store.kafkaConnectReducer.kafkaConnectsDescriptions,
        };
    }, shallowEqual);
    // Map Dispatch To Props

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
        <AllKafkaConnectsBodyComponent
            {...props}
            isGetKafkaConnectsDescriptionsPending={
                isGetKafkaConnectsDescriptionsPending
            }
            kafkaConnectsDescriptions={kafkaConnectsDescriptions}
            isGetAllKafkaConnectsPending={isGetAllKafkaConnectsPending}
            kafkaConnects={kafkaConnects}
            isAuthorizedDeleteKafkaConnect={isAuthorizedDeleteKafkaConnect}
            isAuthorizedEditKafkaConnect={isAuthorizedEditKafkaConnect}
        />
    );
};

export default AllKafkaConnectsBody;
