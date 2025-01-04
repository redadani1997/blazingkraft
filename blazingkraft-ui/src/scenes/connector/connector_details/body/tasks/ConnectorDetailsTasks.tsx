import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { ConnectorStateInfo } from 'common/types/connector';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import ConnectorDetailsTasksComponent from './ConnectorDetailsTasksComponent';

interface ConnectorDetailsTasksProps {
    connectorStateInfo: ConnectorStateInfo;
    isGetConnectorStateInfoPending: boolean;
    setTaskToRestart: (taskToRestart: number | null) => void;
    setIsRestartTaskModalOpen: (isRestartTaskModalOpen: boolean) => void;
}

const ConnectorDetailsTasks = (props: ConnectorDetailsTasksProps) => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedRestartTask } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS.RESTART_TASK,
            },
        ],
    });

    return (
        <ConnectorDetailsTasksComponent
            {...props}
            isAuthorizedRestartTask={isAuthorizedRestartTask}
        />
    );
};

export default ConnectorDetailsTasks;
