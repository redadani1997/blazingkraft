import { ConnectorPermissions } from 'common/permissions/kafka_connect/ConnectorPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import ConnectorDetailsHeaderComponent from './ConnectorDetailsHeaderComponent';

interface ConnectorDetailsHeaderProps {
    refreshPageContent: () => void;
    setIsRestartTaskModalOpen: (isModalOpen: boolean) => void;
}

const ConnectorDetailsHeader = ({
    refreshPageContent,
    setIsRestartTaskModalOpen,
}: ConnectorDetailsHeaderProps) => {
    // Map State To Props
    const { isGetConnectPluginConfigKeysPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetConnectPluginConfigKeysPending:
                    store.connectPluginReducer
                        .isGetConnectPluginConfigKeysPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedPauseConnector } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS.PAUSE_CONNECTOR,
            },
        ],
    });

    const { isAuthorized: isAuthorizedResumeConnector } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS.RESUME_CONNECTOR,
            },
        ],
    });

    const { isAuthorized: isAuthorizedRestartConnector } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS
                        .RESTART_CONNECTOR,
            },
        ],
    });

    const { isAuthorized: isAuthorizedDestroyConnector } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS
                        .DESTROY_CONNECTOR,
            },
        ],
    });

    const { isAuthorized: isAuthorizedRestartTask } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS.RESTART_TASK,
            },
        ],
    });

    const { isAuthorized: isAuthorizedResetConnectorTopics } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'KAFKA_CONNECT',
                    permission:
                        ConnectorPermissions.CONNECTOR_PERMISSIONS
                            .RESET_CONNECTOR_TOPICS,
                },
            ],
        },
    );

    const { isAuthorized: isAuthorizedEditConnector } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'KAFKA_CONNECT',
                permission:
                    ConnectorPermissions.CONNECTOR_PERMISSIONS.EDIT_CONNECTOR,
            },
        ],
    });

    return (
        <ConnectorDetailsHeaderComponent
            isRefreshPageContentPending={isGetConnectPluginConfigKeysPending}
            refreshPageContent={refreshPageContent}
            setIsRestartTaskModalOpen={setIsRestartTaskModalOpen}
            isAuthorizedPauseConnector={isAuthorizedPauseConnector}
            isAuthorizedResumeConnector={isAuthorizedResumeConnector}
            isAuthorizedRestartConnector={isAuthorizedRestartConnector}
            isAuthorizedDestroyConnector={isAuthorizedDestroyConnector}
            isAuthorizedRestartTask={isAuthorizedRestartTask}
            isAuthorizedResetConnectorTopics={isAuthorizedResetConnectorTopics}
            isAuthorizedEditConnector={isAuthorizedEditConnector}
        />
    );
};

export default ConnectorDetailsHeader;
